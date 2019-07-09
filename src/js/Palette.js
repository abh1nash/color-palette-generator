import { rgbToHsl, hslToRgb } from "./hsl-rgb";

class Palette {
  constructor(target, size, primaryColor) {
    this.primaryColor = rgbToHsl(
      primaryColor[0],
      primaryColor[1],
      primaryColor[2]
    );
    this.colors = this.triad();
    console.log(this.colors);
    this.size = size;
    this.ctx;
    this.setup(target);
  }

  setup(target) {
    let canvas = document.querySelector(target);
    this.ctx = canvas.getContext("2d");

    canvas.height = this.size;
    canvas.width = this.size;
  }

  complement() {
    return [
      this.primaryColor,
      ((this.primaryColor[0] * 360 + 180) % 360) / 360,
      this.primaryColor[1],
      1 - this.primaryColor[2]
    ];
  }

  triad() {
    let colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push([
        ((this.primaryColor[0] * 360 + i * 60) % 360) / 360,
        this.primaryColor[1],
        this.primaryColor[2]
      ]);
    }
    return colors;
  }

  show() {
    let start = -Math.PI / 2;
    let arcSize = (2 * Math.PI) / this.colors.length;

    for (let i = 0; i < this.colors.length; i++) {
      this.ctx.fillStyle = `hsl(${this.colors[i][0] * 360}, 
        ${this.colors[i][1] * 100}%, 
        ${this.colors[i][2] * 100}%)`;
      this.ctx.strokeStyle = "#fff";
      this.ctx.beginPath();
      this.ctx.lineTo(this.size / 2, this.size / 2);
      this.ctx.arc(
        this.size / 2,
        this.size / 2,
        this.size / 3,
        start,
        start + arcSize
      );
      this.ctx.lineTo(this.size / 2, this.size / 2);
      this.ctx.closePath();

      this.ctx.lineWidth = this.size / 15;
      this.ctx.stroke();
      this.ctx.fill();

      start += arcSize;
    }

    this.ctx.fillStyle = "#fff";
    this.ctx.beginPath();
    this.ctx.arc(this.size / 2, this.size / 2, this.size / 7, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

let j = new Palette("canvas", 300, [222, 82, 70]);

j.show();
