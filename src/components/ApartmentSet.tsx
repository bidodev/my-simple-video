import { AbsoluteFill } from "remotion";

type LayerProps = {
  parallax: number;
  warmFlicker?: number;
};

export const ApartmentBackground: React.FC<LayerProps> = ({
  parallax,
  warmFlicker = 0,
}) => {
  const backShift = parallax * 4;
  const midShift = parallax * 7;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #f5efe7 0%, #efe6dc 50%, #e3d7cb 70%, #d8cbbf 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 160 + backShift,
          width: 520,
          height: 300,
          borderRadius: 26,
          background:
            "linear-gradient(180deg, rgba(122, 193, 235, 0.95) 0%, rgba(255, 240, 210, 0.85) 100%)",
          border: "6px solid #f9f4ef",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.14)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 110,
          right: 420 + backShift,
          width: 6,
          height: 260,
          backgroundColor: "#f9f4ef",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 110,
          right: 290 + backShift,
          width: 6,
          height: 260,
          backgroundColor: "#f9f4ef",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 150 + backShift,
          width: 260,
          height: 160,
          borderRadius: 18,
          background: "#f7f2ec",
          boxShadow: "0 18px 32px rgba(0, 0, 0, 0.12)",
          border: "2px solid rgba(60, 52, 46, 0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 170 + backShift,
          width: 220,
          height: 120,
          borderRadius: 14,
          background:
            "linear-gradient(135deg, rgba(255, 170, 120, 0.5), rgba(170, 150, 255, 0.5))",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 140,
          right: 730 + backShift,
          width: 120,
          height: 240,
          borderRadius: 16,
          background: "#dccfc2",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 110,
          right: 700 + backShift,
          width: 170,
          height: 90,
          borderRadius: "50% 50% 40% 40%",
          background: "#f6e9d7",
          border: "2px solid rgba(60, 52, 46, 0.6)",
          boxShadow: "0 16px 30px rgba(0, 0, 0, 0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 690 + backShift,
          width: 190,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 233, 196, 0.6) 0%, rgba(255, 233, 196, 0) 70%)",
          opacity: 0.35 + warmFlicker,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 250,
          background:
            "linear-gradient(90deg, rgba(200, 189, 175, 0.95), rgba(176, 165, 153, 0.95))",
          boxShadow: "0 -26px 40px rgba(0, 0, 0, 0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 290 + midShift,
          width: 580,
          height: 140,
          borderRadius: 90,
          background: "#e7d7c5",
          boxShadow: "0 16px 30px rgba(0, 0, 0, 0.18)",
          border: "2px solid rgba(60, 52, 46, 0.55)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 205,
          left: 340 + midShift,
          width: 480,
          height: 90,
          borderRadius: 80,
          background:
            "linear-gradient(90deg, rgba(255, 244, 214, 0.6), rgba(255, 244, 214, 0.1))",
        }}
      />
    </AbsoluteFill>
  );
};

export const SofaLayer: React.FC<{ parallax: number }> = ({ parallax }) => {
  const sofaShift = parallax * 10;
  return (
    <div
      style={{
        position: "absolute",
        left: 220 + sofaShift,
        top: 560,
        width: 1480,
        height: 320,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 0,
          width: 1340,
          height: 170,
          borderRadius: 46,
          background: "linear-gradient(180deg, #bdbdbd, #aaaaaa)",
          border: "2px solid rgba(40, 36, 32, 0.8)",
          boxShadow: "0 18px 28px rgba(0, 0, 0, 0.25)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 90,
          width: 1480,
          height: 190,
          borderRadius: 48,
          background: "linear-gradient(180deg, #a7a7a7, #9a9a9a)",
          border: "2px solid rgba(40, 36, 32, 0.8)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -24,
          top: 80,
          width: 120,
          height: 190,
          borderRadius: 50,
          background: "#9a9a9a",
          border: "2px solid rgba(40, 36, 32, 0.8)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -24,
          top: 80,
          width: 120,
          height: 190,
          borderRadius: 50,
          background: "#9a9a9a",
          border: "2px solid rgba(40, 36, 32, 0.8)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 330,
          top: 80,
          width: 240,
          height: 150,
          borderRadius: 40,
          background: "#d7e2ff",
          border: "2px solid rgba(40, 36, 32, 0.6)",
          boxShadow: "0 12px 22px rgba(0, 0, 0, 0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 980,
          top: 84,
          width: 250,
          height: 150,
          borderRadius: 40,
          background: "#f0d7c0",
          border: "2px solid rgba(40, 36, 32, 0.6)",
          boxShadow: "0 12px 22px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  );
};

export const CoffeeTable: React.FC<{ parallax: number }> = ({ parallax }) => {
  const frontShift = parallax * 14;
  return (
    <div
      style={{
        position: "absolute",
        left: 970 + frontShift,
        top: 810,
        width: 300,
        height: 130,
        borderRadius: 30,
        background: "linear-gradient(180deg, #907a67, #7f6c5b)",
        border: "2px solid rgba(40, 36, 32, 0.8)",
        boxShadow: "0 14px 28px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 20,
          width: 228,
          height: 16,
          borderRadius: 10,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
    </div>
  );
};

export const ForegroundEdge: React.FC<{ parallax: number }> = ({ parallax }) => {
  const frontShift = parallax * 16;
  return (
    <div
      style={{
        position: "absolute",
        left: -200 + frontShift,
        bottom: -40,
        width: 2400,
        height: 120,
        background:
          "linear-gradient(90deg, rgba(120, 106, 94, 0.7), rgba(140, 126, 114, 0.5))",
        filter: "blur(6px)",
      }}
    />
  );
};
