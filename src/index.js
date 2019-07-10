import "./scss/main.scss";
import Palette from "./js/Palette";

let canvas = document.querySelectorAll("canvas");

let input = document.querySelector("#color-selector");
let select = document.querySelector("#variations");

select.addEventListener("change", () => {
  let rgb = parseRgb(input.value);
  canvas.forEach(el => {
    let palette = new Palette(`#${el.id}`, 150, rgb, el.id, select.value);
    palette.show();
  });
});

input.addEventListener("change", () => {
  let rgb = parseRgb(input.value);
  canvas.forEach(el => {
    let palette = new Palette(`#${el.id}`, 150, rgb, el.id, select.value);
    palette.show();
  });
});

canvas.forEach(el => {
  let palette = new Palette(
    `#${el.id}`,
    150,
    [252, 233, 3],
    el.id,
    select.value
  );
  palette.show();
});

function parseRgb(input) {
  let colorCode = input;

  colorCode = colorCode
    .split("")
    .splice(1)
    .join("");

  let rgb = [];

  for (let i = 0; i < colorCode.length; i += 2) {
    rgb.push(parseInt(colorCode[i] + colorCode[i + 1], 16));
  }
  return rgb;
}
