import React, { useState } from "react";
import Box from "@material-ui/core/Box";

export const defalutMutateInput = {
  mutateProp: 0.5,
  mutateNotesConst: [60, 62, 66],
};

export function MutateInputs(props) {
  const [mutateProp, setMutateProp] = useState(0.5);
  const [mutateNotesConst, setMutateNotesConst] = useState();

  const MutatePropability = (
    <div>
      <label>Mutate propability</label>
      <input
        type="number"
        onChange={(e) => setMutateProp(e.target.value)}
      />{" "}
    </div>
  );

  function handleClickSet() {
    let notes = [];
    let ok = true;
    let index = 0;
    if (mutateNotesConst.length > 0) {
      while (ok) {
        let num = Number(mutateNotesConst[index] + mutateNotesConst[index + 1]);
        // console.log("num -> ", num);

        index = index + 3;
        notes.push(num);

        if (index >= mutateNotesConst.length - 1) ok = false;
      }
    }
    props.setMutateInput({
      mutateProp: mutateProp,
      mutateNotesConst: notes,
    });
  }

  const MutateNotes = (
    <div>
      <label>Mutate Notes</label>
      <input onChange={(e) => setMutateNotesConst(e.target.value)} />{" "}
    </div>
  );

  return (
    <div>
      <h5>Mutate</h5>
      <Box>
        {MutatePropability}
        {MutateNotes}
      </Box>
      <button onClick={handleClickSet}>Set</button>
    </div>
  );
}
