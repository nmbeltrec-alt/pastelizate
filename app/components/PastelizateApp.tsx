'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FILTROS, FONDOS, STICKERS, Sticker } from '@/lib/stickers';

type FiltroKey = keyof typeof FILTROS;

export default function PastelizateApp() {
  const [filtros, setFiltros] = useState<Record<FiltroKey, string>>({
    expresion: 'todas',
    sombrero: 'todos',
    accesorio: 'todos',
    frase: 'todas',
  });
  const [seleccionado, setSeleccionado] = useState<Sticker>(STICKERS[0]);
  const [fondo, setFondo] = useState<(typeof FONDOS)[number]['id']>('crema');
  const [nombre, setNombre] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    return STICKERS.filter((s) => {
      if (filtros.expresion !== 'todas' && s.tags.expresion !== filtros.expresion) return false;
      if (filtros.sombrero !== 'todos' && s.tags.sombrero !== filtros.sombrero) return false;
      if (filtros.accesorio !== 'todos' && s.tags.accesorio !== filtros.accesorio) return false;
      if (filtros.frase !== 'todas' && s.tags.frase !== filtros.frase) return false;
      return true;
    });
  }, [filtros]);

  useEffect(() => {
    if (filtrados.length > 0 && !filtrados.find((s) => s.id === seleccionado.id)) {
      setSeleccionado(filtrados[0]);
    }
  }, [filtrados, seleccionado.id]);

  useEffect(() => {
    dibujar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seleccionado, fondo, nombre]);

  function dibujar() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 1000;
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    const fondoObj = FONDOS.find((f) => f.id === fondo);
    if (fondoObj?.color) {
      ctx.fillStyle = fondoObj.color;
      ctx.beginPath();
      // fondo circular tipo sticker, con borde blanco
      ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const margin = 80;
      const maxW = size - margin * 2;
      const maxH = size - margin * 2 - (nombre.trim() ? 70 : 0);
      const scale = Math.min(maxW / img.width, maxH / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (size - w) / 2;
      const y = (size - h) / 2 - (nombre.trim() ? 30 : 0);
      ctx.drawImage(img, x, y, w, h);

      if (nombre.trim()) {
        ctx.font = 'bold 54px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = fondo === 'marino' ? '#ffffff' : '#5c1523';
        ctx.fillText(nombre.trim(), size / 2, y + h + 60);
      }

      setPreviewUrl(canvas.toDataURL('image/png'));
    };
    img.src = seleccionado.file;
  }

  function descargar() {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    const nombreArchivo = nombre.trim()
      ? `pastelito-${nombre.trim().toLowerCase().replace(/\s+/g, '-')}.png`
      : `pastelito-${seleccionado.id}.png`;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function FiltroChips({ filtroKey }: { filtroKey: FiltroKey }) {
    const opciones = FILTROS[filtroKey];
    return (
      <div className="flex flex-wrap gap-2">
        {opciones.map((op) => (
          <button
            key={op.id}
            type="button"
            onClick={() => setFiltros((f) => ({ ...f, [filtroKey]: op.id }))}
            className={`chip ${filtros[filtroKey] === op.id ? 'chip-active' : 'chip-idle'}`}
          >
            {op.label}
          </button>
        ))}
      </div>
    );
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
          Elige tu pastelito, personalízalo y descárgalo como sticker.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr,1fr]">
        {/* Panel de selección */}
        <div className="space-y-4">
          <div className="section-card space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Expresión</p>
              <FiltroChips filtroKey="expresion" />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Sombrero</p>
              <FiltroChips filtroKey="sombrero" />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Accesorio</p>
              <FiltroChips filtroKey="accesorio" />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Frase</p>
              <FiltroChips filtroKey="frase" />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">
                Pastelitos disponibles ({filtrados.length})
              </p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {filtrados.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeleccionado(s)}
                    title={s.label}
                    className={`overflow-hidden rounded-2xl border-2 bg-white p-1 transition-all active:scale-95 ${
                      seleccionado.id === s.id
                        ? 'border-vino-700 shadow-card'
                        : 'border-vino-100 hover:border-vino-400'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.file} alt={s.label} className="aspect-square w-full object-contain" />
                  </button>
                ))}
                {filtrados.length === 0 && (
                  <p className="col-span-full text-sm text-vino-400">
                    No hay pastelitos con esa combinación. Prueba otro filtro.
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-vino-900">Fondo</p>
              <div className="flex flex-wrap gap-3">
                {FONDOS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFondo(f.id)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                      fondo === f.id
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
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Nicole"
                className="w-full rounded-2xl border border-vino-100 bg-white px-4 py-2 text-sm text-vino-900 outline-none focus:border-vino-400"
              />
            </div>
          </div>
        </div>

        {/* Panel de resultado */}
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
              <div className="text-6xl">🥟</div>
            )}
            <p className="max-w-xs text-sm text-vino-400">{seleccionado.label}</p>
            <button
              type="button"
              onClick={descargar}
              disabled={!previewUrl}
              className="chip chip-active disabled:opacity-50"
            >
              Descargar PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
