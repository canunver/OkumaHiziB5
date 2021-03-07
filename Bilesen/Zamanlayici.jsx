class Zamanlayici {
  constructor(id, miliSaniye, callBack) {
    this.id = id;
    this.miliSaniye = miliSaniye;
    this.callBack = callBack;
  }

  baslat = () => {
    this.timer = setInterval(this.zamanGeldi, this.miliSaniye);
    this.baslaZaman = Date.now();
  };

  zamanGeldi = () => {
    var gecenSure = Date.now() - this.baslaZaman;
    this.callBack(this.id, gecenSure);
  };

  bitir = () => {
    clearInterval(this.timer);
  };
}

export default Zamanlayici;
