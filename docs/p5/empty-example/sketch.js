let angle = 0;
let handle;
let mode = "";
let discAngle = 0;
let bladePosition = 150;
let sf = 1;
let draggingDisc = false;
let draggingBlade = false;
let zoomFocus = { x: 0, y: 0 };
let zoomScale = 5;
let toggleBlade = false;
let toggleDisc = false;
let toggleAngle = false;
let lastMouseY = 0;
let lastMouseX = 0;
let discCenterX, discCenterY;
const rotationSensitivity = 0.720; // Adjust this to change rotation speed
const bladeMovementPerFullDrag = 600; // Pergerakan blade untuk satu full drag

function setup() {
  canvas = createCanvas(windowWidth, windowHeight * 1.4);
  rectMode(CORNER);
  discCenterX = width / 2 - 50;
  discCenterY = height / 2 - windowHeight * 0.12;

  document.addEventListener(
    "touchmove",
    function (event) {
      if (draggingDisc || draggingBlade) {
        event.preventDefault(); // Mencegah scrolling
      }
    },
    { passive: false }
  );
}

function draw() {
  mx = mouseX;
  my = mouseY;

  let magnifyingX = width / 2 - 50;
  let magnifyingY = height / 2 - windowHeight * 0.12 + windowHeight * -0.4;

  zoomFocus.x = magnifyingX;
  zoomFocus.y = magnifyingY;

  background("#0f172a");

  if (mode == "zoom") {
    push();
    translate(zoomFocus.x, zoomFocus.y);
    scale(zoomScale);
    translate(-zoomFocus.x, -zoomFocus.y);
  }

  if (toggleBlade) {
    draggingBlade = false;
  }
  if (toggleDisc) {
    draggingDisc = false;
  }
  if (toggleAngle) {
  } else {
    fill("#059669");
    rect(width / 2 - 50 + windowHeight * 0.5, height / 2 - windowHeight * 0.5, windowHeight * 0.1, windowHeight * 0.05, 5);
    fill("#0f172a");
    textSize(windowHeight * 0.03);
    text("Hide", width / 2 - 50 + windowHeight * 0.55, height / 2 - windowHeight * 0.47);
  }

  let disc = new MainDisc(0, 0, windowHeight * 0.8, windowHeight * 0.25, windowHeight * 0.018);
  let vernierScale = new VernierScale(0, 0, windowHeight * 0.325, windowHeight * 0.65, windowHeight * 0.016);
  let blade = new ProtractorBlade(windowWidth * -0.5, windowHeight * 0.25, windowHeight * 1.2, windowHeight * 0.15);
  let handLock = new HandLock(0, 0, windowHeight * 0.15, disc.radius * 1.9, disc.radius * 0.1);
  let magnifying = new Magnifying(0, windowHeight * -0.3, windowHeight * 0.3, windowHeight * 0.2, disc.radius * 0.1);
  handle = new Handle(0, 0, windowHeight * 0.6, windowHeight * 0.16, 1);

  translate(width / 2 - 50, height / 2 - windowHeight * 0.12);

  // Rotate the disc
  push();
  rotate(discAngle);
  disc.render();
  pop();

  vernierScale.render();

  // Move the blade
  push();
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
  if (toggleBlade) {
    fill(100);
    circle(0, 0 + windowHeight * 0.25 + windowHeight * 0.075, windowHeight * 0.088, 0);
    fill(999);
    textSize(windowHeight * 0.02);
    text("Locked", 0, 0 + windowHeight * 0.25 + windowHeight * 0.075);
    pop();
  }
  if (toggleDisc) {
    fill(120);
    circle(0, 0, windowHeight * 0.11, 0);
    fill(999);
    textSize(windowHeight * 0.02);
    text("Locked", 0, 0);
    pop();
  }

  // Calculate and display the angle
  let displayedAngle = calculateAngle(discAngle);
  fill("#059669");
  textSize(windowHeight * 0.04);
  textAlign(0, 0);
  textStyle(BOLD);
  text(`Sudut: ${displayedAngle.deg}° ${displayedAngle.min}'`, 0 + windowHeight * 0.55, 0 - windowHeight * 0.3);

  if (toggleAngle) {
    fill("#0f172a");
    rect(0 + windowHeight * 0.4, 0 - windowHeight * 0.4, windowHeight * 0.3, windowHeight * 0.15, 5);
    fill("#059669");
    textSize(windowHeight * 0.04);
    text("SHOW", 0 + windowHeight * 0.555, 0 - windowHeight * 0.322);
    pop();
  }
}

function calculateAngle(angleRad) {
  let angleDeg = degrees(angleRad);
  if (angleDeg < 0) {
    angleDeg += 360;
  }
  if (angleDeg > 180) {
    angleDeg = 360 - angleDeg;
  }
  let degreesPart = Math.floor(angleDeg);
  let minutesPart = Math.round((angleDeg - degreesPart) * 60);

  minutesPart = Math.round(minutesPart / 5) * 5;
  if (minutesPart == 60) {
    degreesPart += 1;
    minutesPart = 0;
  }
  return { deg: degreesPart, min: minutesPart };
}

function mouseDragged() {
  if (draggingDisc && !toggleDisc) {
    let dx = mouseX - discCenterX;
    let dy = mouseY - discCenterY;
    let lastDx = lastMouseX - discCenterX;
    let lastDy = lastMouseY - discCenterY;
    let currentAngle = atan2(dy, dx);
    let lastAngle = atan2(lastDy, lastDx);
    let deltaAngle = currentAngle - lastAngle;
    
    
    if (deltaAngle > PI) {
      deltaAngle -= TWO_PI;
    } else if (deltaAngle < -PI) {
      deltaAngle += TWO_PI;
    }
    discAngle += deltaAngle * rotationSensitivity;
    discAngle = (discAngle + TWO_PI) % TWO_PI;
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  } else if (draggingBlade && !toggleBlade) {
    let deltaX = mouseX - lastMouseX;
    let movementAmount = (deltaX / (windowWidth * 0.5)) * bladeMovementPerFullDrag;

    bladePosition += movementAmount;
    bladePosition = constrain(bladePosition, -windowHeight * 0.6, windowWidth);
    lastMouseX = mouseX;
  }
}

function mousePressed() {
  if (isClickInsideMagnifying()) {
    toggleZoom();
    return;
  }
  if (
    mouseX < width / 2 - 50 + windowHeight * 0.69 &&
    mouseX > width / 2 - 50 + windowHeight * 0.42 &&
    mouseY > height / 2 - windowHeight * 0.51 &&
    mouseY < height / 2 - windowHeight * 0.39
  ) {
    toggleAngle = !toggleAngle;
    return;
  }
  let d = dist(mouseX, mouseY, width / 2 - 50, height / 2 - windowHeight * 0.12 + windowHeight * 0.325);
  if (d < windowHeight * 0.045) {
    toggleBlade = !toggleBlade;
    return;
  }
  let c = dist(mouseX, mouseY, width / 2 - 50, height / 2 - windowHeight * 0.12);
  if (c < windowHeight * 0.045) {
    toggleDisc = !toggleDisc;
    return;
  }
  if (mode === "zoom") {
    mode = "";
    sf = 1;
    return;
  }
  if (isMouseInBladeArea() && !toggleBlade) {
    lastMouseX = mouseX;
    draggingBlade = true;
    draggingDisc = false;
    return;
  }
  if (isMouseInDiscArea() && !toggleDisc) {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    draggingDisc = true;
    draggingBlade = false;
    return;
  }
}

function touchStarted() {
  if (isClickInsideMagnifying()) {
    toggleZoom();
    return;
  }
  let d = dist(mouseX, mouseY, width / 2 - 50, height / 2 - windowHeight * 0.12 + windowHeight * 0.25 + windowHeight * 0.075);
  if (d < windowHeight * 0.045) {
    toggleBlade = !toggleBlade;
    return;
  }
  let c = dist(mouseX, mouseY, width / 2 - 50, height / 2 - windowHeight * 0.12);
  if (c < windowHeight * 0.045) {
    toggleDisc = !toggleDisc;
    return;
  }
  if (
    mouseX < width / 2 - 50 + windowHeight * 0.69 &&
    mouseX > width / 2 - 50 + windowHeight * 0.42 &&
    mouseY > height / 2 - windowHeight * 0.51 &&
    mouseY < height / 2 - windowHeight * 0.39
  ) {
    toggleAngle = !toggleAngle;
    return;
  }
  if (mode === "zoom") {
    mode = "";
    sf = 1;
    return;
  }
  if (isMouseInBladeArea() && !toggleBlade) {
    lastMouseX = mouseX;
    draggingBlade = true;
    draggingDisc = false;
    return;
  }
  if (isMouseInDiscArea() && !toggleDisc) {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    draggingDisc = true;
    draggingBlade = false;
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

function isMouseInDiscArea() {
  let discRadius = windowHeight * 0.41; // Setengah dari diameter disc
  let d = dist(mouseX, mouseY, discCenterX, discCenterY);
  return d < discRadius;
}

function isMouseInBladeArea() {
  let bladeAreaTop = height / 2 - windowHeight * 0.12 + windowHeight * 0.25;
  let bladeAreaBottom = bladeAreaTop + windowHeight * 0.15;
  let bladeAreaLeft = windowWidth * 0.05;
  let bladeAreaRight = windowWidth * 0.95;

  return (
    mouseX > bladeAreaLeft &&
    mouseX < bladeAreaRight &&
    mouseY > bladeAreaTop &&
    mouseY < bladeAreaBottom
  );
}

function isClickInsideMagnifying() {
  let magnifyingX = width / 2 - 50;
  let magnifyingY = height / 2 - windowHeight * 0.12 + windowHeight * -0.3;
  let magnifyingWidth = windowHeight * 0.3;
  let magnifyingHeight = windowHeight * 0.2;

  return (
    mouseX > magnifyingX - magnifyingWidth / 2 &&
    mouseX < magnifyingX + magnifyingWidth / 2 &&
    mouseY > magnifyingY - magnifyingHeight / 2 &&
    mouseY < magnifyingY + magnifyingHeight / 2
  );
}

function toggleZoom() {
  if (mode === "zoom") {
    mode = "";
  } else {
    mode = "zoom";
  }
  draggingDisc = false;
  draggingBlade = false;
}