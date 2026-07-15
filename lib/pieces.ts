// Catálogo de piezas para el armador de Pastelízate.
// Todo se compone en un <canvas> en el navegador — no hay IA ni backend.

export type FaceAnchor = { x: number; y: number; w: number };

export type Base = {
  id: string;
  label: string;
  file: string; // /bases/base_N.png
  // punto y ancho de referencia de la "cara" como fracción del ancho/alto de la imagen,
  // usado para posicionar ojos, sombrero, gafas de forma consistente.
  face: FaceAnchor;
};

export const BASES: Base[] = [
  { id: 'base_1', label: 'Saludando', file: '/bases/base_1.png', face: { x: 0.5, y: 0.38, w: 0.42 } },
  { id: 'base_2', label: 'Bailando', file: '/bases/base_2.png', face: { x: 0.49, y: 0.35, w: 0.44 } },
  { id: 'base_3', label: 'Paz y amor', file: '/bases/base_3.png', face: { x: 0.47, y: 0.38, w: 0.44 } },
];

export type Pieza = {
  id: string;
  label: string;
  file: string;
  emoji?: string;
};

export const SOMBREROS: Pieza[] = [
  { id: 'ninguno', label: 'Ninguno', file: '' },
  { id: 'paja', label: 'Sombrero tropical', file: '/pieces/final_hat_paja.png', emoji: '👒' },
  { id: 'gorra-rd', label: 'Gorra RD', file: '/pieces/final_hat_gorra_rd.png', emoji: '🧢' },
  { id: 'gorra', label: 'Gorra Good Times', file: '/pieces/final_hat_gorra.png', emoji: '🧢' },
  { id: 'pamela', label: 'Pamela con lazo', file: '/pieces/final_hat_pamela.png', emoji: '👒' },
];

export const GAFAS: Pieza[] = [
  { id: 'ninguna', label: 'Ninguna', file: '' },
  { id: 'sol', label: 'De sol', file: '/pieces/final_gafas_sol.png', emoji: '😎' },
];

export const ACCESORIOS: Pieza[] = [
  { id: 'ninguno', label: 'Ninguno', file: '' },
  { id: 'bandera-rd', label: 'Bandera RD', file: '/pieces/final_bandera_rd.png', emoji: '🇩🇴' },
  { id: 'bandera-pr', label: 'Bandera PR', file: '/pieces/final_bandera_pr.png', emoji: '🇵🇷' },
  { id: 'coco', label: 'Coco', file: '/pieces/final_coco.png', emoji: '🥥' },
  { id: 'camara', label: 'Cámara', file: '/pieces/final_camara.png', emoji: '📷' },
  { id: 'tambora', label: 'Tambora', file: '/pieces/final_tambora.png', emoji: '🥁' },
  { id: 'maracas', label: 'Maracas', file: '/pieces/final_maracas.png', emoji: '🎉' },
  { id: 'skate', label: 'Patineta', file: '/pieces/final_skate.png', emoji: '🛹' },
  { id: 'telefono', label: 'Selfie', file: '/pieces/final_telefono.png', emoji: '🤳' },
  { id: 'cafe', label: 'Café', file: '/pieces/final_cafe.png', emoji: '☕' },
  { id: 'comida', label: 'Comida criolla', file: '/pieces/final_comida.png', emoji: '🍽️' },
  { id: 'cartera', label: 'Cartera', file: '/pieces/final_cartera.png', emoji: '👜' },
];

export const FRASES: Pieza[] = [
  { id: 'ninguna', label: 'Ninguna', file: '' },
  { id: 'hecho-con-amor', label: 'Hecho con amor', file: '/pieces/final_hecho_amor.png' },
  { id: 'dos-islas', label: 'De dos islas', file: '/pieces/final_dos_islas.png' },
  { id: 'bonita', label: 'Bonita por dentro', file: '/pieces/final_bonita.png' },
];

export type Expresion = {
  id: string;
  label: string;
  emoji: string;
};

export const EXPRESIONES: Expresion[] = [
  { id: 'feliz', label: 'Feliz', emoji: '😄' },
  { id: 'guino', label: 'Guiño coqueto', emoji: '😉' },
  { id: 'sorpresa', label: 'Sorpresa', emoji: '😲' },
  { id: 'enamorado', label: 'Enamorado', emoji: '😍' },
  { id: 'relax', label: 'Relax', emoji: '😌' },
];

export const FONDOS = [
  { id: 'crema', label: 'Crema', color: '#f8efdc' },
  { id: 'rosa', label: 'Rosa pastel', color: '#f6c9d6' },
  { id: 'marino', label: 'Azul marino', color: '#0b2545' },
  { id: 'verde-palma', label: 'Verde palma', color: '#4c7a4a' },
  { id: 'transparente', label: 'Transparente', color: null as string | null },
] as const;
