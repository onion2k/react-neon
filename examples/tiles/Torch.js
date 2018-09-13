import React from "react";
import Tile from "./Tile.js";
import withNeon, { fx } from "../../src/index.js";

class TorchTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?t" />
    )
  }
};

export default withNeon(TorchTile, new fx.Torch());
