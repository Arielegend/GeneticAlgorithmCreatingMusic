import { Tone } from "tone/build/esm/core/Tone";

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
      color = color;
  }

  console.log(`%c${message}`, `color:${color}`);
}
