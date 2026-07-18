import { useEffect, useRef } from "react";

export default function CoffeeBeansBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 20;

    class Particle {
      x = 0;
      y = 0;
      size = 0;
      height = 0;
      speed = 0;
      rotation = 0;
      rotSpeed = 0;
      opacity = 0;
      type: "bean" | "crumb" = "bean";

      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : -50;
        this.size = Math.random() * 12 + 10;
        this.height = this.size * 1.45;
        this.speed = Math.random() * 0.4 + 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.003;
        this.opacity = Math.random() * 0.35 + 0.12;
        this.type = Math.random() > 0.25 ? "bean" : "crumb";
      }

      update() {
        this.y += this.speed;
        this.rotation += this.rotSpeed;
        this.x += Math.sin(this.y * 0.005) * 0.15;

        if (this.y > h + 50) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;

        if (this.type === "bean") {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);

          // Bean Outer Base
          ctx.fillStyle = "#3E2723";
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size / 2, this.height / 2, 0, 0, 2 * Math.PI);
          ctx.fill();

          // Shadow depth
          ctx.fillStyle = "#271714";
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size / 3, this.height / 2.2, 0, 0, 2 * Math.PI);
          ctx.fill();

          // Crease line
          ctx.strokeStyle = "#D4A373";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-this.size / 14, -this.height / 2.2);
          ctx.bezierCurveTo(
            this.size / 6,
            -this.height / 4,
            -this.size / 6,
            this.height / 4,
            this.size / 14,
            this.height / 2.2
          );
          ctx.stroke();

          ctx.restore();
        } else {
          // Crumb
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);

          ctx.fillStyle = "#C68E5B";
          ctx.beginPath();
          ctx.moveTo(-4, -4);
          ctx.lineTo(4, -5);
          ctx.lineTo(6, 4);
          ctx.lineTo(-3, 6);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }
      }
    }

    const init = () => {
      w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    init();

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animIdRef.current = requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      init();
      loop();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  return (
    <div className="hero-canvas-wrapper">
      <canvas ref={canvasRef} id="floating-beans-canvas" />
    </div>
  );
}
