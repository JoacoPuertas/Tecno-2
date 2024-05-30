class horizontal {
    constructor(horizontal) {
      this.manchas = horizontal;
      this.posY = height/2;
      this.posX = width;
      this.tam = 350; // Define el tamaño en el que se dibujan las líneas
      this.altura = map(mouseX,0, width,0 ,5); 
    }
  
    dibujar() {
      image(this.manchas[this.altura],this.posY, this.posX,this.tam,this.tam);
    }
  
    actualizar() {
      // Prototipo de agudeza de la voz con valor de Mouse Y:
      // si está por encima de la mitad del lienzo,
      // sería voz aguda; y si está por debajo, voz grave.
      this.agudeza = mouseY;
  
      //  Este for determina la direccion de las lineas segun agudeza de voz
      for (let i = 0; i < this.posY.length; i++) {
        if (this.agudeza > height / 2) { // Voz aguda = MouseY en mitad de lienzo hacia arriba
          // Si la voz es aguda suben los calidos y bajan los frios
          if (this.calida[i]) {
            this.posY[i] += this.velocidad; // Suben lineas calidas 
          } else if (!this.calida[i]) {
            this.posY[i] -= this.velocidad; // Bajan lineas frias
          }
        } else if (this.agudeza < height / 2) { // Voz grave = MouseY en mitad de lienzo hacia abajo
          // Si la voz es grave suben los frios y bajan los calidos
          if (this.calida[i]) {
            this.posY[i] -= this.velocidad; // Suben lineas frias
          } else if (!this.calida[i]) {
            this.posY[i] += this.velocidad; //Bajan lineas calidas
          }
        } else {
        }
  
        // Reiniciar la posición si la imagen se sale de los límites
        if (this.posY[i] > height + this.limiteinferior) {
          this.posY[i] = this.limitesuperior;
        } else if (this.posY[i] < this.limitesuperior
        ) {
          this.posY[i] = height + this.limiteinferior;
        }
      }
    }
  }
  