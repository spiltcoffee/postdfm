identifer -> letter
{% id %}
identifer -> "_"
{% id %}

identifer -> identifer alphanumeric
{% join %}
identifer -> identifer "_"
{% join %}

qualifiedName -> identifer
{% id %}

qualifiedName -> identifer "." identifer
{% join %}

string -> singleString
{% id %}

# two literals next to each other cause an apostrophe to appear
string -> string singleString
{% ([left, right]) => ({
  isLiteral: right.isLiteral,
  value:
    left.value +
    (left.isLiteral && right.isLiteral ? "'" : "") +
    right.value
}) %}

singleString -> controlChar
{% ([value]) => ({ value }) %}

singleString -> literalString
{% ([value]) => ({ isLiteral: true, value }) %}

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
