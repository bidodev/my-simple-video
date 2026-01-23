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

export const Scene02_DogEnters: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parallax = Math.sin((frame / fps) * 0.6 + 0.4) * 1;
  const warmFlicker = Math.sin((frame / fps) * 2) * 0.02;

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });
  const dogX = interpolate(enter, [0, 1], [2200, 1260]);
  const dogY = 760 + Math.sin((frame / fps) * 2) * 2;

  const placeStart = 70;
  const placeProgress = spring({
    frame: frame - placeStart,
    fps,
    config: { damping: 24, stiffness: 120 },
  });

  const canX = interpolate(placeProgress, [0, 1], [dogX + 70, 1120]);
  const canY = interpolate(placeProgress, [0, 1], [dogY + 10, 770]);
  const canRotate = interpolate(placeProgress, [0, 1], [-12, 4]);

  const glance = interpolate(frame, [20, 80], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const characterShift = parallax * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: "#f2f2f2", opacity }}>
      <ApartmentBackground parallax={parallax} warmFlicker={warmFlicker} />
      <SofaLayer parallax={parallax} />
      <Character
        variant="girl"
        x={420 + characterShift}
        y={660}
        rotation={-4}
        eyeOffsetX={glance}
      />
      <Character
        variant="boy"
        x={900 + characterShift}
        y={670}
        rotation={3}
        eyeOffsetX={glance}
        showJoint
      />
      <SmokeStack x={1060 + characterShift} y={610} intensity={0.95} />
      <Dog x={dogX} y={dogY} />
      <ColaCan x={canX} y={canY} rotation={canRotate} />
      <CoffeeTable parallax={parallax} />
      <ForegroundEdge parallax={parallax} />
      <Sequence from={20} durationInFrames={110} premountFor={fps}>
        <Subtitle text="Dann kommt ein süßer Golden Retriever..." />
      </Sequence>
    </AbsoluteFill>
  );
};
