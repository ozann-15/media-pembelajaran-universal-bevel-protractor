class VernierScale {
  constructor(x, y, radius, circleRadius, textSize) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.circleRadius = circleRadius;
    this.textSize = textSize;
  }
  render() {
    strokeWeight(windowHeight * 0.001);
    // Draw the bottom bevel
    fill(210); // Darker shade for the bottom bevel
    circle(0, 0, this.circleRadius);

    // Draw the bottom bevel
    fill(240); // Darker shade for the bottom bevel
    circle(0, 0, this.circleRadius - this.circleRadius * 0.3);

    push();
    beginShape();
    fill(210); // Darker shade for the bottom bevel
    for (let angle = 64; angle <= 116; angle++) {
      let x = this.x + cos(radians(angle)) * (this.radius - this.radius * 0.3);
      let y = this.y - sin(radians(angle)) * (this.radius - this.radius * 0.3);
      vertex(x, y);
    }
    for (let angle = 116; angle >= 64; angle--) {
      let x = this.x + cos(radians(angle)) * this.radius;
      let y = this.y - sin(radians(angle)) * this.radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    // Draw the tick marks
    for (let angle = 67, i = 0; angle < 114; angle += 23 / 12, i++) {
      let x1 = this.x + cos(radians(angle)) * this.radius;
      let y1 = this.y - sin(radians(angle)) * this.radius;
      let x2 = this.x + cos(radians(angle)) * (this.radius - this.radius * 0.05);
      let y2 = this.y - sin(radians(angle)) * (this.radius - this.radius * 0.05);
      line(x1, y1, x2, y2);

      if (i % 3 == 0) {
        //  Draw longer lines every 30 degrees
        x2 = this.x + cos(radians(angle)) * (this.radius - this.radius * 0.1);
        y2 = this.y - sin(radians(angle)) * (this.radius - this.radius * 0.1);
        line(x1, y1, x2, y2);
      }

      if (i % 6 == 0) {
        // Draw longer lines every 30 degrees
        x2 = this.x + cos(radians(angle)) * (this.radius - this.radius * 0.15);
        y2 = this.y - sin(radians(angle)) * (this.radius - this.radius * 0.15);
        line(x1, y1, x2, y2);
      }
    }

    // Draw the numbers
    textSize(this.textSize);
    let i = 0;
    let iteration = [60, 30, 0, 30, 60];

    textAlign(CENTER, CENTER);
    fill(0);
    for (let angle = 67; angle < 114; angle += 58 / 5) {
      let x = this.x + cos(radians(angle)) * (this.radius - this.radius * 0.2);
      let y = this.y - sin(radians(angle)) * (this.radius - this.radius * 0.2);
      text(iteration[i], x, y);
      i++;
    }
  }
}
