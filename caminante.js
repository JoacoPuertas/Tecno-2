const MIN_TIEMPO_LINEA_RECTA = 30;
const MAX_TIEMPO_LINEA_RECTA = 60;
const MIN_TIEMPO_GIRANDO = 30;
const MAX_TIEMPO_GIRANDO = 60;

class Caminante{

    constructor( x_ = 100 , y_ = 100 ){
        this.x = x_;
        this.y = y_;
        this.t = 20;
        this.vel = 4;
        this.dir = random( radians(360) );

        this.giroHorario = true;
        this.anguloGiro = 3;

        this.estado = "recta";
        this.tiempo = int( random( MIN_TIEMPO_LINEA_RECTA, MAX_TIEMPO_LINEA_RECTA) )

        this.tinte = random(360);

    }

    dibujar(){
        push();
        colorMode( HSB , 360 , 100 , 100 , 100 );
        this.elColor = color( this.tinte ,100 , 100 , 20 );
        fill( this.elColor );
        noStroke();
        ellipse( this.x , this.y , this.t , this.t );
        pop();
    }

    actualizar(){

        if( this.estado === "recta" ){ //--- estado
            this.mover();
            if( this.tiempo <= 0 ){ //--- EVENTO
                this.estado = "gira";
                this.tiempo = int( random( MIN_TIEMPO_GIRANDO, MAX_TIEMPO_GIRANDO ));
                this.giroHorario = random(100)<50;
                this.anguloGiro = 3 * ( this.giroHorario ? 1 : -1 );
            }else{
                this.tiempo --;
            }
        }else if( this.estado === "gira" ){ //--- estado
            this.dir += radians( this.anguloGiro );
            this.mover();
            if( this.tiempo <= 0 ){ //--- EVENTO
                if( random(100)<70 ){
                    this.estado = "degrade";
                }else{
                    this.estado = "recta";
                }
                

                this.tiempo = int( random( MIN_TIEMPO_LINEA_RECTA, MAX_TIEMPO_LINEA_RECTA) )
            }else{
                this.tiempo --;
            }
        }else if( this.estado === "degrade" ){ //--- estado
            this.tinte = (this.tinte+1) % 360;
            this.mover();
            if( this.tiempo <= 0 ){ //--- EVENTO
                this.estado = "gira";
                this.tiempo = int( random( MIN_TIEMPO_GIRANDO, MAX_TIEMPO_GIRANDO ));
                this.giroHorario = random(100)<50;
                this.anguloGiro = 3 * ( this.giroHorario ? 1 : -1 );
            }else{
                this.tiempo --;
            }
        }

    }


    mover(){

        //this.dir += radians( random(-10,10) );

        let dx = this.vel * cos( this.dir );
        let dy = this.vel * sin( this.dir );
        this.x += dx;
        this.y += dy;

        this.x = ( this.x>width ? this.x-width : this.x );
        this.x = ( this.x<0 ? this.x+width : this.x );
        this.y = ( this.y>height ? this.y-height : this.y );
        this.y = ( this.y<0 ? this.y+height : this.y );
    }

    seguir( xo_ , yo_ ){
        this.dir = atan2( yo_-this.y , xo_-this.x );
    }

}