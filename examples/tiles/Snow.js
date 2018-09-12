import React from "react";
import Tile from "./Tile.js";
import withNeon, { Snow } from "../../src/index.js";

class SnowTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?snow" />
    )
  }
};

const fx = new Snow();

export default withNeon(SnowTile, fx);
