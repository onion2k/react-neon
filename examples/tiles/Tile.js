import React, { Component } from "react";

class Tile extends Component {
  render() {
    return (
        <div style={{
          backgroundSize: "cover",
          backgroundColor: this.props.bg || "black",
          backgroundImage: this.props.bgIm ? `url(${ this.props.bgIm })` : "",
          display: "grid",
          padding: "30px",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gridGap: "30px"
        }} children={this.props.children} />
    );
  }
}

export default Tile;
