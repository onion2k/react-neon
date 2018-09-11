import Tile from "./Tile.js";

import withNeon from "../src";
import Light from '../src/fx/Light';

const lightConfig = {
  type: "light"
};

const fx = new Light(lightConfig);

export default withNeon(Tile, fx);
