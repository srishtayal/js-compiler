const readline = require('readline');
const compiler = require('./compiler');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const operations = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b
};

const functionDefinitions = Object.entries(operations)
    .map(([name, fn]) => `const ${name} = ${fn.toString()};`)
    .join('\n');

rl.question("Enter Lisp-like expression: ", (input) => {
    try {
        const output = compiler(input);
        console.log("Generated JavaScript Code:", output);

        const result = eval(`${functionDefinitions}\n${output}`);
        console.log("Execution Result:", result);
    } catch (error) {
        console.error("Execution Error:", error);
    }
    
    rl.close();
});
