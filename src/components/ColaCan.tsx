import React from "react";

type ColaCanProps = {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
};

export const ColaCan: React.FC<ColaCanProps> = ({
  x,
  y,
  rotation = 0,
  scale = 1,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 38,
        height: 70,
        borderRadius: 12,
        background: "#1b1b1b",
        border: "2px solid rgba(40, 36, 32, 0.8)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 5,
          width: 26,
          height: 12,
          borderRadius: 6,
          background: "#b0141a",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 5,
          width: 26,
          height: 22,
          borderRadius: 8,
          background: "#f5f5f5",
          color: "#1b1b1b",
          fontSize: 10,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: 0.6,
        }}
      >
        ZERO
      </div>
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 5,
          width: 26,
          height: 10,
          borderRadius: 6,
          background: "#b0141a",
        }}
      />
    </div>
  );
};
