// Dibuja ojos, cejas, boca y mejillas estilo Pixar directamente en el canvas,
// para que la expresión encaje perfecto sobre cualquier cuerpo base (sin
// depender de recortes de fotos que no alinearían con distintas cabezas).

export type FaceParams = {
  cx: number; // centro X de la cara en px del canvas
  cy: number; // centro Y de la cara en px del canvas
  w: number; // ancho de referencia de la cara en px
};

const EYE_DARK = '#2a1a12';
const BLUSH = 'rgba(224, 122, 122, 0.55)';

function drawBlush(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number) {
  const rx = w * 0.16;
  const ry = w * 0.09;
  const dx = w * 0.34;
  const dy = w * 0.12;
  ctx.fillStyle = BLUSH;
  ctx.beginPath();
  ctx.ellipse(cx - dx, cy + dy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + dx, cy + dy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawEyeOpen(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, big = false) {
  const rr = big ? r * 1.18 : r;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(x, y, rr * 0.72, rr, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = EYE_DARK;
  ctx.beginPath();
  ctx.ellipse(x + rr * 0.06, y + rr * 0.12, rr * 0.5, rr * 0.62, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(x - rr * 0.16, y - rr * 0.18, rr * 0.16, rr * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawEyeWink(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.strokeStyle = EYE_DARK;
  ctx.lineWidth = r * 0.32;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(x, y + r * 0.1, r * 0.62, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
}

function drawEyeClosed(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.strokeStyle = EYE_DARK;
  ctx.lineWidth = r * 0.26;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(x, y, r * 0.58, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
}

function drawHeartEye(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.fillStyle = '#c23b4a';
  ctx.beginPath();
  const s = r * 0.9;
  ctx.moveTo(x, y + s * 0.6);
  ctx.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.5, y - s, x, y - s * 0.25);
  ctx.bezierCurveTo(x + s * 0.5, y - s, x + s, y - s * 0.4, x, y + s * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.ellipse(x - s * 0.28, y - s * 0.25, s * 0.14, s * 0.18, -0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawEyebrow(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, tilt: number, raised = false) {
  ctx.strokeStyle = '#3a2417';
  ctx.lineWidth = w * 0.22;
  ctx.lineCap = 'round';
  ctx.beginPath();
  const yy = raised ? y - w * 0.55 : y - w * 0.32;
  ctx.moveTo(x - w * 0.55, yy + tilt);
  ctx.quadraticCurveTo(x, yy - w * 0.35, x + w * 0.55, yy - tilt);
  ctx.stroke();
}

function drawMouthSmile(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, big = false) {
  const mw = big ? w * 0.62 : w * 0.46;
  const mh = big ? w * 0.42 : w * 0.26;
  ctx.fillStyle = '#5c1523';
  ctx.beginPath();
  ctx.moveTo(x - mw / 2, y);
  ctx.quadraticCurveTo(x, y + mh, x + mw / 2, y);
  ctx.quadraticCurveTo(x, y + mh * 0.55, x - mw / 2, y);
  ctx.fill();
  if (big) {
    ctx.fillStyle = '#e88a9a';
    ctx.beginPath();
    ctx.ellipse(x, y + mh * 0.42, mw * 0.28, mh * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMouthSmileSoft(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  ctx.strokeStyle = '#5c1523';
  ctx.lineWidth = w * 0.06;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(x, y - w * 0.05, w * 0.28, Math.PI * 0.15, Math.PI * 0.85);
  ctx.stroke();
}

function drawMouthO(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  ctx.fillStyle = '#5c1523';
  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.14, w * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function drawFace(
  ctx: CanvasRenderingContext2D,
  expresionId: string,
  { cx, cy, w }: FaceParams
) {
  const eyeR = w * 0.15;
  const eyeDx = w * 0.24;
  const eyeY = cy;
  const mouthY = cy + w * 0.34;

  drawBlush(ctx, cx, cy, w);

  switch (expresionId) {
    case 'guino':
      drawEyebrow(ctx, cx - eyeDx, eyeY, w * 0.26, 2);
      drawEyebrow(ctx, cx + eyeDx, eyeY, w * 0.26, -2, true);
      drawEyeOpen(ctx, cx - eyeDx, eyeY, eyeR);
      drawEyeWink(ctx, cx + eyeDx, eyeY, eyeR);
      drawMouthSmile(ctx, cx, mouthY, w);
      break;
    case 'sorpresa':
      drawEyebrow(ctx, cx - eyeDx, eyeY, w * 0.26, 2, true);
      drawEyebrow(ctx, cx + eyeDx, eyeY, w * 0.26, -2, true);
      drawEyeOpen(ctx, cx - eyeDx, eyeY, eyeR, true);
      drawEyeOpen(ctx, cx + eyeDx, eyeY, eyeR, true);
      drawMouthO(ctx, cx, mouthY, w);
      break;
    case 'enamorado':
      drawEyebrow(ctx, cx - eyeDx, eyeY, w * 0.26, 2);
      drawEyebrow(ctx, cx + eyeDx, eyeY, w * 0.26, -2);
      drawHeartEye(ctx, cx - eyeDx, eyeY, eyeR);
      drawHeartEye(ctx, cx + eyeDx, eyeY, eyeR);
      drawMouthSmile(ctx, cx, mouthY, w);
      break;
    case 'relax':
      drawEyebrow(ctx, cx - eyeDx, eyeY, w * 0.24, 1);
      drawEyebrow(ctx, cx + eyeDx, eyeY, w * 0.24, -1);
      drawEyeClosed(ctx, cx - eyeDx, eyeY, eyeR);
      drawEyeClosed(ctx, cx + eyeDx, eyeY, eyeR);
      drawMouthSmileSoft(ctx, cx, mouthY, w);
      break;
    case 'feliz':
    default:
      drawEyebrow(ctx, cx - eyeDx, eyeY, w * 0.26, 2);
      drawEyebrow(ctx, cx + eyeDx, eyeY, w * 0.26, -2);
      drawEyeOpen(ctx, cx - eyeDx, eyeY, eyeR);
      drawEyeOpen(ctx, cx + eyeDx, eyeY, eyeR);
      drawMouthSmile(ctx, cx, mouthY, w, true);
      break;
  }
}
