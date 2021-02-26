import React from "react";
import "./App.css";
import { GenPart } from "./Components/GenPart/GeneticPart";
import LooperPart from "./Components/LooperPart/LoopPart";
import { ColoredLineBig, ColoredLineSmall } from "./Components/utilities";
import PianoMan from "./Components/Piano/Pianorecorder";

function App() {
  const [notes, setNotes] = React.useState([]);
  return (
    <div className="App">
      <PianoMan setNotes={setNotes} />
      <ColoredLineSmall color="green" />

      <GenPart notes={notes} />
      <ColoredLineBig color="red" />

      <LooperPart />
    </div>
  );
}

export default App;
