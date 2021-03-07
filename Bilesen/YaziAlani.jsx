import React, { Component } from "react";
import "./YaziAlani.css";

class YaziAlani extends Component {
  state = {};
  render() {
    return (
      <div className="YaziAlani">
        {this.props.kelimeBilgi.map((item) => (
          <span key={item.id} className={item.sinif}>
            {item.harfler.replace(/ /g, "\u00A0")}
          </span>
        ))}
      </div>
    );
  }
}

export default YaziAlani;
