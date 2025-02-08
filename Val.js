// script.js

// Récupération du canvas et du contexte
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

// Ajustement du canvas à la taille de la fenêtre
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Tableau pour stocker les cœurs
let hearts = [];

// Fonction pour créer un cœur avec des propriétés aléatoires
function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    size: Math.random() * 5 + 2,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5
  };
}

// Fonction pour dessiner un cœur en forme de cœur via des courbes de Bézier
function drawHeart(heart) {
  const x = heart.x;
  const y = heart.y;
  const size = heart.size;
  ctx.globalAlpha = heart.opacity;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size * 3, x - size * 4, y - size, x, y + size);
  ctx.bezierCurveTo(x + size * 4, y - size, x, y - size * 3, x, y);
  ctx.fill();
}

// Mise à jour et dessin des cœurs
function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.y -= heart.speed;
    drawHeart(heart);
    if (heart.y < -10) {
      hearts.splice(index, 1);
    }
  });
}

// Boucle d'animation des cœurs
function animateHearts() {
  updateHearts();
  requestAnimationFrame(animateHearts);
}
setInterval(() => {
  hearts.push(createHeart());
}, 200);
animateHearts();

// Fonction pour générer l'effet confetti
function generateConfetti() {
  let confettis = [];
  const confettiCount = 100;
  
  // Création de confettis avec des propriétés aléatoires
  for (let i = 0; i < confettiCount; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 30 + 10,
      color: "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)",
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }
  
  // Animation des confettis
  let confettiInterval = setInterval(function() {
    confettis.forEach((confetti, index) => {
      confetti.tiltAngle += confetti.tiltAngleIncremental;
      confetti.y += Math.cos(confetti.d) + 2;
      confetti.x += Math.sin(confetti.d);
      ctx.beginPath();
      ctx.lineWidth = confetti.r;
      ctx.strokeStyle = confetti.color;
      ctx.moveTo(confetti.x + confetti.tilt + confetti.r / 2, confetti.y);
      ctx.lineTo(confetti.x + confetti.tilt, confetti.y + confetti.tilt + confetti.r / 2);
      ctx.stroke();
      if (confetti.x > canvas.width || confetti.x < 0 || confetti.y > canvas.height) {
        confettis[index] = { 
          x: Math.random() * canvas.width, 
          y: -20, 
          r: confetti.r, 
          d: confetti.d, 
          color: confetti.color, 
          tilt: confetti.tilt, 
          tiltAngleIncremental: confetti.tiltAngleIncremental, 
          tiltAngle: confetti.tiltAngle 
        };
      }
    });
  }, 20);
  
  // Arrêter l'effet confetti après 3 secondes
  setTimeout(() => {
    clearInterval(confettiInterval);
  }, 3000);
}

// Génération d'un message d'amour et déclenchement de l'effet confetti
function generateMessage() {
  const messages = [
    "Tu es la plus belle chose qui me soit arrivée❤️,Chaque jour avec toi est une aventure magique 💫,Mon amour pour toi grandit à chaque instant 💖,Tu es mon plus beau cadeau de la vie ,Je t’aime plus que les étoiles dans le ciel ✨",
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  document.getElementById("message").textContent = messages[randomIndex];
  generateConfetti();
}
