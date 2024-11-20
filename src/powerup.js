export class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'bomb', 'rainbow', 'lightning', 'timeSpeed', 'colorChange', 'gravityReverse'
    this.radius = 15;
    this.active = false;
    this.duration = 5000; // 5 seconds
    this.activationTime = 0;
  }

  update() {
    if (this.active) {
      if (Date.now() - this.activationTime > this.duration) {
        this.deactivate();
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    // Different visual effects for different power-up types
    switch(this.type) {
      case 'bomb':
        ctx.fillStyle = '#ff4444';
        break;
      case 'rainbow':
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'yellow');
        gradient.addColorStop(1, 'blue');
        ctx.fillStyle = gradient;
        break;
      case 'lightning':
        ctx.fillStyle = '#ffff00';
        break;
      case 'timeSpeed':
        ctx.fillStyle = '#00ffff';
        break;
      case 'colorChange':
        ctx.fillStyle = '#ff00ff';
        break;
      case 'gravityReverse':
        ctx.fillStyle = '#00ff00';
        break;
    }
    
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  }

  activate() {
    this.active = true;
    this.activationTime = Date.now();
  }

  deactivate() {
    this.active = false;
  }

  applyEffect(game) {
    switch(this.type) {
      case 'bomb':
        // Explode nearby bubbles
        break;
      case 'rainbow':
        // Change nearby bubbles to same color
        break;
      case 'lightning':
        // Chain reaction with same color
        break;
      case 'timeSpeed':
        // Increase game speed temporarily
        break;
      case 'colorChange':
        // Randomize all bubble colors
        break;
      case 'gravityReverse':
        // Reverse gravity temporarily
        break;
    }
  }
}