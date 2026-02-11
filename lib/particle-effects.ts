// Advanced particle effects system for dynamic backgrounds and interactions

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.setupEventListeners();
  }

  private resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  private setupEventListeners() {
    window.addEventListener('resize', this.resize);
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  createParticle(x: number, y: number, options?: Partial<Particle>): Particle {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: 1,
      color: '#00D9FF',
      life: 0,
      maxLife: 100,
      ...options,
    };
  }

  addParticles(count: number, x?: number, y?: number) {
    for (let i = 0; i < count; i++) {
      const px = x ?? Math.random() * this.canvas.width;
      const py = y ?? Math.random() * this.canvas.height;
      this.particles.push(this.createParticle(px, py));
    }
  }

  private updateParticle(particle: Particle) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life++;
    particle.opacity = 1 - particle.life / particle.maxLife;

    // Mouse interaction
    const dx = this.mouseX - particle.x;
    const dy = this.mouseY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      particle.vx -= (dx / distance) * force * 0.1;
      particle.vy -= (dy / distance) * force * 0.1;
    }

    // Boundary wrapping
    if (particle.x < 0) particle.x = this.canvas.width;
    if (particle.x > this.canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = this.canvas.height;
    if (particle.y > this.canvas.height) particle.y = 0;
  }

  private drawParticle(particle: Particle) {
    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  private drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          this.ctx.save();
          this.ctx.strokeStyle = '#00D9FF';
          this.ctx.globalAlpha = (1 - distance / 150) * 0.2;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles = this.particles.filter(particle => {
      if (particle.life >= particle.maxLife) return false;
      this.updateParticle(particle);
      this.drawParticle(particle);
      return true;
    });

    this.drawConnections();

    // Maintain particle count
    if (this.particles.length < 50) {
      this.addParticles(1);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  start() {
    if (!this.animationId) {
      this.addParticles(50);
      this.animate();
    }
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resize);
  }
}

export const createParticleBackground = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  
  container.style.position = 'relative';
  container.insertBefore(canvas, container.firstChild);

  const particleSystem = new ParticleSystem(canvas);
  particleSystem.start();

  return particleSystem;
};
