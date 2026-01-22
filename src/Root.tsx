import { Composition } from "remotion";
import { SimpleVideo } from "./SimpleVideo";

export const RemotionRoot = () => {
  return (
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
  );
};
