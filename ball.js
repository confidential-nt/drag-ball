import { getRandomIntInclusive } from "./script.js";

class Ball {
  constructor(RADIUS, width, height) {
    this.RADIUS = RADIUS;
    this.x = getRandomIntInclusive(RADIUS, width - RADIUS);
    this.y = getRandomIntInclusive(RADIUS, height - RADIUS);
  }
}

export default Ball;
