import { Bubble } from './bubble.js';
import { Shooter } from './shooter.js';
import { PowerUp } from './powerup.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 800;
    
    this.bubbles = [];
    this.fallingBubbles = [];
    this.powerUps = [];
    this.score = 0;
    this.level = 1;
    this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    this.shooter = new Shooter(this.canvas.width / 2, this.canvas.height - 50);
    
    this.gameLoop = this.gameLoop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    
    this.dropDelay = 500; // Time between each bubble drop
    this.lastDropTime = 0;
  }

  init() {
    this.canvas.addEventListener('click', this.handleClick);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.initializeBubbles();
    requestAnimationFrame(this.gameLoop);
  }

  initializeBubbles() {
    const rows = 5;
    const cols = 8;
    const bubbleSize = 40;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * bubbleSize + bubbleSize / 2 + (i % 2) * (bubbleSize / 2);
        const y = i * bubbleSize + bubbleSize / 2;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.bubbles.push(new Bubble(x, y, bubbleSize / 2, color, false));
      }
    }
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.shooter.shoot(x, y);
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.shooter.aim(x, y);
  }

  startBubbleDrop() {
    if (this.bubbles.length > 0 && Date.now() - this.lastDropTime > this.dropDelay) {
      const bubbleIndex = Math.floor(Math.random() * this.bubbles.length);
      const bubble = this.bubbles[bubbleIndex];
      bubble.startFalling();
      this.fallingBubbles.push(bubble);
      this.bubbles.splice(bubbleIndex, 1);
      this.lastDropTime = Date.now();
    }
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.gameLoop);
  }

  update() {
    this.shooter.update();
    this.startBubbleDrop();
    
    // Update falling bubbles
    this.fallingBubbles = this.fallingBubbles.filter(bubble => {
      bubble.update();
      if (bubble.y > this.canvas.height + bubble.radius) {
        return false;
      }
      return true;
    });
    
    this.powerUps.forEach(powerUp => powerUp.update());
    
    // Check collisions
    this.checkCollisions();
    
    // Update score display
    document.getElementById('score').textContent = `分数: ${this.score}`;
    document.getElementById('level').textContent = `关卡: ${this.level}`;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.fillStyle = '#000033';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw game elements
    this.bubbles.forEach(bubble => bubble.draw(this.ctx));
    this.fallingBubbles.forEach(bubble => bubble.draw(this.ctx));
    this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));
    this.shooter.draw(this.ctx);
  }

  checkCollisions() {
    // Check collisions between falling bubbles
    for (let i = 0; i < this.fallingBubbles.length; i++) {
      for (let j = i + 1; j < this.fallingBubbles.length; j++) {
        const b1 = this.fallingBubbles[i];
        const b2 = this.fallingBubbles[j];
        if (b1.collidesWith(b2)) {
          // Adjust velocities for realistic bouncing
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const angle = Math.atan2(dy, dx);
          const speed1 = Math.sqrt(b1.velocity.x ** 2 + b1.velocity.y ** 2);
          const speed2 = Math.sqrt(b2.velocity.x ** 2 + b2.velocity.y ** 2);
          
          b1.velocity.x = -Math.cos(angle) * speed2 * 0.5;
          b1.velocity.y = -Math.sin(angle) * speed2 * 0.5;
          b2.velocity.x = Math.cos(angle) * speed1 * 0.5;
          b2.velocity.y = Math.sin(angle) * speed1 * 0.5;
        }
      }
    }
  }

  addScore(points) {
    this.score += points;
    if (this.score > this.level * 1000) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    this.dropDelay = Math.max(100, this.dropDelay - 50);
    this.colors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    this.initializeBubbles();
  }
}