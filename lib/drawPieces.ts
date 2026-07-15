// Accesorios dibujados a mano en canvas (vectorial), con la paleta de
// Pastelízate: vino, dorado y marino. Nada de recortes de fotos aquí —
// así se ven limpios y encajan perfecto en cualquier cuerpo base.

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---------- Gafas de sol ----------
export function drawGafasSol(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number
) {
  const eyeDx = w * 0.24;
  const lensR = w * 0.19;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = w * 0.03;

  // puente
  ctx.strokeStyle = '#1c1c1c';
  ctx.lineWidth = w * 0.045;
  ctx.beginPath();
  ctx.moveTo(cx - eyeDx + lensR * 0.7, cy - lensR * 0.15);
  ctx.lineTo(cx + eyeDx - lensR * 0.7, cy - lensR * 0.15);
  ctx.stroke();

  // patillas
  ctx.beginPath();
  ctx.moveTo(cx - eyeDx - lensR * 0.95, cy - lensR * 0.1);
  ctx.lineTo(cx - eyeDx - lensR * 1.6, cy - lensR * 0.35);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + eyeDx + lensR * 0.95, cy - lensR * 0.1);
  ctx.lineTo(cx + eyeDx + lensR * 1.6, cy - lensR * 0.35);
  ctx.stroke();

  for (const dx of [-eyeDx, eyeDx]) {
    const lensGrad = ctx.createLinearGradient(
      cx + dx - lensR,
      cy - lensR,
      cx + dx + lensR,
      cy + lensR
    );
    lensGrad.addColorStop(0, '#3a3a3a');
    lensGrad.addColorStop(1, '#0d0d0d');
    ctx.fillStyle = lensGrad;
    ctx.beginPath();
    ctx.ellipse(cx + dx, cy, lensR, lensR * 0.86, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1c1c1c';
    ctx.lineWidth = w * 0.035;
    ctx.stroke();
    // brillo
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    ctx.ellipse(
      cx + dx - lensR * 0.35,
      cy - lensR * 0.3,
      lensR * 0.22,
      lensR * 0.14,
      -0.5,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.restore();
}

// ---------- Bandera de República Dominicana ----------
export function drawBanderaRD(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number // ancho de referencia
) {
  const flagW = size;
  const flagH = size * 0.66;
  const poleH = flagH * 1.5;

  ctx.save();
  ctx.shadowColor = 'rgba(58,13,22,0.25)';
  ctx.shadowBlur = size * 0.04;

  // asta
  ctx.strokeStyle = '#7a5230';
  ctx.lineWidth = size * 0.045;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + flagH + poleH * 0.35);
  ctx.lineTo(x, y - poleH * 0.65);
  ctx.stroke();

  const fx = x;
  const fy = y - poleH * 0.65;
  const cw = flagW * 0.22; // ancho de la cruz blanca

  // fondo: azul (arriba-izq, abajo-der) y rojo (arriba-der, abajo-izq)
  ctx.fillStyle = '#002d62';
  ctx.fillRect(fx, fy, flagW / 2 - cw / 2, flagH / 2 - cw / 2);
  ctx.fillRect(fx + flagW / 2 + cw / 2, fy + flagH / 2 + cw / 2, flagW / 2 - cw / 2, flagH / 2 - cw / 2);

  ctx.fillStyle = '#ce1126';
  ctx.fillRect(fx + flagW / 2 + cw / 2, fy, flagW / 2 - cw / 2, flagH / 2 - cw / 2);
  ctx.fillRect(fx, fy + flagH / 2 + cw / 2, flagW / 2 - cw / 2, flagH / 2 - cw / 2);

  // cruz blanca
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(fx + flagW / 2 - cw / 2, fy, cw, flagH);
  ctx.fillRect(fx, fy + flagH / 2 - cw / 2, flagW, cw);

  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(fx, fy, flagW, flagH);
  ctx.restore();
}

// ---------- Bandera de Puerto Rico ----------
export function drawBanderaPR(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  const flagW = size;
  const flagH = size * 0.66;
  const poleH = flagH * 1.5;

  ctx.save();
  ctx.shadowColor = 'rgba(58,13,22,0.25)';
  ctx.shadowBlur = size * 0.04;

  ctx.strokeStyle = '#7a5230';
  ctx.lineWidth = size * 0.045;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + flagH + poleH * 0.35);
  ctx.lineTo(x, y - poleH * 0.65);
  ctx.stroke();

  const fx = x;
  const fy = y - poleH * 0.65;
  const stripeH = flagH / 5;

  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#ce1126' : '#ffffff';
    ctx.fillRect(fx, fy + i * stripeH, flagW, stripeH);
  }

  // triángulo azul
  ctx.fillStyle = '#0050a0';
  ctx.beginPath();
  ctx.moveTo(fx, fy);
  ctx.lineTo(fx + flagW * 0.42, fy + flagH / 2);
  ctx.lineTo(fx, fy + flagH);
  ctx.closePath();
  ctx.fill();

  // estrella blanca
  drawStar(ctx, fx + flagW * 0.16, fy + flagH / 2, flagH * 0.16, '#ffffff');

  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(fx, fy, flagW, flagH);
  ctx.restore();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI / 5) * 2 * i - Math.PI / 2;
    const angle2 = angle + Math.PI / 5;
    const xOuter = cx + r * Math.cos(angle);
    const yOuter = cy + r * Math.sin(angle);
    const xInner = cx + r * 0.42 * Math.cos(angle2);
    const yInner = cy + r * 0.42 * Math.sin(angle2);
    if (i === 0) ctx.moveTo(xOuter, yOuter);
    else ctx.lineTo(xOuter, yOuter);
    ctx.lineTo(xInner, yInner);
  }
  ctx.closePath();
  ctx.fill();
}

// ---------- Coco ----------
export function drawCoco(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  const r = size * 0.5;

  ctx.save();
  ctx.shadowColor = 'rgba(58,13,22,0.25)';
  ctx.shadowBlur = size * 0.05;
  ctx.shadowOffsetY = size * 0.03;

  const grad = ctx.createRadialGradient(
    x - r * 0.35,
    y - r * 0.35,
    r * 0.2,
    x,
    y,
    r
  );
  grad.addColorStop(0, '#8a6a3f');
  grad.addColorStop(1, '#5a3f22');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.92, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // textura de fibra
  ctx.strokeStyle = 'rgba(40,26,12,0.35)';
  ctx.lineWidth = size * 0.012;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.ellipse(x, y, r * 0.9, r * 0.8, (i * Math.PI) / 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  // tres "ojos" característicos arriba
  ctx.fillStyle = 'rgba(30,20,10,0.55)';
  for (const a of [-0.9, -0.5, -0.1]) {
    ctx.beginPath();
    ctx.ellipse(
      x + Math.cos(a) * r * 0.32,
      y - r * 0.55 + Math.sin(a) * r * 0.18,
      r * 0.09,
      r * 0.07,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // pajita rosada
  ctx.strokeStyle = '#e88aa0';
  ctx.lineWidth = size * 0.05;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x + r * 0.1, y - r * 0.7);
  ctx.lineTo(x + r * 0.35, y - r * 1.35);
  ctx.stroke();

  // hojita
  ctx.fillStyle = '#4c7a4a';
  ctx.beginPath();
  ctx.moveTo(x - r * 0.05, y - r * 0.95);
  ctx.quadraticCurveTo(x - r * 0.55, y - r * 1.15, x - r * 0.15, y - r * 1.45);
  ctx.quadraticCurveTo(x + r * 0.15, y - r * 1.1, x - r * 0.05, y - r * 0.95);
  ctx.fill();
}

export type AccesorioId = 'ninguno' | 'bandera-rd' | 'bandera-pr' | 'coco';

export function drawAccesorio(
  ctx: CanvasRenderingContext2D,
  id: AccesorioId,
  x: number,
  y: number,
  size: number
) {
  switch (id) {
    case 'bandera-rd':
      drawBanderaRD(ctx, x, y, size);
      break;
    case 'bandera-pr':
      drawBanderaPR(ctx, x, y, size);
      break;
    case 'coco':
      drawCoco(ctx, x, y, size);
      break;
    default:
      break;
  }
}
