function showCertificate() {
  document.getElementById('introScreen').classList.add('hidden');
  document.getElementById('certificateContainer').classList.remove('hidden');
  launchConfetti();
}

function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetti = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      r: random(2, 6),
      d: random(1, 3),
      color: `hsl(${random(180, 260)}, 100%, 60%)`,
      tilt: random(-10, 10),
      tiltAngle: 0,
      tiltAngleIncrement: random(0.05, 0.12)
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();
    });
    updateConfetti();
    requestAnimationFrame(drawConfetti);
  }

  function updateConfetti() {
    confetti.forEach(c => {
      c.y += c.d;
      c.tiltAngle += c.tiltAngleIncrement;
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = random(0, canvas.width);
      }
    });
  }

  drawConfetti();
}