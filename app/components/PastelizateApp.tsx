'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ACCESORIOS,
  BASES,
  EXPRESIONES,
  FONDOS,
  FRASE_IMG,
  FRASES,
  GAFAS,
  SOMBREROS,
} from '@/lib/pieces';
import { drawAccesorio, drawGafasSol, drawSombreroTropical, AccesorioId } from '@/lib/drawPieces';

type Seleccion = {
  base: string;
  expresion: string;
  sombrero: string;
  gafas: string;
  accesorio: string;
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

function drawHeartEye(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.fillStyle = '#c23b4a';
  ctx.beginPath();
  const s = r * 0.95;
  ctx.moveTo(x, y + s * 0.6);
  ctx.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.5, y - s, x, y - s * 0.25);
  ctx.bezierCurveTo(x + s * 0.5, y - s, x + s, y - s * 0.4, x, y + s * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.ellipse(x - s * 0.28, y - s * 0.25, s * 0.14, s * 0.18, -0.5, 0, Math.PI * 2);
  ctx.fill();
}

export default function PastelizateApp() {
  const [sel, setSel] = useState<Seleccion>({
    base: BASES[2].id,
    expresion: 'feliz',
    sombrero: 'ninguno',
    gafas: 'ninguna',
    accesorio: 'ninguno',
    frase: 'ninguna',
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
      if (fondoObj?.color) {
        ctx.fillStyle = fondoObj.color;
        ctx.beginPath();
        ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
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

        // expresión: recorte real de foto, escalado sobre la cara
        if (expresionObj.file) {
          const faceImg = await loadImage(expresionObj.file);
          if (cancelled) return;
          const fW = faceW * 1.35;
          const fH = faceImg.height * (fW / faceImg.width);
          const fX = faceCx - fW / 2;
          const fY = faceCy - fH * 0.42;
          ctx.drawImage(faceImg, fX, fY, fW, fH);
        }

        // enamorado: ojos de corazón dibujados sobre la foto feliz
        if (sel.expresion === 'enamorado') {
          const eyeR = faceW * 0.15;
          const eyeDx = faceW * 0.24;
          drawHeartEye(ctx, faceCx - eyeDx, faceCy, eyeR);
          drawHeartEye(ctx, faceCx + eyeDx, faceCy, eyeR);
        }

        // sombrero: dibujado, encima de la cabeza
        if (sel.sombrero === 'tropical') {
          const hatBottomY = y + h * 0.13;
          drawSombreroTropical(ctx, faceCx, hatBottomY, faceW);
        }

        // gafas: dibujadas, sobre los ojos
        if (sel.gafas === 'sol') {
          drawGafasSol(ctx, faceCx, faceCy, faceW);
        }

        // accesorio: dibujado, insignia flotante abajo a la derecha
        if (sel.accesorio !== 'ninguno') {
          const accX = x + w * 0.82;
          const accY = y + h * 0.78;
          drawAccesorio(ctx, sel.accesorio as AccesorioId, accX, accY, w * 0.36);
        }

        // frase: banner recortado, debajo del personaje
        let fraseBottom = y + h;
        const fraseFile = FRASE_IMG[sel.frase];
        if (fraseFile) {
          const frImg = await loadImage(fraseFile);
          if (cancelled) return;
          const frW = w * 0.85;
          const frH = frImg.height * (frW / frImg.width);
          const frX = SIZE / 2 - frW / 2;
          const frY = y + h - frH * 0.15;
          ctx.drawImage(frImg, frX, frY, frW, frH);
          fraseBottom = frY + frH;
        }

        if (sel.nombre.trim()) {
          ctx.font = 'bold 48px Georgia, serif';
          ctx.textAlign = 'center';
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
              <p className="mb-2 text-sm font-semibold text-vino-900">Sombrero</p>
              <div className="flex flex-wrap gap-2">
                {SOMBREROS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => update('sombrero', s.id)}
                    className={`chip ${sel.sombrero === s.id ? 'chip-active' : 'chip-idle'}`}
                  >
                    {s.emoji ? <span className="mr-1">{s.emoji}</span> : null}
                    {s.label}
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
              <p className="mb-2 text-sm font-semibold text-vino-900">En la mano / accesorio</p>
              <div className="flex flex-wrap gap-2">
                {ACCESORIOS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => update('accesorio', a.id)}
                    className={`chip ${sel.accesorio === a.id ? 'chip-active' : 'chip-idle'}`}
                  >
                    {a.emoji ? <span className="mr-1">{a.emoji}</span> : null}
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Frase</p>
              <div className="flex flex-wrap gap-2">
                {FRASES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => update('frase', f.id)}
                    className={`chip ${sel.frase === f.id ? 'chip-active' : 'chip-idle'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
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
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{
                        backgroundColor: f.color ?? 'transparent',
                        backgroundImage: f.color
                          ? undefined
                          : 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)',
                        backgroundSize: '8px 8px',
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
