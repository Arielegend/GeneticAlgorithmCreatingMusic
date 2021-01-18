import React from "react";
import * as Tone from "tone";
import Box from "@material-ui/core/Box";

let synth;
let myLoop;
export function Loop() {
  function setup() {
    // console.log("clicked on Play!");

    // console.log("looperSynth -> ", looperSynth);
    // console.log("looperNote -> ", looperNote);
    // console.log("looperRapid -> ", looperRapid);
    // console.log("noteDuration -> ", noteDuration);
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

    switch (looperSynth) {
      case "AMFSynth":
        synth = new Tone.AMSynth().toDestination();
        break;

      case "MembraneSynth":
        synth = new Tone.MembraneSynth().toDestination();
        break;

      default:
        synth = new Tone.AMSynth().toDestination();
        break;
    }

    myLoop = new Tone.Loop(song, looperRapid);

    Tone.Transport.start(0);
    myLoop.start();
  }
  function song(time) {
    synth.triggerAttackRelease(looperNote, noteDuration, time);
  }
  function stop() {
    myLoop.stop();
  }

  const [looperSynth, setLooperSynth] = React.useState("MembraneSynth");
  const [looperNote, setLooperNote] = React.useState("E4");
  const [looperRapid, setLooperRapid] = React.useState("4n");
  const [noteDuration, setNoteDuration] = React.useState("4n");

  let rapid4nChoice = (
    <Box>
      {" "}
      <label>
        4n
        <input
          value="4n"
          type="radio"
          name="rapid"
          onChange={(e) => setLooperRapid(e.target.value)}
        ></input>
      </label>
    </Box>
  );
  let rapid8nChoice = (
    <Box>
      {" "}
      <label>
        8n
        <input
          value="8n"
          type="radio"
          name="rapid"
          onChange={(e) => setLooperRapid(e.target.value)}
        ></input>
      </label>
    </Box>
  );
  let rapidConst = (
    <div>
      <label>
        {"Looper Call "}
        {rapid4nChoice}
        {rapid8nChoice}
      </label>
    </div>
  );

  let duration4nChoice = (
    <Box>
      {" "}
      <label>
        4n
        <input
          value="4n"
          type="radio"
          name="duration"
          onChange={(e) => setNoteDuration(e.target.value)}
        ></input>
      </label>
    </Box>
  );
  let duration8nChoice = (
    <Box>
      {" "}
      <label>
        8n
        <input
          value="8n"
          type="radio"
          name="duration"
          onChange={(e) => setNoteDuration(e.target.value)}
        ></input>
      </label>
    </Box>
  );
  let durationConst = (
    <div>
      <label>
        {"Note dudration "}
        {duration4nChoice}
        {duration8nChoice}
      </label>
    </div>
  );

  let AMFsynthChoice = (
    <Box>
      <label>
        AMF
        <input
          value="AMFSynth"
          type="radio"
          name="synth"
          onChange={(e) => setLooperSynth(e.target.value)}
        ></input>
      </label>
    </Box>
  );
  let MembraneSynthChoice = (
    <Box>
      <label>
        MembraneSynth
        <input
          value="MembraneSynth"
          type="radio"
          name="synth"
          onChange={(e) => setLooperSynth(e.target.value)}
        ></input>
      </label>
    </Box>
  );
  let synthConst = (
    <div>
      {AMFsynthChoice}
      {MembraneSynthChoice}
    </div>
  );
  let noteConst = (
    <div>
      <Box>
        <label>Note</label>
        <input onChange={(e) => setLooperNote(e.target.value)}></input>
      </Box>
    </div>
  );

  return (
    <div>
      <h5>Looper</h5>

      <Box
        display="flex"
        flexDirection="row"
        // p={1}
        // m={1}
        justifyContent="center"
      >
        <Box>{synthConst}</Box>
        <Box>{noteConst}</Box>
        <Box>{rapidConst}</Box>
        <Box>{durationConst}</Box>
      </Box>
      <button onClick={() => setup()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
}
