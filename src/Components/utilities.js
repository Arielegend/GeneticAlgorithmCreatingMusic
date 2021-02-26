import * as Tone from "tone";

export const ColoredLineBig = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

export const ColoredLineSmall = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
    }}
  />
);

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function customLog(message, color = "black") {
  switch (color) {
    case "success":
      color = "Green";
      break;
    case "info":
      color = "Blue";
      break;
    case "error":
      color = "Red";
      break;
    case "warning":
      color = "Orange";
      break;
    default:
      break;
  }

  console.log(`%c${message}`, `color:${color}`);
}

function getMidiNote(freq) {
  return Tone.Frequency(freq, "midi").toNote();
}

export function playSequence(sequence) {
  const synth = new Tone.PolySynth().toDestination();
  const now = Tone.now();
  let d = 0.5;
  synth.volume.value = -15;

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
