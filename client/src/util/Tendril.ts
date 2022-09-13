export interface Target {
  x: number;
  y: number;
}

export interface TendrilOpts {
  spring: number;
  target: Target;
  ctx: CanvasRenderingContext2D;
}

const settings = {
  friction: 0.5,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

class Node {
  public x = 0;
  public y = 0;
  public vy = 0;
  public vx = 0;
}

export class Tendril {
  constructor(opts: TendrilOpts) {
    this.spring = opts.spring + Math.random() * 0.1 - 0.05;
    this.friction = settings.friction + Math.random() * 0.01 - 0.005;
    this.target = opts.target;
    this.ctx = opts.ctx;
    this.init();
  }

  private spring: number;

  private friction: number;

  private nodes: Node[] = [];

  private target: Target;

  private ctx: CanvasRenderingContext2D;

  private init() {
    this.nodes = [];

    for (var i = 0, node; i < settings.size; i++) {
      node = new Node();
      node.x = this.target.x;
      node.y = this.target.y;

      this.nodes.push(node);
    }
  }

  public update() {
    let spring = this.spring;
    let node = this.nodes[0];

    node.vx += (this.target.x - node.x) * spring;
    node.vy += (this.target.y - node.y) * spring;

    for (var prev, i = 0, n = this.nodes.length; i < n; i++) {
      node = this.nodes[i];

      if (i > 0) {
        prev = this.nodes[i - 1];

        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * settings.dampening;
        node.vy += prev.vy * settings.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;

      spring *= settings.tension;
    }
  }

  public draw() {
    var x = this.nodes[0].x,
      y = this.nodes[0].y,
      a,
      b;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);

    for (var i = 1, n = this.nodes.length - 2; i < n; i++) {
      a = this.nodes[i];
      b = this.nodes[i + 1];
      x = (a.x + b.x) * 0.5;
      y = (a.y + b.y) * 0.5;

      this.ctx.quadraticCurveTo(a.x, a.y, x, y);
    }

    a = this.nodes[i];
    b = this.nodes[i + 1];

    this.ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
