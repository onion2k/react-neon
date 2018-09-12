import React, { Component } from "react";

class Tile extends Component {
  render() {
    return (
        <div style={{
          backgroundSize: "cover",
          backgroundColor: this.props.bg || "black",
          backgroundImage: this.props.bgIm ? `url(${ this.props.bgIm })` : ""
        }}/>
    );
  }
}

export default Tile;
