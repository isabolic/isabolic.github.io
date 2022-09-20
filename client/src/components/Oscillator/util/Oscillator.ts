import { Target, Tendril } from "./Tendril";

const TWO_PI = Math.PI * 2;

interface OscillatorOpts {
  phase: number;
  amplitude: number;
  frequency: number;
  offset: number;
}

const settings = {
  trails: 30,
};

interface CanvasRenderingContext extends CanvasRenderingContext2D {
  running: boolean;
  frame: number;
}

export class Oscillator {
  constructor(options: OscillatorOpts) {
    this.options = {
      phase: options.phase || 0,
      offset: options.offset || 0,
      frequency: options.frequency || 0.001,
      amplitude: options.amplitude || 1,
    };
  }

  public options: OscillatorOpts;

  private static target: Target = { x: 0, y: 0 };

  private static tendrils: Tendril[] = [];

  private static ctx: CanvasRenderingContext;

  private static color: number;

  private static init = (event: MouseEvent | TouchEvent) => {
    document.removeEventListener("mousemove", this.init);
    document.removeEventListener("touchstart", this.init);

    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("touchmove", this.mousemove);
    document.addEventListener("touchstart", this.touchstart);

    this.mousemove(event);
    this.reset();
    this.loop();
  };

  private static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private static mousemove = (event: MouseEvent | TouchEvent) => {
    if (event instanceof TouchEvent) {
      this.target.x = event.touches[0].pageX;
      this.target.y = event.touches[0].pageY;
    } else {
      this.target.x = event.clientX;
      this.target.y = event.clientY;
    }

    event.preventDefault();
  };

  private static loop() {
    if (!this.ctx.running) {
      return;
    }

    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "hsla(171,98%,56%,0.25)";

    for (var i = 0, tendril; i < settings.trails; i++) {
      tendril = this.tendrils[i];
      tendril.update();
      tendril.draw();
    }

    this.ctx.frame++;
    this.requestAnimFrame(this.loop.bind(this));
  }

  private static requestAnimFrame(fn: FrameRequestCallback) {
    return window.requestAnimationFrame(fn);
  }

  private static reset() {
    this.tendrils = [];

    for (var i = 0; i < settings.trails; i++) {
      this.tendrils.push(
        new Tendril({
          spring: 0.45 + 0.025 * (i / settings.trails),
          target: this.target,
          ctx: this.ctx,
        })
      );
    }
  }

  private static touchstart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      this.target.x = event.touches[0].pageX;
      this.target.y = event.touches[0].pageY;
    }
  };

  private static resize = () => {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  };

  private static start = () => {
    if (!this.ctx.running) {
      this.ctx.running = true;
      this.loop();
    }
  };

  private static stop = () => {
    this.ctx.running = false;
  };

  public static initOciliator(remove: boolean, el: HTMLCanvasElement) {
    this.color = this.randomIntFromInterval(1, 2);

    if (!remove) {
      this.ctx = el.getContext("2d") as CanvasRenderingContext;

      this.ctx.running = true;
      this.ctx.frame = 1;

      new Oscillator({
        phase: Math.random() * TWO_PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });

      document.addEventListener("mousemove", this.init);
      document.addEventListener("touchstart", this.init);
      document.body.addEventListener("orientationchange", this.resize);
      window.addEventListener("resize", this.resize);
      window.addEventListener("focus", this.start);
      window.addEventListener("blur", this.stop);

      this.resize();
    } else {
      document.body.removeEventListener(
        "orientationchange",
        this.resize.bind(this)
      );
      window.removeEventListener("resize", this.resize);
      window.removeEventListener("focus", this.start);
      window.removeEventListener("blur", this.stop);

      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("touchmove", this.mousemove);
      document.removeEventListener("touchstart", this.touchstart);
    }
  }
}
