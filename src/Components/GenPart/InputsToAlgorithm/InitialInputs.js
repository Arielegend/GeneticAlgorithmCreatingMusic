import React, { useState } from "react";
import Box from "@material-ui/core/Box";

export const defaultPopulationInputs = {
  populationSize: 4,
  numberGeneration: 12,
  geneItemsLength: 6,
};
export function InitInputs(props) {
  const [populationSize, setPopulationSize] = useState(4);

  const [numberGeneration, setNumberGeneration] = useState(12);
  const [geneItemsLength, setGeneItemsLength] = useState(6);

  // a variable that stores the length of the sequence variable we have for each Gene
  let geneItemsLengthConst = (
    <label>
      Gene Items length (Final output length){" "}
      <input
        type="number"
        onChange={(e) => setGeneItemsLength(Number(e.target.value))}
      ></input>
    </label>
  );

  let populationSizeConst = (
    <label>
      Population Size{" "}
      <input
        type="number"
        onChange={(e) => setPopulationSize(Number(e.target.value))}
      ></input>
    </label>
  );

  let numberOfGenerationConst = (
    <label>
      number of Generation{" "}
      <input
        type="number"
        onChange={(e) => setNumberGeneration(Number(e.target.value))}
      ></input>
    </label>
  );

  return (
    <div>
      <h5>Initial Population</h5>

      <Box>{populationSizeConst}</Box>
      <Box>{numberOfGenerationConst}</Box>
      <Box>{geneItemsLengthConst}</Box>

      <button
        onClick={() => {
          props.setInitialPopulationInput({
            populationSize: populationSize,
            numberGeneration: numberGeneration,
            geneItemsLength: geneItemsLength,
          });
        }}
      >
        Set
      </button>
    </div>
  );
}
