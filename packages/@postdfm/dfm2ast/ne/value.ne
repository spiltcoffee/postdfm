value -> boolean
{% ([value]) => new AST.BooleanValue(value) %}

value -> integer
{% ([value]) => new AST.IntegerValue(value) %}

value -> double
{% ([value]) => new AST.DoubleValue(value) %}

value -> string
{% ([valueObject]) => new AST.StringValue(valueObject.value) %}

value -> identifer
{% ([value], _, reject) => {
  if (AST.Keywords.includes(value.toLowerCase())) {
    return reject;
  }

  return new AST.IdentifierValue(value);
} %}

value -> identifierList
{% id %}

value -> stringList
{% id %}

value -> hexStringList
{% id %}

value -> itemList
{% id %}
