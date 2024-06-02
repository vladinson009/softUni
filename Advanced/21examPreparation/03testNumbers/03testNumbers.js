const testNumbers = {
  sumNumbers: function (num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return undefined;
    } else {
      let sum = (num1 + num2).toFixed(2);
      return sum;
    }
  },
  numberChecker: function (input) {
    input = Number(input);

    if (isNaN(input)) {
      throw new Error('The input is not a number!');
    }

    if (input % 2 === 0) {
      return 'The number is even!';
    } else {
      return 'The number is odd!';
    }
  },
  averageSumArray: function (arr) {
    let arraySum = 0;

    for (let i = 0; i < arr.length; i++) {
      arraySum += arr[i];
    }

    return arraySum / arr.length;
  },
};

export { testNumbers };
