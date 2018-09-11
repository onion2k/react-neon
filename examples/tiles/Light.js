import Tile from "./Tile.js";

import withNeon from "../../src/index.js";
import Light from '../../src/fx/Light.js';

const lightConfig = {
  type: "light"
};

const fx = new Light(lightConfig);

export default withNeon(Tile, fx);
