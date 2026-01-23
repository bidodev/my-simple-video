import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Subtitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 8, 3 * fps, 3 * fps + 10], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 72,
        pointerEvents: "none",
        opacity,
      }}
    >
      <div
        style={{
          padding: "16px 28px",
          borderRadius: 24,
          backgroundColor: "rgba(20, 16, 12, 0.55)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#f6f1e9",
          fontFamily: "\"Trebuchet MS\", \"Verdana\", sans-serif",
          fontSize: 32,
          letterSpacing: 0.4,
          boxShadow: "0 18px 32px rgba(0, 0, 0, 0.35)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
