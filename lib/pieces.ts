// Catálogo de piezas para el armador de Pastelízate.
// Las expresiones son recortes reales de la hoja de referencia (con bordes
// suavizados para que encajen en cualquier base). Gafas y banderas/coco se
// dibujan de forma vectorial en canvas (ver lib/drawPieces.ts).

export type FaceAnchor = { x: number; y: number; w: number };

// Sombra de contacto dibujada debajo de los pies, para que el pastelito no
// se vea "flotando" sobre ningún fondo (color o foto). cx/cy/rx/ry son
// fracciones del ancho/alto de la propia base (igual que face), y opacity
// es la opacidad máxima en el centro de la sombra.
export type ShadowAnchor = { cx: number; cy: number; rx: number; ry: number; opacity: number };

export type Base = {
  id: string;
  label: string;
  file: string;
  face: FaceAnchor;
  shadow: ShadowAnchor;
};

export const BASES: Base[] = [
  {
    id: 'base_1',
    label: 'Saludando',
    file: '/bases/base_1.png',
    face: { x: 0.48, y: 0.355, w: 0.42 },
    shadow: { cx: 0.527, cy: 0.99, rx: 0.26, ry: 0.05, opacity: 0.4 },
  },
  {
    id: 'base_2',
    label: 'Bailando',
    file: '/bases/base_2.png',
    face: { x: 0.487, y: 0.355, w: 0.44 },
    shadow: { cx: 0.6, cy: 0.965, rx: 0.32, ry: 0.06, opacity: 0.4 },
  },
  {
    id: 'base_3',
    label: 'Paz y amor',
    file: '/bases/base_3.png',
    face: { x: 0.44, y: 0.355, w: 0.44 },
    shadow: { cx: 0.4375, cy: 0.985, rx: 0.24, ry: 0.05, opacity: 0.4 },
  },
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
  { id: 'guino', label: 'Guiño coqueto', emoji: '😉', file: '/faces/face_guino.png', eyeMidX: 0.49, eyeMidY: 0.458, eyeDist: 0.345 },
  { id: 'enamorado', label: 'Enamorado', emoji: '😍', file: '/faces/face_enamorado.png', eyeMidX: 0.5, eyeMidY: 0.491, eyeDist: 0.314 },
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

export type Fondo = {
  id: string;
  label: string;
  color: string | null;
  image?: string;
};

export const FONDOS: Fondo[] = [
  { id: 'crema', label: 'Crema', color: '#f8efdc' },
  { id: 'rosa', label: 'Rosa pastel', color: '#f6c9d6' },
  { id: 'marino', label: 'Azul marino', color: '#0b2545' },
  { id: 'verde-palma', label: 'Verde palma', color: '#4c7a4a' },
  { id: 'transparente', label: 'Transparente', color: null },
  { id: 'sd-1', label: 'Santo Domingo', color: null, image: '/fondos/fondo_sd1.png' },
  { id: 'sd-2', label: 'Zona Colonial', color: null, image: '/fondos/fondo_sd2.png' },
  { id: 'playa', label: 'Playa', color: null, image: '/fondos/fondo_playa.png' },
  { id: 'puerto-rico', label: 'Puerto Rico', color: null, image: '/fondos/fondo_pr.png' },
];
