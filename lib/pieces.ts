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

export const EXPRESIONES: Expresion[] = [
  { id: 'feliz', label: 'Feliz', emoji: '😄', file: '/faces/face_feliz.png', eyeMidX: 0.37, eyeMidY: 0.465, eyeDist: 0.40 },
  { id: 'guino', label: 'Guiño coqueto', emoji: '😉', file: '/faces/face_guino.png', eyeMidX: 0.465, eyeMidY: 0.365, eyeDist: 0.43 },
  { id: 'sorpresa', label: 'Sorpresa', emoji: '😲', file: '/faces/face_sorpresa.png', eyeMidX: 0.305, eyeMidY: 0.465, eyeDist: 0.35 },
  { id: 'enamorado', label: 'Enamorado', emoji: '😍', file: '/faces/face_enamorado.png', eyeMidX: 0.505, eyeMidY: 0.333, eyeDist: 0.337 },
  { id: 'relax', label: 'Relax', emoji: '😌', file: '/faces/face_relax.png', eyeMidX: 0.475, eyeMidY: 0.41, eyeDist: 0.41 },
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
