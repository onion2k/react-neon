import React, { Component } from "react";

class Tile extends Component {
  render() {
    const { children, className } = this.props;
    return (
        <div style={{
          backgroundColor: this.props.bg || "black",
          backgroundImage: this.props.bgIm ? `url(${ this.props.bgIm })` : "",
        }} children={children} className={className} />
    );
  }
}

export default Tile;
