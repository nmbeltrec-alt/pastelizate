// Catálogo de piezas para el armador de Pastelízate.
// Las expresiones son recortes reales de la hoja de referencia (con bordes
// suavizados para que encajen en cualquier base). Sombrero, gafas, banderas,
// bate y coco se dibujan de forma vectorial en canvas (ver lib/drawPieces.ts).

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

export type Expresion = {
  id: string;
  label: string;
  emoji: string;
  file: string | null; // null = enamorado, se dibuja con ojos de corazón sobre la foto feliz
};

export const EXPRESIONES: Expresion[] = [
  { id: 'feliz', label: 'Feliz', emoji: '😄', file: '/faces/face_feliz.png' },
  { id: 'guino', label: 'Guiño coqueto', emoji: '😉', file: '/faces/face_guino.png' },
  { id: 'sorpresa', label: 'Sorpresa', emoji: '😲', file: '/faces/face_sorpresa.png' },
  { id: 'enamorado', label: 'Enamorado', emoji: '😍', file: '/faces/face_feliz.png' },
  { id: 'relax', label: 'Relax', emoji: '😌', file: '/faces/face_relax.png' },
];

export type PiezaDibujada = {
  id: string;
  label: string;
  emoji: string;
};

export const SOMBREROS: PiezaDibujada[] = [
  { id: 'ninguno', label: 'Ninguno', emoji: '' },
  { id: 'tropical', label: 'Sombrero tropical', emoji: '👒' },
];

export const GAFAS: PiezaDibujada[] = [
  { id: 'ninguna', label: 'Ninguna', emoji: '' },
  { id: 'sol', label: 'De sol', emoji: '😎' },
];

export const ACCESORIOS: PiezaDibujada[] = [
  { id: 'ninguno', label: 'Ninguno', emoji: '' },
  { id: 'bandera-rd', label: 'Bandera RD', emoji: '🇩🇴' },
  { id: 'bandera-pr', label: 'Bandera PR', emoji: '🇵🇷' },
  { id: 'coco', label: 'Coco', emoji: '🥥' },
  { id: 'bate', label: 'Bate', emoji: '⚾' },
];

export const FRASES: PiezaDibujada[] = [
  { id: 'ninguna', label: 'Ninguna', emoji: '' },
  { id: 'hecho-con-amor', label: 'Hecho con amor', emoji: '' },
  { id: 'dos-islas', label: 'De dos islas', emoji: '' },
  { id: 'bonita', label: 'Bonita por dentro', emoji: '' },
];

export const FRASE_IMG: Record<string, string> = {
  'hecho-con-amor': '/pieces/final_hecho_amor.png',
  'dos-islas': '/pieces/final_dos_islas.png',
  bonita: '/pieces/final_bonita.png',
};

export const FONDOS = [
  { id: 'crema', label: 'Crema', color: '#f8efdc' },
  { id: 'rosa', label: 'Rosa pastel', color: '#f6c9d6' },
  { id: 'marino', label: 'Azul marino', color: '#0b2545' },
  { id: 'verde-palma', label: 'Verde palma', color: '#4c7a4a' },
  { id: 'transparente', label: 'Transparente', color: null as string | null },
] as const;
