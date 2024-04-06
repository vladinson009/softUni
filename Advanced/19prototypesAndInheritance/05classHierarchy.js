function classHieararchy() {
  class Figure {
    constructor(units = 'cm') {
      this.units = units;
    }
    calcUnits(param) {
      switch (this.units) {
        case 'mm':
          param *= 10;
          break;
        case 'cm':
          break;
        case 'm':
          param /= 10;
          break;
        default:
          break;
      }
      return param;
    }
    get area() {
      return this.area;
    }
    changeUnits(value) {
      this.units = value;
    }
    toString() {
      return `Figures units: ${this.units}`;
    }
  }

  class Circle extends Figure {
    constructor(radius, units) {
      super(units);
      this._radius = radius;
    }
    get radius() {
      return super.calcUnits(this._radius);
    }
    get area() {
      return Math.PI * this.radius * this.radius;
    }
    toString() {
      return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius}`;
    }
  }
  class Rectangle extends Figure {
    constructor(width, height, units) {
      super(units);
      this._width = width;
      this._height = height;
    }
    get width() {
      return super.calcUnits(this._width);
    }
    get height() {
      return super.calcUnits(this._height);
    }
    get area() {
      return this.width * this.height;
    }
    toString() {
      return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
    }
  }

  return {
    Figure,
    Circle,
    Rectangle,
  };
}
