class HandLock {
  constructor(x, y, width, height, radius) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
  }

  render() {
    fill(200);
    beginShape();
    vertex(this.x - this.width * 0.5, this.y - this.width * 0.7 + this.radius);
    quadraticVertex(this.x - this.width * 0.5, this.y - this.width * 0.7, this.x - this.width * 0.5 + this.radius * 0.6, this.y - this.width * 0.7);
    vertex(this.x - this.width * 0.5 + this.width - this.radius * 0.6, this.y - this.width * 0.7);
    quadraticVertex(
      this.x - this.width * 0.5 + this.width,
      this.y - this.width * 0.7,
      this.x - this.width * 0.5 + this.width,
      this.y - this.width * 0.7 + this.radius
    );
    vertex(this.x - this.width * 0.5 + this.width, this.y - this.width * 0.55 + this.height);
    vertex(this.x - this.width * 0.5, this.y - this.width * 0.55 + this.height);
    endShape(CLOSE);

    fill(60);
    circle(0, this.y, this.width * 0.9);

    // Tombol A
    fill(120);
    circle(0, this.y, this.width * 0.75);

    // Tombol B

    fill(100);
    circle(0, this.y + this.height - this.width * 1, this.width * 0.6);
    circle(this.x + this.height / 2, this.y, this.width * 0.8);
    fill("888");
    textStyle(BOLD);
    textSize(windowHeight * 0.03);
    text("Lock", 0, this.y);
    textSize(windowHeight * 0.027);
    text("Lock", 0, this.y + this.height - this.width * 1);

    fill("#059669");
    textSize(windowHeight * 0.03);
    textAlign(0, this.y);
    text("⏬", this.x + this.height * 1.2, this.y + this.height * 0.15);
    text("⏫", this.x + this.height * 1.2, this.y - this.height * 0.15);
    text("swipe", this.x + this.height * 1.2, this.y);
    text("⏩", this.x + this.height * 0.3, this.y + this.height * 0.99);
    text("⏪", this.x - this.height * 0.3, this.y + this.height * 0.99);
    text("swipe", this.x, this.y + this.height * 0.99);
  }
}
