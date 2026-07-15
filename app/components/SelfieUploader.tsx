'use client';

import { useRef } from 'react';

export default function SelfieUploader({
  selfie,
  onSelfieChange,
}: {
  selfie: string | null;
  onSelfieChange: (dataUrl: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onSelfieChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-semibold text-vino-900">
          Selfie de referencia (opcional)
        </p>
        {selfie && (
          <button
            type="button"
            onClick={() => {
              onSelfieChange(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="text-xs font-medium text-vino-400 underline"
          >
            Quitar
          </button>
        )}
      </div>
      <p className="mb-2 text-xs text-vino-400">
        La IA intentará inspirarse en el cabello y la expresión general. El
        resultado es interpretativo, no un parecido exacto.
      </p>
      <div className="flex items-center gap-3">
        {selfie ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selfie}
            alt="Selfie de referencia"
            className="h-16 w-16 rounded-2xl object-cover shadow-card"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-vino-100 text-2xl">
            🤳
          </div>
        )}
        <label className="chip chip-idle cursor-pointer">
          {selfie ? 'Cambiar foto' : 'Subir foto'}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      </div>
    </div>
  );
}
