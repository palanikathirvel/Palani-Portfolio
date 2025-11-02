import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface ParticlesBackgroundProps {
  variant?: "hero" | "default" | "minimal";
}

const ParticlesBackground = ({ variant = "default" }: ParticlesBackgroundProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
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
          direction: "none" as const,
          enable: true,
          outModes: { default: "bounce" as const },
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
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={getParticlesConfig()}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticlesBackground;
