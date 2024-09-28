class Magnifying {
    constructor(x, y, width, height, radius) {
        this.x = x;          // Koordinat pusat
        this.y = y;          // Koordinat pusat
        this.width = width;  // Lebar persegi panjang
        this.height = height; // Tinggi persegi panjang
        this.radius = radius; // Radius lengkungan
    }

    render() {
        let w = this.width;
        let h = this.height;
        let r = this.radius;

        // Persegi panjang luar besar (putih)
        fill(255, 255, 255, 0);
        stroke(190);
        strokeWeight(windowHeight * 0.015);
        rect(this.x - w / 2, this.y - h / 2, w, h, r);

        // Bagian bawah melengkung (putih)
        fill(190);
        beginShape();
        vertex(this.x - w / 3, this.y + h / 2);
        bezierVertex(this.x - w / 3, this.y + h / 1, this.x + w / 3, this.y + h / 1, this.x + w / 3, this.y + h / 2);
        endShape();

        // Dua lingkaran di bawah (putih)
        stroke(150);
        strokeWeight(windowHeight * 0.002);
        ellipse(this.x - w / 5, this.y + h / 1.5, w / 12, w / 12);
        ellipse(this.x + w / 5, this.y + h / 1.5, w / 12, w / 12);

        // Tombol klik 
     
    }

}
