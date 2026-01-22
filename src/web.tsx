import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SimpleVideo } from "./SimpleVideo";

const App = () => {
  return (
    <Player
      component={SimpleVideo}
      inputProps={{
        title: "Hello Remotion!",
        subtitle: "Creating videos with code",
      }}
      durationInFrames={150}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{
        width: 800,
        height: 450,
      }}
      controls
      autoPlay
      loop
    />
  );
};

createRoot(document.getElementById("root")!).render(<App />);
