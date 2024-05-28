class vertical {
  constructor(vertical) {
    this.img = vertical;
    this.cantidadVerticales = int(random(3, 7)); // Asegurar que es un número entero
    //this.estanDibujadas = false;
    this.linea = [];
    this.posY = [];
    this.posX = [];
    this.velocidad = 5;
    this.tam = 350; // Define el tamaño en el que se dibujan las líneas
    this.limiteinferior = 400; // Define el limite superior del lienzo para determinar inicializacion en Y de las líneas
    this.limitesuperior = -150; // Define el limite inferior
    this.agudeza; // Define la agudeza ( a nivel prorotipo, la determina la posicion del MouseY)
    this.calida = []; // Este booleano evalua si la linea es o no calida para determinar su direccion en Y
  }

  inicializar() {
    // Este método asigna valores para todas las propiedades de las líneas
    for (let i = 0; i < this.cantidadVerticales; i++) {
      this.posY.push(int(random(this.limitesuperior * 2, 0)));
      this.posX.push(100 + i * 75);
      this.linea.push(int(random(this.img.length))); // Selecciona la linea dentro del arreglo de imagenes
      this.calida.push(this.linea[i] < 6 ? true : false); // Evalua si la línea es calida o no
    }
  }

  dibujar() {
    for (let i = 0; i < this.cantidadVerticales; i++) {
      image(
        this.img[this.linea[i]],
        this.posX[i],
        this.posY[i],
        this.tam,
        this.tam
      );
    }

    // if (!this.estanDibujadas) {
    // for (let i = 0; i < this.cantidadVerticales; i++) {
    //     let idx = int(random(this.img.length)); // Índice aleatorio dentro del rango de imágenes
    //     if (this.img[idx]) {
    //         let x = 100 + i * 75;
    //        // let y = this.posY[i]; // Usar i para mantener la posición correcta
    //         image(this.img[idx], x, this.posY[i], 350, 350);
    //     }
    // }
    // this.estanDibujadas = true;
    // }

    // if (!this.estanDibujadas){
    //     for (let i = 0; i < this.cantidadVerticales; i++) {
    //         if (this.img[i]) {
    //             this.pinceladaRandom= int(random(9));
    //             image(this.img[this.pinceladaRandom], 100 + i * 75 , this.posY[i], 350, 350);
    //         }
    //     }
    // }
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

  //   for (let i = 0; i < this.posY.length; i++) {
  //     this.posY[i] += this.velocidad * this.direccion[i];
  //     // Reiniciar la posición si la imagen se sale de los límites
  //     if (
  //       this.direccion[i] === 1 &&
  //       this.posY[i] > height + this.limiteinferior
  //     ) {
  //       this.posY[i] = this.limitesuperior;
  //     } else if (
  //       this.direccion[i] === -1 &&
  //       this.posY[i] < this.limitesuperior
  //     ) {
  //       this.posY[i] = height + this.limiteinferior;
  //     }
  //   }
  //}
}
