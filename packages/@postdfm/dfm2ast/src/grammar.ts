// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }


import * as AST from "./ast";
const keywords: string[] = ["true", "false", "object", "inherited", "inline", "end", "item"];


export interface Token { value: any; [key: string]: any };

export interface Lexer {
  reset: (chunk: string, info: any) => void;
  next: () => Token | undefined;
  save: () => any;
  formatError: (token: Token) => string;
  has: (tokenType: string) => boolean
};

export interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any
};

export type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

export var Lexer: Lexer | undefined = undefined;

export var ParserRules: NearleyRule[] = [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "dfm", "symbols": ["_", "object", "_"], "postprocess": d => d[1]},
    {"name": "object$string$1", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": (d) => d.join('')},
    {"name": "object", "symbols": ["objectKind", "_", "objectDef", "_", "object$string$1"], "postprocess": d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order)},
    {"name": "object$string$2", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": (d) => d.join('')},
    {"name": "object", "symbols": ["objectKind", "_", "objectDef", "_", "properties", "_", "object$string$2"], "postprocess": d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order, d[4])},
    {"name": "object$string$3", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": (d) => d.join('')},
    {"name": "object", "symbols": ["objectKind", "_", "objectDef", "_", "objects", "_", "object$string$3"], "postprocess": d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order, undefined, d[4])},
    {"name": "object$string$4", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": (d) => d.join('')},
    {"name": "object", "symbols": ["objectKind", "_", "objectDef", "_", "properties", "_", "objects", "_", "object$string$4"], "postprocess": d => new AST.FormObject(d[0], d[2].name, d[2].type, d[2].order, d[4], d[6])},
    {"name": "objectKind$subexpression$1", "symbols": [/[iI]/, /[nN]/, /[hH]/, /[eE]/, /[rR]/, /[iI]/, /[tT]/, /[eE]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "objectKind", "symbols": ["objectKind$subexpression$1"], "postprocess": () => AST.ObjectKind.Inherited},
    {"name": "objectKind$subexpression$2", "symbols": [/[iI]/, /[nN]/, /[lL]/, /[iI]/, /[nN]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "objectKind", "symbols": ["objectKind$subexpression$2"], "postprocess": () => AST.ObjectKind.Inline},
    {"name": "objectKind$subexpression$3", "symbols": [/[oO]/, /[bB]/, /[jJ]/, /[eE]/, /[cC]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "objectKind", "symbols": ["objectKind$subexpression$3"], "postprocess": () => AST.ObjectKind.Object},
    {"name": "objectDef", "symbols": ["name"], "postprocess": d => ({ name: d[0] })},
    {"name": "objectDef", "symbols": ["name", "_", {"literal":":"}, "_", "typeName"], "postprocess": d => ({ name: d[0], type: d[4].type, order: d[4].order })},
    {"name": "properties", "symbols": ["property"], "postprocess": d => [d[0]]},
    {"name": "properties", "symbols": ["properties", "_", "property"], "postprocess": d => d[0].concat(d[2])},
    {"name": "objects", "symbols": ["object"], "postprocess": d => [d[0]]},
    {"name": "objects", "symbols": ["objects", "_", "object"], "postprocess": d => d[0].concat(d[2])},
    {"name": "property", "symbols": ["qualifiedName", "_", {"literal":"="}, "_", "value"], "postprocess": d => new AST.Property(d[0], d[4])},
    {"name": "value", "symbols": ["boolean"], "postprocess": d => new AST.BooleanValue(d[0].toLowerCase() === "true")},
    {"name": "value", "symbols": ["integer"], "postprocess": d => new AST.IntegerValue(d[0])},
    {"name": "value", "symbols": ["double"], "postprocess": d => new AST.DoubleValue(d[0])},
    {"name": "value", "symbols": ["string"], "postprocess": d => new AST.StringValue(d[0])},
    {"name": "value", "symbols": ["qualifiedName"], "postprocess":  (d, _, reject) => {
           if (keywords.includes(d[0].toLowerCase())) {
             return reject;
           }
        
           return new AST.QualifiedValue(d[0]);
        } },
    {"name": "value", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": () => new AST.QualifiedList([])},
    {"name": "value", "symbols": [{"literal":"["}, "_", "commaValues", "_", {"literal":"]"}], "postprocess": d => new AST.QualifiedList(d[2])},
    {"name": "value", "symbols": [{"literal":"("}, "_", {"literal":")"}], "postprocess": () => new AST.StringList([])},
    {"name": "value", "symbols": [{"literal":"("}, "_", "plusValues", "_", {"literal":")"}], "postprocess": d => new AST.StringList(d[2])},
    {"name": "value", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": () => new AST.HexStringValue("")},
    {"name": "value", "symbols": [{"literal":"{"}, "_", "hexValues", "_", {"literal":"}"}], "postprocess": d => new AST.HexStringValue(d[2])},
    {"name": "value", "symbols": [{"literal":"<"}, "_", {"literal":">"}], "postprocess": () => new AST.ItemList([])},
    {"name": "value", "symbols": [{"literal":"<"}, "_", "itemValues", "_", {"literal":">"}], "postprocess": d => new AST.ItemList(d[2])},
    {"name": "commaValues", "symbols": ["value"], "postprocess": d => [d[0]]},
    {"name": "commaValues", "symbols": ["commaValues", "_", {"literal":","}, "_", "value"], "postprocess": d => [].concat(d[0], d[4])},
    {"name": "plusValues", "symbols": ["string"], "postprocess": d => d[0]},
    {"name": "plusValues", "symbols": ["plusValues", "_", {"literal":"+"}, "_", "string"], "postprocess": d => d[0] + d[4]},
    {"name": "plusValues", "symbols": ["plusValues", "__", "string"], "postprocess": d => d[0] + "\r\n" + d[2]},
    {"name": "hexValues", "symbols": ["hexString"], "postprocess": d => d[0]},
    {"name": "hexValues", "symbols": ["hexValues", "__", "hexString"], "postprocess": d => d[0] + d[2]},
    {"name": "item$string$1", "symbols": [{"literal":"i"}, {"literal":"t"}, {"literal":"e"}, {"literal":"m"}], "postprocess": (d) => d.join('')},
    {"name": "item$string$2", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": (d) => d.join('')},
    {"name": "item", "symbols": ["item$string$1", "_", "properties", "_", "item$string$2"], "postprocess": d => new AST.Item(d[2])},
    {"name": "itemValues", "symbols": ["item"], "postprocess": d => [d[0]]},
    {"name": "itemValues", "symbols": ["itemValues", "_", "item"], "postprocess": d => [].concat(d[0], d[2])},
    {"name": "name", "symbols": ["letter"], "postprocess": id},
    {"name": "name", "symbols": ["name", "alphanumeric"], "postprocess": d => d[0] + d[1]},
    {"name": "typeName", "symbols": ["name"], "postprocess": d => ({ type: d[0] })},
    {"name": "typeName", "symbols": ["name", "_", {"literal":"["}, "_", "natural", "_", {"literal":"]"}], "postprocess": d => ({ type: d[0], order: d[4] })},
    {"name": "qualifiedName", "symbols": ["name"], "postprocess": id},
    {"name": "qualifiedName", "symbols": ["name", {"literal":"."}, "name"], "postprocess": d => d[0] + "." + d[2]},
    {"name": "string", "symbols": ["singleString"], "postprocess": id},
    {"name": "string", "symbols": ["string", "singleString"], "postprocess": d => d[0] + d[1]},
    {"name": "singleString", "symbols": ["literalString"], "postprocess": id},
    {"name": "singleString", "symbols": ["controlChar"], "postprocess": id},
    {"name": "literalString", "symbols": [{"literal":"'"}, "quotedString", {"literal":"'"}], "postprocess": d => d[1]},
    {"name": "quotedString", "symbols": ["quotedStringChar"], "postprocess": id},
    {"name": "quotedString", "symbols": ["quotedString", "quotedStringChar"], "postprocess": d => d[0] + d[1]},
    {"name": "quotedStringChar$string$1", "symbols": [{"literal":"'"}, {"literal":"'"}], "postprocess": (d) => d.join('')},
    {"name": "quotedStringChar", "symbols": ["quotedStringChar$string$1"], "postprocess": () => "'"},
    {"name": "quotedStringChar", "symbols": [/[^']/], "postprocess": id},
    {"name": "controlChar", "symbols": [{"literal":"#"}, "natural"], "postprocess": d => String.fromCharCode(d[1])},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "letter", "symbols": [/[a-zA-Z]/], "postprocess": id},
    {"name": "alphanumeric", "symbols": ["digit"], "postprocess": id},
    {"name": "alphanumeric", "symbols": ["letter"], "postprocess": id},
    {"name": "natural", "symbols": ["digit"], "postprocess": id},
    {"name": "natural", "symbols": ["natural", "digit"], "postprocess": d => d[0] + d[1]},
    {"name": "sign", "symbols": [{"literal":"+"}], "postprocess": id},
    {"name": "sign", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "int", "symbols": ["sign", "natural"], "postprocess": d => d[0] + d[1]},
    {"name": "int", "symbols": ["natural"], "postprocess": id},
    {"name": "hexDigit", "symbols": [/[0-9a-fA-F]/], "postprocess": id},
    {"name": "hex", "symbols": [{"literal":"$"}, "hexDigit"], "postprocess": d => d[1]},
    {"name": "hex", "symbols": ["hex", "hexDigit"], "postprocess": d => d[0] + d[1]},
    {"name": "hexString", "symbols": ["hexDigit"], "postprocess": id},
    {"name": "hexString", "symbols": ["hexString", "hexDigit"], "postprocess": d => d[0] + d[1]},
    {"name": "integer", "symbols": ["int"], "postprocess": id},
    {"name": "integer", "symbols": ["hex"], "postprocess": id},
    {"name": "double", "symbols": ["int", {"literal":"."}, "natural"], "postprocess": d => `${d[0]}.${d[2]}`},
    {"name": "double$subexpression$1", "symbols": [/[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "double", "symbols": ["int", "double$subexpression$1", "int"], "postprocess": d => `${d[0]}e${d[2]}`},
    {"name": "double$subexpression$2", "symbols": [/[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "double", "symbols": ["int", {"literal":"."}, "natural", "double$subexpression$2", "int"], "postprocess": d => `${d[0]}.${d[2]}e${d[4]}`},
    {"name": "boolean$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[uU]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "boolean", "symbols": ["boolean$subexpression$1"], "postprocess": id},
    {"name": "boolean$subexpression$2", "symbols": [/[fF]/, /[aA]/, /[lL]/, /[sS]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "boolean", "symbols": ["boolean$subexpression$2"], "postprocess": id}
];

export var ParserStart: string = "dfm";
