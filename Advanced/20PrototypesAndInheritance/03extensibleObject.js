function extensibleObject() {
  const obj = {
    extend: function (template) {
      for (let prop in template) {
        if (typeof template[prop] == 'function') {
          // Add function to the prototype
          this.__proto__[prop] = template[prop];
          //Object.prototype[prop] = template[prop];
        } else {
          // Copy non-function properties
          this[prop] = template[prop];
        }
      }
    },
  };
  return obj;
}
let extObj = extensibleObject();
extObj.extend({
  prop1: 'value1',
  prop2: 'value2',
  method1: function () {
    console.log('Method 1 called');
  },
  method2: function () {
    console.log('Method 2 called');
  },
});

// Now extObj has properties and methods of the template object
console.log(extObj.prop1); // Output: value1
console.log(extObj.prop2); // Output: value2
extObj.method1(); // Output: Method 1 called
extObj.method2(); // Output: Method 2 called

/**
 * object = {
    prop1: 'value1',
    prop2: 'value2',
    method1: function() {
        console.log('Method 1 called');
    },
    method2: function() {
        console.log('Method 2 called');
    }
 */
