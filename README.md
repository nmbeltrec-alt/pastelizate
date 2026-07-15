# Pastelízate 🥟

Mini app web para elegir y personalizar un pastelito (empanada dominicana) a partir
de una galería de stickers reales, y descargarlo como PNG.

Construida con Next.js 14 (App Router) + TypeScript + Tailwind. 100% del lado del
cliente: no usa ninguna API de IA ni backend, así que no tiene costos por uso ni
necesita configuración de claves.

## Funcionalidad

- Filtros por chips (expresión, sombrero, accesorio, frase) sobre una galería de
  25 stickers reales recortados de la hoja de referencia.
- Selección de fondo (color o transparente).
- Nombre opcional superpuesto en el sticker.
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
  components/PastelizateApp.tsx -> galería, filtros, canvas y descarga
  page.tsx, layout.tsx, globals.css
lib/
  stickers.ts -> catálogo de stickers y sus etiquetas para los filtros
public/
  stickers/ -> los 25 PNG recortados de la hoja de referencia
```

## Agregar o cambiar stickers

Cada sticker es un PNG con fondo transparente en `public/stickers/`. Para agregar
uno nuevo, guarda el archivo ahí y agrégalo al arreglo `STICKERS` en
`lib/stickers.ts`, con sus etiquetas (`expresion`, `sombrero`, `accesorio`,
`frase`) para que aparezca correctamente al filtrar.
