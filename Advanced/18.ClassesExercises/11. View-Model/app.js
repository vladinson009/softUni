class Textbox {
  constructor(selector, regex) {
    this._value = "";
    this._elements = document.querySelectorAll(selector);
    this._invalidSymbols = regex;
    this._bindEvents();
  }
  get value() {
    return this._value;
  }

  set value(v) {
    Array.from(this._elements).forEach((element) => {
      element.value = v;
    });
    this._value = v;
  }

  get elements() {
    return this._elements;
  }

  isValid() {
    return !Array.from(this._elements).some((element) =>
      this._invalidSymbols.test(element.value)
    );
  }
  _bindEvents() {
    Array.from(this._elements).forEach((element) => {
      element.addEventListener("input", () => {
        this._value = element.value;
        Array.from(this._elements).forEach((elem) => {
          elem.value = element.value;
        });
      });
    });
  }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
