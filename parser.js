module.exports = function parser(tokens) {
    let current = 0;

    function walk() {
        let token = tokens[current];

        if (token.type === 'number') {
            current++;
            return {
                type: 'NumberLiteral',
                value: token.value
            };
        }

        if (token.type === 'string') {
            current++;
            return {
                type: 'StringLiteral',
                value: token.value
            };
        }

        if (token.type === 'boolean') {
            current++;
            return {
                type: 'BooleanLiteral',
                value: token.value
            };
        }

        if (token.type === 'paren' && token.value === '(') {
            token = tokens[++current];
            const expression = {
                type: 'CallExpression',
                name: token.value,
                params: []
            };

            token = tokens[++current];
            while (token.value !== ')') {
                expression.params.push(walk());
                token = tokens[current];
            }

            current++;
            return expression;
        }

        throw new Error(`Unexpected token '${token.value}' at position ${current}`);

    }
    const ast = {
        type: 'Program',
        body: [walk()]
    };

    return ast;
}