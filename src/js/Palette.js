import { rgbToHsl, hslToRgb } from "./hsl-rgb";
import { defaultCipherList } from "constants";

class Palette {
  constructor(target, size, primaryColor, harmony) {
    this.primaryColor = rgbToHsl(
      primaryColor[0],
      primaryColor[1],
      primaryColor[2]
    );
    switch (harmony) {
      case "analogous": {
        this.colors = this.analogous();
        break;
      }
      case "complement": {
        this.colors = this.complement();
        break;
      }
      case "triad": {
        this.colors = this.triad();
        break;
      }
      default: {
        this.colors = this.complement();
      }
    }

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
      [
        ((this.primaryColor[0] * 360 + 180) % 360) / 360,
        this.primaryColor[1],
        1 - this.primaryColor[2]
      ]
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

  analogous() {
    let colors = [];
    let variations = 3;
    for (let i = -30; i <= 30; i += 90 / variations) {
      colors.push([
        ((this.primaryColor[0] * 360 + i) % 360) / 360,
        this.primaryColor[1],
        this.primaryColor[2]
      ]);
    }
    return colors;
  }

  show() {
    this.ctx.clearRect(0, 0, this.size, this.size);

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

      this.ctx.lineWidth = this.size / 20;
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

export default Palette;
