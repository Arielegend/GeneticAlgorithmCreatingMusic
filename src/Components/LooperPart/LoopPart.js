import React from "react";
import { Loop } from "./MainLoop";
import { PolyLoop } from "./MainLoopPoly";
import { ColoredLineSmall } from "../utilities";

function LooperPart() {
  return (
    <div className="App">
      <Loop />
      <ColoredLineSmall color="green" />

      <PolyLoop />
    </div>
  );
}

export default LooperPart;
