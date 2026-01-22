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
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #ffecd2 0%, #fcb69f 50%, #ffeaa7 100%)",
        overflow: "hidden",
      }}
    >
      {/* Cute clouds */}
      <Cloud x={100} y={80} size={120} delay={0} />
      <Cloud x={400} y={120} size={80} delay={10} />
      <Cloud x={1400} y={60} size={100} delay={5} />
      <Cloud x={1650} y={140} size={70} delay={15} />

      {/* Sun */}
      <CuteSun />

      {/* Ground/grass */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 300,
          background: "linear-gradient(180deg, #a8e6cf 0%, #88d8b0 100%)",
          borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
        }}
      />

      {/* Flowers */}
      {[...Array(12)].map((_, i) => (
        <Flower
          key={i}
          x={80 + i * 160}
          delay={i * 3}
          color={["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb"][i % 4]}
        />
      ))}

      {/* Laura (left panda) running right */}
      <Sequence from={0} premountFor={fps}>
        <LauraPanda />
      </Sequence>

      {/* Bido (right panda) running left */}
      <Sequence from={0} premountFor={fps}>
        <BidoPanda />
      </Sequence>

      {/* Hearts appear during hug */}
      <Sequence from={90} premountFor={fps}>
        <FloatingHearts />
      </Sequence>

      {/* Jordi the golden retriever */}
      <Sequence from={60} premountFor={fps}>
        <JordiDog />
      </Sequence>

      {/* Text */}
      <Sequence from={120} premountFor={fps}>
        <ReunionText />
      </Sequence>

      {/* Sparkles */}
      <Sequence from={90} premountFor={fps}>
        <Sparkles />
      </Sequence>
    </AbsoluteFill>
  );
};

// Laura Panda - runs from left
const LauraPanda: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Run from left to center
  const runProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const x = interpolate(runProgress, [0, 1], [-100, 860]);

  // Bouncy run animation
  const bounce = Math.sin(frame * 0.5) * 8;
  const legSwing = Math.sin(frame * 0.5) * 15;

  // Hug animation - arms open then close
  const hugProgress = interpolate(frame, [75, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const armAngle = interpolate(hugProgress, [0, 1], [-30, 45]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 280 + bounce,
        transform: "scaleX(1)",
      }}
    >
      <PandaCharacter
        name="Laura"
        armAngle={armAngle}
        legAngle={legSwing}
        hasBowtie
        bowtieColor="#ff6b9d"
        eyeStyle="cute"
      />
    </div>
  );
};

// Bido Panda - runs from right
const BidoPanda: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Run from right to center
  const runProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const x = interpolate(runProgress, [0, 1], [1920, 960]);

  // Bouncy run animation (offset from Laura)
  const bounce = Math.sin(frame * 0.5 + Math.PI) * 8;
  const legSwing = Math.sin(frame * 0.5 + Math.PI) * 15;

  // Hug animation
  const hugProgress = interpolate(frame, [75, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const armAngle = interpolate(hugProgress, [0, 1], [30, -45]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 280 + bounce,
        transform: "scaleX(-1)",
      }}
    >
      <PandaCharacter
        name="Bido"
        armAngle={armAngle}
        legAngle={legSwing}
        hasBowtie
        bowtieColor="#5f9ea0"
        eyeStyle="happy"
      />
    </div>
  );
};

// Reusable Panda Character
const PandaCharacter: React.FC<{
  name: string;
  armAngle: number;
  legAngle: number;
  hasBowtie?: boolean;
  bowtieColor?: string;
  eyeStyle: "cute" | "happy";
}> = ({ name, armAngle, legAngle, hasBowtie, bowtieColor, eyeStyle }) => {
  const frame = useCurrentFrame();

  // Blinking
  const blinkCycle = frame % 120;
  const isBlinking = blinkCycle > 115 && blinkCycle < 120;

  return (
    <div style={{ position: "relative", width: 120, height: 160 }}>
      {/* Body */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 20,
          width: 80,
          height: 90,
          background: "white",
          borderRadius: "45% 45% 50% 50%",
          border: "3px solid #333",
        }}
      />

      {/* Belly patch */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 35,
          width: 50,
          height: 60,
          background: "#f5f5f5",
          borderRadius: "50%",
        }}
      />

      {/* Left leg */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 25,
          width: 25,
          height: 35,
          background: "#333",
          borderRadius: "40%",
          transformOrigin: "top center",
          transform: `rotate(${legAngle}deg)`,
        }}
      />

      {/* Right leg */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 70,
          width: 25,
          height: 35,
          background: "#333",
          borderRadius: "40%",
          transformOrigin: "top center",
          transform: `rotate(${-legAngle}deg)`,
        }}
      />

      {/* Left arm */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 5,
          width: 25,
          height: 45,
          background: "#333",
          borderRadius: "40%",
          transformOrigin: "top center",
          transform: `rotate(${armAngle}deg)`,
        }}
      />

      {/* Right arm */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 90,
          width: 25,
          height: 45,
          background: "#333",
          borderRadius: "40%",
          transformOrigin: "top center",
          transform: `rotate(${-armAngle}deg)`,
        }}
      />

      {/* Head */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 10,
          width: 100,
          height: 90,
          background: "white",
          borderRadius: "50%",
          border: "3px solid #333",
        }}
      />

      {/* Left ear */}
      <div
        style={{
          position: "absolute",
          bottom: 170,
          left: 5,
          width: 35,
          height: 35,
          background: "#333",
          borderRadius: "50%",
        }}
      />

      {/* Right ear */}
      <div
        style={{
          position: "absolute",
          bottom: 170,
          left: 80,
          width: 35,
          height: 35,
          background: "#333",
          borderRadius: "50%",
        }}
      />

      {/* Left eye patch */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 18,
          width: 35,
          height: 30,
          background: "#333",
          borderRadius: "50%",
          transform: "rotate(-10deg)",
        }}
      />

      {/* Right eye patch */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 67,
          width: 35,
          height: 30,
          background: "#333",
          borderRadius: "50%",
          transform: "rotate(10deg)",
        }}
      />

      {/* Eyes */}
      {!isBlinking ? (
        <>
          {/* Left eye */}
          <div
            style={{
              position: "absolute",
              bottom: 148,
              left: 28,
              width: 16,
              height: eyeStyle === "happy" ? 8 : 16,
              background: eyeStyle === "happy" ? "transparent" : "white",
              borderRadius: eyeStyle === "happy" ? "0 0 50% 50%" : "50%",
              border: eyeStyle === "happy" ? "3px solid white" : "none",
              borderTop: eyeStyle === "happy" ? "none" : "none",
            }}
          >
            {eyeStyle === "cute" && (
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: 3,
                  width: 8,
                  height: 8,
                  background: "#333",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>

          {/* Right eye */}
          <div
            style={{
              position: "absolute",
              bottom: 148,
              left: 76,
              width: 16,
              height: eyeStyle === "happy" ? 8 : 16,
              background: eyeStyle === "happy" ? "transparent" : "white",
              borderRadius: eyeStyle === "happy" ? "0 0 50% 50%" : "50%",
              border: eyeStyle === "happy" ? "3px solid white" : "none",
              borderTop: eyeStyle === "happy" ? "none" : "none",
            }}
          >
            {eyeStyle === "cute" && (
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: 5,
                  width: 8,
                  height: 8,
                  background: "#333",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* Closed eyes */}
          <div
            style={{
              position: "absolute",
              bottom: 152,
              left: 28,
              width: 16,
              height: 3,
              background: "white",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 152,
              left: 76,
              width: 16,
              height: 3,
              background: "white",
              borderRadius: 2,
            }}
          />
        </>
      )}

      {/* Nose */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 50,
          width: 18,
          height: 12,
          background: "#333",
          borderRadius: "50%",
        }}
      />

      {/* Smile */}
      <div
        style={{
          position: "absolute",
          bottom: 115,
          left: 42,
          width: 35,
          height: 18,
          borderRadius: "0 0 50% 50%",
          border: "3px solid #333",
          borderTop: "none",
          background: "transparent",
        }}
      />

      {/* Blush */}
      <div
        style={{
          position: "absolute",
          bottom: 125,
          left: 12,
          width: 20,
          height: 12,
          background: "#ffb6c1",
          borderRadius: "50%",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 125,
          left: 88,
          width: 20,
          height: 12,
          background: "#ffb6c1",
          borderRadius: "50%",
          opacity: 0.7,
        }}
      />

      {/* Bowtie or accessory */}
      {hasBowtie && (
        <div
          style={{
            position: "absolute",
            bottom: 95,
            left: 45,
            width: 30,
            height: 20,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 12,
              height: 18,
              background: bowtieColor,
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              width: 12,
              height: 18,
              background: bowtieColor,
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 5,
              width: 10,
              height: 10,
              background: bowtieColor,
              borderRadius: "50%",
            }}
          />
        </div>
      )}
    </div>
  );
};

// Jordi the Golden Retriever
const JordiDog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Run from right side
  const runProgress = interpolate(frame, [0, 100], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const x = interpolate(runProgress, [0, 1], [2100, 1300]);
  const bounce = Math.sin(frame * 0.6) * 12;
  const legSwing = Math.sin(frame * 0.6) * 20;

  // Tail wag
  const tailWag = Math.sin(frame * 0.8) * 25;

  // Tongue bounce
  const tongueLength = 15 + Math.sin(frame * 0.4) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 260 + bounce,
      }}
    >
      <div style={{ position: "relative", width: 180, height: 140 }}>
        {/* Tail */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: -15,
            width: 50,
            height: 20,
            background: "linear-gradient(90deg, #f4d03f, #daa520)",
            borderRadius: "50% 20% 20% 50%",
            transformOrigin: "right center",
            transform: `rotate(${tailWag - 20}deg)`,
          }}
        />

        {/* Body */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            width: 120,
            height: 80,
            background: "linear-gradient(180deg, #f4d03f 0%, #daa520 100%)",
            borderRadius: "50% 60% 40% 40%",
            border: "3px solid #b8860b",
          }}
        />

        {/* Belly */}
        <div
          style={{
            position: "absolute",
            bottom: 35,
            left: 50,
            width: 60,
            height: 40,
            background: "#fffef0",
            borderRadius: "50%",
          }}
        />

        {/* Back legs */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 25,
            width: 25,
            height: 45,
            background: "#f4d03f",
            borderRadius: "30%",
            transformOrigin: "top center",
            transform: `rotate(${legSwing}deg)`,
            border: "2px solid #b8860b",
          }}
        />

        {/* Front legs */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 100,
            width: 25,
            height: 50,
            background: "#f4d03f",
            borderRadius: "30%",
            transformOrigin: "top center",
            transform: `rotate(${-legSwing}deg)`,
            border: "2px solid #b8860b",
          }}
        />

        {/* Head */}
        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 110,
            width: 70,
            height: 65,
            background: "linear-gradient(180deg, #f4d03f 0%, #daa520 100%)",
            borderRadius: "50% 50% 40% 40%",
            border: "3px solid #b8860b",
          }}
        />

        {/* Snout */}
        <div
          style={{
            position: "absolute",
            bottom: 65,
            left: 150,
            width: 45,
            height: 35,
            background: "#fffef0",
            borderRadius: "50%",
            border: "2px solid #b8860b",
          }}
        />

        {/* Nose */}
        <div
          style={{
            position: "absolute",
            bottom: 85,
            left: 175,
            width: 18,
            height: 14,
            background: "#333",
            borderRadius: "50%",
          }}
        />

        {/* Tongue */}
        <div
          style={{
            position: "absolute",
            bottom: 55,
            left: 165,
            width: 15,
            height: tongueLength,
            background: "#ff9999",
            borderRadius: "0 0 50% 50%",
          }}
        />

        {/* Eyes */}
        <div
          style={{
            position: "absolute",
            bottom: 105,
            left: 125,
            width: 14,
            height: 14,
            background: "#333",
            borderRadius: "50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 2,
              left: 2,
              width: 5,
              height: 5,
              background: "white",
              borderRadius: "50%",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 105,
            left: 155,
            width: 14,
            height: 14,
            background: "#333",
            borderRadius: "50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 2,
              left: 2,
              width: 5,
              height: 5,
              background: "white",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Ears */}
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: 105,
            width: 25,
            height: 40,
            background: "#daa520",
            borderRadius: "50% 50% 50% 50%",
            transform: "rotate(-20deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 115,
            left: 160,
            width: 25,
            height: 35,
            background: "#daa520",
            borderRadius: "50%",
            transform: "rotate(20deg)",
          }}
        />

        {/* Collar */}
        <div
          style={{
            position: "absolute",
            bottom: 75,
            left: 115,
            width: 50,
            height: 12,
            background: "#e74c3c",
            borderRadius: 4,
          }}
        />

        {/* Collar tag */}
        <div
          style={{
            position: "absolute",
            bottom: 65,
            left: 135,
            width: 15,
            height: 18,
            background: "#f1c40f",
            borderRadius: "0 0 50% 50%",
          }}
        />
      </div>
    </div>
  );
};

// Floating hearts
const FloatingHearts: React.FC = () => {
  const frame = useCurrentFrame();

  const hearts = [
    { x: 920, y: 400, delay: 0, size: 30 },
    { x: 880, y: 350, delay: 10, size: 25 },
    { x: 970, y: 380, delay: 15, size: 20 },
    { x: 940, y: 300, delay: 25, size: 35 },
    { x: 900, y: 280, delay: 30, size: 22 },
  ];

  return (
    <>
      {hearts.map((heart, i) => {
        const progress = interpolate(frame - heart.delay, [0, 60], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const y = heart.y - progress * 100;
        const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
        const scale = interpolate(progress, [0, 0.3, 1], [0.5, 1.2, 1]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: heart.x + Math.sin(frame * 0.1 + i) * 10,
              top: y,
              fontSize: heart.size,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            ❤️
          </div>
        );
      })}
    </>
  );
};

// Sparkles effect
const Sparkles: React.FC = () => {
  const frame = useCurrentFrame();

  const sparkles = [
    { x: 850, y: 450 },
    { x: 1000, y: 420 },
    { x: 920, y: 500 },
    { x: 880, y: 380 },
    { x: 980, y: 480 },
  ];

  return (
    <>
      {sparkles.map((s, i) => {
        const twinkle = Math.sin(frame * 0.2 + i * 2) > 0.3;
        return twinkle ? (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              fontSize: 20,
            }}
          >
            ✨
          </div>
        ) : null;
      })}
    </>
  );
};

// Cute sun
const CuteSun: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.05) * 0.05;

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        right: 120,
        width: 120,
        height: 120,
        background: "radial-gradient(circle, #fff9c4 0%, #ffeb3b 50%, #ffc107 100%)",
        borderRadius: "50%",
        transform: `scale(${pulse})`,
        boxShadow: "0 0 60px #ffeb3b, 0 0 100px rgba(255, 193, 7, 0.5)",
      }}
    >
      {/* Sun face */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 30,
          width: 12,
          height: 12,
          background: "#ff9800",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 30,
          width: 12,
          height: 12,
          background: "#ff9800",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 65,
          left: 35,
          width: 50,
          height: 25,
          borderRadius: "0 0 50% 50%",
          border: "4px solid #ff9800",
          borderTop: "none",
        }}
      />
    </div>
  );
};

// Cloud component
const Cloud: React.FC<{ x: number; y: number; size: number; delay: number }> = ({
  x,
  y,
  size,
  delay,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin((frame + delay) * 0.02) * 15;

  return (
    <div
      style={{
        position: "absolute",
        left: x + drift,
        top: y,
        display: "flex",
        gap: -size * 0.3,
      }}
    >
      <div
        style={{
          width: size * 0.6,
          height: size * 0.6,
          background: "white",
          borderRadius: "50%",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          width: size,
          height: size * 0.7,
          background: "white",
          borderRadius: "50%",
          marginTop: -size * 0.2,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          width: size * 0.5,
          height: size * 0.5,
          background: "white",
          borderRadius: "50%",
          opacity: 0.9,
        }}
      />
    </div>
  );
};

// Flower component
const Flower: React.FC<{ x: number; y?: number; delay: number; color: string }> = ({
  x,
  delay,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sway = Math.sin((frame + delay) * 0.05) * 5;
  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 280,
        transform: `rotate(${sway}deg) scale(${Math.max(0, grow)})`,
        transformOrigin: "bottom center",
      }}
    >
      {/* Stem */}
      <div
        style={{
          width: 4,
          height: 40,
          background: "#27ae60",
          marginLeft: 13,
        }}
      />
      {/* Flower head */}
      <div
        style={{
          position: "absolute",
          top: -15,
          left: 0,
          width: 30,
          height: 30,
        }}
      >
        {[0, 72, 144, 216, 288].map((angle) => (
          <div
            key={angle}
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              background: color,
              borderRadius: "50%",
              left: 9 + Math.cos((angle * Math.PI) / 180) * 10,
              top: 9 + Math.sin((angle * Math.PI) / 180) * 10,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            background: "#f1c40f",
            borderRadius: "50%",
            left: 10,
            top: 10,
          }}
        />
      </div>
    </div>
  );
};

// Reunion text
const ReunionText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <h1
        style={{
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          fontSize: 72,
          color: "#e74c3c",
          textShadow: "4px 4px 0 white, 6px 6px 0 rgba(0,0,0,0.1)",
          margin: 0,
        }}
      >
        Together Again!
      </h1>
      <p
        style={{
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          fontSize: 32,
          color: "#8e44ad",
          marginTop: 10,
        }}
      >
        Laura, Bido & Jordi
      </p>
    </div>
  );
};
