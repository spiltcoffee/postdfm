// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
  return d[0];
}

import * as AST from "@postdfm/ast";

function join(data: any[]) {
  return data.join("");
}

interface NearleyToken {
  value: any;
  [key: string]: any;
}

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
}

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
}

type NearleySymbol =
  | string
  | { literal: any }
  | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
}

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    { name: "_$ebnf$1", symbols: [] },
    {
      name: "_$ebnf$1",
      symbols: ["_$ebnf$1", "wschar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    { name: "_", symbols: ["_$ebnf$1"], postprocess: ([ws]) => ws.join("") },
    { name: "__$ebnf$1", symbols: ["wschar"] },
    {
      name: "__$ebnf$1",
      symbols: ["__$ebnf$1", "wschar"],
      postprocess: (d) => d[0].concat([d[1]]),
    },
    { name: "__", symbols: ["__$ebnf$1"], postprocess: ([ws]) => ws.join("") },
    { name: "wschar", symbols: [/[ \t\n\r\v\f]/], postprocess: id },
    { name: "identifer", symbols: ["letter"], postprocess: id },
    { name: "identifer", symbols: [{ literal: "_" }], postprocess: id },
    {
      name: "identifer",
      symbols: ["identifer", "alphanumeric"],
      postprocess: join,
    },
    {
      name: "identifer",
      symbols: ["identifer", { literal: "_" }],
      postprocess: join,
    },
    { name: "qualifiedIdentifier", symbols: ["identifer"], postprocess: id },
    {
      name: "qualifiedIdentifier",
      symbols: ["qualifiedIdentifier", { literal: "." }, "identifer"],
      postprocess: join,
    },
    {
      name: "string",
      symbols: ["singleString"],
      postprocess: ([value]) => [value],
    },
    {
      name: "string",
      symbols: ["string", "singleString"],
      postprocess: ([values, value]) => {
        const prevValue = values[values.length - 1];
        const isLiteral =
          prevValue.astType === AST.ASTType.LiteralString &&
          value.astType === AST.ASTType.LiteralString;

        if (isLiteral) {
          prevValue.value += "'" + value.value;
          return values;
        } else {
          return values.concat(value);
        }
      },
    },
    {
      name: "stringSep",
      symbols: ["_", { literal: "+" }, "_"],
      postprocess: join,
    },
    {
      name: "string",
      symbols: ["string", "stringSep", "singleString"],
      postprocess: ([values, before, value]) => {
        value.raws = { ...(value.raws || {}), before };
        return values.concat(value);
      },
    },
    {
      name: "singleString",
      symbols: ["controlChar"],
      postprocess: ([value]) => new AST.ControlString(value),
    },
    {
      name: "singleString",
      symbols: ["literalString"],
      postprocess: ([value]) => new AST.LiteralString(value),
    },
    {
      name: "literalString",
      symbols: [{ literal: "'" }, "quotedString", { literal: "'" }],
      postprocess: ([_, value]) => value,
    },
    { name: "quotedString", symbols: [], postprocess: () => "" },
    {
      name: "quotedString",
      symbols: ["quotedString", /[^']/],
      postprocess: join,
    },
    {
      name: "controlChar",
      symbols: [{ literal: "#" }, "decimal"],
      postprocess: ([_, charCode]) => String.fromCharCode(charCode),
    },
    {
      name: "binaryString",
      symbols: ["hexidecimal"],
      postprocess: ([value]) => new AST.BinaryStringValue(value),
    },
    {
      name: "hexCode",
      symbols: [{ literal: "$" }, "hexidecimal"],
      postprocess: ([_, hexCode]) => hexCode,
    },
    { name: "hexidecimal", symbols: ["hexDigit"], postprocess: id },
    {
      name: "hexidecimal",
      symbols: ["hexidecimal", "hexDigit"],
      postprocess: join,
    },
    { name: "hexDigit", symbols: [/[0-9a-fA-F]/], postprocess: id },
    {
      name: "number",
      symbols: ["integer"],
      postprocess: ([integer]) => ({ integer }),
    },
    { name: "number", symbols: ["float"], postprocess: id },
    {
      name: "float",
      symbols: ["integer", { literal: "." }, "decimal"],
      postprocess: ([integer, _, fraction]) => ({ integer, fraction }),
    },
    {
      name: "float$subexpression$1",
      symbols: [/[eE]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "float",
      symbols: ["integer", "float$subexpression$1", "integer"],
      postprocess: ([integer, _, exponent]) => ({ integer, exponent }),
    },
    {
      name: "float$subexpression$2",
      symbols: [/[eE]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "float",
      symbols: [
        "integer",
        { literal: "." },
        "decimal",
        "float$subexpression$2",
        "integer",
      ],
      postprocess: ([integer, _, fraction, __, exponent]) => ({
        integer,
        fraction,
        exponent,
      }),
    },
    { name: "decimal", symbols: ["decimalDigit"], postprocess: id },
    {
      name: "decimal",
      symbols: ["decimal", "decimalDigit"],
      postprocess: join,
    },
    { name: "sign", symbols: [{ literal: "+" }], postprocess: id },
    { name: "sign", symbols: [{ literal: "-" }], postprocess: id },
    { name: "integer", symbols: ["sign", "decimal"], postprocess: join },
    { name: "integer", symbols: ["decimal"], postprocess: id },
    { name: "alphanumeric", symbols: ["decimalDigit"], postprocess: id },
    { name: "alphanumeric", symbols: ["letter"], postprocess: id },
    { name: "decimalDigit", symbols: [/[0-9]/], postprocess: id },
    { name: "letter", symbols: [/[a-zA-Z]/], postprocess: id },
    {
      name: "boolean$subexpression$1",
      symbols: [/[tT]/, /[rR]/, /[uU]/, /[eE]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "boolean",
      symbols: ["boolean$subexpression$1"],
      postprocess: () => true,
    },
    {
      name: "boolean$subexpression$2",
      symbols: [/[fF]/, /[aA]/, /[lL]/, /[sS]/, /[eE]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "boolean",
      symbols: ["boolean$subexpression$2"],
      postprocess: () => false,
    },
    {
      name: "value",
      symbols: ["boolean"],
      postprocess: ([value]) => new AST.BooleanValue(value),
    },
    {
      name: "value",
      symbols: ["integer"],
      postprocess: ([value]) => new AST.IntegerValue(value),
    },
    {
      name: "value",
      symbols: ["hexCode"],
      postprocess: ([value]) => new AST.HexCodeValue(value),
    },
    {
      name: "value",
      symbols: ["float"],
      postprocess: ([value]) => new AST.DoubleValue(value),
    },
    {
      name: "value",
      symbols: ["number", { literal: "s" }],
      postprocess: ([value]) => new AST.SingleValue(value),
    },
    {
      name: "value",
      symbols: ["number", { literal: "c" }],
      postprocess: ([value]) => new AST.CurrencyValue(value),
    },
    {
      name: "value",
      symbols: ["number", { literal: "d" }],
      postprocess: ([value]) => new AST.DateTimeValue(value),
    },
    {
      name: "value",
      symbols: ["string"],
      postprocess: ([value]) => new AST.StringValue(value),
    },
    {
      name: "value",
      symbols: ["qualifiedIdentifier"],
      postprocess: ([value], _, reject) => {
        if (AST.Keywords.includes(value.toLowerCase())) {
          return reject;
        }

        return new AST.IdentifierValue(value);
      },
    },
    { name: "value", symbols: ["identifierList"], postprocess: id },
    { name: "value", symbols: ["variantList"], postprocess: id },
    { name: "value", symbols: ["binaryStringList"], postprocess: id },
    { name: "value", symbols: ["itemList"], postprocess: id },
    {
      name: "commaValues",
      symbols: ["value"],
      postprocess: ([value]) => [value],
    },
    {
      name: "commaValues",
      symbols: ["commaValues", "_", { literal: "," }, "_", "value"],
      postprocess: ([values, after, _, before, value]) => {
        const prevValue = values[values.length - 1];
        prevValue.raws = { ...(prevValue.raws || {}), after };
        value.raws = { ...(value.raws || {}), before };
        return values.concat(value);
      },
    },
    {
      name: "variantValues",
      symbols: ["value"],
      postprocess: ([value]) => [value],
    },
    {
      name: "variantValues",
      symbols: ["variantValues", "__", "value"],
      postprocess: ([values, before, value]) => {
        value.raws = { ...(values.raws || {}), before };
        return values.concat(value);
      },
    },
    {
      name: "binaryValues",
      symbols: ["binaryString"],
      postprocess: ([value]) => [value],
    },
    {
      name: "binaryValues",
      symbols: ["binaryValues", "__", "binaryString"],
      postprocess: ([values, before, value]) => {
        value.raws = { ...(value.raws || {}), before };
        return values.concat(value);
      },
    },
    {
      name: "itemValues",
      symbols: ["item"],
      postprocess: ([value]) => [value],
    },
    {
      name: "itemValues",
      symbols: ["itemValues", "_", "item"],
      postprocess: ([items, before, item]) => {
        item.raws = { ...(item.raws || {}), before };
        return items.concat(item);
      },
    },
    {
      name: "identifierList",
      symbols: [{ literal: "[" }, "_", { literal: "]" }],
      postprocess: ([_, beforeClose]) => {
        const node = new AST.IdentifierList();
        node.raws = { beforeClose };
        return node;
      },
    },
    {
      name: "identifierList",
      symbols: [{ literal: "[" }, "_", "commaValues", "_", { literal: "]" }],
      postprocess: ([_, afterOpen, commaValues, beforeClose]) => {
        const node = new AST.IdentifierList(commaValues);
        node.raws = { afterOpen, beforeClose };
        return node;
      },
    },
    {
      name: "variantList",
      symbols: [{ literal: "(" }, "_", { literal: ")" }],
      postprocess: ([_, beforeClose]) => {
        const node = new AST.VariantList();
        node.raws = { beforeClose };
        return node;
      },
    },
    {
      name: "variantList",
      symbols: [{ literal: "(" }, "_", "variantValues", "_", { literal: ")" }],
      postprocess: ([_, afterOpen, variantValues, beforeClose]) => {
        const node = new AST.VariantList(variantValues);
        node.raws = { afterOpen, beforeClose };
        return node;
      },
    },
    {
      name: "binaryStringList",
      symbols: [{ literal: "{" }, "_", { literal: "}" }],
      postprocess: ([_, beforeClose]) => {
        const node = new AST.BinaryStringList();
        node.raws = { beforeClose };
        return node;
      },
    },
    {
      name: "binaryStringList",
      symbols: [{ literal: "{" }, "_", "binaryValues", "_", { literal: "}" }],
      postprocess: ([_, afterOpen, binaryValues, beforeClose]) => {
        const node = new AST.BinaryStringList(binaryValues);
        node.raws = { afterOpen, beforeClose };
        return node;
      },
    },
    {
      name: "itemList",
      symbols: [{ literal: "<" }, "_", { literal: ">" }],
      postprocess: ([_, beforeClose]) => {
        const node = new AST.ItemList();
        node.raws = { beforeClose };
        return node;
      },
    },
    {
      name: "itemList",
      symbols: [{ literal: "<" }, "_", "itemValues", "_", { literal: ">" }],
      postprocess: ([_, afterOpen, itemValues, beforeClose]) => {
        const node = new AST.ItemList(itemValues);
        node.raws = { afterOpen, beforeClose };
        return node;
      },
    },
    {
      name: "properties",
      symbols: ["property"],
      postprocess: ([property]) => [property],
    },
    {
      name: "properties",
      symbols: ["properties", "_", "property"],
      postprocess: ([properties, before, property]) => {
        property.raws = { ...(property.raws || {}), before };
        return properties.concat(property);
      },
    },
    {
      name: "property",
      symbols: ["qualifiedIdentifier", "_", { literal: "=" }, "_", "value"],
      postprocess: ([name, afterName, _, beforeValue, value]) => {
        const node = new AST.Property(name, value);
        node.raws = { afterName, beforeValue };
        return node;
      },
    },
    {
      name: "item$string$1",
      symbols: [
        { literal: "i" },
        { literal: "t" },
        { literal: "e" },
        { literal: "m" },
      ],
      postprocess: (d) => d.join(""),
    },
    {
      name: "item$string$2",
      symbols: [{ literal: "e" }, { literal: "n" }, { literal: "d" }],
      postprocess: (d) => d.join(""),
    },
    {
      name: "item",
      symbols: ["item$string$1", "_", "properties", "_", "item$string$2"],
      postprocess: ([_, afterItem, properties, beforeEnd]) => {
        const node = new AST.Item(properties);
        node.raws = { afterItem, beforeEnd };
        return node;
      },
    },
    {
      name: "item$string$3",
      symbols: [
        { literal: "i" },
        { literal: "t" },
        { literal: "e" },
        { literal: "m" },
      ],
      postprocess: (d) => d.join(""),
    },
    {
      name: "item$string$4",
      symbols: [{ literal: "e" }, { literal: "n" }, { literal: "d" }],
      postprocess: (d) => d.join(""),
    },
    {
      name: "item",
      symbols: ["item$string$3", "_", "item$string$4"],
      postprocess: ([_, afterItem]) => {
        const node = new AST.Item([]);
        node.raws = { afterItem };
        return node;
      },
    },
    {
      name: "object$subexpression$1",
      symbols: [/[eE]/, /[nN]/, /[dD]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "object",
      symbols: ["objectKind", "_", "objectDef", "__", "object$subexpression$1"],
      postprocess: ([
        kind,
        beforeDef,
        { name, type, order, raws: defRaws },
        beforeEnd,
      ]) => {
        const node = new AST.DObject(kind, name, type, order);
        node.raws = { ...(defRaws || {}), beforeDef, beforeEnd };
        return node;
      },
    },
    {
      name: "object$subexpression$2",
      symbols: [/[eE]/, /[nN]/, /[dD]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "object",
      symbols: [
        "objectKind",
        "_",
        "objectDef",
        "_",
        "properties",
        "__",
        "object$subexpression$2",
      ],
      postprocess: ([
        kind,
        beforeDef,
        { name, type, order, raws: defRaws },
        beforeProperties,
        properties,
        beforeEnd,
      ]) => {
        const node = new AST.DObject(kind, name, type, order, properties);
        node.raws = {
          ...(defRaws || {}),
          beforeDef,
          beforeProperties,
          beforeEnd,
        };
        return node;
      },
    },
    {
      name: "object$subexpression$3",
      symbols: [/[eE]/, /[nN]/, /[dD]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "object",
      symbols: [
        "objectKind",
        "_",
        "objectDef",
        "_",
        "objects",
        "__",
        "object$subexpression$3",
      ],
      postprocess: ([
        kind,
        beforeDef,
        { name, type, order, raws: defRaws },
        beforeChildren,
        children,
        beforeEnd,
      ]) => {
        const node = new AST.DObject(
          kind,
          name,
          type,
          order,
          undefined,
          children,
        );
        node.raws = {
          ...(defRaws || {}),
          beforeDef,
          beforeChildren,
          beforeEnd,
        };
        return node;
      },
    },
    {
      name: "object$subexpression$4",
      symbols: [/[eE]/, /[nN]/, /[dD]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "object",
      symbols: [
        "objectKind",
        "_",
        "objectDef",
        "_",
        "properties",
        "_",
        "objects",
        "__",
        "object$subexpression$4",
      ],
      postprocess: ([
        kind,
        beforeDef,
        { name, type, order, raws: defRaws },
        beforeProperties,
        properties,
        beforeChildren,
        children,
        beforeEnd,
      ]) => {
        const node = new AST.DObject(
          kind,
          name,
          type,
          order,
          properties,
          children,
        );
        node.raws = {
          ...(defRaws || {}),
          beforeDef,
          beforeProperties,
          beforeChildren,
          beforeEnd,
        };
        return node;
      },
    },
    {
      name: "objectKind$subexpression$1",
      symbols: [
        /[iI]/,
        /[nN]/,
        /[hH]/,
        /[eE]/,
        /[rR]/,
        /[iI]/,
        /[tT]/,
        /[eE]/,
        /[dD]/,
      ],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "objectKind",
      symbols: ["objectKind$subexpression$1"],
      postprocess: () => AST.ObjectKind.Inherited,
    },
    {
      name: "objectKind$subexpression$2",
      symbols: [/[iI]/, /[nN]/, /[lL]/, /[iI]/, /[nN]/, /[eE]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "objectKind",
      symbols: ["objectKind$subexpression$2"],
      postprocess: () => AST.ObjectKind.Inline,
    },
    {
      name: "objectKind$subexpression$3",
      symbols: [/[oO]/, /[bB]/, /[jJ]/, /[eE]/, /[cC]/, /[tT]/],
      postprocess: function (d) {
        return d.join("");
      },
    },
    {
      name: "objectKind",
      symbols: ["objectKind$subexpression$3"],
      postprocess: () => AST.ObjectKind.Object,
    },
    {
      name: "objectDef",
      symbols: ["identifer"],
      postprocess: ([type]) => ({ type }),
    },
    {
      name: "objectDef",
      symbols: ["identifer", "_", { literal: ":" }, "_", "identifer"],
      postprocess: ([name, afterName, _, beforeType, type]) => ({
        name,
        type,
        raws: {
          afterName,
          beforeType,
        },
      }),
    },
    {
      name: "objectDef",
      symbols: [
        "identifer",
        "_",
        { literal: "[" },
        "_",
        "decimal",
        "_",
        { literal: "]" },
      ],
      postprocess: ([type, afterType, _, beforeOrder, order, afterOrder]) => ({
        type,
        order,
        raws: {
          afterType,
          beforeOrder,
          afterOrder,
        },
      }),
    },
    {
      name: "objectDef",
      symbols: [
        "identifer",
        "_",
        { literal: ":" },
        "_",
        "identifer",
        "_",
        { literal: "[" },
        "_",
        "decimal",
        "_",
        { literal: "]" },
      ],
      postprocess: ([
        name,
        afterName,
        _,
        beforeType,
        type,
        afterType,
        __,
        beforeOrder,
        order,
        afterOrder,
      ]) => ({
        name,
        type,
        order,
        raws: {
          afterName,
          beforeType,
          afterType,
          beforeOrder,
          afterOrder,
        },
      }),
    },
    { name: "objects", symbols: ["object"], postprocess: (objects) => objects },
    {
      name: "objects",
      symbols: ["objects", "__", "object"],
      postprocess: ([objects, before, object]) => {
        object.raws = {
          ...(object.raws || {}),
          before,
        };
        return objects.concat(object);
      },
    },
    {
      name: "root",
      symbols: ["_", "object", "_"],
      postprocess: ([before, child, after]) => {
        const node = new AST.Root(child);
        node.raws = { before, after };
        return node;
      },
    },
    {
      name: "root",
      symbols: ["_"],
      postprocess: ([before]) => {
        const node = new AST.Root();
        node.raws = { before };
        return node;
      },
    },
  ],
  ParserStart: "root",
};

export default grammar;
