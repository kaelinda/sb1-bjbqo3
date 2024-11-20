export class Bubble {
  constructor(x, y, radius, color, isFalling = false) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isRainbow = Math.random() < 0.1;
    this.isLightning = Math.random() < 0.05;
    this.velocity = { x: 0, y: 0 };
    this.isFalling = isFalling;
    this.gravity = 0.15;
    this.friction = 0.98;
    this.bounceCount = 0;
    this.maxBounces = 3;
  }

  startFalling() {
    this.isFalling = true;
    this.velocity.y = 1;
    // Add slight random horizontal movement
    this.velocity.x = (Math.random() - 0.5) * 2;
  }

  update() {
    if (!this.isFalling) return;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    
    // Apply gravity and friction
    this.velocity.y += this.gravity;
    this.velocity.x *= this.friction;
    
    // Bounce off walls
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.velocity.x = Math.abs(this.velocity.x) * 0.6;
      this.bounceCount++;
    } else if (this.x + this.radius > 600) {
      this.x = 600 - this.radius;
      this.velocity.x = -Math.abs(this.velocity.x) * 0.6;
      this.bounceCount++;
    }
    
    // Bounce off floor
    if (this.y + this.radius > 800 && this.bounceCount < this.maxBounces) {
      this.y = 800 - this.radius;
      this.velocity.y = -Math.abs(this.velocity.y) * 0.6;
      this.bounceCount++;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    if (this.isRainbow) {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(0.2, 'orange');
      gradient.addColorStop(0.4, 'yellow');
      gradient.addColorStop(0.6, 'green');
      gradient.addColorStop(0.8, 'blue');
      gradient.addColorStop(1, 'purple');
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = this.color;
    }
    
    ctx.fill();
    
    if (this.isLightning) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  collidesWith(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + other.radius;
  }
}