export class Shooter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.power = 10;
    this.currentBubble = null;
    this.loadNewBubble();
  }

  loadNewBubble() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    this.currentBubble = {
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: 20
    };
  }

  aim(targetX, targetY) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    this.angle = Math.atan2(dy, dx);
  }

  shoot(targetX, targetY) {
    if (!this.currentBubble) return;
    
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const angle = Math.atan2(dy, dx);
    
    // Create new bubble with velocity
    const velocity = {
      x: Math.cos(angle) * this.power,
      y: Math.sin(angle) * this.power
    };
    
    // Reset shooter
    this.loadNewBubble();
  }

  update() {
    // Update shooter state
  }

  draw(ctx) {
    // Draw shooter base
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw cannon
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = '#444';
    ctx.fillRect(0, -5, 40, 10);
    ctx.restore();
    
    // Draw current bubble
    if (this.currentBubble) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.currentBubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.currentBubble.color;
      ctx.fill();
    }
  }
}