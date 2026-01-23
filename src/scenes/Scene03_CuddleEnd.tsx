import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ApartmentBackground,
  CoffeeTable,
  ForegroundEdge,
  SofaLayer,
} from "../components/ApartmentSet";
import { Character } from "../components/Character";
import { Dog } from "../components/Dog";
import { SmokeStack } from "../components/SmokePuff";
import { Subtitle } from "../components/Subtitle";
import { ColaCan } from "../components/ColaCan";

export const Scene03_CuddleEnd: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parallax = Math.sin((frame / fps) * 0.6 + 0.7) * 1;
  const warmFlicker = Math.sin((frame / fps) * 2) * 0.02;

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const jumpFrames = 28;
  const jumpProgress = interpolate(frame, [0, jumpFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const jumpX = interpolate(jumpProgress, [0, 1], [1500, 1040]);
  const jumpY = interpolate(jumpProgress, [0, 0.5, 1], [760, 610, 680]);

  const settle = spring({
    frame: frame - jumpFrames,
    fps,
    config: { damping: 200 },
  });
  const settleY = interpolate(settle, [0, 1], [0, 12]);
  const settleRotate = interpolate(settle, [0, 1], [0, -6]);
  const settleScale = interpolate(settle, [0, 1], [1, 0.95]);

  const dogX = frame < jumpFrames ? jumpX : 1040;
  const dogY = frame < jumpFrames ? jumpY : 680 + settleY;
  const dogRotation = frame < jumpFrames ? 0 : settleRotate;
  const dogScale = frame < jumpFrames ? 1 : settleScale;

  const smokeIntensity = interpolate(frame, [0, durationInFrames], [0.9, 0.6]);
  const cameraScale = interpolate(frame, [0, durationInFrames], [1, 1.04]);

  const characterShift = parallax * 10;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f2f2f2",
        opacity,
        transform: `scale(${cameraScale})`,
        transformOrigin: "center",
      }}
    >
      <ApartmentBackground parallax={parallax} warmFlicker={warmFlicker} />
      <SofaLayer parallax={parallax} />
      <Character
        variant="girl"
        x={420 + characterShift}
        y={660}
        rotation={-4}
      />
      <Character
        variant="boy"
        x={900 + characterShift}
        y={670}
        rotation={3}
        showJoint
      />
      <Dog
        x={dogX}
        y={dogY}
        rotation={dogRotation}
        scale={dogScale}
        pose={frame < jumpFrames ? "standing" : "cuddle"}
      />
      <SmokeStack x={1060 + characterShift} y={610} intensity={smokeIntensity} />
      <ColaCan x={1120} y={770} rotation={4} />
      <CoffeeTable parallax={parallax} />
      <ForegroundEdge parallax={parallax} />
      <Sequence from={20} durationInFrames={90} premountFor={fps}>
        <Subtitle text="...und kuschelt sich dazu." />
      </Sequence>
    </AbsoluteFill>
  );
};
