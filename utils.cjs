const add = (a, b) => a + b;

// create a large module that takes a long time to load
const largeModule = () => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
};

// let's start the large module and see how long it takes to load

module.exports = { add, largeModule };