import {
  ACCESORIOS,
  ESTILO_BASE,
  EXPRESIONES,
  FONDOS,
  FRASES,
  GAFAS,
  SOMBREROS,
} from './options';

export type Selecciones = {
  expresion: string;
  sombrero: string;
  gafas: string;
  accesorio: string;
  frase: string;
  fondo: string;
  nombre: string;
  conSelfie: boolean;
};

function find(list: { id: string; prompt: string }[], id: string) {
  return list.find((o) => o.id === id)?.prompt || '';
}

export function buildPrompt(sel: Selecciones): string {
  const partes: string[] = [ESTILO_BASE];

  const expresion = find(EXPRESIONES, sel.expresion);
  if (expresion) partes.push(expresion);

  const sombrero = find(SOMBREROS, sel.sombrero);
  if (sombrero) partes.push(sombrero);

  const gafas = find(GAFAS, sel.gafas);
  if (gafas) partes.push(gafas);

  const accesorio = find(ACCESORIOS, sel.accesorio);
  if (accesorio) partes.push(accesorio);

  const frase = find(FRASES, sel.frase);
  if (frase) partes.push(frase);

  const fondo = find(FONDOS, sel.fondo);
  if (fondo) partes.push(fondo);

  if (sel.nombre?.trim()) {
    partes.push(
      `con el nombre "${sel.nombre.trim()}" escrito de forma discreta y elegante en una etiqueta o cinta pequeña cerca del personaje`
    );
  }

  if (sel.conSelfie) {
    partes.push(
      'basado en la foto de referencia adjunta, intenta capturar rasgos generales como el color y estilo del cabello y la expresión general de la persona, transformados de forma estilizada y divertida al personaje pastelito (el parecido es interpretativo, no fotorrealista)'
    );
  }

  return partes.filter(Boolean).join('. ') + '.';
}
