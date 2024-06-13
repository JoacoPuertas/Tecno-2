class horizontal {
  constructor(horizontal) {
    this.manchas = horizontal;
    this.posY = height / 2;
    this.posX = width / 2;
    this.tam = width; // Define el tamaño en el que se dibujan las líneas
    this.altura = 0; // La altura es la mancha dentro de las 5 opciones que varían en densidad (manchas mas chicas o mas grandes)
    this.vel = random(5);
    this.opacidad = 50;
    this.sprite = 0; // El sprite cambia automaticamente para generar animación
    this.frecuencia = 0; 
  }

  dibujar() {
    image(
      this.manchas[this.altura][this.sprite], 
      this.posX,
      this.posY,
      this.tam + 100,
      this.tam,
      this.opacidad
    );
  }

  actualizar(frec) {
    this.frecuencia = frec;

    // Movimiento automático que no depende de la voz, para generar animación de mancha
    this.posX += this.vel; 
    if (this.posX < width / 2 - 30) {
      this.vel = 2;
    } else if (this.posX > width / 2 + 30) {
      this.vel = -2;
    }
    this.posY += random(-6, 6);
    if (this.posY < 100) {
      this.posY += (-4, 6);
    } else if (this.posY > height - 100) {
      this.posY -= (-6, 4);
    }

    // Define la mancha según la frecuencia de la voz
    this.altura = int(map(this.frecuencia, 0, 1, 0, 5));
    this.opacidad = int(map(this.frecuencia, 0, 1, 3, 50));

    // Mecanismo para que la animación de los sprites no corra tan rapido
    if (frameCount % 6 === 0) {
      this.sprite++;
    } else {
    }
    if (this.sprite == 5) {
      this.sprite = 0;
    }
  }
}
