import Tile from "./Tile.js";

import withNeon from "../src";
import Particles from "../src/fx/Particles.js";

const particlesConfig = {
  type: "particles",
  mouseMoveCount: 4,
  clickMoveCount: 4,
  color: ["0", "100%", "100%"]
};

const fx = new Particles(particlesConfig);

export default withNeon(Tile, fx);
