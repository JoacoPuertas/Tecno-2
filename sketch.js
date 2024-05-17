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
    background(156, 203, 241);
}

function draw() {
    c.dibujar();
    c.actualizar();
}