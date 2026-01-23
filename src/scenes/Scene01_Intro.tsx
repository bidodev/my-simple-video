import {
  AbsoluteFill,
  interpolate,
  Sequence,
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
import { SmokeStack } from "../components/SmokePuff";
import { Subtitle } from "../components/Subtitle";

export const Scene01_Intro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parallax = Math.sin((frame / fps) * 0.6) * 1;
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
      />
      <Character
        variant="boy"
        x={900 + characterShift}
        y={670}
        rotation={3}
        showJoint
      />
      <SmokeStack x={1060 + characterShift} y={610} />
      <CoffeeTable parallax={parallax} />
      <ForegroundEdge parallax={parallax} />
      <Sequence from={30} durationInFrames={120} premountFor={fps}>
        <Subtitle text="Ein ruhiger Abend in der Wohnung." />
      </Sequence>
    </AbsoluteFill>
  );
};
