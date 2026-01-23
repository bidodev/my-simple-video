import { useCurrentFrame } from "remotion";

export const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const shiftX = (frame * 3) % 120;
  const shiftY = (frame * 5) % 120;
  const opacity = 0.08 + Math.sin(frame / 6) * 0.02;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, rgba(0,0,0,0.12) 1px, rgba(0,0,0,0.12) 2px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)",
        backgroundSize: "120px 120px",
        backgroundPosition: `${shiftX}px ${shiftY}px`,
        mixBlendMode: "soft-light",
        opacity,
      }}
    />
  );
};
