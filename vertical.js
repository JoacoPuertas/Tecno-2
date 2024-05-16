class vertical {
    constructor(vertical){
        this.img = [];
        this.img = vertical;
        this.cantidadVerticales = random (3,5);
        this.estanDibujadas= false ;
    }

    dibujar(){
    
        //crear un for con un arreglo de 5 posiciones y guardar en cada posicion del arreglo un valor 
        //random para pintar desp. Limitarlo con una booleana para q se reproduzca solo el primer frame

        
if (!this.estanDibujadas){
    
    for (let i = 0; i < this.cantidadVerticales; i++) {
            if (this.img[i]) {
                this.pinceladaRandom= int(random(9));
                image(this.img[this.pinceladaRandom], 100 + i * 75 , height/2, 350, 350);
            }
        }
}
this.estanDibujadas = true;

    }

    
}