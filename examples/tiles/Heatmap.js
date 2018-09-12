import Tile from "./Tile.js";

import withNeon, { Heatmap } from "../../src/index.js";

const heatmapConfig = {
  type: "heatmap"
};

const fx = new Heatmap(heatmapConfig);

export default withNeon(Tile, fx);
