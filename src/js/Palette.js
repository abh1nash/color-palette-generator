import { rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb } from "./hsl-rgb";
import { defaultCipherList } from "constants";

class Palette {
  constructor(target, size, primaryColor, harmony, variations) {
    this.variations = variations;
    this.primaryColor = rgbToHsl(
      primaryColor[0],
      primaryColor[1],
      primaryColor[2]
    );

    switch (harmony) {
      case "analogous": {
        this.colors = this.shades(this.analogous());

        break;
      }
      case "complement": {
        this.colors = this.shades(this.complement());
        break;
      }
      case "triad": {
        this.colors = this.shades(this.triad());
        break;
      }
      case "compound": {
        this.colors = this.shades(this.compound());
        break;
      }
      default: {
        this.colors = this.shades(this.complement());
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

  analogous(color) {
    let colors = [];
    let temp = color || this.primaryColor;
    let variations = 3;
    for (let i = -30; i <= 30; i += 90 / variations) {
      colors.push([((temp[0] * 360 + i) % 360) / 360, temp[1], temp[2]]);
    }
    return colors;
  }

  compound() {
    let contrast = this.complement()[1];
    let analogOfContrast = this.analogous(contrast);
    return [analogOfContrast[0], this.primaryColor, analogOfContrast[2]];
  }

  shades(colors) {
    let shades = [];
    let shadesCount = Math.floor(this.variations / colors.length);
    shades.push(...colors);
    colors.forEach(color => {
      let temp = hslToRgb(color[0], color[1], color[2]);
      let hsv = rgbToHsv(temp[0], temp[1], temp[2]);

      let h = hsv[0],
        s = hsv[1],
        v = hsv[2];
      for (let i = 0; i < shadesCount; i++) {
        if (shades.length < this.variations) {
          v += colors.length / this.variations;

          v > 0.95 ? (v -= 1) : v;
          v < 0 ? (v += 1) : v;
          // console.log(v);
          let temp2 = hsvToRgb(h, s, v);
          let hsl = rgbToHsl(temp2[0], temp2[1], temp2[2]);

          shades.push(hsl);
        }
      }
    });
    shades.sort(function(a, b) {
      return a[2] - b[2];
    });
    shades.sort(function(a, b) {
      return a[0] - b[0];
    });
    return shades;
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
