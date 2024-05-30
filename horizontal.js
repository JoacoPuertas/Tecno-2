class horizontal {
    constructor(horizontal) {
      this.manchas = horizontal;
      this.posY = height/2;
      this.posX = width/2;
      this.tam = width; // Define el tamaño en el que se dibujan las líneas
      this.altura = 0; 
      this.vel = random(5);
      this.opacidad = 50;
    }
  
    dibujar() {
        this.altura =  int(map(mouseX,0, width,0 ,5)); 
        this.opacidad = int(map(mouseX, 0, width, 3, 50))
      image(this.manchas[this.altura],this.posX, this.posY,this.tam + 400,this.tam, this.opacidad )
    }
  
    actualizar() {
        this.posX += this.vel;
        if(this.posX < (width/2) - 30){
            this.vel = 30;
        }
        else if (this.posX > (width/2) + 30) {
            this.vel = - 30;
        }
        this.posY += random(-6,6); 
        if (this.posY < 100) {
            this.posY +=(-4,6);
        } else if (this.posY > height - 100){
            this.posY += (-6,4);
        }
    }
  }
  