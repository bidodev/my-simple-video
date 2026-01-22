import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SimpleVideo } from "./SimpleVideo";
import { CosmicJourney } from "./CosmicJourney";
import { useState } from "react";

const App = () => {
  const [activeVideo, setActiveVideo] = useState<"simple" | "cosmic">("cosmic");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setActiveVideo("cosmic")}
          style={{
            padding: "10px 20px",
            background: activeVideo === "cosmic" ? "#667eea" : "#333",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Cosmic Journey
        </button>
        <button
          onClick={() => setActiveVideo("simple")}
          style={{
            padding: "10px 20px",
            background: activeVideo === "simple" ? "#667eea" : "#333",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Simple Video
        </button>
      </div>

      {activeVideo === "cosmic" ? (
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
      ) : (
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
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
