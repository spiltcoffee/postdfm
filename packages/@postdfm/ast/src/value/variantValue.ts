import { BinaryStringValue } from "@postdfm/ast/value/binaryStringValue";
import { BooleanValue } from "@postdfm/ast/value/booleanValue";
import { ControlString } from "@postdfm/ast/value/controlString";
import { CurrencyValue } from "@postdfm/ast/value/currencyValue";
import { DateTimeValue } from "@postdfm/ast/value/dateTimeValue";
import { DoubleValue } from "@postdfm/ast/value/doubleValue";
import { HexCodeValue } from "@postdfm/ast/value/hexCodeValue";
import { IdentifierValue } from "@postdfm/ast/value/identifierValue";
import { IntegerValue } from "@postdfm/ast/value/integerValue";
import { LiteralString } from "@postdfm/ast/value/literalString";
import { SingleValue } from "@postdfm/ast/value/singleValue";
import { StringValue } from "@postdfm/ast/value/stringValue";
import { StringValuePart } from "@postdfm/ast/value/stringValuePart";

export type VariantValue =
  | BinaryStringValue
  | BooleanValue
  | ControlString
  | CurrencyValue
  | DateTimeValue
  | DoubleValue
  | HexCodeValue
  | IdentifierValue
  | IntegerValue
  | LiteralString
  | SingleValue
  | StringValue
  | StringValuePart;
