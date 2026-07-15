'use client';

import { ChipOption } from '@/lib/options';

export default function ChipGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: ChipOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-vino-900">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`chip ${value === opt.id ? 'chip-active' : 'chip-idle'}`}
            aria-pressed={value === opt.id}
          >
            {opt.emoji ? <span className="mr-1">{opt.emoji}</span> : null}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
