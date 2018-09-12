import React from "react";
import Tile from "./Tile.js";
import withNeon, { Heatmap } from "../../src/index.js";

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

const fx = new Heatmap(heatmapConfig);

export default withNeon(HeatTile, fx);
