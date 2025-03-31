const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');
const generateCode = require('./generateCode');

module.exports = function compiler(input) {
  // 1. Lexical Analysis: Tokenize the input
  const tokens = tokenizer(input);
  
  // 2. Syntactic Analysis: Parse the tokens into an AST
  const lipsAST = parser(tokens);
  
  // 3. Transformation: Transform Lisp AST into JavaScript AST
  const jsAST = transformer(lipsAST);
  
  // 4. Code Generation: Generate JavaScript code from JavaScript AST
  const jsCode = generateCode(jsAST);
  
  // Return the generated JavaScript code
  return jsCode;
};
