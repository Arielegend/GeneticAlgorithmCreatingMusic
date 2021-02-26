import React from "react";
import * as Tone from "tone";
import Box from "@material-ui/core/Box";

let synth;
let myLoop;
export function PolyLoop() {
  function setup() {
    let notes = [];
    let ok = true;
    let index = 0;
    console.log("looperNote -> ", looperNote);
    if (looperNote.length > 0) {
      while (ok) {
        let note = looperNote[index] + looperNote[index + 1];
        // console.log("num -> ", num);

        index = index + 3;
        notes.push(note);

        if (index >= looperNote.length - 1) ok = false;
      }
    }
    setNotesFixed(notes);

    console.log("fixed notes... -> ", notes);
    synth = new Tone.PolySynth().toDestination();
    synth.volume.value = -30;
    myLoop = new Tone.Loop(song, looperRapid);

    Tone.Transport.start(0);
    myLoop.start();
  }
  function song(time) {
    synth.triggerAttackRelease(notesFixed, noteDuration, time);
  }
  function stop() {
    myLoop.stop();
  }

  const [looperNote, setLooperNote] = React.useState(["E4"]);
  const [notesFixed, setNotesFixed] = React.useState([]);
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
      <h5>Poly Looper</h5>

      <Box
        display="flex"
        flexDirection="row"
        // p={1}
        // m={1}
        justifyContent="center"
      >
        <Box>{noteConst}</Box>
        <Box>{rapidConst}</Box>
        <Box>{durationConst}</Box>
      </Box>
      <button onClick={() => setup()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
}
