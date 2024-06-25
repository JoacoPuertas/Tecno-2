//---- VARIABLES GENERALES----
let lineasVerticales = [];
let cantidadVerticales = 10;
let c;
let cantidadHorizontales = 5;
let cantidadSprites = 5;
let lineasHorizontales = [];
let m;
let bg;
//---- CALIBRACION----
let AMP_MIN = 0.01;
let AMP_MAX = 0.25;

let FREC_MIN = 20;
let FREC_MAX = 1500;

//---- AUDIO----
let mic;
let pitch;
let amp;
let frec = 0;
let gestorAmp;
let gestorFrec;
let audioContext;
const pitchModelURL =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";

function preload() {
  // Carga de imágenes de líneas verticales
  for (let i = 0; i < cantidadVerticales; i++) {
    lineasVerticales[i] = loadImage("data/vertical" + i + ".png");
  }

  // Carga de imágenes de manchas horizontales
  for (let i = 0; i < cantidadHorizontales; i++) {
    lineasHorizontales[i] = [];
    for (let z = 0; z < cantidadSprites; z++) {
      lineasHorizontales[i][z] = loadImage("data/mancha" + i + z + ".png");
    }
  }

  // Carga de textura de background
  bg = loadImage("data/bg.jpg");
}

function setup() {
  imageMode(CENTER);
  createCanvas(500, 500);

  // Audio
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio(); // forzar el inicio del audio en el navegador

  // Creo objetos de gestor
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorFrec = new GestorSenial(FREC_MIN, FREC_MAX);

    // Creo objetos de líneas y manchas
  c = new vertical(lineasVerticales);
  m = new horizontal(lineasHorizontales);
  c.inicializar(); // Este método inicializa la configuración gral de las lineas verticales 
}

function draw() {
  
  push();
  tint(156, 203, 241); //opacidad baja
  image(bg, width / 2, height / 2, width, width);
  pop();
  // Gestión de amplitud con el gestor
  gestorAmp.actualizar(mic.getLevel()); 
  amp = gestorAmp.filtrada;

  // Dibujo líneas y manchas
  c.dibujar();
  m.dibujar();

  // Si hay amplitud se actualizan las manchas y las lineas y comienza la interaccion
  if (amp > AMP_MIN) {
    c.actualizar(amp, frec);
    m.actualizar(frec);
  }

  // Textura de background por encima de las líneas
  push();
  tint(156, 203, 241, 10); // con opacidad baja, se repite después de dibujar las pinceladas para que la textura se genere tamb en las pinceladas
  image(bg, width / 2, height / 2, width, width);
  pop();

  if (!keyIsPressed) {
    
  }
  if (keyIsPressed) {
    // gestorFrec.dibujar(20, 50);

    // DEBUG DE LÍNEAS VERTICALES
    text("c.posY:" + int(c.posY), 20, 20);
    text("c.posX:" + int(c.posX), 20, 40);
    text("c.calida:" + int(c.calida), 20, 60);
    text("c.amplitud:" + int(c.amplitud), 20, 80);
    text("c.linea:" + int(c.linea), 20, 100);
    text("c.calida:" + int(c.calida), 20, 120);
    text("c.posXinicial:" + int(c.posXinicial), 20, 140)
    text("c.margenX:" + int(c.margenX), 20, 160);
    text("c.amplitudConstante:" + int(c.amplitudConstante), 20, 180);
    text("c.amplitudSostenida:" + int(c.amplitudSostenida), 20, 200); 
   
    // DEBUG DE MANCHAS HORIZONTALES
    text("m.altura:" + int(m.altura), 20, height - 120 );
    text("m.sprites:" + int(m.sprite), 20, height - 100 );
    text("m.frecuencia:" + m.frecuencia, 20, height - 80);
    text("frec:" + frec, 20,  height - 60);
    text("m.posY:" + int(m.posY), 20, height - 40);
    text("m.posX:" + int(c.posX), 20, height - 20);
  }
}

function startPitch() {
  pitch = ml5.pitchDetection(
    pitchModelURL,
    audioContext,
    mic.stream,
    modelLoaded
  );
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  if (pitch) {
    pitch.getPitch(function (err, frequency) {
      if (err) {
        console.error(err);
      } else if (frequency) {
        gestorFrec.actualizar(frequency);
        frec = gestorFrec.filtrada;
      }
      getPitch();
    });
  }
}
