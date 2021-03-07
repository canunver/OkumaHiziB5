import React, { Component } from "react";

// Kullanım: <SecimKutusu   .... />
// Özellikler:
// id: oluşacak input nesnesinin id'si
// etiket: Etiket metni
// value: Alanın ilk değeri
// onChange: onChange eventi oluştuğunda çağrılacak kontrol, id ve event parametreleri verilecektir.
// etiketGenislik: Etiketin genişliği, verilmez ise 130px
// Örnek Kullanim <SecimKutusu id='...' etiket='...' value={...} liste={...} onChange={...}  />
class SecimKutusu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.etiketGenislik == undefined) this.genislik = "130px";
    else this.genislik = this.props.etiketGenislik;
  }

  render() {
    return (
      <div
        style={{
          height: this.props.height ? this.props.height : "27px",
          display: this.props.ayniSatir ? "inline-block" : "block",
          left: this.props.left ? this.props.left : "0px",
          position: this.props.position ? this.props.position : "",
          overflow: "hidden",
        }}
      >
        {this.genislik == "0" || this.genislik == "0px" ? (
          ""
        ) : (
          <label
            htmlFor={this.props.id}
            style={{
              overflow: "hidden",
              verticalAlign: "bottom",
              width: this.genislik,
              display: "inline-block",
            }}
          >
            {this.props.etiket}:
          </label>
        )}
        <select
          id={this.props.id}
          value={this.props.value}
          className={this.props.className ? this.props.className : ""}
          style={{
            display: "inline-block",
            width:
              this.props.kontrolGenislik !== undefined
                ? this.props.kontrolGenislik
                : "150px",
          }}
          onChange={(e) => {
            this.props.onChange(this.props.id, e);
          }}
        >
          {this.props.liste.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SecimKutusu;
