let lineasVerticales = [];
let cantidadVerticales = 10;
let c;
let cantidadHorizontales = 5;
let cantidadSprites = 5;
let lineasHorizontales = [];
let m;
let bg;
// let posY = 0;

function preload() {
  // Cargar las imágenes
  for (let i = 0; i < cantidadVerticales; i++) {
    lineasVerticales[i] = loadImage("data/vertical" + i + ".png");
  }

  for (let i = 0; i < cantidadHorizontales; i++) {
    lineasHorizontales[i] = [];
    for (let z = 0; z < cantidadSprites; z++) {
      lineasHorizontales[i][z] = loadImage("data/mancha" + i + z + ".png");
    }
  }
  bg = loadImage("data/bg.jpg");
}

function setup() {
  imageMode(CENTER);
  createCanvas(500, 500);
  c = new vertical(lineasVerticales);
  m = new horizontal(lineasHorizontales);
  c.inicializar();
  //frameRate(1);
}

function draw() {
  //background(156, 203, 241);
  push();
  tint(156, 203, 241); //opacidad baja
  image(bg, width / 2, height / 2, width, width);
  pop();

  c.actualizar();
  c.dibujar();

  m.dibujar();
  m.actualizar();

  //aguante el pincha papaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

  push();
  tint(0, 10); //opacidad baja, se repite despues de dibujar las pinceladas para que la textura se genere tamb en las pinceladas
  image(bg, width / 2, height / 2, width, width);
  pop();

  //debug 
  if (!(keyIsPressed)) {
    text ("mantener presionada cualquier tecla para debuggear", 20,20)
  }
  if (keyIsPressed) {
    //estos textos sirven de ayuda para entender como funciona el prototipo
    text(
      "mouseY en este cuadrante simula volumen de voz alto",
      10,
      height / 2 - 50,
      120
    );
    text(
      "mouseY en este cuadrante simula volumen de voz bajo",
      10,
      height / 2 + 10,
      120
    );
    line(0, height / 2, width, height / 2);

    text("c.posY:" + int(c.posY), 50, 70);
    text("c.posX:" + int(c.posX), 50, 90);
    text("c.linea:" + int(c.linea), 50, 110);
    text("c.calida:" + int(c.calida), 50, 130);
    text("c.agudeza:" + int(c.agudeza), 50, 150);
    text("c.calida:" + int(c.calida), 50, 170);
    text("c.posXinicial:" + int(c.posXinicial), 50, 190);


    //debug horizontales
    text("m.altura:" + int(m.altura), width - 100, 70);
    text("m.sprites:" + int(m.sprite), width - 100, 90);
    text("m.posY:" + int(m.posY), width - 100, 110);
    text("m.posX:" + int(c.posX), width - 100, 130);
  }
}

