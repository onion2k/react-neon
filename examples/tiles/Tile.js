import React, { Component } from "react";

class Tile extends Component {
  render() {
    return (
        <div style={{ width: '100%', height: '33.333vh', backgroundColor: this.props.bg || "black" }} { ...this.props }/>
    );
  }
}

export default Tile;
