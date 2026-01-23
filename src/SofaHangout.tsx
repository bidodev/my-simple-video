import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

export const SofaHangout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const sunlight = interpolate(frame, [0, durationInFrames], [0, 40], {
    extrapolateRight: "clamp",
  });

  const roomGlow = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#efe8df" }}>
      <RoomBackground sunlight={sunlight} roomGlow={roomGlow} />
      <Sofa />
      <CoffeeTable />
      <Pillows />
      <Girl />
      <Boy />
      <Sequence from={0} premountFor={fps}>
        <SmokePuffs />
      </Sequence>
      <Sequence from={3 * fps} premountFor={fps}>
        <DogWithCola />
      </Sequence>
    </AbsoluteFill>
  );
};

const RoomBackground: React.FC<{ sunlight: number; roomGlow: number }> = ({
  sunlight,
  roomGlow,
}) => {
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #f3eee7 0%, #efe7dd 55%, #e1d6cb 55%, #d4c8bb 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 160,
          width: 520,
          height: 300,
          borderRadius: 24,
          background:
            "linear-gradient(180deg, rgba(135, 206, 235, 0.95) 0%, rgba(255, 248, 230, 0.9) 100%)",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)",
          border: "6px solid #f5f3f0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 140,
          right: 420,
          width: 6,
          height: 260,
          backgroundColor: "#f5f3f0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 140,
          right: 280,
          width: 6,
          height: 260,
          backgroundColor: "#f5f3f0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 140,
          width: 260,
          height: 160,
          borderRadius: 20,
          background: "#f7f4f0",
          boxShadow: "0 16px 28px rgba(0, 0, 0, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 160,
          width: 220,
          height: 120,
          borderRadius: 16,
          background:
            "linear-gradient(135deg, rgba(205, 140, 255, 0.55), rgba(255, 210, 160, 0.65))",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 220,
          background:
            "linear-gradient(90deg, rgba(198, 186, 173, 0.9), rgba(176, 165, 153, 0.9))",
          boxShadow: "0 -20px 40px rgba(0, 0, 0, 0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 240 + sunlight,
          width: 520,
          height: 120,
          background:
            "linear-gradient(90deg, rgba(255, 244, 214, 0.5), rgba(255, 244, 214, 0))",
          filter: "blur(6px)",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 260,
          left: 190,
          width: 160,
          height: 140,
          borderRadius: 16,
          background: "#d9c1a6",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 340,
          left: 200,
          width: 140,
          height: 120,
          borderRadius: "50% 50% 40% 40%",
          background: "#6f9d6c",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 380,
          left: 250,
          width: 120,
          height: 110,
          borderRadius: "50% 50% 40% 40%",
          background: "#5e8b5b",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 170,
          right: 720,
          width: 120,
          height: 220,
          background: "#d6c7b7",
          borderRadius: 12,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 700,
          width: 160,
          height: 80,
          borderRadius: "50% 50% 40% 40%",
          background: "#f4e6d1",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
          opacity: 0.9 + roomGlow * 0.1,
        }}
      />
    </AbsoluteFill>
  );
};

const Sofa: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 240,
        top: 590,
        width: 1440,
        height: 280,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 0,
          width: 1340,
          height: 150,
          borderRadius: 46,
          background: "#b5b5b5",
          boxShadow: "0 18px 28px rgba(0, 0, 0, 0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 80,
          width: 1440,
          height: 170,
          borderRadius: 46,
          background: "#9f9f9f",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -20,
          top: 70,
          width: 120,
          height: 180,
          borderRadius: 50,
          background: "#9a9a9a",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -20,
          top: 70,
          width: 120,
          height: 180,
          borderRadius: 50,
          background: "#9a9a9a",
        }}
      />
    </div>
  );
};

const Pillows: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 520,
          top: 640,
          width: 220,
          height: 140,
          borderRadius: 36,
          background: "#d8e0ff",
          boxShadow: "0 10px 16px rgba(0, 0, 0, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1220,
          top: 640,
          width: 240,
          height: 150,
          borderRadius: 36,
          background: "#f0d3b3",
          boxShadow: "0 10px 16px rgba(0, 0, 0, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 675,
          width: 60,
          height: 8,
          background: "#1f1f1f",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1240,
          top: 680,
          width: 60,
          height: 8,
          background: "#1f1f1f",
        }}
      />
    </>
  );
};

const Girl: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const breathe = Math.sin((frame / fps) * Math.PI) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: 470,
        top: 690 + breathe,
        width: 340,
        height: 160,
        transform: "rotate(-6deg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 40,
          width: 220,
          height: 90,
          borderRadius: 48,
          background: "#a8c7ff",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 64,
          width: 30,
          height: 18,
          borderRadius: 4,
          overflow: "hidden",
          background: "#000000",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 6,
            background: "#000000",
          }}
        />
        <div
          style={{
            width: "100%",
            height: 6,
            background: "#dd1b1b",
          }}
        />
        <div
          style={{
            width: "100%",
            height: 6,
            background: "#ffce3a",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 210,
          top: -10,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "#f3d7b2",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 190,
          top: -30,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "#f4d772",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 0,
          width: 120,
          height: 80,
          borderRadius: "50%",
          background: "#f4d772",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 238,
          top: 28,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#5ea3ff",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 268,
          top: 28,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#5ea3ff",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 252,
          top: 54,
          width: 24,
          height: 8,
          borderRadius: 8,
          background: "#d48b74",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 60,
          width: 36,
          height: 26,
          borderRadius: 12,
          background: "#f7e5cc",
          transform: "rotate(-8deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 64,
          width: 30,
          height: 6,
          borderRadius: 4,
          background: "#1f1f1f",
        }}
      />
    </div>
  );
};

const Boy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const breathe = Math.sin((frame / fps) * Math.PI + 1) * 3;

  return (
    <div
      style={{
        position: "absolute",
        left: 940,
        top: 710 + breathe,
        width: 360,
        height: 170,
        transform: "rotate(5deg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 50,
          width: 240,
          height: 100,
          borderRadius: 50,
          background: "#cbb7a0",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 88,
          width: 28,
          height: 18,
          borderRadius: 4,
          background: "#1d8b3d",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 3,
            width: 16,
            height: 12,
            background: "#f4c542",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 11,
            top: 6,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#2a4aa0",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          top: -5,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "#e7c9a6",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 12,
          top: -10,
          width: 120,
          height: 80,
          borderRadius: "50%",
          background: "#7a4a2d",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 40,
          width: 110,
          height: 70,
          borderRadius: "0 0 60px 60px",
          background: "#6b4026",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 30,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#2f2a2a",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 68,
          top: 30,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#2f2a2a",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 54,
          top: 58,
          width: 18,
          height: 6,
          borderRadius: 6,
          background: "#a05c45",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 70,
          width: 42,
          height: 20,
          borderRadius: 10,
          background: "#e7c9a6",
          transform: "rotate(8deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 74,
          width: 32,
          height: 4,
          borderRadius: 4,
          background: "#d9d9d9",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 73,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#c59d44",
        }}
      />
    </div>
  );
};

const SmokePuffs: React.FC = () => {
  const frame = useCurrentFrame();
  const puffDelays = [0, 20, 40, 60];

  return (
    <>
      {puffDelays.map((delay, index) => {
        const cycle = 90;
        const local = ((frame - delay) % cycle + cycle) % cycle;
        const progress = local / cycle;
        if (frame < delay) return null;

        const y = interpolate(progress, [0, 1], [0, -140]);
        const x = interpolate(progress, [0, 1], [0, -20]);
        const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.45, 0]);
        const scale = interpolate(progress, [0, 1], [0.6, 1.4]);

        return (
          <div
            key={`puff-${index}`}
            style={{
              position: "absolute",
              left: 1130 + index * 18 + x,
              top: 640 + y,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.75)",
              opacity,
              transform: `scale(${scale})`,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </>
  );
};

const CoffeeTable: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 980,
        top: 820,
        width: 260,
        height: 110,
        borderRadius: 28,
        background: "#8f7c6a",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 16,
          width: 200,
          height: 18,
          borderRadius: 10,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
    </div>
  );
};

const DogWithCola: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const approachDuration = 2 * fps;
  const jumpDuration = 1 * fps;
  const settleDuration = 1 * fps;

  const floorY = 820;
  const sofaY = 690;

  const approachProgress = interpolate(frame, [0, approachDuration], [0, 1], {
    extrapolateRight: "clamp",
  });
  const approachX = interpolate(approachProgress, [0, 1], [2200, 1280]);

  const jumpFrame = frame - approachDuration;
  const jumpProgress = interpolate(jumpFrame, [0, jumpDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const jumpY = interpolate(jumpProgress, [0, 0.5, 1], [
    floorY,
    floorY - 150,
    sofaY,
  ]);

  const settleFrame = frame - approachDuration - jumpDuration;
  const settleProgress = interpolate(
    settleFrame,
    [0, settleDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const settleX = interpolate(settleProgress, [0, 1], [1280, 1180]);
  const settleY = interpolate(settleProgress, [0, 1], [sofaY, sofaY + 12]);

  const x =
    frame < approachDuration
      ? approachX
      : frame < approachDuration + jumpDuration
      ? 1280
      : settleX;
  const y =
    frame < approachDuration
      ? floorY
      : frame < approachDuration + jumpDuration
      ? jumpY
      : settleY;

  const lieDown = spring({
    frame: settleFrame,
    fps,
    config: { damping: 200 },
  });
  const lieScale = interpolate(lieDown, [0, 1], [1, 0.92]);
  const lieRotate = interpolate(lieDown, [0, 1], [0, -6]);

  const dropStart = approachDuration + jumpDuration;
  const dropDuration = 20;
  const dropFrame = frame - dropStart;
  const dropProgress = interpolate(dropFrame, [0, dropDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const canX = interpolate(dropProgress, [0, 1], [x + 40, 1060]);
  const canY = interpolate(dropProgress, [0, 1], [y + 32, 790]);
  const canRotate = interpolate(dropProgress, [0, 1], [-12, 6]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 260,
          height: 140,
          transform: `scale(${lieScale}) rotate(${lieRotate}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 40,
            width: 160,
            height: 70,
            borderRadius: 50,
            background: "#d6a257",
            boxShadow: "0 10px 16px rgba(0, 0, 0, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 30,
            width: 80,
            height: 70,
            borderRadius: "50%",
            background: "#e0b26a",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 18,
            width: 36,
            height: 50,
            borderRadius: "60% 60% 50% 50%",
            background: "#c48b3f",
            transform: "rotate(-10deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -6,
            top: 48,
            width: 48,
            height: 32,
            borderRadius: 20,
            background: "#e8c07b",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 58,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#2f2a2a",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 54,
            width: 44,
            height: 18,
            borderRadius: 12,
            background: "#d6a257",
            transform: "rotate(16deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 96,
            width: 30,
            height: 20,
            borderRadius: 10,
            background: "#c48b3f",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 98,
            width: 30,
            height: 20,
            borderRadius: 10,
            background: "#c48b3f",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 54,
            top: 96,
            width: 30,
            height: 20,
            borderRadius: 10,
            background: "#c48b3f",
          }}
        />
      </div>
      <ColaZero x={canX} y={canY} rotation={canRotate} />
    </>
  );
};

const ColaZero: React.FC<{ x: number; y: number; rotation: number }> = ({
  x,
  y,
  rotation,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 36,
        height: 64,
        borderRadius: 12,
        background: "#151515",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 6,
          width: 24,
          height: 10,
          borderRadius: 6,
          background: "#b5121b",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 6,
          width: 24,
          height: 8,
          borderRadius: 6,
          background: "#f3f3f3",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 38,
          left: 6,
          width: 24,
          height: 10,
          borderRadius: 6,
          background: "#b5121b",
        }}
      />
    </div>
  );
};
