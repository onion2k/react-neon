import Tile from "./Tile.js";

import withNeon, { Light } from "../../src/index.js";

const lightConfig = {
  type: "light"
};

const fx = new Light(lightConfig);

export default withNeon(Tile, fx);
