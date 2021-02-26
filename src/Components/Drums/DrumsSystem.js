import React from "react";
import * as Tone from "tone";
import "./styles.css";

const drums = new Tone.Sampler({
  c0: "kick.wav",
  d0: "clap.wav",
  e0: "hat.wav",
}).toDestination();

const synth = new Tone.PolySynth().toDestination();

const trackIndex = ["c0", "d0", "e0"];
const tracks = ["Kick", "Clap", "Hat", "Synth"];
Tone.Transport.bpm.value = 100;

const generateSteps = () => {
  let steps = [];
  for (let i = 0; i < 16; i++) {
    steps.push(0);
  }
  return steps;
};

const initialSteps = tracks.map((t) => ({
  name: t,
  steps: generateSteps(),
}));

export default function App() {
  let [playing, setPlaying] = React.useState(false);
  let [tracks, setTracks] = React.useState(initialSteps);
  let stepIndex = React.useRef(0);

  React.useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [playing]);

  React.useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat(function (time) {
      tracks.forEach((track, index) => {
        let step = track.steps[stepIndex.current];
        if (step === 1) {
          if (index === 3) {
            let chord =
              stepIndex.current < 7 ? ["c4", "d#4", "g4"] : ["a#3", "d4", "g4"];
            synth.triggerAttackRelease(chord, 0.5);
          } else {
            drums.triggerAttack(trackIndex[index]);
          }
        }
      });

      stepIndex.current = stepIndex.current > 14 ? 0 : stepIndex.current + 1;
    }, "16n");
  }, [tracks]);

  function handleHat() {
    setPlaying((playing) => !playing);
  }

  const updateStep = React.useCallback(
    function (trackIndex, stepIndex) {
      let newTracks = [...tracks];

      newTracks[trackIndex].steps[stepIndex] =
        newTracks[trackIndex].steps[stepIndex] === 0 ? 1 : 0;
      setTracks(newTracks);
    },
    [tracks, setTracks]
  );

  return (
    <div>
      <button type="button" onClick={handleHat}>
        {playing ? "Stop" : "Play"}
      </button>
      <div style={{ border: "1px solid gray", padding: 10, marginTop: 20 }}>
        {tracks.map((track, index) => {
          return (
            <div
              key={`track-${index}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ width: 100 }}>{track.name}</div>
              {track.steps.map((s, stepIndex) => {
                return (
                  <div
                    key={`step-${index}-${stepIndex}`}
                    onClick={() => {
                      updateStep(index, stepIndex);
                    }}
                    style={{
                      height: 20,
                      width: 15,
                      margin: 2,
                      background: s === 0 ? "gray" : "lightblue",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
