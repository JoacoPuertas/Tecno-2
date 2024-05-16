class vertical {
    constructor(vertical){
        this.img = [];
        this.img = vertical;
        this.cantidadVerticales = 9;
    }

    dibujar(){

        for(let i = 0; i <= this.cantidadVerticales; i++) {
            image(this.img[i], 100 + i * 50 , height/2, 350, 350);
        }
        
    }
}