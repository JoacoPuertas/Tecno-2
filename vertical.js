
class vertical {
    constructor(vertical) {
        this.img = vertical;
        this.cantidadVerticales = int(random(3, 7)); // Asegurar que es un número entero
        this.estanDibujadas = false;
        this.posY = [];
        this.direccion = [];
        this.velocidad = 5;
    }

    inicializar() {
        for (let i = 0; i < this.cantidadVerticales; i++) {
            this.posY.push(random(-50, height + 50));
            this.direccion.push(i < 6 ? 1 : -1); // Direcciones: 1 para abajo, -1 para arriba
        }
    }

    dibujar() {
        if (!this.estanDibujadas) {
            for (let i = 0; i < this.cantidadVerticales; i++) {
                let idx = int(random(this.img.length)); // Índice aleatorio dentro del rango de imágenes
                if (this.img[idx]) {
                    let x = 100 + i * 75;
                    let y = this.posY[i]; // Usar i para mantener la posición correcta
                    image(this.img[idx], x, y, 350, 350);
                }
            }
            this.estanDibujadas = true;
        }
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
        for (let i = 0; i < this.posY.length; i++) {
            this.posY[i] += this.velocidad * this.direccion[i];
            // Reiniciar la posición si la imagen se sale de los límites
            if (this.direccion[i] === 1 && this.posY[i] > height + 50) {
                this.posY[i] = -50;
            } else if (this.direccion[i] === -1 && this.posY[i] < -50) {
                this.posY[i] = height + 50;
            }
        }
    }
}
