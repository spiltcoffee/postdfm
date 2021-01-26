object -> objectKind _ objectDef __ "end"i
{% ([kind, beforeDef, { name, type, order, raws: defRaws }, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order);
  node.raws = { ...(defRaws || {}), beforeDef, beforeEnd };
  return node;
} %}

object -> objectKind _ objectDef _ properties __ "end"i
{% ([kind, beforeDef, { name, type, order, raws: defRaws }, beforeProperties, properties, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order, properties)
  node.raws = { ...(defRaws || {}), beforeDef, beforeProperties, beforeEnd };
  return node;
} %}

object -> objectKind _ objectDef _ objects __ "end"i
{% ([kind, beforeDef, { name, type, order, raws: defRaws }, beforeChildren, children, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order, undefined, children);
  node.raws = { ...(defRaws || {}), beforeDef, beforeChildren, beforeEnd };
  return node;
} %}

object -> objectKind _ objectDef _ properties _ objects __ "end"i
{% ([kind, beforeDef, { name, type, order, raws: defRaws }, beforeProperties, properties, beforeChildren, children, beforeEnd]) => {
  const node = new AST.DObject(kind, name, type, order, properties, children);
  node.raws = { ...(defRaws || {}), beforeDef, beforeProperties, beforeChildren, beforeEnd };
  return node;
} %}

objectKind -> "inherited"i
{% () => AST.ObjectKind.Inherited %}
objectKind -> "inline"i
{% () => AST.ObjectKind.Inline %}
objectKind -> "object"i
{% () => AST.ObjectKind.Object %}

objectDef -> identifer
{% ([type]) => ({ type }) %}

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
objectDef -> identifer _ "[" _ decimal _ "]"
{% ([type, afterType, _, beforeOrder, order, afterOrder]) => ({
  type,
  order,
  raws: {
    afterType,
    beforeOrder,
    afterOrder
  }
}) %}

objectDef -> identifer _ ":" _ identifer  _ "[" _ decimal _ "]"
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

objects -> objects __ object
{% ([objects, before, object]) => {
  object.raws = {
    ...(object.raws || {}),
    before
  };
  return objects.concat(object);
} %}
