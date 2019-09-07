import { BinaryStringValue } from "./binaryStringValue";
import { BooleanValue } from "./booleanValue";
import { ControlString } from "./controlString";
import { CurrencyValue } from "./currencyValue";
import { DateTimeValue } from "./dateTimeValue";
import { DoubleValue } from "./doubleValue";
import { HexCodeValue } from "./hexCodeValue";
import { IdentifierValue } from "./identifierValue";
import { IntegerValue } from "./integerValue";
import { LiteralString } from "./literalString";
import { SingleValue } from "./singleValue";
import { StringValue } from "./stringValue";
import { StringValuePart } from "./stringValuePart";

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
