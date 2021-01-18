import React, { useState } from "react";
import Box from "@material-ui/core/Box";

export const defaultFitnessInput = {
  defaultcost: 500,
  defaultCostPropability: 0.5,
};

export function FitnessInputs(props) {
  const [defaultcost, setDefaultcost] = useState(500);
  const [defaultPropability, setDefaultPropability] = useState(0.5);

  let CostConst = (
    <lable>
      Default cost
      <input
        type="number"
        onChange={(e) => setDefaultcost(e.target.value)}
      ></input>
    </lable>
  );

  let propabilityCostConst = (
    <lable>
      Propability
      <input
        type="number"
        onChange={(e) => setDefaultPropability(e.target.value)}
      ></input>
    </lable>
  );
  return (
    <div>
      <h5>Fitness</h5>
      <Box>{CostConst}</Box>
      <Box>{propabilityCostConst}</Box>

      <button
        onClick={() => {
          props.setFitnessInput({
            defaultcost: defaultcost,
            defaultPropability: defaultPropability,
          });
        }}
      >
        Set
      </button>
    </div>
  );
}
