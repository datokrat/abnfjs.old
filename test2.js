var t = require('./tokenizer')
var p = require('./parser')
var i = require('./interpreter')
var fs = require('fs')

var input = fs.readFileSync('./test.abnf', 'utf8');

console.log('tok');
var tok = t.tokenize(input);
console.log('par');
var par = p.parse(tok);
var inter = new i.Interpreter(par);

var res = inter.getCompleteMatch(inter.getPattern('test'), 'something');
//printx(res);
console.log(res.str);


function printx(x, indent) {
  indent = indent || '';
  if(x == null) console.log(indent + '<null!>');
  else if(x.type == 'alternative') {
    console.log(indent + 'alternative' + (x.name ? (': <' + x.name + '> chosen') : ''));
    printx(x.value, indent + ' ');
  }
  else if(x.type == 'group') {
    console.log(indent + 'group' + (x.option == 'ignore' ? ' ignored' : ''));
    if(x.option !== 'ignore') printx(x.value, indent + ' ');
  }
  else if(x.type == 'string') {
    console.log(indent + 'string, pattern: ' + x.pattern);
  }
  else if(x.type == 'charcode') {
    console.log(indent + 'charcode ' + x.value)
  }
  else if(x.type == 'repeated-token') {
    console.log(indent + 'repetition ' + x.count + 'x');
    x.items.forEach(function(y) { printx(y, indent + ' ') });
  }
  else if(x.sequence) {
    console.log(indent + 'sequence: length=' + x.sequence.length);
    x.sequence.forEach(function(y) { printx(y.result, indent + '|') });
  }
}