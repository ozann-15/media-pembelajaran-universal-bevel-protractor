class Handle {
    constructor(x, y, width, height, scale) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.scale = scale;
    }
  
    render(angle) {
      push();
      translate(this.x, this.y);
      rotate(angle);
  
      // Warna latar belakang
      fill(200);
  
      beginShape();
      // Bagian utama
      vertex(this.width * 0.6, this.height * 1.5);
      vertex(this.width * 1.4, this.height * 1.5);
      vertex(this.width * 1.4, this.height * 2.5);
      vertex(this.width * 0.2, this.height * 2.5);
      endShape(CLOSE);
  
      // Dua lingkaran
      fill(100);
      circle (this.width * 1.2, this.height * 2, this.height * 0.35, this.height * 0.35 )
      circle (this.width * 0.9, this.height * 2, this.height * 0.35, this.height * 0.35 )
  
      pop();
    }
  }