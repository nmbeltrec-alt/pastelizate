export type ChipOption = {
  id: string;
  label: string;
  emoji?: string;
  prompt: string; // texto que se inyecta en el prompt final si está seleccionado
};

export const EXPRESIONES: ChipOption[] = [
  {
    id: 'feliz',
    label: 'Feliz',
    emoji: '😄',
    prompt: 'expresión súper feliz, sonrisa amplia y ojos brillantes de alegría',
  },
  {
    id: 'guino',
    label: 'Guiño coqueto',
    emoji: '😉',
    prompt: 'expresión coqueta haciendo un guiño con un ojo, sonrisa pícara de lado',
  },
  {
    id: 'sorpresa',
    label: 'Sorpresa',
    emoji: '😲',
    prompt: 'expresión de sorpresa, ojos y boca bien abiertos, cejas levantadas',
  },
  {
    id: 'enamorado',
    label: 'Enamorado',
    emoji: '😍',
    prompt: 'expresión enamorada, con ojos en forma de corazón y mejillas sonrojadas',
  },
  {
    id: 'relax',
    label: 'Relax',
    emoji: '😌',
    prompt: 'expresión relajada y serena, ojos entrecerrados, sonrisa suave y tranquila',
  },
];

export const SOMBREROS: ChipOption[] = [
  { id: 'ninguno', label: 'Ninguno', prompt: '' },
  {
    id: 'panama',
    label: 'Panamá de paja',
    emoji: '👒',
    prompt: 'usando un sombrero panamá de paja tejida con cinta vino',
  },
  {
    id: 'gorra-rd',
    label: 'Gorra "RD"',
    emoji: '🧢',
    prompt: 'usando una gorra deportiva vino con las letras "RD" bordadas al frente',
  },
  {
    id: 'pamela',
    label: 'Pamela con lazo',
    emoji: '👒',
    prompt: 'usando una pamela elegante de ala ancha con un lazo vino',
  },
  {
    id: 'panuelo',
    label: 'Pañuelo/bandana',
    emoji: '🧣',
    prompt: 'usando un pañuelo tipo bandana vino y dorado amarrado en la cabeza',
  },
];

export const GAFAS: ChipOption[] = [
  { id: 'ninguna', label: 'Ninguna', prompt: '' },
  {
    id: 'aviador',
    label: 'De sol aviador',
    emoji: '😎',
    prompt: 'usando gafas de sol estilo aviador con marco dorado',
  },
  {
    id: 'corazon',
    label: 'En forma de corazón',
    emoji: '💗',
    prompt: 'usando gafas con marco en forma de corazón',
  },
];

export const ACCESORIOS: ChipOption[] = [
  { id: 'ninguno', label: 'Ninguno', prompt: '' },
  {
    id: 'bandera-rd',
    label: 'Bandera RD',
    emoji: '🇩🇴',
    prompt: 'sosteniendo con orgullo una pequeña bandera de República Dominicana',
  },
  {
    id: 'bandera-pr',
    label: 'Bandera PR',
    emoji: '🇵🇷',
    prompt: 'sosteniendo con orgullo una pequeña bandera de Puerto Rico',
  },
  {
    id: 'coco',
    label: 'Coco con pajita',
    emoji: '🥥',
    prompt: 'sosteniendo un coco fresco con una pajita rosada',
  },
  {
    id: 'camara',
    label: 'Cámara vintage',
    emoji: '📷',
    prompt: 'sosteniendo una cámara fotográfica vintage',
  },
  {
    id: 'tambora',
    label: 'Tambora dominicana',
    emoji: '🥁',
    prompt: 'tocando una tambora dominicana tradicional',
  },
  {
    id: 'banner',
    label: 'Bandera/banner con frase',
    emoji: '🚩',
    prompt: 'sosteniendo un banner de tela ondeante con una frase escrita',
  },
];

export const FRASES: ChipOption[] = [
  { id: 'ninguna', label: 'Ninguna', prompt: '' },
  {
    id: 'hecho-con-amor',
    label: 'Hecho con amor',
    prompt:
      'con un letrero pequeño en forma de corazón de madera debajo del personaje que dice "HECHO CON AMOR"',
  },
  {
    id: 'dos-islas',
    label: 'De dos islas, un mismo sabor',
    prompt:
      'con un letrero de madera debajo del personaje que dice "DE DOS ISLAS, UN MISMO SABOR"',
  },
  {
    id: 'bonita',
    label: 'Bonita por dentro y por fuera',
    prompt:
      'con un banner de tela debajo del personaje que dice "BONITA POR DENTRO Y POR FUERA"',
  },
  {
    id: 'good-times',
    label: 'Good times',
    prompt: 'con una gorra o letrero que dice "GOOD TIMES" cerca del personaje',
  },
];

export const FONDOS: ChipOption[] = [
  { id: 'crema', label: 'Crema', prompt: 'fondo de estudio neutro color crema suave' },
  {
    id: 'rosa',
    label: 'Rosa pastel',
    prompt: 'fondo de estudio en rosa pastel suave',
  },
  {
    id: 'marino',
    label: 'Azul marino',
    prompt: 'fondo de estudio en azul marino elegante',
  },
  {
    id: 'verde-palma',
    label: 'Verde palma',
    prompt: 'fondo de estudio en verde palma tropical suave',
  },
];

export const ESTILO_BASE = `Personaje 3D renderizado, antropomórfico, con forma de pastelito/empanada dominicana dorada recién horneada, con el borde repulgado/trenzado característico del repulgue hecho a mano. Ojos grandes y expresivos estilo Pixar, mejillas con blush rosado. Brazos y piernas delgados tipo "stick figure" con manos y pies pequeños y redondeados. Iluminación de estudio suave, acabado tipo render 3D de alta calidad (no plano, no vectorial), con textura visible de masa horneada y dorada. Paleta de colores acentuada en vino/granate, azul marino y dorado, con guiños sutiles a las banderas de República Dominicana y Puerto Rico. Composición centrada, estilo mascota/personaje de marca, tono alegre y cálido. Imagen cuadrada, personaje de cuerpo completo centrado, sin texto adicional salvo el indicado explícitamente.`;

export const MAX_GENERACIONES_POR_SESION = 8;
