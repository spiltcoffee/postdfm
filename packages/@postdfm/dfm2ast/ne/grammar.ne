@preprocessor typescript
@include "./whitespace.ne"

@include "./primitive.ne"
@include "./value.ne"
@include "./list.ne"
@include "./property.ne"
@include "./object.ne"

@{%
  import * as AST from "@postdfm/ast";

  function join(data: any[]) {
    return data.join("");
  }
%}

root -> _ object _
{% ([before, child, after]) => {
  const node = new AST.Root(child);
  node.raws = { before, after };
  return node;
} %}

root -> _
{% ([before]) => {
  const node = new AST.Root();
  node.raws = { before }
  return node;
} %}