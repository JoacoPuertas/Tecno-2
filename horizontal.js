class horizontal {
  constructor(horizontal) {
    this.manchas = horizontal;
    this.posY = height / 2;
    this.posX = width / 2;
    this.tam = width; // Define el tamaño en el que se dibujan las líneas
    this.altura = 0;
    this.vel = random(5);
    this.opacidad = 50;
    this.sprite = 0;
  }

  dibujar() {
    image(
      this.manchas[this.altura][this.sprite],
      this.posX,
      this.posY,
      this.tam +100,
      this.tam,
      this.opacidad
    )
  
  }

  actualizar() {
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

    if (mouseX > 0 && mouseX < width) {
      this.altura = int(map(mouseX, 0, width, 0, 5));
      this.opacidad = int(map(mouseX, 0, width, 3, 50));
    }
    
     //para que los sprites no corran tan rapido
     if (frameCount % 6 === 0) {
      this.sprite++;
    } else {
    }
    if (this.sprite == 5) {
      this.sprite = 0;
    }

  }
}
