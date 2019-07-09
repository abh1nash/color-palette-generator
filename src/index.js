import "./scss/main.scss";
import Palette from "./js/Palette";

let canvas = document.querySelectorAll("canvas");

let input = document.querySelector("#color-selector");

input.addEventListener("change", () => {
  let colorCode = input.value;

  colorCode = colorCode
    .split("")
    .splice(1)
    .join("");

  let rgb = [];

  for (let i = 0; i < colorCode.length; i += 2) {
    rgb.push(parseInt(colorCode[i] + colorCode[i + 1], 16));
  }

  canvas.forEach(el => {
    let palette = new Palette(`#${el.id}`, 150, rgb, el.id);
    palette.show();
  });
});

canvas.forEach(el => {
  let palette = new Palette(`#${el.id}`, 150, [252, 233, 3], el.id);
  palette.show();
});
