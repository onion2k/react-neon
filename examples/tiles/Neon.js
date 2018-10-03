import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class NeonTile extends React.Component {
  render(){
    return (
      <div style={{ backgroundImage: "url(https://source.unsplash.com/random?neon)" }}></div>
    )
  }
};

const effect = new fx.Neon({ size: 20 });
effect.listenIntersection();
const Neon = withNeon(NeonTile, effect);

class neonTileWrapper extends React.Component {
  render(){
    return (
      <Tile bg="black" className="one">
        <Neon />
      </Tile>
    )
  }
};

export default neonTileWrapper;