commaValues -> value
{% ([value]) => [value] %}

commaValues -> commaValues _ "," _ value
{% ([values, after, _, before, value]) => {
  const prevValue = values[values.length - 1];
  prevValue.raws = { ...(prevValue.raws || {}), after };
  value.raws = { ...(value.raws || {}), before };
  return [].concat(values, value);
}%}

plusValues -> string
{% ([v]) => v.value %}

# plus implies string on sameline
plusValues -> plusValues _ "+" _ string
{% ([left, _, __, ___, right]) => `${left}${right.value}` %}

# space implies string on newline
plusValues -> plusValues __ string
{% ([left, _, right]) => `${left}\r\n${right.value}` %}

hexValues -> hexString
{% id %}

hexValues -> hexValues __ hexString
{% ([left, _, right]) => `${left}${right}` %}

itemValues -> item
{% ([value]) => [value] %}

itemValues -> itemValues _ item
{% ([items, before, item]) => {
  item.raws = { ...(item.raws || {}), before };
  return [].concat(items, item);
} %}

qualifiedList -> "[" _ "]"
{% ([_, beforeClose]) => {
  const node = new AST.QualifiedList();
  node.raws = { beforeClose };
  return node;
} %}

qualifiedList -> "[" _ commaValues _ "]"
{% ([_, afterOpen, commaValues, beforeClose]) => {
  const node = new AST.QualifiedList(commaValues);
  node.raws = { afterOpen, beforeClose };
  return node;
} %}

stringList -> "(" _ ")"
{% ([_, beforeClose]) => {
  const node = new AST.StringList();
  node.raws = { beforeClose };
  return node;
} %}

stringList -> "(" _ plusValues _ ")"
{% ([_, afterOpen, plusValues, beforeClose]) => {
  const node = new AST.StringList(plusValues);
  node.raws = { afterOpen, beforeClose };
  return node;
} %}

hexStringList -> "{" _ "}"
{% ([_, beforeClose]) => {
  const node = new AST.HexStringValue();
  node.raws = { beforeClose };
  return node;
} %}

hexStringList -> "{" _ hexValues _ "}"
{% ([_, afterOpen, hexValues, beforeClose]) => {
  const node = new AST.HexStringValue(hexValues);
  node.raws = { afterOpen, beforeClose };
  return node;
} %}

itemList -> "<" _ ">"
{% ([_, beforeClose]) => {
  const node = new AST.ItemList();
  node.raws = { beforeClose };
  return node;
} %}

itemList -> "<" _ itemValues _ ">"
{% ([_, afterOpen, itemValues, beforeClose]) => {
  const node = new AST.ItemList(itemValues)
  node.raws = { afterOpen, beforeClose };
  return node;
} %}
