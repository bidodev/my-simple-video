import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";

export const PandaReunion: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #ffe4ec 0%, #ffd1dc 40%, #ffb6c1 100%)",
        overflow: "hidden",
      }}
    >
      {/* Soft pastel clouds */}
      <SoftCloud x={80} y={100} size={140} />
      <SoftCloud x={500} y={60} size={100} />
      <SoftCloud x={1300} y={80} size={120} />
      <SoftCloud x={1600} y={140} size={90} />

      {/* Cute sun */}
      <KawaiiSun />

      {/* Soft grass hills */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 350,
          background: "linear-gradient(180deg, #98e4b9 0%, #7dd3a8 100%)",
          borderRadius: "60% 60% 0 0 / 40% 40% 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: -100,
          width: "60%",
          height: 280,
          background: "#8dd9a8",
          borderRadius: "0 80% 0 0 / 0 100% 0 0",
        }}
      />

      {/* Small flowers */}
      {[...Array(8)].map((_, i) => (
        <SmallFlower
          key={i}
          x={120 + i * 220}
          color={["#ffb7d5", "#ffe066", "#b5e8ff", "#d4b5ff"][i % 4]}
          delay={i * 5}
        />
      ))}

      {/* Laura panda */}
      <Sequence from={0} premountFor={30}>
        <KawaiiPanda
          name="Laura"
          startX={-200}
          endX={750}
          facingRight
          accessoryColor="#ff8fab"
          delay={0}
        />
      </Sequence>

      {/* Bido panda */}
      <Sequence from={0} premountFor={30}>
        <KawaiiPanda
          name="Bido"
          startX={2100}
          endX={1050}
          facingRight={false}
          accessoryColor="#89cff0"
          delay={5}
        />
      </Sequence>

      {/* Jordi the dog */}
      <Sequence from={50} premountFor={30}>
        <KawaiiDog />
      </Sequence>

      {/* Hearts */}
      <Sequence from={85} premountFor={30}>
        <CuteHearts />
      </Sequence>

      {/* Title */}
      <Sequence from={110} premountFor={30}>
        <CuteTitle />
      </Sequence>
    </AbsoluteFill>
  );
};

// Kawaii Panda with SVG
const KawaiiPanda: React.FC<{
  name: string;
  startX: number;
  endX: number;
  facingRight: boolean;
  accessoryColor: string;
  delay: number;
}> = ({ name, startX, endX, facingRight, accessoryColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const runProgress = interpolate(frame - delay, [0, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const x = interpolate(runProgress, [0, 1], [startX, endX]);
  const bounce = Math.abs(Math.sin(frame * 0.4)) * 15;

  // Arm animation for hug
  const hugProgress = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Happy squish when hugging
  const squish = interpolate(hugProgress, [0, 1], [1, 1.05]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 300 + bounce,
        transform: `scaleX(${facingRight ? 1 : -1}) scale(${squish})`,
      }}
    >
      <svg width="180" height="200" viewBox="0 0 180 200">
        {/* Body */}
        <ellipse cx="90" cy="150" rx="55" ry="45" fill="white" />
        <ellipse cx="90" cy="155" rx="35" ry="28" fill="#f8f8f8" />

        {/* Legs */}
        <ellipse cx="60" cy="185" rx="22" ry="18" fill="#2d2d2d" />
        <ellipse cx="120" cy="185" rx="22" ry="18" fill="#2d2d2d" />

        {/* Arms */}
        <ellipse
          cx="35"
          cy="140"
          rx="18"
          ry="28"
          fill="#2d2d2d"
          style={{
            transformOrigin: "35px 120px",
            transform: `rotate(${interpolate(hugProgress, [0, 1], [20, -30])}deg)`,
          }}
        />
        <ellipse
          cx="145"
          cy="140"
          rx="18"
          ry="28"
          fill="#2d2d2d"
          style={{
            transformOrigin: "145px 120px",
            transform: `rotate(${interpolate(hugProgress, [0, 1], [-20, 30])}deg)`,
          }}
        />

        {/* Head */}
        <circle cx="90" cy="75" r="60" fill="white" />

        {/* Ears */}
        <circle cx="35" cy="30" r="25" fill="#2d2d2d" />
        <circle cx="145" cy="30" r="25" fill="#2d2d2d" />
        <circle cx="35" cy="30" r="12" fill="#4a4a4a" />
        <circle cx="145" cy="30" r="12" fill="#4a4a4a" />

        {/* Eye patches */}
        <ellipse cx="60" cy="70" rx="25" ry="20" fill="#2d2d2d" />
        <ellipse cx="120" cy="70" rx="25" ry="20" fill="#2d2d2d" />

        {/* Eyes - big and sparkly */}
        <circle cx="60" cy="70" r="12" fill="white" />
        <circle cx="120" cy="70" r="12" fill="white" />
        <circle cx="63" cy="68" r="7" fill="#2d2d2d" />
        <circle cx="123" cy="68" r="7" fill="#2d2d2d" />
        {/* Eye sparkles */}
        <circle cx="66" cy="65" r="3" fill="white" />
        <circle cx="126" cy="65" r="3" fill="white" />
        <circle cx="60" cy="72" r="1.5" fill="white" />
        <circle cx="120" cy="72" r="1.5" fill="white" />

        {/* Nose */}
        <ellipse cx="90" cy="90" rx="8" ry="6" fill="#2d2d2d" />

        {/* Cute smile */}
        <path
          d="M 75 100 Q 90 115 105 100"
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Blush */}
        <ellipse cx="45" cy="90" rx="12" ry="8" fill="#ffb7c5" opacity="0.7" />
        <ellipse cx="135" cy="90" rx="12" ry="8" fill="#ffb7c5" opacity="0.7" />

        {/* Bow/accessory */}
        <g transform="translate(90, 20)">
          <ellipse cx="-15" cy="0" rx="12" ry="8" fill={accessoryColor} />
          <ellipse cx="15" cy="0" rx="12" ry="8" fill={accessoryColor} />
          <circle cx="0" cy="0" r="6" fill={accessoryColor} />
          <circle cx="0" cy="0" r="3" fill="white" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

// Kawaii Golden Retriever
const KawaiiDog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const runProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const x = interpolate(runProgress, [0, 1], [2200, 1350]);
  const bounce = Math.abs(Math.sin(frame * 0.5)) * 20;
  const tailWag = Math.sin(frame * 0.8) * 30;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 280 + bounce,
        transform: `scale(${Math.min(1, entrance)})`,
      }}
    >
      <svg width="220" height="180" viewBox="0 0 220 180">
        {/* Tail */}
        <ellipse
          cx="25"
          cy="80"
          rx="30"
          ry="12"
          fill="#f5d78e"
          style={{
            transformOrigin: "50px 80px",
            transform: `rotate(${tailWag}deg)`,
          }}
        />

        {/* Body */}
        <ellipse cx="100" cy="110" rx="65" ry="45" fill="#f5d78e" />
        <ellipse cx="100" cy="120" rx="45" ry="30" fill="#fff8e7" />

        {/* Back legs */}
        <ellipse cx="55" cy="155" rx="20" ry="25" fill="#f5d78e" />
        <ellipse cx="85" cy="155" rx="20" ry="25" fill="#f5d78e" />

        {/* Front legs */}
        <ellipse cx="135" cy="155" rx="18" ry="28" fill="#f5d78e" />
        <ellipse cx="160" cy="155" rx="18" ry="28" fill="#f5d78e" />

        {/* Head */}
        <ellipse cx="175" cy="70" rx="45" ry="40" fill="#f5d78e" />

        {/* Snout */}
        <ellipse cx="205" cy="80" rx="25" ry="20" fill="#fff8e7" />

        {/* Nose */}
        <ellipse cx="218" cy="75" rx="10" ry="8" fill="#2d2d2d" />
        <ellipse cx="216" cy="73" rx="4" ry="3" fill="white" opacity="0.4" />

        {/* Tongue */}
        <ellipse cx="210" cy="100" rx="10" ry="15" fill="#ff9999" />
        <path d="M 205 95 L 210 110 L 215 95" fill="#ff8080" />

        {/* Eyes */}
        <circle cx="165" cy="60" r="10" fill="white" />
        <circle cx="190" cy="60" r="10" fill="white" />
        <circle cx="167" cy="58" r="6" fill="#4a3728" />
        <circle cx="192" cy="58" r="6" fill="#4a3728" />
        <circle cx="169" cy="56" r="2.5" fill="white" />
        <circle cx="194" cy="56" r="2.5" fill="white" />

        {/* Ears */}
        <ellipse cx="140" cy="45" rx="20" ry="35" fill="#e8c870" />
        <ellipse cx="200" cy="40" rx="18" ry="30" fill="#e8c870" />

        {/* Blush */}
        <ellipse cx="155" cy="80" rx="10" ry="6" fill="#ffb7c5" opacity="0.6" />
        <ellipse cx="205" cy="90" rx="8" ry="5" fill="#ffb7c5" opacity="0.6" />

        {/* Collar */}
        <rect x="150" y="95" width="50" height="12" rx="6" fill="#ff6b6b" />
        <circle cx="175" cy="108" r="8" fill="#ffd700" />
        <circle cx="175" cy="108" r="4" fill="#ffeb3b" />
      </svg>
    </div>
  );
};

// Cute floating hearts
const CuteHearts: React.FC = () => {
  const frame = useCurrentFrame();

  const hearts = [
    { x: 900, baseY: 350, delay: 0, size: 40, color: "#ff6b9d" },
    { x: 950, baseY: 300, delay: 8, size: 30, color: "#ff8fab" },
    { x: 870, baseY: 280, delay: 15, size: 35, color: "#ffb3c6" },
    { x: 920, baseY: 230, delay: 22, size: 25, color: "#ff6b9d" },
    { x: 980, baseY: 320, delay: 12, size: 28, color: "#ffc2d1" },
  ];

  return (
    <>
      {hearts.map((heart, i) => {
        const progress = interpolate(frame - heart.delay, [0, 50], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const y = heart.baseY - progress * 120;
        const opacity = interpolate(progress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
        const scale = interpolate(progress, [0, 0.3, 1], [0.3, 1.1, 0.9]);
        const wobble = Math.sin(frame * 0.15 + i) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: heart.x + wobble,
              top: y,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <svg width={heart.size} height={heart.size} viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={heart.color}
              />
            </svg>
          </div>
        );
      })}
    </>
  );
};

// Soft cloud
const SoftCloud: React.FC<{ x: number; y: number; size: number }> = ({ x, y, size }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.015) * 20;

  return (
    <div
      style={{
        position: "absolute",
        left: x + drift,
        top: y,
        opacity: 0.9,
      }}
    >
      <svg width={size * 2} height={size} viewBox="0 0 200 100">
        <ellipse cx="60" cy="60" rx="40" ry="35" fill="white" />
        <ellipse cx="100" cy="50" rx="50" ry="40" fill="white" />
        <ellipse cx="150" cy="60" rx="35" ry="30" fill="white" />
        <ellipse cx="80" cy="70" rx="45" ry="30" fill="white" />
        <ellipse cx="130" cy="65" rx="40" ry="32" fill="white" />
      </svg>
    </div>
  );
};

// Kawaii sun
const KawaiiSun: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.05) * 0.03;
  const blinkCycle = frame % 150;
  const isBlinking = blinkCycle > 145;

  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        right: 100,
        transform: `scale(${pulse})`,
      }}
    >
      <svg width="150" height="150" viewBox="0 0 150 150">
        {/* Glow */}
        <circle cx="75" cy="75" r="70" fill="#fff5b8" opacity="0.4" />
        <circle cx="75" cy="75" r="55" fill="#ffeb99" />
        <circle cx="75" cy="75" r="50" fill="#ffe066" />

        {/* Face */}
        {!isBlinking ? (
          <>
            <ellipse cx="55" cy="70" rx="6" ry="8" fill="#ff9f43" />
            <ellipse cx="95" cy="70" rx="6" ry="8" fill="#ff9f43" />
          </>
        ) : (
          <>
            <path d="M 49 70 Q 55 75 61 70" stroke="#ff9f43" strokeWidth="3" fill="none" />
            <path d="M 89 70 Q 95 75 101 70" stroke="#ff9f43" strokeWidth="3" fill="none" />
          </>
        )}

        {/* Smile */}
        <path
          d="M 55 90 Q 75 105 95 90"
          fill="none"
          stroke="#ff9f43"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Blush */}
        <ellipse cx="40" cy="85" rx="10" ry="6" fill="#ffb7c5" opacity="0.6" />
        <ellipse cx="110" cy="85" rx="10" ry="6" fill="#ffb7c5" opacity="0.6" />
      </svg>
    </div>
  );
};

// Small flower
const SmallFlower: React.FC<{ x: number; color: string; delay: number }> = ({ x, color, delay }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin((frame + delay) * 0.06) * 8;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 320,
        transform: `rotate(${sway}deg)`,
        transformOrigin: "bottom center",
      }}
    >
      <svg width="40" height="50" viewBox="0 0 40 50">
        {/* Stem */}
        <path d="M 20 50 Q 20 35 20 25" stroke="#5cb85c" strokeWidth="3" fill="none" />
        {/* Petals */}
        <circle cx="20" cy="12" r="8" fill={color} />
        <circle cx="12" cy="18" r="8" fill={color} />
        <circle cx="28" cy="18" r="8" fill={color} />
        <circle cx="14" cy="10" r="8" fill={color} />
        <circle cx="26" cy="10" r="8" fill={color} />
        {/* Center */}
        <circle cx="20" cy="14" r="5" fill="#ffe066" />
      </svg>
    </div>
  );
};

// Cute title
const CuteTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 80,
          fontWeight: "bold",
          color: "#ff6b9d",
          textShadow: "3px 3px 0 white, 5px 5px 0 rgba(255,107,157,0.3)",
          margin: 0,
          letterSpacing: 2,
        }}
      >
        Together Again!
      </h1>
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 36,
          color: "#89cff0",
          marginTop: 8,
          textShadow: "2px 2px 0 white",
        }}
      >
        Laura, Bido & Jordi
      </p>
    </div>
  );
};
