export type Sticker = {
  id: string;
  file: string; // path under /public/stickers
  label: string;
  tags: {
    expresion?: string;
    sombrero?: string;
    gafas?: string;
    accesorio?: string;
    frase?: string;
  };
};

// Catálogo de stickers reales, recortados de la hoja de referencia.
export const STICKERS: Sticker[] = [
  { id: 'sticker_00', file: '/stickers/sticker_00.png', label: 'Panamá + bandera RD', tags: { sombrero: 'panama', accesorio: 'bandera-rd', expresion: 'feliz' } },
  { id: 'sticker_01', file: '/stickers/sticker_01.png', label: 'Playa con coco', tags: { accesorio: 'coco', gafas: 'sol', expresion: 'relax' } },
  { id: 'sticker_02', file: '/stickers/sticker_02.png', label: 'Panamá + bandera RD (saludo)', tags: { sombrero: 'panama', accesorio: 'bandera-rd', expresion: 'feliz' } },
  { id: 'sticker_03', file: '/stickers/sticker_03.png', label: 'Pareja bailando', tags: { expresion: 'feliz', accesorio: 'ninguno' } },
  { id: 'sticker_04', file: '/stickers/sticker_04.png', label: 'Panamá + pañuelo + bandera RD', tags: { sombrero: 'panama', accesorio: 'bandera-rd', expresion: 'guino' } },
  { id: 'sticker_05', file: '/stickers/sticker_05.png', label: 'Vestido típico bailando', tags: { expresion: 'feliz', accesorio: 'ninguno' } },
  { id: 'sticker_06', file: '/stickers/sticker_06.png', label: 'Coco con gafas de sol', tags: { accesorio: 'coco', gafas: 'sol', expresion: 'feliz' } },
  { id: 'sticker_07', file: '/stickers/sticker_07.png', label: 'Flor de hibisco', tags: { accesorio: 'flor', expresion: 'feliz' } },
  { id: 'sticker_08', file: '/stickers/sticker_08.png', label: 'Cámara vintage', tags: { accesorio: 'camara', expresion: 'guino' } },
  { id: 'sticker_09', file: '/stickers/sticker_09.png', label: 'Gorra RD + maracas', tags: { sombrero: 'gorra-rd', accesorio: 'maracas', expresion: 'guino' } },
  { id: 'sticker_10', file: '/stickers/sticker_10.png', label: 'Relax en playa con abanico', tags: { gafas: 'sol', expresion: 'relax' } },
  { id: 'sticker_11', file: '/stickers/sticker_11.png', label: 'Hecho con amor', tags: { frase: 'hecho-con-amor', expresion: 'feliz' } },
  { id: 'sticker_12', file: '/stickers/sticker_12.png', label: 'Gorra Good Times', tags: { sombrero: 'gorra', frase: 'good-times', expresion: 'feliz' } },
  { id: 'sticker_13', file: '/stickers/sticker_13.png', label: 'Patineta', tags: { accesorio: 'skate', expresion: 'feliz' } },
  { id: 'sticker_14', file: '/stickers/sticker_14.png', label: 'Sombrero de paja elegante', tags: { sombrero: 'paja', expresion: 'feliz' } },
  { id: 'sticker_15', file: '/stickers/sticker_15.png', label: 'Plato de comida criolla', tags: { accesorio: 'comida', expresion: 'feliz' } },
  { id: 'sticker_16', file: '/stickers/sticker_16.png', label: 'De dos islas, un mismo sabor', tags: { frase: 'dos-islas', expresion: 'guino' } },
  { id: 'sticker_17', file: '/stickers/sticker_17.png', label: 'Bonita por dentro y por fuera', tags: { frase: 'bonita', expresion: 'feliz' } },
  { id: 'sticker_18', file: '/stickers/sticker_18.png', label: 'Audífonos bailando', tags: { accesorio: 'audifonos', expresion: 'relax' } },
  { id: 'sticker_19', file: '/stickers/sticker_19.png', label: 'Bandera PR + flor', tags: { accesorio: 'bandera-pr', expresion: 'guino' } },
  { id: 'sticker_20', file: '/stickers/sticker_20.png', label: 'Café para empezar el día', tags: { accesorio: 'cafe', expresion: 'feliz' } },
  { id: 'sticker_21', file: '/stickers/sticker_21.png', label: 'Equipo PR & RD', tags: { expresion: 'feliz', accesorio: 'ninguno' } },
  { id: 'sticker_22', file: '/stickers/sticker_22.png', label: 'Selfie con el teléfono', tags: { accesorio: 'telefono', expresion: 'guino' } },
  { id: 'sticker_23', file: '/stickers/sticker_23.png', label: 'Pañuelo + gafas de sol', tags: { sombrero: 'panuelo', gafas: 'sol', expresion: 'feliz' } },
  { id: 'sticker_24', file: '/stickers/sticker_24.png', label: 'Sombrero de paja + tambora', tags: { sombrero: 'paja', accesorio: 'tambora', expresion: 'feliz' } },
];

export const FILTROS = {
  expresion: [
    { id: 'todas', label: 'Todas' },
    { id: 'feliz', label: 'Feliz 😄' },
    { id: 'guino', label: 'Guiño 😉' },
    { id: 'relax', label: 'Relax 😌' },
  ],
  sombrero: [
    { id: 'todos', label: 'Todos' },
    { id: 'panama', label: 'Panamá' },
    { id: 'gorra-rd', label: 'Gorra RD' },
    { id: 'gorra', label: 'Gorra' },
    { id: 'paja', label: 'Paja' },
    { id: 'panuelo', label: 'Pañuelo' },
  ],
  accesorio: [
    { id: 'todos', label: 'Todos' },
    { id: 'bandera-rd', label: 'Bandera RD' },
    { id: 'bandera-pr', label: 'Bandera PR' },
    { id: 'coco', label: 'Coco' },
    { id: 'camara', label: 'Cámara' },
    { id: 'tambora', label: 'Tambora' },
    { id: 'maracas', label: 'Maracas' },
    { id: 'flor', label: 'Flor' },
    { id: 'comida', label: 'Comida' },
    { id: 'cafe', label: 'Café' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'skate', label: 'Patineta' },
    { id: 'audifonos', label: 'Audífonos' },
  ],
  frase: [
    { id: 'todas', label: 'Todas' },
    { id: 'hecho-con-amor', label: 'Hecho con amor' },
    { id: 'dos-islas', label: 'De dos islas' },
    { id: 'bonita', label: 'Bonita por dentro' },
    { id: 'good-times', label: 'Good times' },
  ],
} as const;

export const FONDOS = [
  { id: 'crema', label: 'Crema', color: '#f8efdc' },
  { id: 'rosa', label: 'Rosa pastel', color: '#f6c9d6' },
  { id: 'marino', label: 'Azul marino', color: '#0b2545' },
  { id: 'verde-palma', label: 'Verde palma', color: '#4c7a4a' },
  { id: 'transparente', label: 'Transparente', color: null },
] as const;
