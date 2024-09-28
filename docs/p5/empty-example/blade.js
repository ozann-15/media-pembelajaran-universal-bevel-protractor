class ProtractorBlade {
  constructor(x, y, width, height, scale) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.scale = scale
  }

  render() {
    fill(200);

    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + this.width, this.y);
    vertex(this.x + this.width + this.width * 0.1, this.y + this.height);
    vertex(this.x - this.width * 0.1, this.y + this.height);
    endShape(CLOSE);

    fill(190);
    beginShape();
    vertex(this.x - this.width * 0.03, this.y + this.height / 2 - this.height * 0.2);
    vertex(this.x + this.width + this.width * 0.03, this.y + this.height / 2 - this.height * 0.2);
    vertex(this.x + this.width + this.width * 0.06, this.y + this.height / 2 + this.height * 0.1);
    vertex(this.x - this.width * 0.06, this.y + this.height / 2 + this.height * 0.1);
    endShape(CLOSE);

  }
}
