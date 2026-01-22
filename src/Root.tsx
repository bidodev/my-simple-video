import { Composition } from "remotion";
import { SimpleVideo } from "./SimpleVideo";
import { CosmicJourney } from "./CosmicJourney";
import { PandaReunion } from "./PandaReunion";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SimpleVideo"
        component={SimpleVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Hello Remotion!",
          subtitle: "Creating videos with code",
        }}
      />
      <Composition
        id="CosmicJourney"
        component={CosmicJourney}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PandaReunion"
        component={PandaReunion}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
