import { useCurrentFrame, useVideoConfig } from "remotion";

type CharacterProps = {
  variant: "girl" | "boy";
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  eyeOffsetX?: number;
  eyeOffsetY?: number;
  showJoint?: boolean;
};

const outline = "2px solid rgba(40, 36, 32, 0.8)";

export const Character: React.FC<CharacterProps> = ({
  variant,
  x,
  y,
  scale = 1,
  rotation = 0,
  eyeOffsetX = 0,
  eyeOffsetY = 0,
  showJoint = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breathe = Math.sin((frame / fps) * Math.PI) * 3;
  const direction = variant === "girl" ? 1 : -1;
  const gazeX = eyeOffsetX * direction;

  const palette =
    variant === "girl"
      ? {
          skin: "#f5d2b2",
          hair: "#f1d37a",
          hairShadow: "#e1bf61",
          top: "#9dc0ff",
          sleeve: "#8bb2f1",
          cheek: "#e7a295",
          eye: "#5ea6ff",
        }
      : {
          skin: "#e4c0a0",
          hair: "#7a4a2d",
          hairShadow: "#663a22",
          top: "#cbb7a0",
          sleeve: "#b89c84",
          cheek: "#c98572",
          eye: "#3a2d27",
        };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + breathe,
        width: 420,
        height: 200,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scaleX(${direction})`,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 90,
            width: 250,
            height: 90,
            borderRadius: 50,
            background: `linear-gradient(180deg, ${palette.top}, ${palette.sleeve})`,
            border: outline,
            boxShadow: "0 10px 16px rgba(0, 0, 0, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 110,
            width: 110,
            height: 40,
            borderRadius: 24,
            background: palette.sleeve,
            border: outline,
            transform: "rotate(-10deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 265,
            top: 20,
            width: 115,
            height: 115,
            borderRadius: "50%",
            background: palette.skin,
            border: outline,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 250,
            top: 5,
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: palette.hair,
            border: outline,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 250,
            top: 22,
            width: 120,
            height: 70,
            borderRadius: "50%",
            background: palette.hairShadow,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 288,
            top: 54,
            width: 26,
            height: 18,
            borderRadius: 9,
            background: "#ffffff",
            border: "1px solid rgba(40, 36, 32, 0.7)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 7 + gazeX,
              top: 4 + eyeOffsetY,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: palette.eye,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 13 + gazeX,
              top: 6 + eyeOffsetY,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#ffffff",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 318,
            top: 54,
            width: 26,
            height: 18,
            borderRadius: 9,
            background: "#ffffff",
            border: "1px solid rgba(40, 36, 32, 0.7)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 7 + gazeX,
              top: 4 + eyeOffsetY,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: palette.eye,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 13 + gazeX,
              top: 6 + eyeOffsetY,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#ffffff",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 300,
            top: 80,
            width: 30,
            height: 10,
            borderRadius: 8,
            background: palette.cheek,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 280,
            top: 86,
            width: 18,
            height: 6,
            borderRadius: 6,
            background: "#b6765e",
          }}
        />
        {variant === "boy" && (
          <>
            <div
              style={{
                position: "absolute",
                left: 270,
                top: 88,
                width: 70,
                height: 36,
                borderRadius: "0 0 40px 40px",
                background: palette.hairShadow,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 292,
                top: 106,
                width: 26,
                height: 10,
                borderRadius: 6,
                background: "#a56c54",
              }}
            />
          </>
        )}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 120,
            width: 60,
            height: 24,
            borderRadius: 12,
            background: palette.skin,
            border: outline,
            transform: "rotate(-8deg)",
          }}
        />
        {showJoint && (
          <div
            style={{
              position: "absolute",
              left: 90,
              top: 112,
              width: 26,
              height: 8,
              borderRadius: 6,
              background: "#f4f0e6",
              border: "1px solid rgba(40, 36, 32, 0.6)",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -4,
                top: -2,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#d4503b",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 6,
                top: 2,
                width: 8,
                height: 4,
                borderRadius: 2,
                background: "#6bbf6b",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
