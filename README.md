# Pastelízate 🥟

Mini app web para armar un personaje "pastelito" (empanada dominicana) generado
con IA, en un estilo 3D consistente, y descargarlo como sticker (PNG).

Construida con Next.js 14 (App Router) + TypeScript + Tailwind. Responsive y
pensada para usarse cómodamente desde el celular. La generación de imágenes usa
la API de OpenAI (`gpt-image-1`).

## Funcionalidad

- Selección por chips (sin texto libre) de: expresión, sombrero, gafas,
  accesorio en la mano, frase en banner, fondo y nombre opcional.
- Subida opcional de una selfie de referencia (el resultado es interpretativo,
  no un parecido exacto).
- El prompt final se arma automáticamente combinando el estilo visual base +
  las opciones elegidas. Es visible y copiable en pantalla.
- Loading amigable ("Pastelizándote...", "Horneando tu personaje...", etc.).
- Descarga en PNG, botón de regenerar (mismo prompt) y edición de opciones
  para generar una nueva versión.
- Manejo de errores claro si falla la API.
- Límite de generaciones por sesión/día (por defecto 8) para controlar costos,
  reforzado tanto en el cliente (localStorage) como en el servidor (cookie).

## Requisitos

- Node.js 18.18+ (recomendado 20+)
- Una API key de OpenAI con acceso a generación de imágenes (`gpt-image-1`)

## Correr en local

```bash
npm install
cp .env.example .env.local
# Edita .env.local y pon tu OPENAI_API_KEY real
npm run dev
```

Abre http://localhost:3000

## Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub/GitLab/Bitbucket.
2. En [vercel.com](https://vercel.com), haz "Add New Project" e importa el repo.
3. Framework Preset: Vercel detecta Next.js automáticamente, no hay que tocar nada.
4. En **Environment Variables**, agrega:
   - `OPENAI_API_KEY` = tu API key de OpenAI
5. Deploy. Vercel te da una URL pública (ej. `pastelizate.vercel.app`) que
   funciona perfectamente desde el navegador del celular — no requiere
   instalación, es responsive.

También puedes desplegar directo desde tu máquina con la CLI de Vercel:

```bash
npm i -g vercel
vercel
# sigue las instrucciones, y luego:
vercel env add OPENAI_API_KEY
vercel --prod
```

## Notas sobre costos y rate limiting

El límite de generaciones por sesión (`MAX_GENERACIONES_POR_SESION` en
`lib/options.ts`) es un freno básico usando cookies + localStorage. No es a
prueba de usuarios avanzados (se puede evadir borrando cookies/localStorage).
Si esta app va a recibir tráfico real, se recomienda sustituirlo por un
rate limiter respaldado por un store compartido (ej. Upstash Redis) indexado
por IP o por usuario autenticado.

## Estructura

```
app/
  api/generate/route.ts   -> endpoint que llama a la API de OpenAI
  components/             -> UI (chips, selfie uploader, app principal)
  page.tsx                -> página principal
  layout.tsx, globals.css -> layout y estilos base
lib/
  options.ts              -> catálogo de opciones (chips) y estilo base del prompt
  promptBuilder.ts         -> combina selecciones en el prompt final
  rateLimit.ts             -> lógica de límite de generaciones
```

## Personalizar el estilo visual

El estilo base (consistente en todas las generaciones) vive en
`ESTILO_BASE` dentro de `lib/options.ts`. Ajusta ese texto si quieres afinar
el look 3D/Pixar, la paleta de colores, o el tipo de repulgue.
