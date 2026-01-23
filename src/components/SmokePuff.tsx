import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type SmokePuffProps = {
  startFrame: number;
  x: number;
  y: number;
  size?: number;
  driftX?: number;
  cycle?: number;
  intensity?: number;
};

export const SmokePuff: React.FC<SmokePuffProps> = ({
  startFrame,
  x,
  y,
  size = 26,
  driftX = -18,
  cycle = 90,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = ((frame - startFrame) % cycle + cycle) % cycle;
  const progress = local / cycle;

  if (frame < startFrame) return null;

  const rise = interpolate(progress, [0, 1], [0, -120]);
  const sway = Math.sin((frame / fps) * 1.3) * 6;
  const drift = interpolate(progress, [0, 1], [0, driftX]);
  const opacity = interpolate(progress, [0, 0.2, 1], [0, 0.45, 0]) * intensity;
  const scale = interpolate(progress, [0, 1], [0.6, 1.4]);

  return (
    <div
      style={{
        position: "absolute",
        left: x + drift + sway,
        top: y + rise,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.78)",
        opacity,
        transform: `scale(${scale})`,
        filter: "blur(0.6px)",
      }}
    />
  );
};

export const SmokeStack: React.FC<{
  x: number;
  y: number;
  intensity?: number;
}> = ({ x, y, intensity = 1 }) => {
  return (
    <>
      <SmokePuff startFrame={0} x={x} y={y} size={28} intensity={intensity} />
      <SmokePuff startFrame={18} x={x + 8} y={y + 4} size={22} intensity={intensity} />
      <SmokePuff startFrame={36} x={x - 6} y={y + 6} size={30} intensity={intensity} />
      <SmokePuff startFrame={54} x={x + 10} y={y + 2} size={20} intensity={intensity} />
    </>
  );
};
