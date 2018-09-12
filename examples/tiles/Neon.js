import React from "react";
import Tile from "./Tile.js";
import withNeon, { Neon } from "../../src/index.js";

class NeonTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?neon" />
    )
  }
};

const fx = new Neon();

export default withNeon(NeonTile, fx);
