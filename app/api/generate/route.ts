import { NextRequest, NextResponse } from 'next/server';
import {
  RATE_COOKIE,
  isRateLimited,
  nextCookieValue,
  parseCount,
} from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const maxDuration = 60;

const OPENAI_IMAGES_URL = 'https://api.openai.com/v1/images/generations';
const OPENAI_IMAGES_EDIT_URL = 'https://api.openai.com/v1/images/edits';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Falta configurar OPENAI_API_KEY en el servidor. Contacta al administrador de la app.',
        },
        { status: 500 }
      );
    }

    const currentCount = parseCount(req.cookies.get(RATE_COOKIE)?.value);
    if (isRateLimited(currentCount)) {
      return NextResponse.json(
        {
          error:
            'Llegaste al límite de pastelizaciones por hoy. ¡Vuelve mañana para crear más!',
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const prompt: string | undefined = body?.prompt;
    const selfieBase64: string | undefined = body?.selfieBase64; // data URL

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: 'El prompt está vacío o es demasiado corto.' },
        { status: 400 }
      );
    }

    let imageB64: string | null = null;

    if (selfieBase64) {
      const matches = selfieBase64.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) {
        return NextResponse.json(
          { error: 'La imagen de referencia no tiene un formato válido.' },
          { status: 400 }
        );
      }
      const mime = matches[1];
      const b64Data = matches[2];
      const buffer = Buffer.from(b64Data, 'base64');

      const form = new FormData();
      form.append(
        'image',
        new Blob([buffer], { type: mime }),
        'selfie.png'
      );
      form.append('prompt', prompt);
      form.append('model', 'gpt-image-1');
      form.append('size', '1024x1024');
      form.append('n', '1');

      const resp = await fetch(OPENAI_IMAGES_EDIT_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
      });

      if (!resp.ok) {
        const errText = await safeText(resp);
        return NextResponse.json(
          { error: mapOpenAiError(resp.status, errText) },
          { status: 502 }
        );
      }

      const data = await resp.json();
      imageB64 = data?.data?.[0]?.b64_json ?? null;
    } else {
      const resp = await fetch(OPENAI_IMAGES_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt,
          size: '1024x1024',
          n: 1,
        }),
      });

      if (!resp.ok) {
        const errText = await safeText(resp);
        return NextResponse.json(
          { error: mapOpenAiError(resp.status, errText) },
          { status: 502 }
        );
      }

      const data = await resp.json();
      imageB64 = data?.data?.[0]?.b64_json ?? null;
    }

    if (!imageB64) {
      return NextResponse.json(
        {
          error:
            'No se pudo generar la imagen. Intenta de nuevo en unos segundos.',
        },
        { status: 502 }
      );
    }

    const response = NextResponse.json({ imageB64 });
    response.cookies.set(RATE_COOKIE, nextCookieValue(currentCount), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    response.cookies.set('pz_remaining', String(7 - currentCount >= 0 ? 7 - currentCount : 0), {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (err) {
    console.error('Error generando pastelito:', err);
    return NextResponse.json(
      {
        error:
          'Algo salió mal generando tu pastelito. Intenta de nuevo en un momento.',
      },
      { status: 500 }
    );
  }
}

async function safeText(resp: Response): Promise<string> {
  try {
    return await resp.text();
  } catch {
    return '';
  }
}

function mapOpenAiError(status: number, raw: string): string {
  if (status === 401) {
    return 'La API key de OpenAI no es válida. Revisa la configuración del servidor.';
  }
  if (status === 429) {
    return 'La API de generación está saturada o se alcanzó el límite de uso. Intenta de nuevo en un momento.';
  }
  if (status === 400) {
    return 'La solicitud de generación fue rechazada (posiblemente por contenido no permitido). Ajusta las opciones e intenta de nuevo.';
  }
  console.error('OpenAI error raw:', raw);
  return 'No se pudo generar la imagen en este momento. Intenta de nuevo.';
}
