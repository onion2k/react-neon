import React from "react";
import Tile from "./Tile.js";
import withNeon, { Torch } from "../../src/index.js";

class TorchTile extends React.Component {
  render(){
    return (
      <Tile bg="white">
        The secret to life is.
      </Tile>
    )
  }
};

const torchConfig = {
  type: "torch"
};

const fx = new Torch(torchConfig);

export default withNeon(TorchTile, fx);
