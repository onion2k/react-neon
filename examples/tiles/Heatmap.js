import React from "react";
import Tile from "./Tile.js";
import withNeon, { fx } from "../../src/index.js";

class HeatTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?heat" />
    )
  }
};

const heatmapConfig = {
  type: "heatmap"
};

const effect = new fx.Heatmap(heatmapConfig);

export default withNeon(HeatTile, effect);
