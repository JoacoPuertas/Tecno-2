let lineasVerticales = [];
let posX = 0;
let posY; 

function preload(){

  //Las imagenes del 0 a 6 son las calidas y las del 6 al 10 son frias.
  for(let i = 0; i < 1; i++) {
    lineasVerticales[i] = loadImage("data/vertical" + i + ".png");
  }
}

function setup() {
  createCanvas( 500, 500 );
  posY = 0;
}



function draw() {
  background(156, 203, 241);
  
   for(let i = 0; i < 6; i++){
    posY = random(-100, 20);
    image(lineasVerticales[0], posX + i * 80 , posY, 250, 250);
  } 
  posY++;
  fill(0);
  textSize(40);
  text(posX, 50, 50)
}
