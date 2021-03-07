import React, { Component } from "react";
import HavaiFisek from "./HavaiFisek";
import Zamanlayici from "./Zamanlayici";
class HavaiFisekAlan extends Component {
  dizi = [];
  constructor(props) {
    super(props);
    this.state = {};
    this.dizi.push({ id: 0, yukseklik: "40" });
    this.state.dizi = this.dizi;

    this.zamanlayici = new Zamanlayici(1, 600, this.zamanGeldi);
  }

  zamanGeldi = () => {
    this.dizi.push({ id: this.dizi.length, yukseklik: "40" });
    this.setState({ dizi: this.dizi });
  };

  componentDidMount = () => {
    this.zamanlayici.baslat();
  };

  componentWillUnmount = () => {
    this.zamanlayici.bitir();
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            position: "absolute",
            display: "inline-block",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "300px",
            backgroundColor: "black",
            opacity: "0.5",
          }}
          onClick={(e) => this.props.onClick(e)}
        ></div>

        {this.state.dizi.map((hfb) => (
          <HavaiFisek key={hfb.id} id={hfb.id} yukseklik={hfb.yukseklik} />
        ))}
      </React.Fragment>
    );
  }
}

export default HavaiFisekAlan;
