import "./scss/main.scss";
import createPalette from "./js/palette-display";

let input = document.querySelector("#color-selector");
let select = document.querySelector("#variations");
let parent = document.querySelector(".color-palettes");
let titles = ["Complementary", "Analogous", "Triad", "Compound", "Monochrome"];
let modes = ["complement", "analogous", "triad", "compound", "mono"];

genPalette(titles, modes, parseRgb(input.value), select.value);

select.addEventListener("change", () => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  let rgb = parseRgb(input.value);
  genPalette(titles, modes, rgb, select.value);
});

input.addEventListener("change", () => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  let rgb = parseRgb(input.value);

  genPalette(titles, modes, rgb, select.value);
});

function genPalette(titles, modes, primaryColor, variations) {
  titles.forEach((title, index) => {
    createPalette(title, parent, primaryColor, modes[index], variations);
  });
}

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
