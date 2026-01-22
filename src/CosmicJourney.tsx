import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";

export const CosmicJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slowly rotating starfield
  const starfieldRotation = interpolate(frame, [0, durationInFrames], [0, 15]);

  // Sun glow pulsing
  const sunPulse = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.9, 1.1]
  );

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 50%, #000000 100%)",
        overflow: "hidden",
      }}
    >
      {/* Starfield layer */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `rotate(${starfieldRotation}deg)`,
        }}
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <Star key={i} index={i} />
        ))}
      </div>

      {/* Nebula clouds */}
      <Nebula x={300} y={200} color="rgba(138, 43, 226, 0.15)" size={600} delay={0} />
      <Nebula x={1500} y={700} color="rgba(0, 191, 255, 0.12)" size={500} delay={30} />
      <Nebula x={800} y={800} color="rgba(255, 105, 180, 0.1)" size={450} delay={60} />

      {/* Central sun */}
      <Sequence from={0} premountFor={fps}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${sunPulse})`,
          }}
        >
          <Sun />
        </div>
      </Sequence>

      {/* Orbiting planets */}
      <Sequence from={30} premountFor={fps}>
        <OrbitingPlanet
          orbitRadius={280}
          planetSize={40}
          color="#e74c3c"
          speed={0.8}
          startAngle={45}
        />
      </Sequence>

      <Sequence from={45} premountFor={fps}>
        <OrbitingPlanet
          orbitRadius={380}
          planetSize={55}
          color="#3498db"
          speed={0.5}
          startAngle={180}
          hasRing
        />
      </Sequence>

      <Sequence from={60} premountFor={fps}>
        <OrbitingPlanet
          orbitRadius={480}
          planetSize={30}
          color="#9b59b6"
          speed={0.3}
          startAngle={270}
        />
      </Sequence>

      {/* Text content */}
      <Sequence from={90} premountFor={fps}>
        <TextReveal
          text="The cosmos is within us"
          y={850}
          delay={0}
          fontSize={64}
        />
      </Sequence>

      <Sequence from={150} premountFor={fps}>
        <TextReveal
          text="We are made of star stuff"
          y={930}
          delay={0}
          fontSize={36}
          opacity={0.7}
        />
      </Sequence>

      {/* Shooting stars */}
      <ShootingStar delay={60} startX={200} startY={100} />
      <ShootingStar delay={120} startX={1600} startY={200} />
      <ShootingStar delay={200} startX={400} startY={150} />

      {/* Fade out */}
      <FadeOut />
    </AbsoluteFill>
  );
};

// Individual star component
const Star: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();

  // Deterministic random positioning based on index
  const x = ((index * 137.5) % 100);
  const y = ((index * 73.7) % 100);
  const size = 1 + (index % 3);
  const twinkleSpeed = 0.03 + (index % 5) * 0.01;
  const twinkleOffset = index * 0.5;

  const opacity = interpolate(
    Math.sin(frame * twinkleSpeed + twinkleOffset),
    [-1, 1],
    [0.3, 1]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "white",
        opacity,
        boxShadow: `0 0 ${size * 2}px white`,
      }}
    />
  );
};

// Central sun with glow
const Sun: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const glowPulse = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [80, 120]
  );

  return (
    <div
      style={{
        width: 150,
        height: 150,
        borderRadius: "50%",
        background: "radial-gradient(circle, #fff9c4 0%, #ffeb3b 30%, #ff9800 70%, #ff5722 100%)",
        boxShadow: `
          0 0 ${glowPulse}px #ff9800,
          0 0 ${glowPulse * 1.5}px #ff5722,
          0 0 ${glowPulse * 2}px rgba(255, 87, 34, 0.5)
        `,
        transform: `scale(${scale})`,
      }}
    />
  );
};

// Orbiting planet
const OrbitingPlanet: React.FC<{
  orbitRadius: number;
  planetSize: number;
  color: string;
  speed: number;
  startAngle: number;
  hasRing?: boolean;
}> = ({ orbitRadius, planetSize, color, speed, startAngle, hasRing }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const angle = (startAngle + frame * speed) * (Math.PI / 180);
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius * 0.3; // Elliptical orbit

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${entrance})`,
      }}
    >
      <div
        style={{
          width: planetSize,
          height: planetSize,
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, ${color}, ${adjustBrightness(color, -40)})`,
          boxShadow: `inset -${planetSize / 4}px -${planetSize / 4}px ${planetSize / 2}px rgba(0,0,0,0.4)`,
        }}
      />
      {hasRing && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: planetSize * 2,
            height: planetSize * 0.4,
            transform: "translate(-50%, -50%) rotateX(70deg)",
            border: `2px solid ${color}`,
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
};

// Nebula cloud
const Nebula: React.FC<{
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}> = ({ x, y, color, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const drift = Math.sin(frame * 0.01) * 20;

  return (
    <div
      style={{
        position: "absolute",
        left: x + drift,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: Math.max(0, opacity),
        filter: "blur(40px)",
      }}
    />
  );
};

// Text reveal animation
const TextReveal: React.FC<{
  text: string;
  y: number;
  delay: number;
  fontSize: number;
  opacity?: number;
}> = ({ text, y, delay, fontSize, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20 },
  });

  const textOpacity = interpolate(frame - delay, [0, 30], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const yOffset = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        top: y,
        textAlign: "center",
        opacity: textOpacity,
        transform: `translateY(${yOffset}px)`,
      }}
    >
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize,
          color: "white",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          letterSpacing: 2,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Shooting star
const ShootingStar: React.FC<{
  delay: number;
  startX: number;
  startY: number;
}> = ({ delay, startX, startY }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const opacity = interpolate(frame - delay, [0, 5, 15, 20], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = startX + progress * 300;
  const y = startY + progress * 200;

  if (frame < delay || frame > delay + 25) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 100,
        height: 2,
        background: "linear-gradient(to right, transparent, white)",
        opacity,
        transform: "rotate(35deg)",
        borderRadius: 2,
      }}
    />
  );
};

// Fade out at the end
const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        opacity,
      }}
    />
  );
};

// Helper to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
