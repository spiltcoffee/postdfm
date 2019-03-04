# Base opied from https://github.com/kach/nearley/blob/master/builtin/whitespace.ne
# Whitespace: `_` is optional, `__` is mandatory.
_  -> wschar:* {% function() {return null;} %}
__ -> wschar:+ {% function() {return null;} %}

wschar -> [ \t\n\r\v\f] {% id %}
