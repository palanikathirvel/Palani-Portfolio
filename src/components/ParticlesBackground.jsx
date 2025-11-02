import { useCallback, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const NeuralNetworkCanvas = ({ variant }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Neural network particles
    const particles = [];
    const particleCount = variant === "minimal" ? 20 : variant === "hero" ? 50 : 35;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 3 + 2;
        this.color = ["#60a5fa", "#a855f7", "#ec4899"][Math.floor(Math.random() * 3)];
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        this.pulsePhase += 0.02;
      }

      draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 1;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6 + Math.sin(this.pulsePhase) * 0.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId;
    const animate = () => {
      // Clear with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(96, 165, 250, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.3;
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

const ParticlesBackground = ({ variant = "default" }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const getParticlesConfig = () => {
    const baseConfig = {
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: { value: ["#60a5fa", "#a855f7", "#ec4899"] },
        links: {
          color: "#60a5fa",
          distance: 150,
          enable: variant !== "minimal",
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: variant === "hero" ? 2 : 1,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: variant === "minimal" ? 40 : variant === "hero" ? 80 : 60,
        },
        opacity: {
          value: variant === "minimal" ? 0.3 : 0.5,
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: variant === "hero" ? 4 : 3 },
        },
      },
      detectRetina: true,
    };

    return baseConfig;
  };

  return (
    <>
      <NeuralNetworkCanvas variant={variant} />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={getParticlesConfig()}
        className="absolute inset-0 -z-10"
      />
    </>
  );
};

export default ParticlesBackground;
