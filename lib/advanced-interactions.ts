// Advanced UI interaction utilities for hover effects, magnetic buttons, and cursor following

import { gsap } from 'gsap';

export interface MagneticOptions {
  strength?: number;
  speed?: number;
  tolerance?: number;
}

export class MagneticButton {
  private element: HTMLElement;
  private strength: number;
  private speed: number;
  private tolerance: number;
  private bound: DOMRect;

  constructor(element: HTMLElement, options: MagneticOptions = {}) {
    this.element = element;
    this.strength = options.strength ?? 0.3;
    this.speed = options.speed ?? 0.5;
    this.tolerance = options.tolerance ?? 100;
    this.bound = this.element.getBoundingClientRect();
    
    this.init();
  }

  private init() {
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('resize', this.updateBounds);
  }

  private updateBounds = () => {
    this.bound = this.element.getBoundingClientRect();
  };

  private handleMouseEnter = () => {
    gsap.to(this.element, {
      scale: 1.05,
      duration: this.speed,
      ease: 'power2.out',
    });
  };

  private handleMouseMove = (e: MouseEvent) => {
    const centerX = this.bound.left + this.bound.width / 2;
    const centerY = this.bound.top + this.bound.height / 2;
    
    const deltaX = (e.clientX - centerX) * this.strength;
    const deltaY = (e.clientY - centerY) * this.strength;

    gsap.to(this.element, {
      x: deltaX,
      y: deltaY,
      duration: this.speed,
      ease: 'power2.out',
    });
  };

  private handleMouseLeave = () => {
    gsap.to(this.element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: this.speed * 1.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  destroy() {
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
    window.removeEventListener('resize', this.updateBounds);
  }
}

export class CustomCursor {
  private cursor: HTMLElement;
  private follower: HTMLElement;
  private isHovering: boolean = false;

  constructor() {
    this.cursor = this.createCursorElement('custom-cursor');
    this.follower = this.createCursorElement('custom-cursor-follower');
    this.init();
  }

  private createCursorElement(className: string): HTMLElement {
    const element = document.createElement('div');
    element.className = className;
    element.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
    `;
    
    if (className === 'custom-cursor') {
      element.style.cssText += `
        width: 10px;
        height: 10px;
        background: #00D9FF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      `;
    } else {
      element.style.cssText += `
        width: 40px;
        height: 40px;
        border: 2px solid #00D9FF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      `;
    }
    
    document.body.appendChild(element);
    return element;
  }

  private init() {
    document.addEventListener('mousemove', this.handleMouseMove);
    
    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.setHoverState(true));
      el.addEventListener('mouseleave', () => this.setHoverState(false));
    });
  }

  private handleMouseMove = (e: MouseEvent) => {
    gsap.to(this.cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    });

    gsap.to(this.follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  private setHoverState(hovering: boolean) {
    this.isHovering = hovering;
    gsap.to(this.follower, {
      scale: hovering ? 1.5 : 1,
      opacity: hovering ? 0.5 : 1,
      duration: 0.3,
    });
  }

  destroy() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.cursor.remove();
    this.follower.remove();
  }
}

export class ParallaxLayer {
  private element: HTMLElement;
  private speed: number;

  constructor(element: HTMLElement, speed: number = 0.5) {
    this.element = element;
    this.speed = speed;
    this.init();
  }

  private init() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (e: MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (e.clientX - centerX) * this.speed * 0.01;
    const deltaY = (e.clientY - centerY) * this.speed * 0.01;

    gsap.to(this.element, {
      x: deltaX,
      y: deltaY,
      duration: 1,
      ease: 'power2.out',
    });
  };

  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }
}

export const initMagneticButtons = (selector: string = '[data-magnetic]') => {
  const buttons = document.querySelectorAll<HTMLElement>(selector);
  const instances: MagneticButton[] = [];
  
  buttons.forEach(button => {
    instances.push(new MagneticButton(button));
  });
  
  return instances;
};

export const initCustomCursor = () => {
  return new CustomCursor();
};

export const initParallaxLayers = (selector: string = '[data-parallax]') => {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  const instances: ParallaxLayer[] = [];
  
  elements.forEach(el => {
    const speed = parseFloat(el.dataset.parallax || '0.5');
    instances.push(new ParallaxLayer(el, speed));
  });
  
  return instances;
};
