import { useCurrentFrame, useVideoConfig } from "remotion";

type DogProps = {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  pose?: "standing" | "cuddle";
};

export const Dog: React.FC<DogProps> = ({
  x,
  y,
  scale = 1,
  rotation = 0,
  pose = "standing",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wag = Math.sin((frame / fps) * 4) * (pose === "cuddle" ? 4 : 10);

  if (pose === "cuddle") {
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 240,
          height: 140,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 40,
            width: 160,
            height: 70,
            borderRadius: 50,
            background: "#d8a55b",
            border: "2px solid rgba(40, 36, 32, 0.8)",
            boxShadow: "0 12px 18px rgba(0, 0, 0, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 30,
            width: 80,
            height: 70,
            borderRadius: "50%",
            background: "#e2b66c",
            border: "2px solid rgba(40, 36, 32, 0.8)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 18,
            width: 30,
            height: 44,
            borderRadius: "60% 60% 50% 50%",
            background: "#c58b42",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 2,
            top: 52,
            width: 44,
            height: 30,
            borderRadius: 20,
            background: "#e7bf79",
            border: "2px solid rgba(40, 36, 32, 0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 58,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#2f2a2a",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 170,
            top: 88,
            width: 34,
            height: 16,
            borderRadius: 10,
            background: "#c58b42",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 280,
        height: 160,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 50,
          width: 170,
          height: 70,
          borderRadius: 50,
          background: "#d8a55b",
          border: "2px solid rgba(40, 36, 32, 0.8)",
          boxShadow: "0 12px 18px rgba(0, 0, 0, 0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 36,
          width: 80,
          height: 70,
          borderRadius: "50%",
          background: "#e2b66c",
          border: "2px solid rgba(40, 36, 32, 0.8)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 24,
          width: 32,
          height: 44,
          borderRadius: "60% 60% 50% 50%",
          background: "#c58b42",
          transform: "rotate(-12deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 6,
          top: 58,
          width: 46,
          height: 30,
          borderRadius: 20,
          background: "#e7bf79",
          border: "2px solid rgba(40, 36, 32, 0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 64,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#2f2a2a",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 78,
          width: 48,
          height: 18,
          borderRadius: 12,
          background: "#c58b42",
          border: "2px solid rgba(40, 36, 32, 0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 104,
          width: 28,
          height: 24,
          borderRadius: 10,
          background: "#c58b42",
          border: "2px solid rgba(40, 36, 32, 0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 106,
          width: 28,
          height: 24,
          borderRadius: 10,
          background: "#c58b42",
          border: "2px solid rgba(40, 36, 32, 0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 106,
          width: 28,
          height: 24,
          borderRadius: 10,
          background: "#c58b42",
          border: "2px solid rgba(40, 36, 32, 0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 46,
          width: 60,
          height: 22,
          borderRadius: 14,
          background: "#d8a55b",
          transform: `rotate(${wag}deg)`,
          transformOrigin: "left center",
          border: "2px solid rgba(40, 36, 32, 0.6)",
        }}
      />
    </div>
  );
};
