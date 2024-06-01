function createComputerHierarchy() {
  class Component {
    constructor(manufacturer) {
      if (new.target === Component) {
        throw new Error('Cannot instantiate abstract class Component directly');
      }
      this.manufacturer = manufacturer;
    }
  }
  class Keyboard extends Component {
    constructor(manufacturer, responseTime) {
      super(manufacturer);
      this.responseTime = responseTime;
    }
  }
  class Monitor extends Component {
    constructor(manufacturer, width, height) {
      super(manufacturer);
      this.width = Number(width);
      this.height = Number(height);
    }
  }
  class Battery extends Component {
    constructor(manufacturer, expectedLife) {
      super(manufacturer);
      this.expectedLife = Number(expectedLife);
    }
  }
  class Computer extends Component {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
      if (new.target === Computer) {
        throw new Error('Cannot instantiate abstract class Computer directly');
      }
      super(manufacturer);
      this.processorSpeed = Number(processorSpeed);
      this.ram = Number(ram);
      this.hardDiskSpace = Number(hardDiskSpace);
    }
  }
  class Laptop extends Computer {
    constructor(
      manufacturer,
      processorSpeed,
      ram,
      hardDiskSpace,
      weight,
      color,
      battery
    ) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.weight = Number(weight);
      this.color = color;
      this.battery = battery;
      this._battery = battery;
    }
    get battery() {
      return this._battery;
    }
    set battery(value) {
      if (!(value instanceof Battery)) {
        throw new TypeError('Battery must be an instance of Battery class');
      }
      this._battery = value;
    }
  }
  class Desktop extends Computer {
    constructor(
      manufacturer,
      processorSpeed,
      ram,
      hardDiskSpace,
      keyboard,
      monitor
    ) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.keyboard = keyboard;
      this.monitor = monitor;
      this._keyboard = keyboard;
      this.monitor = monitor;
    }
    get keyboard() {
      return this._keyboard;
    }
    set keyboard(value) {
      if (!(value instanceof Keyboard)) {
        throw new TypeError('Keyboard must be an instance of Keyboard class');
      }
      this._keyboard = value;
    }
    get monitor() {
      return this._monitor;
    }
    set monitor(value) {
      if (!(value instanceof Monitor)) {
        throw new TypeError('Monitor must be an instance of Monitor class');
      }
      this._monitor = value;
    }
  }
  return {
    Component,
    Keyboard,
    Monitor,
    Battery,
    Computer,
    Laptop,
    Desktop,
  };
}

let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let battery = new Battery('Energy', 3);
console.log(battery);
let laptop = new Laptop(
  'Hewlett Packard',
  2.4,
  4,
  0.5,
  3.12,
  'Silver',
  battery
);
console.log(laptop);
