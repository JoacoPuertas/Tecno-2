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

//audio
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
  // Cargar las imágenes
  for (let i = 0; i < cantidadVerticales; i++) {
    lineasVerticales[i] = loadImage("data/vertical" + i + ".png");
  }

  for (let i = 0; i < cantidadHorizontales; i++) {
    lineasHorizontales[i] = [];
    for (let z = 0; z < cantidadSprites; z++) {
      lineasHorizontales[i][z] = loadImage("data/mancha" + i + z + ".png");
    }
  }
  bg = loadImage("data/bg.jpg");
}

function setup() {
  imageMode(CENTER);
  createCanvas(500, 500);
  
  

  //audio
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  userStartAudio(); // forzar el inicio del audio en el navegador

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorFrec = new GestorSenial(FREC_MIN, FREC_MAX);

  c = new vertical(lineasVerticales);
  m = new horizontal(lineasHorizontales);
  c.inicializar();
}

function draw() {
  push();
  tint(156, 203, 241); //opacidad baja
  image(bg, width / 2, height / 2, width, width);
  pop();


  //AUDIO
  gestorAmp.actualizar(mic.getLevel()); // la señal directa (cruda) del mic la administra el gestor
  amp = gestorAmp.filtrada;

  c.dibujar();
  m.dibujar();

  if (amp > AMP_MIN) {
    c.actualizar(amp);
    m.actualizar(frec);
  }
  push();
  tint(156, 203, 241, 10); //opacidad baja, se repite después de dibujar las pinceladas para que la textura se genere tamb en las pinceladas
  image(bg, width / 2, height / 2, width, width);
  pop();

  if (!keyIsPressed) {
    text("m.altura:" + int(m.altura), width - 100, 70);
    text("m.sprites:" + int(m.sprite), width - 100, 90);
    text("m.frecuencia:" + m.frecuencia, width - 100, 110);
    text (frec , width - 100, 130 )

    // let texto = "frec: " + frec;
    // text(texto, 20, 20);

    // gestorFrec.dibujar(20, 50);

    // text("c.margenX:" + int(c.margenX), 50, 70);
    // text("c.frecuenciaActiva:" + int(c.frecuenciaActiva), 50, 85);
    // text("c.frecuencia:" + int(c.frecuencia), 50, 100);
  }
  if (keyIsPressed) {
    text(
      "mouseY en este cuadrante simula volumen de voz alto",
      10,
      height / 2 - 50,
      120
    );
    text(
      "mouseY en este cuadrante simula volumen de voz bajo",
      10,
      height / 2 + 10,
      120
    );
    line(0, height / 2, width, height / 2);

    text("c.posY:" + int(c.posY), 50, 70);
    text("c.posX:" + int(c.posX), 50, 90);
    text("c.linea:" + int(c.linea), 50, 110);
    text("c.calida:" + int(c.calida), 50, 130);
    text("c.agudeza:" + int(c.agudeza), 50, 150);
    text("c.calida:" + int(c.calida), 50, 170);
    text("c.posXinicial:" + int(c.posXinicial), 50, 190);

    text("m.posY:" + int(m.posY), width - 100, 110);
    text("m.posX:" + int(c.posX), width - 100, 130);
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
  console.log("Model Loaded!");
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
      setTimeout(getPitch, 100);
    });
  }
}
