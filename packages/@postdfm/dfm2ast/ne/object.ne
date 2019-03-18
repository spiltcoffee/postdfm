object -> objectKind _ objectDef _ "end"i
{% ([kind, beforeName, { name, type, order, raws: defRaws }, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order);
  node.raws = { ...(defRaws || {}), beforeName, beforeEnd };
  return node;
} %}

object -> objectKind _ objectDef _ properties _ "end"i
{% ([kind, beforeName, { name, type, order, raws: defRaws }, beforeProperties, properties, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order, properties)
  node.raws = { ...(defRaws || {}), beforeName, beforeProperties, beforeEnd };
  return node;
} %}

object -> objectKind _ objectDef _ objects _ "end"i
{% ([kind, beforeName, { name, type, order, raws: defRaws }, beforeChildren, children, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order, undefined, children);
  node.raws = { ...(defRaws || {}), beforeName, beforeChildren, beforeEnd };
  return node;
} %}

object -> objectKind _ objectDef _ properties _ objects _ "end"i
{% ([kind, beforeName, { name, type, order, raws: defRaws }, beforeProperties, properties, beforeChildren, children, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order, properties, children);
  node.raws = { ...(defRaws || {}), beforeName, beforeProperties, beforeChildren, beforeEnd };
  return node;
} %}

objectKind -> "inherited"i
{% () => AST.ObjectKind.Inherited %}
objectKind -> "inline"i
{% () => AST.ObjectKind.Inline %}
objectKind -> "object"i
{% () => AST.ObjectKind.Object %}

objectDef -> identifer
{% ([name]) => ({ name }) %}

objectDef -> identifer _ ":" _ identifer
{% ([name, afterName, _, beforeType, type]) => ({
  name,
  type,
  raws: {
    afterName,
    beforeType
  }
}) %}

#is this one valid?
objectDef -> identifer _ "[" _ natural _ "]"
{% ([name, afterName, _, beforeOrder, order, afterOrder]) => ({
  name,
  order,
  raws: {
    afterName,
    beforeOrder,
    afterOrder
  }
}) %}

objectDef -> identifer _ ":" _ identifer  _ "[" _ natural _ "]"
{% ([name, afterName, _, beforeType, type, afterType, __, beforeOrder, order, afterOrder]) => ({
  name,
  type,
  order,
  raws: {
    afterName,
    beforeType,
    afterType,
    beforeOrder,
    afterOrder
  }
}) %}

objects -> object
{% objects => objects %}

objects -> objects _ object
{% ([objects, before, object]) => {
  object.raws = {
    ...(object.raws || {}),
    before
  };
  return [].concat(objects, object);
} %}
