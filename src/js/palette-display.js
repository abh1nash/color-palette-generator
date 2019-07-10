import Palette from "./Palette";
import { hslToRgb } from "./hsl-rgb";

function createPalette(title, parent, color, harmony, variations) {
  let container = document.createElement("div");
  container.classList.add("palette-container");

  let heading = document.createElement("h2");
  heading.classList.add("palette-title");
  heading.innerHTML = title;

  container.appendChild(heading);

  let paletteCanvas = document.createElement("canvas");
  let palette = new Palette(paletteCanvas, 250, color, harmony, variations);
  palette.show();

  let colorCodeContainer = document.createElement("div");
  colorCodeContainer.classList.add("code-container");

  palette.colors.forEach(color => {
    let colorContainer = document.createElement("div");
    colorContainer.classList.add("color");

    let colorDisplay = document.createElement("div");

    colorDisplay.style.background = `hsl(${color[0] * 360},${color[1] *
      100}%,${color[2] * 100}%)`;
    colorDisplay.classList.add("color-preview");

    let codes = document.createElement("div");
    codes.classList.add("color-codes");
    let rgb = hslToRgb(color[0], color[1], color[2]);
    let hex = `#${decimalToHexString(Math.round(rgb[0]))}${decimalToHexString(
      Math.round(rgb[1])
    )}${decimalToHexString(Math.round(rgb[2]))}`;

    let rgbValue = document.createElement("div");
    rgbValue.classList.add("rgb");
    rgb.forEach(value => {
      let item = document.createElement("div");

      item.textContent = Math.round(value);
      rgbValue.appendChild(item);
    });

    let hslValue = document.createElement("div");
    hslValue.classList.add("hsl");
    color.forEach((value, index) => {
      let item = document.createElement("div");
      if (index == 0) {
        item.textContent = `${Math.round(value * 360)}°`;
      } else {
        item.textContent = `${Math.round(value * 100)}%`;
      }
      hslValue.appendChild(item);
    });

    let hexValue = document.createElement("div");
    hexValue.classList.add("hex");
    hexValue.textContent = hex;

    codes.appendChild(rgbValue);
    codes.appendChild(hslValue);
    codes.appendChild(hexValue);
    colorContainer.appendChild(colorDisplay);
    colorContainer.appendChild(codes);

    colorCodeContainer.appendChild(colorContainer);
  });

  container.appendChild(paletteCanvas);
  container.appendChild(colorCodeContainer);

  parent.appendChild(container);
}

function decimalToHexString(number) {
  if (number < 0) {
    number = 0xffffffff + number + 1;
  }

  let char = number.toString(16).toUpperCase();

  if (char.length == 1 && parseInt(char, 16) > 15) {
    char += char;
  } else if (char.length == 1 && parseInt(char, 16) <= 15) {
    char = "0" + char;
  }

  return char;
}

export default createPalette;
