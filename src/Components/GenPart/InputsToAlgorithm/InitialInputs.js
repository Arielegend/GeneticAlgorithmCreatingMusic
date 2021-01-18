import React, { useState } from "react";
import Box from "@material-ui/core/Box";

export const defaultPopulationInputs = {
  initalPoulationRandom: false,
  populationSize: 4,

  minRandomValue: 0,
  maxRandomValue: 0,

  geneSequenceLength: 4,
  numberGeneration: 12,

  geneItemsLength: 6,
};
export function InitInputs(props) {
  const [initalPoulationRandom, setInitalPoulationRandom] = useState(false);
  const [populationSize, setPopulationSize] = useState(4);

  const [minRandomValue, setMinRandomValue] = useState(58);
  const [maxRandomValue, setMaxRandomValue] = useState(74);

  const [numberGeneration, setNumberGeneration] = useState(12);
  const [geneSequenceLength, setGeneSequenceLength] = useState(4);
  const [geneItemsLength, setGeneItemsLength] = useState(4);

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
            onChange={(e) => setInitalPoulationRandom(e.target.value)}
          />{" "}
          Yes
          <input
            type="radio"
            value={false}
            name="randomPopulation"
            Selected
            onChange={(e) => setInitalPoulationRandom(e.target.value)}
          />{" "}
          No
        </label>
      </Box>
      <Box>
        <Box>
          <label>
            min midi
            <input
              type="number"
              onChange={(e) => setMinRandomValue(e.target.value)}
            ></input>
          </label>
        </Box>

        <Box>
          <label>
            max midi
            <input
              type="number"
              onChange={(e) => setMaxRandomValue(e.target.value)}
            ></input>
          </label>
        </Box>
      </Box>
    </div>
  );

  // a variable that stores the length of the sequence variable we have for each Gene
  let geneSequenceLengthConst = (
    <label>
      Gene Sequence length
      <input
        type="number"
        onChange={(e) => setGeneSequenceLength(e.target.value)}
      ></input>
    </label>
  );

  // a variable that stores the length of the sequence variable we have for each Gene
  let geneItemsLengthConst = (
    <label>
      Gene Items length
      <input
        type="number"
        onChange={(e) => setGeneItemsLength(e.target.value)}
      ></input>
    </label>
  );

  let populationSizeConst = (
    <label>
      Population Size
      <input
        type="number"
        onChange={(e) => setPopulationSize(e.target.value)}
      ></input>
    </label>
  );

  let numberOfGenerationConst = (
    <label>
      number of Generation
      <input
        type="number"
        onChange={(e) => setNumberGeneration(e.target.value)}
      ></input>
    </label>
  );

  return (
    <div>
      <h5>Initial Population</h5>
      <Box>{randomPopulation}</Box>
      <br />

      <Box>{populationSizeConst}</Box>
      <Box>{numberOfGenerationConst}</Box>
      <br />
      <Box>{geneSequenceLengthConst}</Box>
      <Box>{geneItemsLengthConst}</Box>

      <button
        onClick={() => {
          props.setInitialPopulationInput({
            initalPoulationRandom: initalPoulationRandom,
            minRandomValue: minRandomValue,
            maxRandomValue: maxRandomValue,

            geneSequenceLength: geneSequenceLength,
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
