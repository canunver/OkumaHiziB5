import React, { Component } from "react";

// Kullanım: <MetinGirisi   .... />
// Özellikler:
// id: oluşacak input nesnesinin id'si
// etiket: Etiket metni
// value: Alanın ilk değeri
// onChange: onChange eventi oluştuğunda çağrılacak kontrol, id ve event parametreleri verilecektir.
// etiketGenislik: Etiketin genişliği, verilmez ise 130px
// alanGenislik: input alanın genişliği, verilmez ise 150px
// Örnek Kullanim <MetinGirisi id='mgAd' etiket='Ad' onChange={this.onChange} />
class MetinGirisi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: "25px" }}>
        <label
          htmlFor={this.props.id}
          style={{
            display: "inline-block",
            width:
              this.props.etiketGenislik !== undefined
                ? this.props.etiketGenislik
                : "130px",
          }}
        >
          {this.props.etiket}:
        </label>
        <input
          type="text"
          id={this.props.id}
          style={{
            display: "inline-block",
            width:
              this.props.alanGenislik !== undefined
                ? this.props.alanGenislik
                : "150px",
          }}
          value={this.props.value}
          onChange={(e) => {
            this.props.onChange(this.props.id, e);
          }}
        />
      </div>
    );
  }
}

export default MetinGirisi;
