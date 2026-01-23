import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SimpleVideo } from "./SimpleVideo";
import { CosmicJourney } from "./CosmicJourney";
import { CosmicSofaStory } from "./CosmicSofaStory";
import { PandaReunion } from "./PandaReunion";
import { SofaHangout } from "./SofaHangout";
import { SofaStory } from "./SofaStory";
import { useState } from "react";

type VideoType = "panda" | "cosmic" | "cosmicstory" | "simple" | "sofa" | "story";

const App = () => {
  const [activeVideo, setActiveVideo] = useState<VideoType>("panda");

  const buttonStyle = (video: VideoType) => ({
    padding: "10px 20px",
    background: activeVideo === video ? "#ff6b9d" : "#333",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: activeVideo === video ? "bold" : "normal",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => setActiveVideo("panda")} style={buttonStyle("panda")}>
          Panda Reunion
        </button>
        <button onClick={() => setActiveVideo("cosmic")} style={buttonStyle("cosmic")}>
          Cosmic Journey
        </button>
        <button onClick={() => setActiveVideo("cosmicstory")} style={buttonStyle("cosmicstory")}>
          Cosmic Sofa Story
        </button>
        <button onClick={() => setActiveVideo("simple")} style={buttonStyle("simple")}>
          Simple Video
        </button>
        <button onClick={() => setActiveVideo("sofa")} style={buttonStyle("sofa")}>
          Sofa Hangout
        </button>
        <button onClick={() => setActiveVideo("story")} style={buttonStyle("story")}>
          Sofa Story
        </button>
      </div>

      {activeVideo === "panda" && (
        <Player
          component={PandaReunion}
          inputProps={{}}
          durationInFrames={240}
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
      )}

      {activeVideo === "cosmic" && (
        <Player
          component={CosmicJourney}
          inputProps={{}}
          durationInFrames={300}
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
      )}

      {activeVideo === "cosmicstory" && (
        <Player
          component={CosmicSofaStory}
          inputProps={{}}
          durationInFrames={450}
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
      )}

      {activeVideo === "simple" && (
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
      )}

      {activeVideo === "sofa" && (
        <Player
          component={SofaHangout}
          inputProps={{}}
          durationInFrames={360}
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
      )}

      {activeVideo === "story" && (
        <Player
          component={SofaStory}
          inputProps={{ audioEnabled: false }}
          durationInFrames={450}
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
      )}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
