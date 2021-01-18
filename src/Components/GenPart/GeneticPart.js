import React, { useState } from "react";

import * as Tone from "tone";
import Population from "./geneticAlgorithm";

// import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {
  SynthInputs,
  defaultSynthInputs,
} from "./InputsToAlgorithm/SynthInputs";
import {
  InitInputs,
  defaultPopulationInputs,
} from "./InputsToAlgorithm/InitialInputs";
import {
  FitnessInputs,
  defaultFitnessInput,
} from "./InputsToAlgorithm/FitnessInputs";
import { MateInputs, defaultMateInput } from "./InputsToAlgorithm/MateInputs";
import {
  MutateInputs,
  defalutMutateInput,
} from "./InputsToAlgorithm/MutateInputs";

import { Button } from "@material-ui/core";

export function GenPart() {
  const [initialPopulationInputs, setInitialPopulationInputs] = useState(
    defaultPopulationInputs
  );
  const [fitnessInput, setFitnessInput] = useState(defaultFitnessInput);
  const [mateInput, setMateInput] = useState(defaultMateInput);
  const [mutateInput, setMutateInput] = useState(defalutMutateInput);

  //starting notes length is 16
  const [inputToAlgo, setInputToAlgo] = useState([
    60,
    62,
    63,
    64,
    65,
    66,
    60,
    66,
    62,
  ]);

  // goal,
  // initialPopulationInputs,
  //
  function GoGenetic() {
    console.log(
      "%c Clicked on Play! here are settings... ",
      "background: #222; color: #bada55"
    );
    console.log("initialPopulationInputs -> ", initialPopulationInputs);
    console.log("fitnessInput -> ", fitnessInput);
    console.log("mateInput -> ", mateInput);
    console.log("mutateInput -> ", mutateInput);
    console.log("");
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("");

    let myPopulation = new Population(
      inputToAlgo,
      initialPopulationInputs,
      fitnessInput,
      mateInput,
      mutateInput
    );
    TrainPopulation(initialPopulationInputs.numberGeneration, myPopulation);


    let lastGenMemberItems = myPopulation.members[0].items;
    console.log("playing outPut -> ", lastGenMemberItems);
    playSequence(lastGenMemberItems);
  }

  return (
    <div>
      <h3>Gentic Algorithm</h3>
      <Box
        display="flex"
        flexDirection="row"
        // p={1}
        // m={1}
        justifyContent="space-around"
      >
        <div>
          {" "}
          <Box component="span" p={1}>
            {/* <SynthInputs setSynthInput={setSynthInputs} /> */}
          </Box>
          <Box component="span" p={1}>
            <InitInputs
              setInitialPopulationInput={setInitialPopulationInputs}
            />
          </Box>{" "}
        </div>
        <div>
          {" "}
          <Box component="span" p={1}>
            <FitnessInputs setFitnessInput={setFitnessInput} />
          </Box>{" "}
        </div>
        <div>
          {" "}
          <Box component="span" p={1}>
            <MateInputs setMateInput={setMateInput} />
          </Box>{" "}
          <Box component="span" p={1}>
            <MutateInputs setMutateInput={setMutateInput} />
          </Box>{" "}
        </div>
      </Box>

      <Button onClick={() => GoGenetic()}>
        {/* <Button onClick={() => createGenerations(inputToAlgo, numGeneraions)}> */}{" "}
        Play{" "}
      </Button>
      <Button onClick>SaveProfile</Button>
    </div>
  );
}

function TrainPopulation(numberGeneration, population) {
  for (let i = 0; i < numberGeneration; i++) {
    population.generation();
  }
}

function getMidiNote(freq) {
  return Tone.Frequency(freq, "midi").toNote();
}

function playSequence(sequence) {
  const synth = new Tone.PolySynth().toDestination();
  const now = Tone.now();
  let d = 0.5;

  for (let i = 0; i < sequence.length; i++) {
    let x = i % 3;
    switch (x) {
      case 1:
        synth.triggerAttackRelease(
          [getMidiNote(sequence[i])],
          "4n",
          now + i * d
        );
        break;

      case 2:
        synth.triggerAttackRelease(
          [getMidiNote(sequence[i])],
          "8n",
          now + i * d
        );
        break;

      default:
        synth.triggerAttackRelease(
          [getMidiNote(sequence[i])],
          "2n",
          now + i * d
        );
        break;
    }
  }
}
