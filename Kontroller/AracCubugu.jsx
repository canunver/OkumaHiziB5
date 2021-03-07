import React, { Component } from "react";

class AracCubugu extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          width: "100%",
          marginTop: this.props.marginTop ? this.props.marginTop : "",
          backgroundColor: this.props.arkaRenk
            ? this.props.arkaRenk
            : "#C8C8C8",
          color: this.props.yaziRenk ? this.props.yaziRenk : "black",
          borderBottom: this.props.altCizgi ? "1px solid black" : "",
          borderTop: this.props.ustCizgi ? "1px solid black" : "",
          textAlign: this.props.center ? "center" : "left",
          position: "relative",
          height: this.props.height ? this.props.height : "",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default AracCubugu;
