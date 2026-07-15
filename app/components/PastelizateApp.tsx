'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ChipGroup from './ChipGroup';
import FondoPicker from './FondoPicker';
import SelfieUploader from './SelfieUploader';
import {
  ACCESORIOS,
  EXPRESIONES,
  FONDOS,
  FRASES,
  GAFAS,
  MAX_GENERACIONES_POR_SESION,
  SOMBREROS,
} from '@/lib/options';
import { buildPrompt, Selecciones } from '@/lib/promptBuilder';

const LOADING_MESSAGES = [
  'Pastelizándote...',
  'Horneando tu personaje...',
  'Repulgando los bordes...',
  'Dorando la masa a la perfección...',
  'Añadiendo el blush a las mejillas...',
];

const LOCAL_COUNT_KEY = 'pastelizate_gen_count_v1';

function getLocalCount(): { count: number; date: string } {
  if (typeof window === 'undefined') return { count: 0, date: '' };
  try {
    const raw = window.localStorage.getItem(LOCAL_COUNT_KEY);
    if (!raw) return { count: 0, date: '' };
    return JSON.parse(raw);
  } catch {
    return { count: 0, date: '' };
  }
}

function bumpLocalCount() {
  const today = new Date().toISOString().slice(0, 10);
  const current = getLocalCount();
  const count = current.date === today ? current.count + 1 : 1;
  window.localStorage.setItem(
    LOCAL_COUNT_KEY,
    JSON.stringify({ count, date: today })
  );
  return count;
}

export default function PastelizateApp() {
  const [sel, setSel] = useState<Selecciones>({
    expresion: 'feliz',
    sombrero: 'ninguno',
    gafas: 'ninguna',
    accesorio: 'ninguno',
    frase: 'ninguna',
    fondo: 'crema',
    nombre: '',
    conSelfie: false,
  });
  const [selfie, setSelfie] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [localCount, setLocalCount] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalCount(getLocalCount().count);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, [loading]);

  const prompt = useMemo(
    () => buildPrompt({ ...sel, conSelfie: !!selfie }),
    [sel, selfie]
  );

  const remaining = Math.max(0, MAX_GENERACIONES_POR_SESION - localCount);
  const limitReached = remaining <= 0;

  function update<K extends keyof Selecciones>(key: K, value: Selecciones[K]) {
    setSel((s) => ({ ...s, [key]: value }));
  }

  async function generar(customPrompt?: string) {
    if (limitReached) {
      setError(
        'Llegaste al límite de pastelizaciones por hoy. ¡Vuelve mañana para crear más!'
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt ?? prompt,
          selfieBase64: selfie || undefined,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error || 'No se pudo generar la imagen.');
      }
      setImage(`data:image/png;base64,${data.imageB64}`);
      setLocalCount(bumpLocalCount());
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch (e: any) {
      setError(
        e?.message || 'No se pudo generar tu pastelito. Intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  }

  function descargar() {
    if (!image) return;
    const a = document.createElement('a');
    a.href = image;
    const nombreArchivo = sel.nombre?.trim()
      ? `pastelito-${sel.nombre.trim().toLowerCase().replace(/\s+/g, '-')}.png`
      : 'pastelito-pastelizate.png';
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function copiarPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <span className="text-4xl">🥟</span>
          <h1 className="font-display text-4xl font-bold text-vino-700 sm:text-5xl">
            Pastelízate
          </h1>
        </div>
        <p className="max-w-md text-sm text-vino-400 sm:text-base">
          Arma tu pastelito personalizado con IA y descárgalo como sticker.
        </p>
        <p className="text-xs text-vino-400">
          Te quedan <span className="font-semibold text-vino-700">{remaining}</span>{' '}
          pastelización{remaining === 1 ? '' : 'es'} hoy.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr,1fr]">
        {/* Panel de selección */}
        <div className="space-y-4">
          <div className="section-card space-y-5">
            <ChipGroup
              title="Expresión"
              options={EXPRESIONES}
              value={sel.expresion}
              onChange={(v) => update('expresion', v)}
            />
            <ChipGroup
              title="Sombrero"
              options={SOMBREROS}
              value={sel.sombrero}
              onChange={(v) => update('sombrero', v)}
            />
            <ChipGroup
              title="Gafas"
              options={GAFAS}
              value={sel.gafas}
              onChange={(v) => update('gafas', v)}
            />
            <ChipGroup
              title="En la mano / accesorio"
              options={ACCESORIOS}
              value={sel.accesorio}
              onChange={(v) => update('accesorio', v)}
            />
            <ChipGroup
              title="Frase en banner"
              options={FRASES}
              value={sel.frase}
              onChange={(v) => update('frase', v)}
            />
            <FondoPicker
              options={FONDOS}
              value={sel.fondo}
              onChange={(v) => update('fondo', v)}
            />
            <div>
              <label className="mb-2 block text-sm font-semibold text-vino-900">
                Nombre (opcional)
              </label>
              <input
                type="text"
                maxLength={20}
                value={sel.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                placeholder="Ej. Nicole"
                className="w-full rounded-2xl border border-vino-100 bg-white px-4 py-2 text-sm text-vino-900 outline-none focus:border-vino-400"
              />
            </div>
            <SelfieUploader selfie={selfie} onSelfieChange={setSelfie} />
          </div>

          <div className="section-card">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-vino-900">
                Prompt generado
              </p>
              <button
                type="button"
                onClick={copiarPrompt}
                className="text-xs font-medium text-vino-400 underline hover:text-vino-700"
              >
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
            <textarea
              readOnly
              value={prompt}
              rows={5}
              className="w-full resize-none rounded-2xl border border-vino-100 bg-crema-50 p-3 text-xs leading-relaxed text-vino-700"
            />
          </div>

          <button
            type="button"
            onClick={() => generar()}
            disabled={loading || limitReached}
            className="w-full rounded-full bg-vino-700 px-6 py-3.5 text-base font-semibold text-white shadow-card transition-all hover:bg-vino-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Pastelizando...' : '¡Pastelízate!'}
          </button>
          {error && (
            <p className="rounded-2xl bg-vino-50 px-4 py-3 text-sm text-vino-700">
              {error}
            </p>
          )}
        </div>

        {/* Panel de resultado */}
        <div ref={resultRef} className="lg:sticky lg:top-6 lg:self-start">
          <div className="section-card flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
            {loading && (
              <>
                <div className="animate-float text-6xl">🥟</div>
                <p className="text-sm font-medium text-vino-700">
                  {LOADING_MESSAGES[loadingMsgIdx]}
                </p>
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-vino-100">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-vino-700" />
                </div>
              </>
            )}

            {!loading && image && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Tu pastelito personalizado"
                  className="w-full max-w-sm rounded-3xl shadow-card"
                />
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={descargar}
                    className="chip chip-active"
                  >
                    Descargar PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => generar()}
                    disabled={loading || limitReached}
                    className="chip chip-idle disabled:opacity-50"
                  >
                    Regenerar
                  </button>
                </div>
              </>
            )}

            {!loading && !image && (
              <>
                <div className="text-6xl">🥟</div>
                <p className="max-w-xs text-sm text-vino-400">
                  Elige las piezas de tu pastelito y presiona{' '}
                  <span className="font-semibold text-vino-700">
                    ¡Pastelízate!
                  </span>{' '}
                  para generarlo.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
