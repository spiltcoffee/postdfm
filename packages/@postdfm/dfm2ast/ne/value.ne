value -> boolean
{% ([value]) => new AST.BooleanValue(value) %}

value -> integer
{% ([value]) => new AST.IntegerValue(value) %}

value -> hexCode
{% ([value]) => new AST.HexCodeValue(value) %}

value -> float
{% ([value]) => new AST.DoubleValue(value) %}

value -> number "s"
{% ([value]) => new AST.SingleValue(value) %}

value -> number "c"
{% ([value]) => new AST.CurrencyValue(value) %}

value -> number "d"
{% ([value]) => new AST.DateTimeValue(value) %}

value -> string
{% ([value]) => new AST.StringValue(value) %}

value -> identifer
{% ([value], _, reject) => {
  if (AST.Keywords.includes(value.toLowerCase())) {
    return reject;
  }

  return new AST.IdentifierValue(value);
} %}

value -> identifierList
{% id %}

value -> variantList
{% id %}

value -> binaryStringList
{% id %}

value -> itemList
{% id %}
