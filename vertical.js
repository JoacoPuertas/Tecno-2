class vertical {
  constructor(vertical) {
    this.img = vertical;
    this.cantidadVerticales = int(random(3, 7)); // Asegurar que es un número entero
    this.linea = [];
    this.posY = [];
    this.posX = [];
    this.velX = []; // Esta variable determina la velocidad en que se mueven en X las lineas
    this.posXinicial = []; // Esta variable guarda el valor inicial en X de c/linea para determinar desp el margen en que se mueven en X

    //Esta variable determina el ancho maximo en q las lineas se mueven en X
    if (this.cantidadVerticales <= 5) {
      //Hay un if para que el margen sea chico cuando son muchas lineas para que no se superpongan tanto
      this.margenX = 40;
    } else if (this.cantidadVerticales >= 5) {
      this.margenX = 20;
    }

    // Variables para evaluar si hay amplitud constante
    this.amplitudConstante = false;
    this.amplitudSostenida = 0;

    this.velocidad = []; // Esta variable determina la velocidad en Y de las lineas
    this.tam = 350; // Define el tamaño en el que se dibujan las líneas
    this.limiteinferior = 150; // Define el limite superior del lienzo para determinar inicializacion en Y de las líneas
    this.limitesuperior = -150; // Define el limite inferior
    this.agudeza; // Define la amplitud
    this.calida = []; // Este booleano evalua si la linea es o no calida para determinar su direccion en Y
  }

  inicializar() {
    // Este método asigna valores para todas las propiedades de las líneas
    for (let i = 0; i < this.cantidadVerticales; i++) {
      this.posY.push(
        int(random(this.limitesuperior * 2, this.limiteinferior * 2))
      );
      this.posX.push(100 + i * 75);
      this.posXinicial[i] = this.posX[i];
      this.velX[i] = random(-(0.3, 0.5));
      this.velocidad.push(int(random(5, 7)));
      this.linea.push(int(random(this.img.length))); // Selecciona la linea dentro del arreglo de imagenes
      this.calida.push(this.linea[i] < 7 ? true : false); // Evalua si la línea es calida o no
    }
  }

  dibujar() {
    // Dibuja las lineas con los valores asignados en la inicialización
    for (let i = 0; i < this.cantidadVerticales; i++) {
      image(
        this.img[this.linea[i]],
        this.posX[i],
        this.posY[i],
        this.tam,
        this.tam
      );
    }
  }

  actualizar(amp, frec) {
    // Actualiza velocidad de las lineas segun frecuencia
    this.frecuencia = frec;

    for (let i = 0; i < this.cantidadVerticales; i++) {
        this.velocidad[i] = map(this.frecuencia, 0 , 1 , 2 ,50)
    }

    //Actualiza direccion Y de las lineas segun amplitud

    // Amplitud baja : cálidas hacia arriba, frías hacia abajo
    // Amplitud alta : cálidas hacia abajo, frías hacia arriba
    this.amplitud = amp;
    this.limite = 0.2; // El límite define el valor en el que se considera amplitud alta o amplitud baja

    // Este for determina la direccion Y de las lineas segun amplitud de voz
    for (let i = 0; i < this.posY.length; i++) {
      if (this.amplitud >= this.limite) {
        // Voz alta
        // Si la voz es alta suben las calidas y bajan las frias
        if (this.calida[i]) {
          this.posY[i] += this.velocidad[i]; // Suben lineas calidas
        } else if (!this.calida[i]) {
          this.posY[i] -= this.velocidad[i]; // Bajan lineas frias
        }
      } else if (this.amplitud < this.limite) {
        // Voz baja
        // Si la voz es baja suben las frias y bajan las calidas
        if (this.calida[i]) {
          this.posY[i] -= this.velocidad[i]; // Suben lineas frias
        } else if (!this.calida[i]) {
          this.posY[i] += this.velocidad[i]; //Bajan lineas calidas
        }
      } else {
      }

      // Este for determina el movimiento en X de las lineas
      for (let i = 0; i < this.posX.length; i++) {
        if (this.posX[i] <= this.posXinicial[i] - this.margenX) {
          this.velX[i] = map(this.frecuencia, 0, 1, 0.2, 5);
          //this.velX[i] = random(0.2, 0.3);
        } else if (this.posX[i] >= this.posXinicial[i] + this.margenX) {
          this.velX[i] = -(map(this.frecuencia, 0, 1, 0.2, 5));
          //this.velX[i] = random(-(0.2, 0.3));
        }
        this.posX[i] += this.velX[i];
      }

      // Reiniciar la posición si la imagen se sale de los límites
      if (this.posY[i] > height + this.limiteinferior) {
        this.posY[i] = this.limitesuperior;
      } else if (this.posY[i] < this.limitesuperior) {
        this.posY[i] = height + this.limiteinferior;
      }
    }

    // Evalúa si la amplitud es sostenida para achicar el margenX y, por lo tanto, el mov en X de las verticales
    if (this.amplitudSostenida >= 50 && this.margenX > 0) {
      this.margenX -= 0.3;
    } else if (this.amplitudSostenida <= 100 && this.margenX < 40) {
      this.margenX += 5;
    }

    //Mecanismo para achicar el margenX cuando la amplitud de la voz sea constante
    if (this.amplitudConstante) {
      this.amplitudSostenida += 0.5;
    } else if (!this.amplitudConstante) {
      this.amplitudSostenida = 0;
    }
    if (amp > 0.02) {
      this.amplitudConstante = true;
    } else if (amp <= 0.02) {
      this.amplitudConstante = false;
      this.amplitudSostenida = 0;
    }
  }
}
