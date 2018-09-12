import Tile from "./Tile.js";

import withNeon, { Torch } from "../../src/index.js";

const torchConfig = {
  type: "torch"
};

const fx = new Torch(torchConfig);

export default withNeon(Tile, fx);
