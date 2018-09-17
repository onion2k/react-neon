import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class BokehTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?b" />
    )
  }
};

const effect = new fx.Bokeh();

export default withNeon(BokehTile, effect);
