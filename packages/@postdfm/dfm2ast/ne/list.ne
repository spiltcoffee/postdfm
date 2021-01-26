commaValues -> value
{% ([value]) => [value] %}

commaValues -> commaValues _ "," _ value
{% ([values, after, _, before, value]) => {
  const prevValue = values[values.length - 1];
  prevValue.raws = { ...(prevValue.raws || {}), after };
  value.raws = { ...(value.raws || {}), before };
  return values.concat(value);
}%}

variantValues -> value
{% ([value]) => [value] %}

variantValues -> variantValues __ value
{% ([values, before, value]) => {
  value.raws = { ...(values.raws || {}), before };
  return values.concat(value);
} %}

binaryValues -> binaryString
{% ([value]) => [value] %}

binaryValues -> binaryValues __ binaryString
{% ([values, before, value]) => {
  value.raws = { ...(value.raws || {}), before };
  return values.concat(value);
}%}

itemValues -> item
{% ([value]) => [value] %}

itemValues -> itemValues _ item
{% ([items, before, item]) => {
  item.raws = { ...(item.raws || {}), before };
  return items.concat(item);
} %}

identifierList -> "[" _ "]"
{% ([_, beforeClose]) => {
  const node = new AST.IdentifierList();
  node.raws = { beforeClose };
  return node;
} %}

identifierList -> "[" _ commaValues _ "]"
{% ([_, afterOpen, commaValues, beforeClose]) => {
  const node = new AST.IdentifierList(commaValues);
  node.raws = { afterOpen, beforeClose };
  return node;
} %}

variantList -> "(" _ ")"
{% ([_, beforeClose]) => {
  const node = new AST.VariantList();
  node.raws = { beforeClose };
  return node;
} %}

variantList -> "(" _ variantValues _ ")"
{% ([_, afterOpen, variantValues, beforeClose]) => {
  const node = new AST.VariantList(variantValues);
  node.raws = { afterOpen, beforeClose };
  return node;
} %}

binaryStringList -> "{" _ "}"
{% ([_, beforeClose]) => {
  const node = new AST.BinaryStringList();
  node.raws = { beforeClose };
  return node;
} %}

binaryStringList -> "{" _ binaryValues _ "}"
{% ([_, afterOpen, binaryValues, beforeClose]) => {
  const node = new AST.BinaryStringList(binaryValues);
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
