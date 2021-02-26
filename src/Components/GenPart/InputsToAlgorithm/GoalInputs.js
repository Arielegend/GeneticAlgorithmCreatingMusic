import React, { useState } from "react";
import Box from "@material-ui/core/Box";

export const defaultGoalInput = {
  initalPoulationRandom: false,

  minRandomValue: 58,
  maxRandomValue: 74,

  geneSequenceLength: 4,
};
export function GoalInputs(props) {
  const [initalPoulationRandom, setInitalPoulationRandom] = useState(false);

  const [minRandomValue, setMinRandomValue] = useState(58);
  const [maxRandomValue, setMaxRandomValue] = useState(74);

  const [geneSequenceLength, setGeneSequenceLength] = useState(4);

  let randomPopulation = (
    <div>
      <Box>
        <label>
          {" "}
          random?
          <input
            type="radio"
            value={true}
            name="randomPopulation"
            onChange={(e) =>
              setInitalPoulationRandom(e.target.value === "true")
            }
          />{" "}
          Yes
          <input
            type="radio"
            value={false}
            name="randomPopulation"
            Selected
            onChange={(e) => setInitalPoulationRandom(Number(e.target.value))}
          />{" "}
          No
        </label>
      </Box>
      <br />{" "}
      <Box>
        <Box>
          <label>
            If random, min midi{" "}
            <input
              type="number"
              onChange={(e) => setMinRandomValue(Number(e.target.value))}
            ></input>
          </label>
        </Box>

        <Box>
          <label>
            If random, max midi{" "}
            <input
              type="number"
              onChange={(e) => setMaxRandomValue(Number(e.target.value))}
            ></input>
          </label>
        </Box>
      </Box>
    </div>
  );

  //In case User chooses to initial population by random, from random
  let geneSequenceLengthConst = (
    <label>
      If random, goal length{" "}
      <input
        type="number"
        onChange={(e) => setGeneSequenceLength(Number(e.target.value))}
      ></input>
    </label>
  );

  return (
    <div>
      <h5>Goal </h5>
      <Box>{randomPopulation}</Box>
      <Box>{geneSequenceLengthConst}</Box>

      <button
        onClick={() => {
          props.setGoalInput({
            initalPoulationRandom: initalPoulationRandom,
            minRandomValue: minRandomValue,
            maxRandomValue: maxRandomValue,

            geneSequenceLength: geneSequenceLength,
          });
        }}
      >
        Set
      </button>
    </div>
  );
}
