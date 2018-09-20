import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class LightTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/featured/?night" />
    )
  }
};

const effect = new fx.Light({ startColor: 'hsla(0,100%,100%,0)', endColor: 'hsla(0,100%,0%,1)',  });
effect.listenMouse();

export default withNeon(LightTile, effect);
