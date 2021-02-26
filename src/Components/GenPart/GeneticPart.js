import React, { useState } from "react";
import Population from "./geneticAlgorithm";
import Box from "@material-ui/core/Box";
import {
  GoalInputs,
  defaultGoalInput,
} from "./InputsToAlgorithm/GoalInputs.js";
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
import { playSequence } from "../utilities";

export function GenPart(props) {
  const [clickPlayCounter, setClickPlayCounter] = useState(1);

  const [goalInput, setGoalInput] = useState(defaultGoalInput);
  const [initialPopulationInputs, setInitialPopulationInputs] = useState(
    defaultPopulationInputs
  );
  const [fitnessInput, setFitnessInput] = useState(defaultFitnessInput);
  const [mateInput, setMateInput] = useState(defaultMateInput);
  const [mutateInput, setMutateInput] = useState(defalutMutateInput);

  const [inputToAlgo, setInputToAlgo] = useState(props.notes);

  function GoGenetic() {
    // at the begining, we check the givven parametrs, to insure app will not crqash
    let parametrsAreValid = checkParametrs();

    if (!parametrsAreValid) {
      PrintInputs();
      alert(
        "Check your parametrs. Here are some tips:\n1.By default initial population is not random, so some inputs must be given from piano.\n2.Number of new kids cant be largen than size of population - 2.\n3.Remember to click set on piano buttons as well!\n4. All parametrs here have default values, you can always check them at the console\n5.Input's length to algorithm must be larger than 6.(True only if Random is False, which is by Default)\n6. For each change, make sure to hit set button"
      );
    } else {
      console.log(
        "%c Clicked on Play! here are settings for the algorithm... ",
        "background: #222; color: #bada55"
      );

      // this function prints inputs to Algorithm
      PrintInputs();

      let myPopulation = new Population(
        inputToAlgo,
        goalInput,
        initialPopulationInputs,
        fitnessInput,
        mateInput,
        mutateInput
      );

      TrainPopulation(initialPopulationInputs.numberGeneration, myPopulation);

      let lastGenMemberItems = myPopulation.members[0].items;
      console.log("Playing output notes -> ", lastGenMemberItems);
      playSequence(lastGenMemberItems);
    }
  }

  function checkParametrs() {
    if (!goalInput.initalPoulationRandom) return inputToAlgo.length > 0;
    return true;
  }

  // this function prints inputs to Algorithm
  function PrintInputs() {
    console.log("Counter clicking ", clickPlayCounter);
    console.log("Input to algorithm -> ", inputToAlgo);
    console.log("Initial population inputs -> ", initialPopulationInputs);
    console.log("Fitness input -> ", fitnessInput);
    console.log("Mate input -> ", mateInput);
    console.log("Mutate input -> ", mutateInput);
    console.log("");

    setClickPlayCounter(clickPlayCounter + 1);
  }

  React.useEffect(() => {
    setInputToAlgo(props.notes);
    return () => {};
  }, [props.notes]);

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
            <GoalInputs setGoalInput={setGoalInput} />
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
      {/* <Button onClick>SaveProfile</Button> */}
    </div>
  );
}

function TrainPopulation(numberGeneration, population) {
  for (let i = 0; i < numberGeneration; i++) {
    population.generation();
  }
}
