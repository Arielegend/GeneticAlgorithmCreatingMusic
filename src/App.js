import React from "react";
import "./App.css";
import { GenPart } from "./Components/GenPart/GeneticPart";
import { Loop } from "./Components/LooperPart/MainLoop";
import { PolyLoop } from "./Components/LooperPart/MainLoopPoly";
import { ColoredLineBig, ColoredLineSmall } from "./Components/utilities";
import PianoMan from "./Components/Piano/Pianorecorder";

function App() {
  const [notes, setNotes] = React.useState([]);
  console.log("this is notes -> ", notes);
  return (
    <div className="App">
      <PianoMan setNotes={setNotes} />
      <ColoredLineSmall color="green" />

      <GenPart />
      <ColoredLineBig color="red" />

      <Loop />
      <ColoredLineSmall color="green" />

      <PolyLoop />
    </div>
  );
}

export default App;
