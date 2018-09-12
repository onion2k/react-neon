import Tile from "./Tile.js";

import withNeon, { Particles } from "../../src/index.js";

const particlesConfig = {
  type: "particles",
  mouseMoveCount: 4,
  clickMoveCount: 4,
  color: ["0", "100%", "100%"]
};

const fx = new Particles(particlesConfig);

export default withNeon(Tile, fx);
