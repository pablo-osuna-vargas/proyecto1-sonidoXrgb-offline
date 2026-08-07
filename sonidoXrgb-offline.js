let r = 0;
let g = 0;
let b = 0;

// 1. DECLARAR EL SOCKET AFUERA (Global)
let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);

// 2. LLAMAR A LA CONEXIÓN (La función ahora vive afuera)
  conectarBridge();
}

// 3. LA FUNCIÓN DE CONEXIÓN VIVE AFUERA DE SETUP
function conectarBridge() {
  socket = new WebSocket('ws://localhost:8085'); 

  socket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    if (typeof recibirDatosPD === 'function') {
      recibirDatosPD(data.address, data.value);
    }
  };
  
  socket.onclose = () => {
    console.log("Desconectado del puente. Reintentando en 2 segundos...");
    setTimeout(conectarBridge, 2000);
  };
}

// acá empieza sketch p5 //
function draw() {
  background(r, g, b); 
}

function recibirDatosPD(ruta, valor) {
  console.log("Llegó de PD:", ruta, valor);

  if (ruta === '/pd/r') {
    r = valor;
  }

  if (ruta === '/pd/g') {
    g = valor;
  }

  if (ruta === '/pd/b') { 
    b = valor;
  }
}

// 4. DESBLOQUEO DE AUDIO (Obligatorio para que suene al hacer click)
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("Audio activado en el navegador");
  }
}