'use client';

import { ChipOption } from '@/lib/options';

const SWATCH: Record<string, string> = {
  crema: '#f8efdc',
  rosa: '#f6c9d6',
  marino: '#0b2545',
  'verde-palma': '#4c7a4a',
};

export default function FondoPicker({
  options,
  value,
  onChange,
}: {
  options: ChipOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-vino-900">Fondo</p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all active:scale-95 ${
              value === opt.id
                ? 'border-vino-700 bg-vino-700 text-white shadow-card'
                : 'border-vino-100 bg-white text-vino-700 hover:border-vino-400'
            }`}
            aria-pressed={value === opt.id}
          >
            <span
              className="h-4 w-4 rounded-full border border-black/10"
              style={{ backgroundColor: SWATCH[opt.id] ?? '#eee' }}
            />
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
