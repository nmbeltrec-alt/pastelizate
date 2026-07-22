// Piezas dibujadas a mano en canvas (vectorial), con la paleta de
// Pastelízate: vino, dorado y marino. Nada de recortes de fotos aquí —
// así se ven limpios y encajan perfecto en cualquier cuerpo base.

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
