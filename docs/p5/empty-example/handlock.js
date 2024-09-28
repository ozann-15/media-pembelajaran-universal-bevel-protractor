class HandLock {
  constructor(x, y, width, height, radius) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.buttonAColor = 150;
    this.buttonBColor = 100;
    this.isButtonAClicked = false;
    this.isButtonBClicked = false;
  }

  render() {
    fill(200);
    beginShape();
    vertex(this.x - this.width * 0.5, this.y - this.width * 0.7 + this.radius);
    quadraticVertex(this.x - this.width * 0.5, this.y - this.width * 0.7, this.x - this.width * 0.5 + this.radius * 0.6, this.y - this.width * 0.7);
    vertex(this.x - this.width * 0.5 + this.width - this.radius * 0.6, this.y - this.width * 0.7);
    quadraticVertex(
      this.x - this.width * 0.5 + this.width, this.y - this.width * 0.7,
      this.x - this.width * 0.5 + this.width, this.y - this.width * 0.7 + this.radius
    );
    vertex(this.x - this.width * 0.5 + this.width, this.y - this.width * 0.55 + this.height);
    vertex(this.x - this.width * 0.5, this.y - this.width * 0.55 + this.height);
    endShape(CLOSE);

    fill(60);
    circle(0, this.y, this.width * 0.9);

    // Tombol A
    fill(this.buttonAColor);
    circle(0, this.y, this.width * 0.75);

    // Tombol B
    fill(this.buttonBColor);
    circle(0, this.y + this.height - this.width * 1, this.width * 0.6);

    circle(this.x + this.height /2, this.y, this.width * 0.8);

    fill('#059669');
    textSize(20);
    textAlign(0, this.y);
    text("⏬", this.x + this.height *1.2, this.y + 30);
    text("⏫", this.x + this.height *1.2, this.y - 30);
    text("swipe", this.x + this.height *1.2, this.y);
    text("⏩", this.x + 90, this.y + this.height * 0.92);
    text("⏪", this.x - 30, this.y + this.height * 0.92);
    text("swipe", this.x + 30, this.y + this.height * 0.92);
  }

  handleClick(mouseX, mouseY) {
    // Check if Tombol A is clicked
    if (dist(mouseX, mouseY, 0, this.y) < this.width * 0.375) {
      this.isButtonAClicked = !this.isButtonAClicked;
      this.buttonAColor = this.isButtonAClicked ? 0 : 150;
    }
    // Check if Tombol B is clicked
    else if (dist(mouseX, mouseY, 0, this.y + this.height - this.width * 1) < this.width * 0.3) {
      this.isButtonBClicked = !this.isButtonBClicked;
      this.buttonBColor = this.isButtonBClicked ? 0 : 100;
    }
  }
}