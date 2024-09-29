let angle = 0;
let handle;
let mode = "";
let discAngle = 0;
let bladePosition = -200;
let sf = 1; 
let draggingDisc = false;
let draggingBlade = false;
let zoomFocus = { x: 0, y: 0 };
let zoomScale = 3.7; // Anda bisa menyesuaikan nilai ini

function setup() {
  canvas = createCanvas(windowWidth, windowHeight * 1.2);
  rectMode(CORNER);

  document.addEventListener('touchmove', function(event) {
    if (draggingDisc || draggingBlade) {
      event.preventDefault(); // Mencegah scrolling
    }
  }, { passive: false });
}

function draw() {
  mx = mouseX;
  my = mouseY;

  let magnifyingX = width / 2 - 100;
  let magnifyingY = height / 2 + windowHeight * -0.4;

  // Simpan titik fokus zoom
  zoomFocus.x = magnifyingX;
  zoomFocus.y = magnifyingY;


  background('#0f172a');
  
  if (mode == "zoom") {
    // Terapkan zoom
    push();
    translate(zoomFocus.x, zoomFocus.y);
    scale(zoomScale);
    translate(-zoomFocus.x, -zoomFocus.y);
  }

  let disc = new MainDisc(0, 0, windowHeight * 0.8, windowHeight * 0.25, windowHeight * 0.018);
  let vernierScale = new VernierScale(0, 0, windowHeight * 0.325, windowHeight * 0.65, windowHeight * 0.016);
  let blade = new ProtractorBlade(windowWidth * -0.1, disc.radius, windowHeight * 1.2, windowHeight * 0.15);
  let handLock = new HandLock(0, 0, windowHeight * 0.15, disc.radius * 1.9, disc.radius * 0.1);
  let magnifying = new Magnifying (0, windowHeight * -0.3, windowHeight * 0.3, windowHeight * 0.2, disc.radius * 0.1);
  handle = new Handle(0, 0, windowHeight * 0.6, windowHeight * 0.16, 1);
  

  translate(width / 2 - 100, height / 2);

  // Rotate the disc
  push();
  if (draggingDisc) {
    discAngle = atan2(mouseY - height / 2, mouseX - width / 2);
  }
  rotate(discAngle);
  disc.render();
  pop();

  vernierScale.render();

  // Move the blade
  push();
  if (draggingBlade && mouseX < width && mouseX > 0) {
    bladePosition = mouseX - windowWidth * 0.5;
  }
  translate(bladePosition, 0);
  blade.render();
  pop();
  
  handle.render(discAngle);
  handLock.render();

  push();
  magnifying.render();
  pop();

  if (mode == "zoom") {
    pop();
  }


  // Calculate and display the angle
  let displayedAngle = calculateAngle(discAngle);
  fill('#059669');
  textSize(windowHeight * 0.04);
  textAlign(0,0);
  textStyle (BOLD)
  text(`Angle: ${displayedAngle.deg}° ${displayedAngle.min}'`, 0 + windowHeight * 0.55, 0 - windowHeight * 0.3);
}
function calculateAngle(angleRad) {
  // Convert radian to degree
  let angleDeg = degrees(angleRad);
  if (angleDeg < 0) {
    angleDeg += 360;
  }
  if (angleDeg > 180) {
    angleDeg = 360 - angleDeg;
  }
  let degreesPart = Math.floor(angleDeg); 
  let minutesPart = Math.round((angleDeg - degreesPart) * 60);  

  // Round minutes to nearest 5
  minutesPart = Math.round(minutesPart / 5) * 5;
  if (minutesPart == 60) {
    degreesPart += 1;
    minutesPart = 0;
  }
  return { deg: degreesPart, min: minutesPart };
}

function mousePressed() {
  // Cek apakah area zoom diklik
  if (isClickInsideMagnifying()) {
    toggleZoom();
    return;
  }

  if (mode === "zoom") {
    mode = ""; 
    sf = 1; 
    return;
  }

  // Cek untuk dragging
  if (mouseX < width && mouseX > 0 && mouseY > height / 1.4 && mouseY < height) {
    draggingBlade = true;
    return;
  }
  
  let discDist = dist(mouseX, mouseY, width / 2, height / 2);
  if (discDist < windowHeight * 0.5) {
    draggingDisc = true;
    draggingBlade = false;
    return;
  }
}

function touchStarted() {
   // Cek apakah area zoom diklik
  if (isClickInsideMagnifying()) {
    toggleZoom();
    return;
  }

  if (mode === "zoom") {
    mode = ""; 
    sf = 1; 
    return;
  }

  // Cek untuk dragging
  if (mouseX < width && mouseX > 0 && mouseY > height / 1.4 && mouseY < height) {
    draggingBlade = true;
    return;
  }
  
  let discDist = dist(mouseX, mouseY, width / 2, height / 2);
  if (discDist < windowHeight * 0.5) {
    draggingDisc = true;
    draggingBlade = false;
    return;
  }
}

function touchEnded() {
  draggingDisc = false;
  draggingBlade = false;
}

function mouseReleased() {
  draggingDisc = false;
  draggingBlade = false;
}

function isClickInsideMagnifying() {
  let magnifyingX = width / 2 - 100;
  let magnifyingY = height / 2 + windowHeight * -0.3;
  let magnifyingWidth = windowHeight * 0.3;
  let magnifyingHeight = windowHeight * 0.2;
  
  return mouseX > magnifyingX - magnifyingWidth / 2 &&
         mouseX < magnifyingX + magnifyingWidth / 2 &&
         mouseY > magnifyingY - magnifyingHeight / 2 &&
         mouseY < magnifyingY + magnifyingHeight / 2;
}

// Fungsi baru untuk toggle zoom
function toggleZoom() {
  if (mode === "zoom") {
    mode = "";
  } else {
    mode = "zoom";
  }
  draggingDisc = false;
  draggingBlade = false;
}
