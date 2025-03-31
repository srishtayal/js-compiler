const LETTERS = /[a-zA-Z]/;
const WHITESPACE = /\s/;
const NUMBERS = /\d/;
const OPERATORS = /[+\-*\/]/;

module.exports = function tokenizer(input) {
    const tokens = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        if (char === '(' || char === ')') {
            tokens.push({ type: 'paren', value: char });
            current++;
            continue;
        }

        if (LETTERS.test(char)) {
            let value = '';
            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'name', value });
            continue;
        }

        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        if (char ==='"' || char === "'") {
            let value = '';
            let quoteType = char;
            char = input[++current];
            while (char !== quoteType) {
                value += char;
                char = input[++current];
            }
            current++;
            tokens.push({ type: 'string', value });
            continue;
        }

        if (input.slice(current, current + 4) === 'true') {
            tokens.push({ type: 'boolean', value: true });
            current += 4;
            continue;
        }

        if (input.slice(current, current + 5) === 'false') {
            tokens.push({ type: 'boolean', value: false });
            current += 5;
            continue;
        }

        if (OPERATORS.test(char)) {
            let value = char;
            if (["=", ">", "<", "!"].includes(char) && input[current + 1] === "=") {
                value += input[++current];
            }
            tokens.push({ type: 'operator', value });
            current++;
            continue;
        }

        if (NUMBERS.test(char)) {
            let value = '';
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'number', value });
            continue;
        }

        throw new Error(`Unexpected character: ${char}`);
    }
    return tokens;
}