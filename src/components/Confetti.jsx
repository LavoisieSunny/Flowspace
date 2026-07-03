import { useEffect, useRef } from "react";

export default function Confetti({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Resize canvas to window dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = ["#3B82F6", "#EC4899", "#10B981", "#8B5CF6", "#FEF08A", "#EF4444"];
    const particles = [];

    // Spawn 150 celebratory particles from the bottom of the screen
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height + 20,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 16,
        speedY: -Math.random() * 14 - 10,
        gravity: 0.28,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = false;

      particles.forEach((p) => {
        p.speedY += p.gravity;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Render particle if within window boundaries
        if (p.y < canvas.height + 50) {
          activeParticles = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (activeParticles) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100] no-print" />;
}
