import { getRandomInt, customLog } from "./../utilities";

/*
    sequence            // the part we eighther initialize randomly, or y sampling a givven input
    items,              // the items that are being trained.. (output for each Gene)
    geneItemsLength,    // the length of the items attribute
    fitnessInput,       // {
                              defaultcost:        // setting a cost of a Gene by default value
                              defaultPropability: // the propability to do so (otherwise we go normal fittness)
                           }
    mateInput,          //{
                             mateNumber: number of new chiuldren to create,
                          }
    mutateInput         //{
                              mutateProp: the propability to mutate a specific Gene
                              mutateNotesConst: if mutating - mutate to a note from this array 
                          }   
*/
class Gene {
  constructor(
    sequence,
    items,
    geneItemsLength,
    fitnessInput,
    mateInput,
    mutateInput
  ) {
    this.sequence = sequence;
    this.cost = 999999;
    this.items = items;
    this.fitnessInput = fitnessInput;
    this.mateInput = mateInput;
    this.mutateInput = mutateInput;
    this.geneItemsLength = geneItemsLength;
  }

  //at random Method,
  //we initialize all new Genese being constructed at the constructor of POPULATION
  //this method constract the ITEMS for each new Gen we build at very first initialization of population
  //for each new Gen, construct its ITEMS field to be a fixed starting array, at the givvern length size
  random() {
    let length = this.geneItemsLength;
    while (length--) {
      //random index of sequence field (the inital array givven for this Gene)
      let rand = Math.floor(Math.random() * this.sequence.length);

      //setting this gene Items at the size of desired length
      this.items.push(this.sequence[rand]);
    }
  }

  mutate() {
    let chanceToMutate = this.mutateInput.mutateProp;
    if (Math.random() > chanceToMutate) return;

    var index = Math.floor(Math.random() * this.items.length);
    var mutateItem = this.getRandomNoteFromGivvenArray(
      this.mutateInput.mutateNotesConst
    );
    var newItem = [];
    for (let i = 0; i < this.items.length; i++) {
      if (i === index) newItem.push(mutateItem);
      else newItem.push(this.items[i]);
    }
    this.items = newItem;
  }

  getRandomNoteFromGivvenArray(notesArray) {
    return notesArray[getRandomInt(0, notesArray.length - 1)];
  }

  crossOver(otheGene) {
    let numOfNewKids = this.mateInput.mateNumber;
    let kids = [];

    for (let i = 0; i < numOfNewKids; i++) {
      var pivot = Math.round(this.items.length / 2) - 1;
      let temp = this.items.slice(0, pivot).concat(otheGene.items.slice(pivot));
      kids.push(
        new Gene(
          this.sequence,
          temp,
          this.geneItemsLength,
          this.fitnessInput,
          this.mateInput,
          this.mutateInput
        )
      );
    }
    return kids;
  }

  fitness(comparableItem) {
    var total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total +=
        (this.items[i] - comparableItem[i]) *
        (this.items[i] - comparableItem[i]);
    }

    if (Math.random() < this.fitnessInput.defaultCostPropability) {
      this.cost = this.fitnessInput.defaultcost;
    } else this.cost = total;
  }
}

/*
given size is length is input devided by 4
const initialPopulationInputs  {
      initalPoulationRandom: boolean,                 // start first population with random notes
      minRandomValue: number, maxRandomValue: number, // if YES random -> MIDI values range to generate  

      populationSize: number,                         // Population size
      numberGeneration: number,                       // Number of generation

      sizeOfSequenceOfGens: number,                   // how many cells to get at var Gene.sequence
      geneItemsLength :number                          //the length of items Array (Length of output)
                           }
*/
class Population {
  constructor(
    goal,
    initialPopulationInputs,
    fitnessInput,
    mateInput,
    mutateInput
  ) {
    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;
    this.mateInput = mateInput;
    this.mutateInput = mutateInput;

    if (initialPopulationInputs.initalPoulationRandom === "true") {
      this.setUpRandomPoulation(
        goal,
        initialPopulationInputs,
        fitnessInput,
        mateInput,
        mutateInput
      );
    } else {
      this.setUpPopulationFromGoal(
        goal,
        initialPopulationInputs,
        fitnessInput,
        mateInput,
        mutateInput
      );
    }
  }
  setUpPopulationFromGoal(
    goal,
    initialPopulationInputs,
    fitnessInput,
    mateInput,
    mutateInput
  ) {
    let populationSize = initialPopulationInputs.populationSize;

    let geneSequenceLength = initialPopulationInputs.geneSequenceLength;

    while (populationSize > 0) {
      let { index1, index2 } = this.getRandomRange(
        geneSequenceLength,
        goal.length
      );

      let sequece = goal.slice(index1, index2);
      let geneItemsLength = initialPopulationInputs.geneItemsLength;
      var gene = new Gene(
        sequece,
        [],
        geneItemsLength,
        fitnessInput,
        mateInput,
        mutateInput
      );
      gene.random();
      this.members.push(gene);
      populationSize -= 1;
    }
  }

  setUpRandomPoulation(
    goal,
    initialPopulationInputs,
    fitnessInput,
    mateInput,
    mutateInput
  ) {
    let populationSize = initialPopulationInputs.populationSize;
    while (populationSize > 0) {
      let newMember = this.getRandomMember(
        initialPopulationInputs.minRandomValue,
        initialPopulationInputs.maxRandomValue,
        initialPopulationInputs.sizeOfSequenceOfGens
      );
      let temp = new Gene(
        newMember,
        [],
        initialPopulationInputs.geneItemsLength,
        fitnessInput,
        mateInput,
        mutateInput
      );

      temp.random();
      this.members.push(temp);

      populationSize -= 1;
    }
  }

  getRandomRange(geneSequenceLength, goalLength) {
    if (geneSequenceLength === goalLength)
      return { index1: 0, index2: goalLength - 1 };

    let ok = true;

    if (geneSequenceLength < goalLength) {
      while (ok) {
        let index1 = getRandomInt(0, goalLength - 1);
        if (index1 + geneSequenceLength <= goalLength) {
          return { index1: index1, index2: index1 + geneSequenceLength };
        }
      }
    }
  }

  getRandomMember(min, max, sizeOfSequenceOfGens) {
    let newMember = [];
    let index = sizeOfSequenceOfGens;
    while (index > 0) {
      newMember.push(this.getRandomInt(Number(min), Number(max)));
      index -= 1;
    }

    return newMember;
  }

  sortMembersByCost() {
    // array of objects
    this.members.sort(function (a, b) {
      return a.cost - b.cost;
    });
  }

  generation() {
    //for each member calculating it fittness value
    for (let i = 0; i < this.members.length; i++) {
      this.members[i].fitness(this.goal);
    }

    //Sorts the members by their costs..
    this.sortMembersByCost();
    // this.printProcess();

    //after sorting the array
    //taking the two "best" scores
    var childrens = this.members[0].crossOver(this.members[1]);
    let numOfNewKids = this.mateInput.mateNumber;

    // we delete last numOfNewKids not imporatant members,
    //And instead putting all the new kids we just created
    this.members.splice(
      this.members.length - numOfNewKids,
      numOfNewKids,
      ...childrens
    );

    //looping at all members, mutating
    for (let i = 0; i < this.members.length; i++) {
      //creating mutations
      this.members[i].mutate();
      //refiitting
      this.members[i].fitness(this.goal);

      //! QUESTION
      //! Y THE ALGO WONT CONVERGE TO GOAL?
      if (this.members[i].items === this.goal) {
        //Entered here when reached a perfect shot at givven goal.
        //so we sort this generation (cause its good)
        //returning the 1 with best
        this.sortMembersByCost();
        // this.printProcess();
        return true;
      }
    }
    this.generationNumber++;
  }

  printProcess() {
    console.log("Generation:", this.generationNumber);
    for (var i = 0; i < this.members.length; i++) {
      console.log(
        "Item:",
        this.members[i].items,
        ", Cost:",
        this.members[i].cost
      );
    }
  }
}

export default Population;
