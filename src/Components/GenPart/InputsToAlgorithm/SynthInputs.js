import React, { useState } from "react";
import Box from "@material-ui/core/Box";

export const defaultSynthInputs = { synthType: "FMSynth" };

export function SynthInputs(props) {
  const [synthType, setSynthType] = useState("FMSynth");
  let MySynthType = (
    <div>
      <Box>
        <input
          type="radio"
          value="FMSynth"
          name="typeOfSynth"
          onChange={(e) => setSynthType(e.target.value)}
        />{" "}
        FMSynth
      </Box>

      <Box>
        <input
          type="radio"
          value="AMSynth"
          name="typeOfSynth"
          onChange={(e) => setSynthType(e.target.value)}
        />{" "}
        AMSynth
      </Box>
    </div>
  );

  // props.setSynthInput({ synthType: synthType });

  return (
    <div>
      <h5>Synth</h5>
      {/* <Box>{MySynthType}</Box> */}
      <button
        onClick={() => {
          props.setSynthInput({ synthType: synthType });
        }}
      >
        Set
      </button>
    </div>
  );
}
