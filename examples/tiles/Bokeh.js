import React from "react";
import Tile from "./Tile.js";
import withNeon, { Bokeh } from "../../src/index.js";

class BokehTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?b" />
    )
  }
};

const fx = new Bokeh();

export default withNeon(BokehTile, fx);
