import React from "react";
import Tile from "./Tile.js";
import withNeon, { fx } from "../../src/index.js";

class LightTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?l" />
    )
  }
};

const lightConfig = {
  type: "light"
};

const effect = new fx.Light(lightConfig);

export default withNeon(LightTile, effect);
