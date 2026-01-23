import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene01_Intro } from "./scenes/Scene01_Intro";
import { Scene02_DogEnters } from "./scenes/Scene02_DogEnters";
import { Scene03_CuddleEnd } from "./scenes/Scene03_CuddleEnd";
import { FilmGrain } from "./components/FilmGrain";

const SCENE_01 = 180;
const SCENE_02 = 150;
const SCENE_03 = 120;

type SofaStoryProps = {
  audioEnabled?: boolean;
};

export const SofaStory: React.FC<SofaStoryProps> = ({ audioEnabled = false }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f2f2f2" }}>
      <Sequence from={0} durationInFrames={SCENE_01} premountFor={30}>
        <Scene01_Intro durationInFrames={SCENE_01} />
      </Sequence>
      <Sequence from={SCENE_01} durationInFrames={SCENE_02} premountFor={30}>
        <Scene02_DogEnters durationInFrames={SCENE_02} />
      </Sequence>
      <Sequence
        from={SCENE_01 + SCENE_02}
        durationInFrames={SCENE_03}
        premountFor={30}
      >
        <Scene03_CuddleEnd durationInFrames={SCENE_03} />
      </Sequence>
      {audioEnabled ? (
        <>
          <Audio src={staticFile("audio/lofi-chill.mp3")} volume={0.16} />
          <Sequence from={50} durationInFrames={60} premountFor={30}>
            <Audio src={staticFile("audio/inhale.mp3")} volume={0.2} />
          </Sequence>
          <Sequence from={90} durationInFrames={60} premountFor={30}>
            <Audio src={staticFile("audio/exhale.mp3")} volume={0.18} />
          </Sequence>
          <Sequence from={190} durationInFrames={90} premountFor={30}>
            <Audio src={staticFile("audio/dog-paws.mp3")} volume={0.24} />
          </Sequence>
          <Sequence from={250} durationInFrames={45} premountFor={30}>
            <Audio src={staticFile("audio/can-clink.mp3")} volume={0.3} />
          </Sequence>
          <Sequence from={360} durationInFrames={60} premountFor={30}>
            <Audio src={staticFile("audio/dog-huff.mp3")} volume={0.22} />
          </Sequence>
        </>
      ) : null}
      <FilmGrain />
    </AbsoluteFill>
  );
};
