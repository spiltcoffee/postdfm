properties -> property
{% ([property]) => [property] %}

properties -> properties _ property
{% ([properties, before, property]) => {
  property.raws = { ...(property.raws || {}), before };
  return properties.concat(property);
} %}

property -> qualifiedIdentifier _ "=" _ value
{% ([name, afterName, _, beforeValue, value]) => {
  const node = new AST.Property(name, value);
  node.raws = { afterName, beforeValue };
  return node;
} %}

item -> "item" _ properties _ "end"
{% ([_, afterItem, properties, beforeEnd]) => {
  const node = new AST.Item(properties);
  node.raws = { afterItem, beforeEnd };
  return node;
}  %}

item -> "item" _ "end"
{% ([_, afterItem]) => {
  const node = new AST.Item([]);
  node.raws = { afterItem };
  return node;
} %}
