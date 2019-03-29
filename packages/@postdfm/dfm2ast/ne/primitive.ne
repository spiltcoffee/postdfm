identifer -> letter
{% id %}
identifer -> "_"
{% id %}

identifer -> identifer alphanumeric
{% join %}
identifer -> identifer "_"
{% join %}

qualifiedIdentifier -> identifer
{% id %}

qualifiedIdentifier -> qualifiedIdentifier "." identifer
{% join %}

string -> singleString
{% id %}

# two literals next to each other cause an apostrophe to appear
string -> string singleString
{% ([values, value]) => {
  const prevValue = values[values.length - 1];
  const isLiteral = (
    prevValue.astType === AST.ASTType.LiteralString &&
    value.astType  === AST.ASTType.LiteralString
  );

  if (isLiteral) {
    prevValue.value += "'" + value.value;
    return values;
  } else {
    return [].concat(values, value)
  }
} %}

stringSep -> _ "+" _
{% join %}

string -> string stringSep singleString
{% ([values, before, value]) => {
  value.raws = { ...(value.raws || {}), before };
  return [].concat(values, value);
} %}

singleString -> controlChar
{% ([value]) => new AST.ControlString(value) %}

singleString -> literalString
{% ([value]) => new AST.LiteralString(value) %}

literalString -> "'" quotedString "'"
{% ([_, value]) => value %}

quotedString -> null
{% () => "" %}

quotedString -> quotedString [^']
{% join %}

controlChar -> "#" decimal
{% ([_, charCode]) => String.fromCharCode(charCode) %}

binaryString -> hexidecimal
{% ([value]) => new AST.BinaryStringValue(value) %}

hexCode -> "$" hexidecimal
{% ([_, hexCode]) => hexCode %}

hexidecimal -> hexDigit
{% id %}
hexidecimal -> hexidecimal hexDigit
{% join %}

hexDigit -> [0-9a-fA-F] {% id %}

float -> integer "." decimal
{% ([integer, _, fraction]) => ({ integer, fraction }) %}

float -> integer "e"i integer
{% ([integer, _, exponent]) => ({ integer, exponent }) %}

float -> integer "." decimal "e"i integer
{% ([integer, _, fraction, __, exponent]) => ({ integer, fraction, exponent }) %}

decimal -> decimalDigit {% id %} | decimal decimalDigit {% join %}
sign -> "+" {% id %} | "-" {% id %}
integer -> sign decimal {% join %} | decimal {% id %}

alphanumeric -> decimalDigit
{% id %}
alphanumeric -> letter
{% id %}

decimalDigit -> [0-9]
{% id %}

letter -> [a-zA-Z]
{% id %}

boolean -> "true"i {% () => true %} | "false"i {% () => false %}