import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";

export const CosmicSofaStory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slowly rotating starfield
  const starfieldRotation = interpolate(frame, [0, durationInFrames], [0, 10]);

  // Gentle camera push-in during scene 3
  const cameraScale = interpolate(frame, [330, 430], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 50%, #000000 100%)",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
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
        {Array.from({ length: 100 }).map((_, i) => (
          <Star key={i} index={i} />
        ))}
      </div>

      {/* Nebula clouds - warm apartment atmosphere */}
      <Nebula x={200} y={300} color="rgba(255, 180, 100, 0.12)" size={700} delay={0} />
      <Nebula x={1400} y={500} color="rgba(180, 140, 255, 0.1)" size={500} delay={20} />
      <Nebula x={960} y={200} color="rgba(255, 150, 180, 0.08)" size={600} delay={40} />

      {/* Scene 1: Cozy cosmic idle (frames 0-180) */}
      <Sequence from={0} durationInFrames={180}>
        <Scene01CozyIdle />
      </Sequence>

      {/* Scene 2: Dog enters with drink (frames 180-330) */}
      <Sequence from={180} durationInFrames={150}>
        <Scene02DogEnters />
      </Sequence>

      {/* Scene 3: Cuddle ending (frames 330-450) */}
      <Sequence from={330} durationInFrames={120}>
        <Scene03CuddleEnd />
      </Sequence>

      {/* Cosmic sofa platform - always visible */}
      <CosmicSofa />

      {/* Characters - always visible */}
      <CosmicCharacter
        variant="girl"
        x={700}
        baseY={580}
        colors={{ hair: "#f0d890", skin: "#ffe4c4", accent: "#89cff0" }}
      />
      <CosmicCharacter
        variant="boy"
        x={1050}
        baseY={600}
        colors={{ hair: "#5a4030", skin: "#e8c8a8", accent: "#7cb87c" }}
      />

      {/* Golden retriever - enters in scene 2 */}
      <Sequence from={180} premountFor={30}>
        <CosmicDog />
      </Sequence>

      {/* Smoke/nebula wisps from relaxation */}
      <SmokeWisps />

      {/* Subtitles */}
      <Sequence from={30} durationInFrames={120}>
        <Subtitle text="Ein ruhiger Abend in der Wohnung." />
      </Sequence>
      <Sequence from={200} durationInFrames={100}>
        <Subtitle text="Dann kommt ein süßer Golden Retriever..." />
      </Sequence>
      <Sequence from={350} durationInFrames={80}>
        <Subtitle text="…und kuschelt sich dazu." />
      </Sequence>

      {/* Fade out at end */}
      <FadeOut />
    </AbsoluteFill>
  );
};

// Scene 01: Establish cozy atmosphere
const Scene01CozyIdle: React.FC = () => {
  const frame = useCurrentFrame();

  // Warm light flicker
  const warmGlow = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 50% 60%, rgba(255, 200, 150, ${0.08 * warmGlow}) 0%, transparent 50%)`,
      }}
    />
  );
};

// Scene 02: Dog enters
const Scene02DogEnters: React.FC = () => {
  return null; // Dog animation handled by CosmicDog component
};

// Scene 03: Cuddle ending
const Scene03CuddleEnd: React.FC = () => {
  const frame = useCurrentFrame();

  // Content glow intensifies
  const contentGlow = interpolate(frame, [0, 60], [0, 0.15], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 50% 55%, rgba(255, 220, 180, ${contentGlow}) 0%, transparent 40%)`,
      }}
    />
  );
};

// Cosmic floating sofa
const CosmicSofa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const float = Math.sin(frame * 0.02) * 8;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 30 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 550 + float,
        transform: `translateX(-50%) scale(${entrance})`,
      }}
    >
      {/* Platform glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 300,
          background: "radial-gradient(ellipse, rgba(150, 140, 180, 0.3) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* Sofa shape */}
      <svg width="800" height="200" viewBox="0 0 800 200">
        {/* Main sofa body */}
        <ellipse
          cx="400"
          cy="120"
          rx="380"
          ry="60"
          fill="url(#sofaGradient)"
          filter="url(#sofaGlow)"
        />
        {/* Back cushion */}
        <ellipse
          cx="400"
          cy="80"
          rx="350"
          ry="40"
          fill="url(#cushionGradient)"
        />
        {/* Arm rests */}
        <ellipse cx="60" cy="100" rx="50" ry="45" fill="url(#armGradient)" />
        <ellipse cx="740" cy="100" rx="50" ry="45" fill="url(#armGradient)" />

        <defs>
          <radialGradient id="sofaGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#8b8b9e" />
            <stop offset="100%" stopColor="#4a4a5e" />
          </radialGradient>
          <radialGradient id="cushionGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#9a9aae" />
            <stop offset="100%" stopColor="#6a6a7e" />
          </radialGradient>
          <radialGradient id="armGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#7a7a8e" />
            <stop offset="100%" stopColor="#4a4a5e" />
          </radialGradient>
          <filter id="sofaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

// Cosmic character (girl or boy)
const CosmicCharacter: React.FC<{
  variant: "girl" | "boy";
  x: number;
  baseY: number;
  colors: { hair: string; skin: string; accent: string };
}> = ({ variant, x, baseY, colors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Breathing animation
  const breathe = Math.sin(frame * 0.06) * 3;
  const float = Math.sin(frame * 0.02 + (variant === "girl" ? 0 : Math.PI)) * 5;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 25 },
  });

  // Eye gaze toward dog after frame 200
  const gazeX = interpolate(frame, [200, 230], [0, variant === "girl" ? 8 : -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: baseY + float,
        transform: `scale(${entrance}) scaleX(${variant === "girl" ? 1 : -1})`,
      }}
    >
      {/* Character glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${colors.accent}33 0%, transparent 60%)`,
          filter: "blur(20px)",
        }}
      />

      <svg width="180" height="160" viewBox="0 0 180 160">
        {/* Body lying down */}
        <ellipse
          cx="90"
          cy="110"
          rx="70"
          ry="35"
          fill={colors.skin}
          style={{ transform: `translateY(${breathe}px)` }}
          filter="url(#characterGlow)"
        />

        {/* Head */}
        <circle cx="90" cy="50" r="40" fill={colors.skin} filter="url(#characterGlow)" />

        {/* Hair */}
        {variant === "girl" ? (
          <>
            <ellipse cx="90" cy="30" rx="45" ry="30" fill={colors.hair} />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill={colors.hair} />
            <ellipse cx="130" cy="50" rx="15" ry="40" fill={colors.hair} />
          </>
        ) : (
          <ellipse cx="90" cy="25" rx="38" ry="25" fill={colors.hair} />
        )}

        {/* Eyes */}
        <ellipse cx={70 + gazeX} cy="50" rx="8" ry="10" fill="#2d2d3d" />
        <ellipse cx={110 + gazeX} cy="50" rx="8" ry="10" fill="#2d2d3d" />
        <circle cx={72 + gazeX} cy="48" r="3" fill="white" />
        <circle cx={112 + gazeX} cy="48" r="3" fill="white" />

        {/* Peaceful smile */}
        <path
          d="M 75 70 Q 90 80 105 70"
          fill="none"
          stroke="#3d3d4d"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Blush */}
        <ellipse cx="55" cy="60" rx="10" ry="6" fill="#ffb7c5" opacity="0.5" />
        <ellipse cx="125" cy="60" rx="10" ry="6" fill="#ffb7c5" opacity="0.5" />

        <defs>
          <filter id="characterGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

// Cosmic golden retriever with drink
const CosmicDog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance from right
  const entranceProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const x = interpolate(entranceProgress, [0, 1], [2000, 1280]);

  // Jump onto sofa at frame ~100 (relative)
  const jumpProgress = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const jumpY = interpolate(
    jumpProgress,
    [0, 0.5, 1],
    [0, -80, 0]
  );

  const baseY = interpolate(jumpProgress, [0, 1], [700, 560]);

  const bounce = Math.abs(Math.sin(frame * 0.4)) * 10 * (1 - jumpProgress);
  const tailWag = Math.sin(frame * 0.6) * 25;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  // Drink visibility (holds it until placing on table)
  const holdingDrink = frame < 80;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: baseY + bounce + jumpY,
        transform: `scale(${Math.min(1, entrance)})`,
      }}
    >
      {/* Dog glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 250,
          height: 200,
          background: "radial-gradient(circle, rgba(245, 215, 142, 0.3) 0%, transparent 60%)",
          filter: "blur(25px)",
        }}
      />

      <svg width="200" height="160" viewBox="0 0 200 160">
        {/* Tail */}
        <ellipse
          cx="20"
          cy="70"
          rx="25"
          ry="10"
          fill="#f5d78e"
          style={{
            transformOrigin: "40px 70px",
            transform: `rotate(${tailWag}deg)`,
          }}
          filter="url(#dogGlow)"
        />

        {/* Body */}
        <ellipse cx="90" cy="90" rx="55" ry="40" fill="#f5d78e" filter="url(#dogGlow)" />
        <ellipse cx="90" cy="100" rx="40" ry="28" fill="#fff8e7" />

        {/* Legs */}
        <ellipse cx="50" cy="130" rx="16" ry="22" fill="#f5d78e" />
        <ellipse cx="75" cy="130" rx="16" ry="22" fill="#f5d78e" />
        <ellipse cx="115" cy="130" rx="14" ry="24" fill="#f5d78e" />
        <ellipse cx="140" cy="130" rx="14" ry="24" fill="#f5d78e" />

        {/* Head */}
        <ellipse cx="160" cy="55" rx="38" ry="35" fill="#f5d78e" filter="url(#dogGlow)" />

        {/* Snout */}
        <ellipse cx="188" cy="65" rx="22" ry="18" fill="#fff8e7" />

        {/* Nose */}
        <ellipse cx="200" cy="60" rx="9" ry="7" fill="#2d2d2d" />
        <circle cx="198" cy="58" r="3" fill="white" opacity="0.4" />

        {/* Tongue */}
        <ellipse cx="192" cy="82" rx="8" ry="12" fill="#ff9999" />

        {/* Eyes - sparkly */}
        <circle cx="148" cy="48" r="9" fill="white" />
        <circle cx="172" cy="48" r="9" fill="white" />
        <circle cx="150" cy="46" r="5" fill="#4a3728" />
        <circle cx="174" cy="46" r="5" fill="#4a3728" />
        <circle cx="152" cy="44" r="2" fill="white" />
        <circle cx="176" cy="44" r="2" fill="white" />

        {/* Ears */}
        <ellipse cx="125" cy="35" rx="18" ry="30" fill="#e8c870" />
        <ellipse cx="180" cy="30" rx="15" ry="25" fill="#e8c870" />

        {/* Blush */}
        <ellipse cx="138" cy="65" rx="8" ry="5" fill="#ffb7c5" opacity="0.5" />

        {/* Collar */}
        <rect x="130" y="78" width="45" height="10" rx="5" fill="#6b8cff" />
        <circle cx="152" cy="90" r="6" fill="#ffd700" />

        <defs>
          <filter id="dogGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Cola Zero style drink */}
      {holdingDrink && (
        <div
          style={{
            position: "absolute",
            left: 165,
            top: 90,
            transform: "rotate(-15deg)",
          }}
        >
          <svg width="30" height="50" viewBox="0 0 30 50">
            <rect x="5" y="5" width="20" height="40" rx="5" fill="#1a1a2a" />
            <rect x="7" y="15" width="16" height="20" rx="2" fill="#cc0000" />
            <text x="15" y="28" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">
              ZERO
            </text>
            <ellipse cx="15" cy="8" rx="8" ry="3" fill="#333" />
          </svg>
        </div>
      )}
    </div>
  );
};

// Smoke/nebula wisps
const SmokeWisps: React.FC = () => {
  const frame = useCurrentFrame();

  const wisps = [
    { x: 850, baseY: 500, delay: 0, color: "rgba(200, 180, 255, 0.2)" },
    { x: 920, baseY: 520, delay: 30, color: "rgba(180, 200, 255, 0.15)" },
    { x: 780, baseY: 510, delay: 60, color: "rgba(220, 180, 200, 0.18)" },
  ];

  // Fade smoke down in scene 3
  const smokeFade = interpolate(frame, [330, 400], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {wisps.map((wisp, i) => {
        const cycle = (frame + wisp.delay) % 180;
        const rise = interpolate(cycle, [0, 180], [0, -150]);
        const drift = Math.sin((frame + wisp.delay) * 0.03) * 30;
        const opacity = interpolate(cycle, [0, 30, 120, 180], [0, 0.8, 0.6, 0]) * smokeFade;
        const scale = interpolate(cycle, [0, 180], [0.5, 2]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: wisp.x + drift,
              top: wisp.baseY + rise,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${wisp.color} 0%, transparent 70%)`,
              opacity,
              transform: `scale(${scale})`,
              filter: "blur(20px)",
            }}
          />
        );
      })}
    </>
  );
};

// Subtitle component
const Subtitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 42,
          color: "white",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)",
          padding: "12px 30px",
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: 8,
          backdropFilter: "blur(10px)",
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Individual star
const Star: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();

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

  const drift = Math.sin(frame * 0.008) * 30;

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
        filter: "blur(50px)",
      }}
    />
  );
};

// Fade out
const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
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
