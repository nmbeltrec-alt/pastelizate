# Pastelízate 🥟

Armador web para construir un pastelito (empanada dominicana) pieza por pieza y
descargarlo como sticker PNG.

Construida con Next.js 14 (App Router) + TypeScript + Tailwind. 100% del lado del
cliente: no usa ninguna API de IA ni backend, así que no tiene costos por uso ni
necesita configuración de claves.

## Funcionalidad

- 3 cuerpos base (fotos reales, fondo removido): Saludando, Bailando, Paz y amor.
- Expresiones faciales: recortes reales de la hoja de referencia (feliz, guiño,
  sorpresa, relax) con bordes suavizados y desenfoque radial para que encajen sin
  costuras sobre cualquier base. "Enamorado" combina la foto feliz con ojos de
  corazón dibujados encima.
- Sombrero, gafas, banderas (RD y PR), bate y coco: dibujados 100% de forma
  vectorial en `<canvas>` (no son recortes de fotos), para que escalen y se
  posicionen bien sobre cualquier cuerpo base sin artefactos de recorte.
- Frases opcionales, selección de fondo (color o transparente) y nombre opcional.
- Todo se compone en un `<canvas>` en el navegador y se descarga como PNG con un
  clic — no hay llamadas a servidores externos, no hay límites de uso ni costos.

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. En vercel.com, "Add New Project" e importa el repo.
3. Vercel detecta Next.js automáticamente. No hace falta configurar ninguna
   variable de entorno.
4. Deploy. Listo — funciona en cualquier navegador, incluido el celular.

## Estructura

```
app/
  components/PastelizateApp.tsx -> UI de selección + composición en canvas + descarga
lib/
  pieces.ts      -> catálogo de bases, expresiones, sombreros, gafas, accesorios, frases, fondos
  drawPieces.ts  -> funciones que dibujan sombrero, gafas, banderas, bate y coco en canvas
public/
  bases/  -> 3 cuerpos base (PNG, fondo removido)
  faces/  -> expresiones faciales recortadas de la hoja de referencia
  pieces/ -> banners de frase
```

## Notas sobre las expresiones

"Sorpresa" no tiene un recorte de referencia con ojos/boca genuinamente
sorprendidos, así que usa la mejor aproximación disponible en la hoja original.
"Enamorado" es un híbrido: la foto de la expresión feliz con ojos de corazón
dibujados encima. Ambas quedaron bien integradas visualmente, pero no son un
recorte 1:1 de una expresión "sorprendida" o "enamorada" real.
