import React, { useState } from "react";
import Box from "@material-ui/core/Box";

export const defaultMateInput = {
  mateNumber: 2,
};

export function MateInputs(props) {
  const [mateNumber, setMateNumber] = useState();

  const Mate = (
    <div>
      <label>How many children to replace at each generation?</label>
      <input
        type="number"
        onChange={(e) => setMateNumber(Number(e.target.value))}
      />{" "}
    </div>
  );

  return (
    <div>
      <h5>Mate</h5>
      <Box>{Mate}</Box>
      <button
        onClick={() => {
          props.setMateInput({
            mateNumber: mateNumber,
          });
        }}
      >
        Set
      </button>
    </div>
  );
}
