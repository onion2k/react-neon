import React from "react";
import Tile from "./Tile.js";
import withNeon, { Torch } from "../../src/index.js";

class TorchTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?t" />
    )
  }
};

const torchConfig = {
  type: "torch"
};

const fx = new Torch(torchConfig);

export default withNeon(TorchTile, fx);
