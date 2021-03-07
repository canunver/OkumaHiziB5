import React, { Component } from "react";

// Kullanım: <IsaretKutusu   .... />
// Özellikler:
// id: oluşacak input nesnesinin id'si
// etiket: Etiket metni
// checked: Alanın ilk değeri
// onChange: onChange eventi oluştuğunda çağrılacak kontrol, id ve event parametreleri verilecektir.
// etiketGenislik: Etiketin genişliği, verilmez ise 130px
// Örnek Kullanim <IsaretKutusu id='...' etiket='...' checked={...} onChange={...}/>
class IsaretKutusu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: "23px" }}>
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
          id={this.props.id}
          type="checkbox"
          checked={this.props.checked}
          style={{ display: "inline-block" }}
          onChange={(e) => {
            this.props.onChange(this.props.id, e);
          }}
        />
      </div>
    );
  }
}

export default IsaretKutusu;
