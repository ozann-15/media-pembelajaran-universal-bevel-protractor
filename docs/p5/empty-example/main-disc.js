class MainDisc {
  constructor(centerX, centerY, circleRadius, radius, textSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.circleRadius = circleRadius;
    this.textSize = textSize;
  }

  render() {
    rotate(this.angle);

    fill(100);
    beginShape();
    vertex(0, this.circleRadius * 0.3);
    vertex(this.circleRadius, this.circleRadius * 0.3);
    vertex(this.circleRadius, this.circleRadius * 0.5);
    vertex(0, this.circleRadius * 0.5);
    endShape(CLOSE);

    // Draw the bottom bevel
    fill(160); // Darker shade for the bottom bevel
    circle(0, 0, this.circleRadius);
    strokeWeight(windowHeight * 0.001);

    // Draw the tick marks
    for (let angle = 0; angle <= 360; angle++) {
      let x1 = this.centerX + cos(radians(angle)) * this.radius;
      let y1 = this.centerY - sin(radians(angle)) * this.radius;
      let x2 = this.centerX + cos(radians(angle)) * (this.radius + this.circleRadius * 0.105);
      let y2 = this.centerY - sin(radians(angle)) * (this.radius + this.circleRadius * 0.105);
      line(x1, y1, x2, y2);

      if (angle % 10 == 0) {
        // Draw longer lines every 30 degrees
        x2 = this.centerX + cos(radians(angle)) * (this.radius + this.circleRadius * 0.13);
        y2 = this.centerY - sin(radians(angle)) * (this.radius + this.circleRadius * 0.13);
        line(x1, y1, x2, y2);
      }

      if ((angle - 5) % 10 == 0) {
        // Draw longer lines every 30 degrees
        x2 = this.centerX + cos(radians(angle)) * (this.radius + this.circleRadius * 0.12);
        y2 = this.centerY - sin(radians(angle)) * (this.radius + this.circleRadius * 0.12);
        line(x1, y1, x2, y2);
      }
    }

    // Draw the numbers
    textSize(this.textSize);
    fill(0);
    textAlign(CENTER, CENTER);

    for (let i = 0; i < 360; i += 10) {
      let angle = Math.floor(i / 90) % 2 === 0 ? i % 90 : 90 - (i % 90);
      let x = this.centerX + sin(radians(i)) * (this.radius + this.circleRadius * 0.15);
      let y = this.centerY - cos(radians(i)) * (this.radius + this.circleRadius * 0.15);

      push();
      translate(x, y);
      rotate(radians(i) - radians(360));
      text(angle, 0, 0);
      pop();
    }
  }
}
