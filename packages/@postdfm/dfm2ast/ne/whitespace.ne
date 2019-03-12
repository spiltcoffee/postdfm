# Base opied from https://github.com/kach/nearley/blob/master/builtin/whitespace.ne
# Whitespace: `_` is optional, `__` is mandatory.
_  -> wschar:*
{% ([ws]) => ws.join("") %}

__ -> wschar:+
{% ([ws]) => ws.join("") %}

wschar -> [ \t\n\r\v\f]
{% id %}
