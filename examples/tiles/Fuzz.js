import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class FuzzTile extends React.Component {
  render(){
    return (
      <div style={{ backgroundImage: "url(https://source.unsplash.com/random?fuzz)" }}></div>
    )
  }
};

const effect = new fx.Fuzz({ type: "fuzz", size: 30 });
const Fuzz = withNeon(FuzzTile, effect);

class fuzzTileWrapper extends React.Component {
  render(){
    return (
      <Tile bg="white" className="one">
        <Fuzz />
      </Tile>
    )
  }
};

export default fuzzTileWrapper;
