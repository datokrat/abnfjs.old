function createASTNavigator(ast) {
  return new ExpressionNavigator(ast);
}

function ExpressionNavigator(ast) {
  this.ast = ast;
}

ExpressionNavigator.prototype.str = function() {
  return this.ast.str;
}

ExpressionNavigator.prototype.type = function() {
  return this.ast.type;
}

ExpressionNavigator.prototype.alternativeIndex = function() {
  return this.ast.alternativeIndex;
}

ExpressionNavigator.prototype.nthItem = function(n) {
  return createASTNavigator(this.ast.value.sequence[n].result);
}

ExpressionNavigator.prototype.nthItemName = function(n) {
  return this.ast.value.sequence[n].name;
}

ExpressionNavigator.prototype.alternativeName = function() {
  return this.ast.name;
}

ExpressionNavigator.prototype.nthNamedItemOrThrow = function(n,name) {
  if(!name || name === this.nthItemName(n))
    return this.nthItem(n);
  else throw new Error('named item does not exist here: ' + name);
}

//Group

ExpressionNavigator.prototype.groupContent = function() {
  if(this.ignored()) throw new Error('no group content');
  return createASTNavigator(this.ast.value);
}

ExpressionNavigator.prototype.groupContentName = function() {
  return this.groupContent().alternativeName();
}

ExpressionNavigator.prototype.namedGroupContentOrThrow = function(name) {
  console.log(this.ast)
  if(!name || name === this.groupContentName())
    return this.groupContent();
  else throw new Error('named group content does not exist here: ' + name);
}

ExpressionNavigator.prototype.ignored = function() {
  return this.ast.option === 'ignore';
}

//String

ExpressionNavigator.prototype.stringPattern = function() {
  return this.ast.pattern;
}

//RepeatedToken

ExpressionNavigator.prototype.count = function() {
  return this.ast.count;
}

ExpressionNavigator.prototype.nthRepetition = function(n) {
  return createASTNavigator(this.ast.items[n]);
}

module.exports = createASTNavigator;