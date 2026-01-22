import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

type SimpleVideoProps = {
  title: string;
  subtitle: string;
};

export const SimpleVideo: React.FC<SimpleVideoProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, durationInFrames], [0, 360], {
    extrapolateRight: "clamp",
  });

  // Title entrance animation with spring
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle entrance (delayed)
  const subtitleProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(subtitleProgress, [0, 1], [50, 0]);

  // Exit animation
  const exitProgress = spring({
    frame,
    fps,
    delay: durationInFrames - 30,
    config: { damping: 200 },
  });

  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.8]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientProgress}deg, #667eea, #764ba2, #f093fb)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: exitOpacity,
          transform: `scale(${exitScale})`,
        }}
      >
        {/* Title */}
        <Sequence from={0} premountFor={fps}>
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 100,
              fontWeight: "bold",
              color: "white",
              textShadow: "4px 4px 8px rgba(0, 0, 0, 0.3)",
              margin: 0,
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
            }}
          >
            {title}
          </h1>
        </Sequence>

        {/* Subtitle */}
        <Sequence from={30} premountFor={fps}>
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 48,
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
              marginTop: 20,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
            }}
          >
            {subtitle}
          </p>
        </Sequence>

        {/* Decorative circles */}
        <Circle delay={15} x={-400} y={-200} size={150} />
        <Circle delay={25} x={350} y={180} size={100} />
        <Circle delay={35} x={-300} y={250} size={80} />
      </div>
    </AbsoluteFill>
  );
};

// Decorative animated circle component
const Circle: React.FC<{
  delay: number;
  x: number;
  y: number;
  size: number;
}> = ({ delay, x, y, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10 },
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "white",
        opacity,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }}
    />
  );
};
