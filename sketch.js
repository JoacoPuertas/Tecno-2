let lineasVerticales = [];
let cantidadVerticales = 9;
let c;
// let posY = 0;

function preload() {
  // Cargar las imágenes
  for (let i = 0; i <= cantidadVerticales; i++) {
    lineasVerticales[i] = loadImage("data/vertical" + i + ".png");
  }
}

function setup() {
  imageMode(CENTER);
  createCanvas(500, 500);
  c = new vertical(lineasVerticales);
  c.inicializar();
  //frameRate(1);
}

function draw() {
  background(156, 203, 241);

  c.actualizar();
  c.dibujar();

  //estos textos sirven de ayuda para entender como funciona el prototipo
  text("mouseY en este cuadrante simula voz aguda", 10, (height/2)-50, 100);
  text("mouseY en este cuadrante simula voz grave", 10, (height/2)+10, 100);

  //debug
  line(0, height/2, width, height/2)
  text("c.posY:" + int(c.posY), 50, 70);
  text("c.posX:" + int(c.posX), 50, 90);
  text("c.linea:" + int(c.linea), 50, 110);
  text("c.calida:" + int(c.calida), 50, 130);
  text("c.agudeza:" + int(c.agudeza), 50, 150);


}
