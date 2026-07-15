// Catálogo de piezas para el armador de Pastelízate.
// Las expresiones son recortes reales de la hoja de referencia (con bordes
// suavizados para que encajen en cualquier base). Gafas y banderas/coco se
// dibujan de forma vectorial en canvas (ver lib/drawPieces.ts).

export type FaceAnchor = { x: number; y: number; w: number };

export type Base = {
  id: string;
  label: string;
  file: string;
  face: FaceAnchor;
};

export const BASES: Base[] = [
  { id: 'base_1', label: 'Saludando', file: '/bases/base_1.png', face: { x: 0.5, y: 0.38, w: 0.42 } },
  { id: 'base_2', label: 'Bailando', file: '/bases/base_2.png', face: { x: 0.49, y: 0.35, w: 0.44 } },
  { id: 'base_3', label: 'Paz y amor', file: '/bases/base_3.png', face: { x: 0.47, y: 0.38, w: 0.44 } },
];

// Cada expresión es un recorte real de la hoja de referencia con relleno/aire
// alrededor distinto. Para que todas queden centradas y del mismo tamaño sin
// importar la base, guardamos dónde caen los ojos dentro de CADA imagen:
// - eyeMidX / eyeMidY: punto medio entre los dos ojos, como fracción del
//   ancho/alto de la propia imagen (0..1).
// - eyeDist: distancia entre ojos, como fracción del ancho de la propia imagen.
// Con esto, al dibujar, escalamos y posicionamos cada imagen para que su
// punto medio de ojos caiga siempre exactamente en el mismo lugar de la cara
// base, sin importar cuánto aire tenga cada recorte alrededor.
export type Expresion = {
  id: string;
  label: string;
  emoji: string;
  file: string;
  eyeMidX: number;
  eyeMidY: number;
  eyeDist: number;
};

// Valores medidos automáticamente ubicando el centro real de cada pupila
// (no a ojo), para que el punto medio y la distancia entre ojos sean exactos.
export const EXPRESIONES: Expresion[] = [
  { id: 'feliz', label: 'Feliz', emoji: '😄', file: '/faces/face_feliz.png', eyeMidX: 0.396, eyeMidY: 0.538, eyeDist: 0.345 },
  { id: 'guino', label: 'Guiño coqueto', emoji: '😉', file: '/faces/face_guino.png', eyeMidX: 0.564, eyeMidY: 0.458, eyeDist: 0.345 },
  { id: 'sorpresa', label: 'Sorpresa', emoji: '😲', file: '/faces/face_sorpresa.png', eyeMidX: 0.326, eyeMidY: 0.522, eyeDist: 0.291 },
  { id: 'enamorado', label: 'Enamorado', emoji: '😍', file: '/faces/face_enamorado.png', eyeMidX: 0.562, eyeMidY: 0.295, eyeDist: 0.385 },
  { id: 'relax', label: 'Relax', emoji: '😌', file: '/faces/face_relax.png', eyeMidX: 0.496, eyeMidY: 0.566, eyeDist: 0.365 },
];

export type PiezaDibujada = {
  id: string;
  label: string;
  emoji: string;
};

export const GAFAS: PiezaDibujada[] = [
  { id: 'ninguna', label: 'Ninguna', emoji: '' },
  { id: 'sol', label: 'De sol', emoji: '😎' },
];

export const ACCESORIOS: PiezaDibujada[] = [
  { id: 'ninguno', label: 'Ninguno', emoji: '' },
  { id: 'bandera-rd', label: 'Bandera RD', emoji: '🇩🇴' },
  { id: 'bandera-pr', label: 'Bandera PR', emoji: '🇵🇷' },
  { id: 'coco', label: 'Coco', emoji: '🥥' },
];

export const FONDOS = [
  { id: 'crema', label: 'Crema', color: '#f8efdc' },
  { id: 'rosa', label: 'Rosa pastel', color: '#f6c9d6' },
  { id: 'marino', label: 'Azul marino', color: '#0b2545' },
  { id: 'verde-palma', label: 'Verde palma', color: '#4c7a4a' },
  { id: 'transparente', label: 'Transparente', color: null as string | null },
] as const;
