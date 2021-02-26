"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("./../utilities");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
At creating Gene,
We first build its goal.
than, at creation of the Gene,
At random and from given,
after having goal, 
we generate the Gene's Items at Random method. 
(Only Once, at creating Population at begining.)
*/
var Gene =
/*#__PURE__*/
function () {
  function Gene(sequenceGoal, items, geneItemsLength, fitnessInput, mateInput, mutateInput) {
    _classCallCheck(this, Gene);

    this.sequence = sequenceGoal;
    this.cost = 999999;
    this.items = items;
    this.fitnessInput = fitnessInput;
    this.mateInput = mateInput;
    this.mutateInput = mutateInput;
    this.geneItemsLength = geneItemsLength;
  } //at random Method,
  //we initialize all new Genese being constructed at the constructor of POPULATION
  //this method constract the ITEMS for each new Gen we build at very first initialization of population
  //for each new Gen, construct its ITEMS field to be a fixed starting array, at the givvern length size


  _createClass(Gene, [{
    key: "random",
    value: function random() {
      var length = this.geneItemsLength;

      while (length--) {
        //random index of sequence field (the inital array givven for this Gene)
        var rand = Math.floor(Math.random() * this.sequence.length); //setting this gene Items at the size of desired length

        this.items.push(this.sequence[rand]);
      }
    }
  }, {
    key: "mutate",
    value: function mutate() {
      var chanceToMutate = this.mutateInput.mutateProp;
      if (Math.random() > chanceToMutate) return;
      var index = Math.floor(Math.random() * this.items.length);
      var mutateItem = this.getRandomNoteFromGivenArray(this.mutateInput.mutateNotesConst);
      var newItem = [];

      for (var i = 0; i < this.items.length; i++) {
        if (i === index) newItem.push(mutateItem);else newItem.push(this.items[i]);
      }

      this.items = newItem;
    } //Helper Function.
    //Recives an array of notes, return a single note from it.
    //This function is being called at mutate function.

  }, {
    key: "getRandomNoteFromGivenArray",
    value: function getRandomNoteFromGivenArray(notesArray) {
      return notesArray[(0, _utilities.getRandomInt)(0, notesArray.length - 1)];
    }
    /*
    At Generation method, erach generation we take 2 highest members, and crossing between them.
    Creating new kids, as requested under Mate Inputs to Algorithm.
      We do it by randomly choosing pivot from first gene,
    Concating it with the reverse of the second. 
      At the end, we return an Array at length of desired new kids for each generation input,
    Replacing that amount at the existing population, at each generation :)  
    */

  }, {
    key: "crossOver",
    value: function crossOver(otherGene) {
      var numOfNewKids = this.mateInput.mateNumber;
      var kids = [];

      for (var i = 0; i < numOfNewKids; i++) {
        var pivot = Math.round(this.items.length / 2) - 1;
        var temp = this.items.slice(0, pivot).concat(otherGene.items.slice(pivot));
        kids.push(new Gene(this.sequenceGoal, temp, this.geneItemsLength, this.fitnessInput, this.mateInput, this.mutateInput));
      }

      return kids;
    }
  }, {
    key: "fitness",
    value: function fitness(comparableItem) {
      var total = 0;

      for (var i = 0; i < this.items.length; i++) {
        total += (this.items[i] - comparableItem[i]) * (this.items[i] - comparableItem[i]);
      }

      if (Math.random() < this.fitnessInput.defaultCostPropability) {
        this.cost = this.fitnessInput.defaultcost;
      } else this.cost = total;
    }
  }]);

  return Gene;
}();
/*
When calling Population constructor, we first check weather input as goal is RANDOM. 
1. Random is True:
                  Setting goal from range of given midi, at given length. 
2. Random is False:
                  Setting goal from Piano
*/


var Population =
/*#__PURE__*/
function () {
  function Population(goal, initialGoalInputs, initialPopulationInputs, fitnessInput, mateInput, mutateInput) {
    _classCallCheck(this, Population);

    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;
    this.mateInput = mateInput;
    this.mutateInput = mutateInput;

    if (initialGoalInputs.initalPoulationRandom) {
      this.setUpRandomPoulation(initialGoalInputs, initialPopulationInputs, fitnessInput, mateInput, mutateInput);
    } else {
      this.setUpPopulationFromGoal(goal, initialPopulationInputs, fitnessInput, mateInput, mutateInput);
    }
  }
  /*
  User has givven goal to Algorithm using the piano.
  */


  _createClass(Population, [{
    key: "setUpPopulationFromGoal",
    value: function setUpPopulationFromGoal(goal, initialPopulationInputs, fitnessInput, mateInput, mutateInput) {
      var populationSize = initialPopulationInputs.populationSize; // Building population at size of populationSize variable.

      while (populationSize > 0) {
        var geneItemsLength = initialPopulationInputs.geneItemsLength; //Setting up new gene, with goal given by user,
        //At Instancing, the 'Items' parameter of the Gene is empty array.

        var gene = new Gene(goal, [], geneItemsLength, fitnessInput, mateInput, mutateInput); //Only after having goal, we intance new items for the gene, for the first time.

        gene.random();
        this.members.push(gene);
        populationSize -= 1;
      }
    }
  }, {
    key: "setUpRandomPoulation",
    value: function setUpRandomPoulation(initialGoalInputs, initialPopulationInputs, fitnessInput, mateInput, mutateInput) {
      var populationSize = initialPopulationInputs.populationSize;

      while (populationSize > 0) {
        //Since we random buildong our population. Each gene will have its own random Goal (withing range of midis, and same length)
        var newMemberGoal = this.getRandomMember(initialGoalInputs.minRandomValue, initialGoalInputs.maxRandomValue, initialGoalInputs.geneSequenceLength); //Setting up new gene, with goal given by getRandomMember,
        //At Instancing, the 'Items' parameter of the Gene is empty array.

        var temp = new Gene(newMemberGoal, [], initialPopulationInputs.geneItemsLength, fitnessInput, mateInput, mutateInput); //Only after having goal, we intance new items for the gene, for the first time.

        temp.random();
        this.members.push(temp);
        populationSize -= 1;
      }
    } //Helper function
    //Being called form Random creation.
    //Returning an array representing random notes from range, at a given length.

  }, {
    key: "getRandomMember",
    value: function getRandomMember(min, max, sizeOfSequenceOfGens) {
      var newMember = [];
      var index = sizeOfSequenceOfGens;

      while (index > 0) {
        newMember.push((0, _utilities.getRandomInt)(Number(min), Number(max)));
        index -= 1;
      }

      return newMember;
    }
  }, {
    key: "sortMembersByCost",
    value: function sortMembersByCost() {
      this.members.sort(function (a, b) {
        return a.cost - b.cost;
      });
    }
  }, {
    key: "generation",
    value: function generation() {
      var _this$members;

      //for each member calculating it fittness value
      for (var i = 0; i < this.members.length; i++) {
        this.members[i].fitness(this.goal);
      } //Sorts the members by their costs..


      this.sortMembersByCost(); //after sorting the array
      //taking the two "best" scores

      var childrens = this.members[0].crossOver(this.members[1]);
      var numOfNewKids = this.mateInput.mateNumber; // we delete last numOfNewKids not imporatant members,
      //And instead putting all the new kids we just created

      (_this$members = this.members).splice.apply(_this$members, [this.members.length - numOfNewKids, numOfNewKids].concat(_toConsumableArray(childrens))); //looping at all members, mutating


      for (var _i = 0; _i < this.members.length; _i++) {
        //creating mutations
        this.members[_i].mutate(); //refiitting


        this.members[_i].fitness(this.goal);

        if (this.members[_i].items === this.goal) {
          //Entered here when reached a perfect shot at givven goal.
          //so we sort this generation (cause its good)
          //returning the 1 with best
          this.sortMembersByCost();
          return true;
        }
      }

      this.generationNumber++;
    }
  }]);

  return Population;
}();

var _default = Population;
exports["default"] = _default;