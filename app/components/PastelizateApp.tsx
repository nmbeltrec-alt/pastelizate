'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BASES, EXPRESIONES, FONDOS, GAFAS } from '@/lib/pieces';
import { drawGafasSol } from '@/lib/drawPieces';

// Fracción del "ancho de cara" de cada base que define la distancia objetivo
// entre ojos en el canvas final. Es el único número que hay que tocar si
// alguna vez se quiere que las expresiones se vean un poco más grandes o
// pequeñas sobre el cuerpo — afecta a todas las expresiones por igual.
const EYE_DIST_FACTOR = 0.37;

type Seleccion = {
  base: string;
  expresion: string;
  gafas: string;
  frase: string;
  fondo: string;
  nombre: string;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function PastelizateApp() {
  const [sel, setSel] = useState<Seleccion>({
    base: BASES[2].id,
    expresion: 'feliz',
    gafas: 'ninguna',
    frase: '',
    fondo: 'crema',
    nombre: '',
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const baseObj = useMemo(() => BASES.find((b) => b.id === sel.base)!, [sel.base]);
  const expresionObj = useMemo(
    () => EXPRESIONES.find((e) => e.id === sel.expresion)!,
    [sel.expresion]
  );

  function update<K extends keyof Seleccion>(key: K, value: Seleccion[K]) {
    setSel((s) => ({ ...s, [key]: value }));
  }

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const SIZE = 1000;
      canvas.width = SIZE;
      canvas.height = SIZE;
      ctx.clearRect(0, 0, SIZE, SIZE);

      const fondoObj = FONDOS.find((f) => f.id === sel.fondo);
      const fondoR = SIZE / 2 - 10;

      try {
        if (fondoObj?.image) {
          // fondo de imagen: recorte circular tipo "cover" (llena el círculo
          // sin deformarse, recortando el sobrante) centrado en el canvas.
          const fondoImg = await loadImage(fondoObj.image);
          if (cancelled) return;
          ctx.save();
          ctx.beginPath();
          ctx.arc(SIZE / 2, SIZE / 2, fondoR, 0, Math.PI * 2);
          ctx.clip();
          const coverScale = Math.max(SIZE / fondoImg.width, SIZE / fondoImg.height);
          const fw = fondoImg.width * coverScale;
          const fh = fondoImg.height * coverScale;
          ctx.drawImage(fondoImg, (SIZE - fw) / 2, (SIZE - fh) / 2, fw, fh);
          ctx.restore();
          ctx.beginPath();
          ctx.arc(SIZE / 2, SIZE / 2, fondoR, 0, Math.PI * 2);
          ctx.lineWidth = 14;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        } else if (fondoObj?.color) {
          ctx.fillStyle = fondoObj.color;
          ctx.beginPath();
          ctx.arc(SIZE / 2, SIZE / 2, fondoR, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 14;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        }
      } catch {
        // si el fondo falla en cargar, seguimos sin fondo (transparente)
      }

      try {
        const baseImg = await loadImage(baseObj.file);
        if (cancelled) return;

        const margin = 120;
        const maxW = SIZE - margin * 2;
        const maxH = SIZE - margin * 2;
        const scale = Math.min(maxW / baseImg.width, maxH / baseImg.height);
        const w = baseImg.width * scale;
        const h = baseImg.height * scale;
        const x = (SIZE - w) / 2;
        const y = (SIZE - h) / 2;
        ctx.drawImage(baseImg, x, y, w, h);

        const faceCx = x + baseObj.face.x * w;
        const faceCy = y + baseObj.face.y * h;
        const faceW = baseObj.face.w * w;
        // distancia objetivo entre ojos en el canvas: igual para cualquier
        // expresión y cualquier base, así todas se ven del mismo tamaño y
        // centradas en el mismo punto exacto de la cara.
        const targetEyeDist = faceW * EYE_DIST_FACTOR;

        // expresión: recorte real de foto. Escalamos y posicionamos cada
        // imagen para que su punto medio de ojos (eyeMidX/eyeMidY, medido de
        // antemano en cada recorte) caiga siempre en (faceCx, faceCy) con la
        // misma distancia entre ojos — sin importar cuánto aire tenga el
        // recorte alrededor de la cara.
        const faceImg = await loadImage(expresionObj.file);
        if (cancelled) return;
        const faceScale = targetEyeDist / (expresionObj.eyeDist * faceImg.width);
        const fW = faceImg.width * faceScale;
        const fH = faceImg.height * faceScale;
        const fX = faceCx - expresionObj.eyeMidX * fW;
        const fY = faceCy - expresionObj.eyeMidY * fH;
        ctx.drawImage(faceImg, fX, fY, fW, fH);

        // gafas: dibujadas, sobre los ojos
        if (sel.gafas === 'sol') {
          drawGafasSol(ctx, faceCx, faceCy, faceW);
        }

        // frase: texto libre en un banner debajo del personaje
        let fraseBottom = y + h;
        const fraseTexto = sel.frase.trim();
        if (fraseTexto) {
          const bannerY = y + h - 6;
          const bannerH = 70;
          const bannerW = Math.min(w * 0.95, SIZE - 60);
          const bannerX = SIZE / 2 - bannerW / 2;
          ctx.save();
          ctx.fillStyle = 'rgba(255,255,255,0.92)';
          ctx.strokeStyle = '#e7cfa1';
          ctx.lineWidth = 3;
          const r = bannerH / 2;
          ctx.beginPath();
          ctx.moveTo(bannerX + r, bannerY);
          ctx.arcTo(bannerX + bannerW, bannerY, bannerX + bannerW, bannerY + bannerH, r);
          ctx.arcTo(bannerX + bannerW, bannerY + bannerH, bannerX, bannerY + bannerH, r);
          ctx.arcTo(bannerX, bannerY + bannerH, bannerX, bannerY, r);
          ctx.arcTo(bannerX, bannerY, bannerX + bannerW, bannerY, r);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          let fontSize = 34;
          ctx.font = `italic 600 ${fontSize}px Georgia, serif`;
          const maxTextW = bannerW - 48;
          while (ctx.measureText(fraseTexto).width > maxTextW && fontSize > 16) {
            fontSize -= 1;
            ctx.font = `italic 600 ${fontSize}px Georgia, serif`;
          }
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#5c1523';
          ctx.fillText(fraseTexto, SIZE / 2, bannerY + bannerH / 2, maxTextW);
          ctx.restore();
          fraseBottom = bannerY + bannerH;
        }

        if (sel.nombre.trim()) {
          ctx.font = 'bold 48px Georgia, serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.fillStyle = sel.fondo === 'marino' ? '#ffffff' : '#5c1523';
          ctx.fillText(sel.nombre.trim(), SIZE / 2, Math.min(fraseBottom + 55, SIZE - 30));
        }

        if (!cancelled) setPreviewUrl(canvas.toDataURL('image/png'));
      } catch {
        // silencioso: si una pieza falla en cargar, no rompe el resto
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [sel, baseObj, expresionObj]);

  function descargar() {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    const nombreArchivo = sel.nombre.trim()
      ? `pastelito-${sel.nombre.trim().toLowerCase().replace(/\s+/g, '-')}.png`
      : 'pastelito-pastelizate.png';
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <span className="text-4xl">🫓</span>
          <h1 className="font-display text-4xl font-bold text-vino-700 sm:text-5xl">
            Pastelízate
          </h1>
        </div>
        <p className="max-w-md text-sm text-vino-400 sm:text-base">
          Arma tu pastelito pieza por pieza y descárgalo como sticker.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr,1fr]">
        <div className="space-y-4">
          <div className="section-card space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Cuerpo base</p>
              <div className="flex flex-wrap gap-2">
                {BASES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => update('base', b.id)}
                    className={`chip ${sel.base === b.id ? 'chip-active' : 'chip-idle'}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Expresión</p>
              <div className="flex flex-wrap gap-2">
                {EXPRESIONES.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => update('expresion', e.id)}
                    className={`chip ${sel.expresion === e.id ? 'chip-active' : 'chip-idle'}`}
                  >
                    <span className="mr-1">{e.emoji}</span>
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Gafas</p>
              <div className="flex flex-wrap gap-2">
                {GAFAS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => update('gafas', g.id)}
                    className={`chip ${sel.gafas === g.id ? 'chip-active' : 'chip-idle'}`}
                  >
                    {g.emoji ? <span className="mr-1">{g.emoji}</span> : null}
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-vino-900">
                Frase (opcional)
              </label>
              <input
                type="text"
                maxLength={40}
                value={sel.frase}
                onChange={(e) => update('frase', e.target.value)}
                placeholder="Ej. Hecho con amor"
                className="w-full rounded-2xl border border-vino-100 bg-white px-4 py-2 text-sm text-vino-900 outline-none focus:border-vino-400"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Fondo</p>
              <div className="flex flex-wrap gap-3">
                {FONDOS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => update('fondo', f.id)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                      sel.fondo === f.id
                        ? 'border-vino-700 bg-vino-700 text-white shadow-card'
                        : 'border-vino-100 bg-white text-vino-700 hover:border-vino-400'
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/10 bg-cover bg-center"
                      style={{
                        backgroundColor: f.color ?? 'transparent',
                        backgroundImage: f.image
                          ? `url(${f.image})`
                          : f.color
                            ? undefined
                            : 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)',
                        backgroundSize: f.image ? 'cover' : '8px 8px',
                      }}
                    />
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

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
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="section-card flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
            <canvas ref={canvasRef} className="hidden" />
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Tu pastelito"
                className="w-full max-w-sm rounded-3xl shadow-card"
              />
            ) : (
              <div className="text-6xl">🫓</div>
            )}
            <button type="button" onClick={descargar} disabled={!previewUrl} className="chip chip-active disabled:opacity-50">
              Descargar PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
