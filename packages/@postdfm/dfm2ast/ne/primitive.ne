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

controlChar -> "#" natural
{% ([charCode]) => String.fromCharCode(charCode) %}

digit -> [0-9]
{% id %}

letter -> [a-zA-Z]
{% id %}

alphanumeric -> digit
{% id %}
alphanumeric -> letter
{% id %}

natural -> digit {% id %} | natural digit {% join %}
sign -> "+" {% id %} | "-" {% id %}
int -> sign natural {% join %} | natural {% id %}

hexDigit -> [0-9a-fA-F] {% id %}

hex -> "$" hexDigit
{% ([hexDigit]) => hexDigit %}
hex -> hex hexDigit
{% join %}

hexString -> hexDigit {% id %} | hexString hexDigit {% join %}

integer -> int {% id %} | hex {% id %}

double -> int "." natural
{% ([integer, _, fraction]) => ({ integer, fraction }) %}

double -> int "e"i int
{% ([integer, _, exponent]) => ({ integer, exponent }) %}

double -> int "." natural "e"i int
{% ([integer, _, fraction, __, exponent]) => ({ integer, fraction, exponent }) %}

boolean -> "true"i {% () => true %} | "false"i {% () => false %}
