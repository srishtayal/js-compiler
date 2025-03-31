const compiler = require('./compiler');

const input = '(add 2 (sub 4 2))';
const output = compiler(input);

console.log("Generated JavaScript Code:", output);

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

const result = eval(output);
console.log("Execution Result:", result);
