@preprocessor typescript
@include "./whitespace.ne"

@{%

import * as AST from "@postdfm/ast";
const keywords: string[] = ["true", "false", "object", "inherited", "inline", "end", "item"];

%}

dfm -> _ object _ {% d => d[1] %}

# problem here
object -> objectKind _ objectDef _ "end"                        {% d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order) %}
        | objectKind _ objectDef _ properties _ "end"           {% d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order, d[4]) %}
        | objectKind _ objectDef _ objects _ "end"              {% d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order, undefined, d[4]) %}
        | objectKind _ objectDef _ properties _ objects _ "end" {% d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order, d[4], d[6]) %}

objectKind -> "inherited"i {% () => AST.ObjectKind.Inherited %}
            | "inline"i    {% () => AST.ObjectKind.Inline %}
            | "object"i    {% () => AST.ObjectKind.Object %}

objectDef -> name                  {% d => ({ name: d[0] }) %}
           | name _ ":" _ typeName {% d => ({ name: d[0], type: d[4].type, order: d[4].order }) %}

properties -> property              {% d => [d[0]] %}
            | properties _ property {% d => d[0].concat(d[2]) %}

objects -> object           {% d => [d[0]] %}
         | objects _ object {% d => d[0].concat(d[2]) %}

property -> qualifiedName _ "=" _ value {% d => new AST.Property(d[0], d[4]) %}

value -> boolean                 {% d => new AST.BooleanValue(d[0].toLowerCase() === "true") %}
       | integer                 {% d => new AST.IntegerValue(d[0]) %}
       | double                  {% d => new AST.DoubleValue(d[0]) %}
       | string                  {% d => new AST.StringValue(d[0]) %}
       | qualifiedName           {% (d, _, reject) => {
                                    if (keywords.includes(d[0].toLowerCase())) {
                                      return reject;
                                    }

                                    return new AST.QualifiedValue(d[0]);
                                 } %}
       | "[" _ "]"               {% () => new AST.QualifiedList([]) %}
       | "[" _ commaValues _ "]" {% d => new AST.QualifiedList(d[2]) %}
       | "(" _ ")"               {% () => new AST.StringList([]) %}
       | "(" _ plusValues _ ")"  {% d => new AST.StringList(d[2]) %}
       | "{" _ "}"               {% () => new AST.HexStringValue("") %}
       | "{" _ hexValues _ "}"   {% d => new AST.HexStringValue(d[2]) %}
       | "<" _ ">"               {% () => new AST.ItemList([]) %}
       | "<" _ itemValues _ ">"  {% d => new AST.ItemList(d[2]) %}

commaValues -> value                     {% d => [d[0]] %}
             | commaValues _ "," _ value {% d => [].concat(d[0], d[4]) %}

plusValues -> string                    {% d => d[0] %}
            | plusValues _ "+" _ string {% d => d[0] + d[4] %} # plus implies string on sameline
            | plusValues __ string      {% d => d[0] + "\r\n" + d[2] %} # space implies string on newline

hexValues -> hexString              {% d => d[0] %}
           | hexValues __ hexString {% d => d[0] + d[2] %}

item -> "item" _ properties _ "end" {% d => new AST.Item(d[2]) %}
itemValues -> item              {% d => [d[0]] %}
            | itemValues _ item {% d => [].concat(d[0], d[2]) %}

name -> letter            {% id %}
      | name alphanumeric {% d => d[0] + d[1] %}

typeName -> name                       {% d => ({ type: d[0] }) %}
          | name _ "[" _ natural _ "]" {% d => ({ type: d[0], order: d[4] }) %} # what is the natural for?

qualifiedName -> name          {% id %}
               | name "." name {% d => d[0] + "." + d[2] %}

string -> singleString        {% id %}
        | string singleString {% d => d[0] + d[1] %}

singleString -> literalString {% id %}
              | controlChar   {% id %}

literalString -> "'" quotedString "'" {% d => d[1] %}

quotedString -> quotedStringChar              {% id %}
              | quotedString quotedStringChar {% d => d[0] + d[1] %}

quotedStringChar -> "''" {% () => "'" %} # escape single quote
                  | [^'] {% id %}

controlChar -> "#" natural {% d => String.fromCharCode(d[1]) %}

digit -> [0-9]     {% id %}
letter -> [a-zA-Z] {% id %}
alphanumeric -> digit  {% id %}
              | letter {% id %}

natural -> digit         {% id %}
         | natural digit {% d => d[0] + d[1] %}
sign -> "+" {% id %}
      | "-" {% id %}
int -> sign natural {% d => d[0] + d[1] %}
     | natural      {% id %}

hexDigit -> [0-9a-fA-F] {% id %}
hex -> "$" hexDigit {% d => d[1] %}
     | hex hexDigit {% d => d[0] + d[1] %}
hexString -> hexDigit           {% id %}
           | hexString hexDigit {% d => d[0] + d[1] %}

integer -> int {% id %}
         | hex {% id %}

#todo: improve?
double -> int "." natural          {% d => `${d[0]}.${d[2]}` %}
        | int "e"i int             {% d => `${d[0]}e${d[2]}` %}
        | int "." natural "e"i int {% d => `${d[0]}.${d[2]}e${d[4]}` %}

boolean -> "true"i  {% id %}
         | "false"i {% id %}
