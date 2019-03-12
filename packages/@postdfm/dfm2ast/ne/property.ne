properties -> property
{% properties => properties %}

properties -> properties _ property
{% ([properties, before, property]) => {
  property.raws = { ...(property.raws || {}), before };
  return [].concat(properties, property);
} %}

property -> qualifiedName _ "=" _ value
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
