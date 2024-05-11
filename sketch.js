//declaro un arreglo
let c = [];
let cantidad = 10;

function setup() {
  createCanvas( windowWidth, windowHeight );
  
  for( let i=0 ; i<cantidad ; i++ ){
    c[i] = new Caminante( width/2 , height/2 );
  }

  background(255);
  fill(0);
}

function draw() {
  /*push();
  noStroke()
  fill(255,5);
  rect( 0 , 0 , width , height );
  pop();*/

  for( let i=0 ; i<cantidad ; i++ ){

    /*if( mouseIsPressed ){
      c[i].seguir( mouseX , mouseY );
    }*/
    c[i].actualizar();
    c[i].dibujar();
    
  }
}
