// Partikel interaktif pada canvas latar belakang
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 60;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomColor() {
  return `rgba(${180+Math.floor(Math.random()*60)},${180+Math.floor(Math.random()*60)},${220+Math.floor(Math.random()*35)},0.7)`;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1.5 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      color: randomColor()
    });
  }
}
createParticles();
window.addEventListener('resize', createParticles);

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    // Garis ke partikel lain
    for (let j = i + 1; j < particles.length; j++) {
      let q = particles[j];
      let dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = 'rgba(120,130,255,0.13)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
}

function animateParticles() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Interaksi mouse: partikel mendekat ke kursor
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let dist = Math.hypot(p.x - mx, p.y - my);
    if (dist < 100) {
      p.x += (mx - p.x) * 0.03;
      p.y += (my - p.y) * 0.03;
    }
  }
});

// Animasi fade-in saat scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('section');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 80;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Toggle mode gelap
const toggleDark = document.getElementById('toggle-dark');
toggleDark.addEventListener('click', function() {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')) {
    toggleDark.textContent = '☀️ Mode Terang';
  } else {
    toggleDark.textContent = '🌙 Mode Gelap';
  }
});
