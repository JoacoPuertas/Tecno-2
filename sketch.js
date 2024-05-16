let lineasVerticales = [];
let cantidadVerticales = 9;
function preload(){

  //Las imagenes del 0 a 6 son las calidas y las del 6 al 10 son frias.
  for(let i = 0; i < cantidadVerticales; i++) {
    lineasVerticales[i] = loadImage("data/vertical" + i + ".png");
  }
}

function setup() {
  imageMode(CENTER);
  createCanvas( windowHeight, windowHeight );
  c = new vertical(lineasVerticales);
}



function draw() {
  background(156, 203, 241);
  c.dibujar();
}
