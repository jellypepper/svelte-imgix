/**
 * Adapted from https://github.com/imgix/imgix.js/blob/main/src/targetWidths.js
 */
const INCREMENT_PERCENTAGE = 8;
const MAX_SIZE = 8192;

export function targetWidths() {
  const resolutions = [];
  let prev = 100;

  while (prev <= MAX_SIZE) {
    resolutions.push(2 * Math.round(prev / 2));
    prev *= 1 + (INCREMENT_PERCENTAGE / 100) * 2;
  }

  return resolutions;
}
