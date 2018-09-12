import React from "react";
import Tile from "./Tile.js";
import withNeon, { Torch } from "../../src/index.js";

class tTile extends React.Component {
  render(){
    return (
      <div>
        The secret to life is.
      </div>
    )
  }
};

const torchConfig = {
  type: "torch"
};

const fx = new Torch(torchConfig);

export default withNeon(tTile, fx);
