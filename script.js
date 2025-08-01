const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}, { passive: true });

const segments = [];
const segmentCount = 80;
const segmentLength = 12;

for (let i = 0; i < segmentCount; i++) {
  segments.push({ x: mouse.x, y: mouse.y });
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  segments[0].x += (mouse.x - segments[0].x) * 0.15;
  segments[0].y += (mouse.y - segments[0].y) * 0.15;

  for (let i = 1; i < segmentCount; i++) {
    const prev = segments[i - 1];
    const seg = segments[i];
    const dx = prev.x - seg.x;
    const dy = prev.y - seg.y;
    const angle = Math.atan2(dy, dx);
    seg.x = prev.x - Math.cos(angle) * segmentLength;
    seg.y = prev.y - Math.sin(angle) * segmentLength;
  }

  for (let i = segmentCount - 1; i >= 0; i--) {
    const seg = segments[i];
    const size = 16 * (1 - i / segmentCount);
    const hue = 200 + i * 2;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
    ctx.shadowBlur = 25;
    ctx.arc(seg.x, seg.y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
