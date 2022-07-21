import './index.css';
import $5lsDl$react, { useContext, useState, useLayoutEffect, useMemo, useEffect, useCallback, useRef, useImperativeHandle, createContext, useReducer, forwardRef, cloneElement } from "react";
import $k7QOs$reactdom from "react-dom";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
var main$2 = "";
function r(e) {
  var t, f2, n2 = "";
  if ("string" == typeof e || "number" == typeof e)
    n2 += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f2 = r(e[t])) && (n2 && (n2 += " "), n2 += f2);
    else
      for (t in e)
        e[t] && (n2 && (n2 += " "), n2 += t);
  return n2;
}
function clsx() {
  for (var e, t, f2 = 0, n2 = ""; f2 < arguments.length; )
    (e = arguments[f2++]) && (t = r(e)) && (n2 && (n2 += " "), n2 += t);
  return n2;
}
function $parcel$export$c(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $704cf1d3b684cc5c$exports = {};
$parcel$export$c($704cf1d3b684cc5c$exports, "SSRProvider", () => $704cf1d3b684cc5c$export$9f8ac96af4b1b2ae);
$parcel$export$c($704cf1d3b684cc5c$exports, "useSSRSafeId", () => $704cf1d3b684cc5c$export$619500959fc48b26);
$parcel$export$c($704cf1d3b684cc5c$exports, "useIsSSR", () => $704cf1d3b684cc5c$export$535bd6ca7f90a273);
const $704cf1d3b684cc5c$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 1e10)),
  current: 0
};
const $704cf1d3b684cc5c$var$SSRContext = /* @__PURE__ */ $5lsDl$react.createContext($704cf1d3b684cc5c$var$defaultContext);
function $704cf1d3b684cc5c$export$9f8ac96af4b1b2ae(props) {
  let cur = useContext($704cf1d3b684cc5c$var$SSRContext);
  let value = useMemo(() => ({
    prefix: cur === $704cf1d3b684cc5c$var$defaultContext ? "" : `${cur.prefix}-${++cur.current}`,
    current: 0
  }), [
    cur
  ]);
  return /* @__PURE__ */ $5lsDl$react.createElement($704cf1d3b684cc5c$var$SSRContext.Provider, {
    value
  }, props.children);
}
let $704cf1d3b684cc5c$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
function $704cf1d3b684cc5c$export$619500959fc48b26(defaultId) {
  let ctx = useContext($704cf1d3b684cc5c$var$SSRContext);
  if (ctx === $704cf1d3b684cc5c$var$defaultContext && !$704cf1d3b684cc5c$var$canUseDOM)
    console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
  return useMemo(() => defaultId || `react-aria${ctx.prefix}-${++ctx.current}`, [
    defaultId
  ]);
}
function $704cf1d3b684cc5c$export$535bd6ca7f90a273() {
  let cur = useContext($704cf1d3b684cc5c$var$SSRContext);
  let isInSSRContext = cur !== $704cf1d3b684cc5c$var$defaultContext;
  let [isSSR, setIsSSR] = useState(isInSSRContext);
  if (typeof window !== "undefined" && isInSSRContext)
    useLayoutEffect(() => {
      setIsSSR(false);
    }, []);
  return isSSR;
}
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p2 in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p2))
        d2[p2] = b2[p2];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t[p2] = s[p2];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var ErrorKind;
(function(ErrorKind2) {
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
  ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
  ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
  ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
  ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
  ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
  ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));
var TYPE;
(function(TYPE2) {
  TYPE2[TYPE2["literal"] = 0] = "literal";
  TYPE2[TYPE2["argument"] = 1] = "argument";
  TYPE2[TYPE2["number"] = 2] = "number";
  TYPE2[TYPE2["date"] = 3] = "date";
  TYPE2[TYPE2["time"] = 4] = "time";
  TYPE2[TYPE2["select"] = 5] = "select";
  TYPE2[TYPE2["plural"] = 6] = "plural";
  TYPE2[TYPE2["pound"] = 7] = "pound";
  TYPE2[TYPE2["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function(SKELETON_TYPE2) {
  SKELETON_TYPE2[SKELETON_TYPE2["number"] = 0] = "number";
  SKELETON_TYPE2[SKELETON_TYPE2["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
function isLiteralElement(el) {
  return el.type === TYPE.literal;
}
function isArgumentElement(el) {
  return el.type === TYPE.argument;
}
function isNumberElement(el) {
  return el.type === TYPE.number;
}
function isDateElement(el) {
  return el.type === TYPE.date;
}
function isTimeElement(el) {
  return el.type === TYPE.time;
}
function isSelectElement(el) {
  return el.type === TYPE.select;
}
function isPluralElement(el) {
  return el.type === TYPE.plural;
}
function isPoundElement(el) {
  return el.type === TYPE.pound;
}
function isTagElement(el) {
  return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
  return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
  return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
}
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function parseDateTimeSkeleton(skeleton) {
  var result = {};
  skeleton.replace(DATE_TIME_REGEX, function(match) {
    var len = match.length;
    switch (match[0]) {
      case "G":
        result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        break;
      case "y":
        result.year = len === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        result.day = ["numeric", "2-digit"][len - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        result.weekday = len === 4 ? "short" : len === 5 ? "narrow" : "short";
        break;
      case "e":
        if (len < 4) {
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        }
        result.weekday = ["short", "long", "narrow", "short"][len - 4];
        break;
      case "c":
        if (len < 4) {
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        }
        result.weekday = ["short", "long", "narrow", "short"][len - 4];
        break;
      case "a":
        result.hour12 = true;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        result.hourCycle = "h12";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "H":
        result.hourCycle = "h23";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "K":
        result.hourCycle = "h11";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "k":
        result.hourCycle = "h24";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        result.minute = ["numeric", "2-digit"][len - 1];
        break;
      case "s":
        result.second = ["numeric", "2-digit"][len - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        result.timeZoneName = len < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  });
  return result;
}
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function parseNumberSkeletonFromString(skeleton) {
  if (skeleton.length === 0) {
    throw new Error("Number skeleton cannot be empty");
  }
  var stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter(function(x) {
    return x.length > 0;
  });
  var tokens = [];
  for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
    var stringToken = stringTokens_1[_i];
    var stemAndOptions = stringToken.split("/");
    if (stemAndOptions.length === 0) {
      throw new Error("Invalid number skeleton");
    }
    var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
    for (var _a2 = 0, options_1 = options; _a2 < options_1.length; _a2++) {
      var option = options_1[_a2];
      if (option.length === 0) {
        throw new Error("Invalid number skeleton");
      }
    }
    tokens.push({ stem, options });
  }
  return tokens;
}
function icuUnitToEcma(unit) {
  return unit.replace(/^(.*?)-/, "");
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
  var result = {};
  if (str[str.length - 1] === "r") {
    result.roundingPriority = "morePrecision";
  } else if (str[str.length - 1] === "s") {
    result.roundingPriority = "lessPrecision";
  }
  str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
    if (typeof g2 !== "string") {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length;
    } else if (g2 === "+") {
      result.minimumSignificantDigits = g1.length;
    } else if (g1[0] === "#") {
      result.maximumSignificantDigits = g1.length;
    } else {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
    }
    return "";
  });
  return result;
}
function parseSign(str) {
  switch (str) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function parseConciseScientificAndEngineeringStem(stem) {
  var result;
  if (stem[0] === "E" && stem[1] === "E") {
    result = {
      notation: "engineering"
    };
    stem = stem.slice(2);
  } else if (stem[0] === "E") {
    result = {
      notation: "scientific"
    };
    stem = stem.slice(1);
  }
  if (result) {
    var signDisplay = stem.slice(0, 2);
    if (signDisplay === "+!") {
      result.signDisplay = "always";
      stem = stem.slice(2);
    } else if (signDisplay === "+?") {
      result.signDisplay = "exceptZero";
      stem = stem.slice(2);
    }
    if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
      throw new Error("Malformed concise eng/scientific notation");
    }
    result.minimumIntegerDigits = stem.length;
  }
  return result;
}
function parseNotationOptions(opt) {
  var result = {};
  var signOpts = parseSign(opt);
  if (signOpts) {
    return signOpts;
  }
  return result;
}
function parseNumberSkeleton(tokens) {
  var result = {};
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    switch (token.stem) {
      case "percent":
      case "%":
        result.style = "percent";
        continue;
      case "%x100":
        result.style = "percent";
        result.scale = 100;
        continue;
      case "currency":
        result.style = "currency";
        result.currency = token.options[0];
        continue;
      case "group-off":
      case ",_":
        result.useGrouping = false;
        continue;
      case "precision-integer":
      case ".":
        result.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        result.style = "unit";
        result.unit = icuUnitToEcma(token.options[0]);
        continue;
      case "compact-short":
      case "K":
        result.notation = "compact";
        result.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        result.notation = "compact";
        result.compactDisplay = "long";
        continue;
      case "scientific":
        result = __assign$1(__assign$1(__assign$1({}, result), { notation: "scientific" }), token.options.reduce(function(all, opt2) {
          return __assign$1(__assign$1({}, all), parseNotationOptions(opt2));
        }, {}));
        continue;
      case "engineering":
        result = __assign$1(__assign$1(__assign$1({}, result), { notation: "engineering" }), token.options.reduce(function(all, opt2) {
          return __assign$1(__assign$1({}, all), parseNotationOptions(opt2));
        }, {}));
        continue;
      case "notation-simple":
        result.notation = "standard";
        continue;
      case "unit-width-narrow":
        result.currencyDisplay = "narrowSymbol";
        result.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        result.currencyDisplay = "code";
        result.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        result.currencyDisplay = "name";
        result.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        result.currencyDisplay = "symbol";
        continue;
      case "scale":
        result.scale = parseFloat(token.options[0]);
        continue;
      case "integer-width":
        if (token.options.length > 1) {
          throw new RangeError("integer-width stems only accept a single optional option");
        }
        token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
          if (g1) {
            result.minimumIntegerDigits = g2.length;
          } else if (g3 && g4) {
            throw new Error("We currently do not support maximum integer digits");
          } else if (g5) {
            throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
      result.minimumIntegerDigits = token.stem.length;
      continue;
    }
    if (FRACTION_PRECISION_REGEX.test(token.stem)) {
      if (token.options.length > 1) {
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      }
      token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
        if (g2 === "*") {
          result.minimumFractionDigits = g1.length;
        } else if (g3 && g3[0] === "#") {
          result.maximumFractionDigits = g3.length;
        } else if (g4 && g5) {
          result.minimumFractionDigits = g4.length;
          result.maximumFractionDigits = g4.length + g5.length;
        } else {
          result.minimumFractionDigits = g1.length;
          result.maximumFractionDigits = g1.length;
        }
        return "";
      });
      var opt = token.options[0];
      if (opt === "w") {
        result = __assign$1(__assign$1({}, result), { trailingZeroDisplay: "stripIfInteger" });
      } else if (opt) {
        result = __assign$1(__assign$1({}, result), parseSignificantPrecision(opt));
      }
      continue;
    }
    if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
      result = __assign$1(__assign$1({}, result), parseSignificantPrecision(token.stem));
      continue;
    }
    var signOpts = parseSign(token.stem);
    if (signOpts) {
      result = __assign$1(__assign$1({}, result), signOpts);
    }
    var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
    if (conciseScientificAndEngineeringOpts) {
      result = __assign$1(__assign$1({}, result), conciseScientificAndEngineeringOpts);
    }
  }
  return result;
}
var timeData = {
  "AX": [
    "H"
  ],
  "BQ": [
    "H"
  ],
  "CP": [
    "H"
  ],
  "CZ": [
    "H"
  ],
  "DK": [
    "H"
  ],
  "FI": [
    "H"
  ],
  "ID": [
    "H"
  ],
  "IS": [
    "H"
  ],
  "ML": [
    "H"
  ],
  "NE": [
    "H"
  ],
  "RU": [
    "H"
  ],
  "SE": [
    "H"
  ],
  "SJ": [
    "H"
  ],
  "SK": [
    "H"
  ],
  "AS": [
    "h",
    "H"
  ],
  "BT": [
    "h",
    "H"
  ],
  "DJ": [
    "h",
    "H"
  ],
  "ER": [
    "h",
    "H"
  ],
  "GH": [
    "h",
    "H"
  ],
  "IN": [
    "h",
    "H"
  ],
  "LS": [
    "h",
    "H"
  ],
  "PG": [
    "h",
    "H"
  ],
  "PW": [
    "h",
    "H"
  ],
  "SO": [
    "h",
    "H"
  ],
  "TO": [
    "h",
    "H"
  ],
  "VU": [
    "h",
    "H"
  ],
  "WS": [
    "h",
    "H"
  ],
  "001": [
    "H",
    "h"
  ],
  "AL": [
    "h",
    "H",
    "hB"
  ],
  "TD": [
    "h",
    "H",
    "hB"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  "CF": [
    "H",
    "h",
    "hB"
  ],
  "CM": [
    "H",
    "h",
    "hB"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  "LU": [
    "H",
    "h",
    "hB"
  ],
  "NP": [
    "H",
    "h",
    "hB"
  ],
  "PF": [
    "H",
    "h",
    "hB"
  ],
  "SC": [
    "H",
    "h",
    "hB"
  ],
  "SM": [
    "H",
    "h",
    "hB"
  ],
  "SN": [
    "H",
    "h",
    "hB"
  ],
  "TF": [
    "H",
    "h",
    "hB"
  ],
  "VA": [
    "H",
    "h",
    "hB"
  ],
  "CY": [
    "h",
    "H",
    "hb",
    "hB"
  ],
  "GR": [
    "h",
    "H",
    "hb",
    "hB"
  ],
  "CO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "DO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "KP": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "KR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "NA": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PA": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "VE": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "AC": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "AI": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "BW": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "BZ": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CC": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CX": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "DG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "FK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GB": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GI": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IE": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IM": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IO": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "JE": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "LT": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "MK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "MN": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "MS": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NF": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NR": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NU": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "PN": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "SH": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "SX": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "TA": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "ZA": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "AR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "CL": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "CR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "CU": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "EA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-BO": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-EC": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-PE": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "GT": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "HN": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "IC": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "KG": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "KM": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "LK": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "MA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "MX": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "NI": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "PY": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "SV": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "UY": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "JP": [
    "H",
    "h",
    "K"
  ],
  "AD": [
    "H",
    "hB"
  ],
  "AM": [
    "H",
    "hB"
  ],
  "AO": [
    "H",
    "hB"
  ],
  "AT": [
    "H",
    "hB"
  ],
  "AW": [
    "H",
    "hB"
  ],
  "BE": [
    "H",
    "hB"
  ],
  "BF": [
    "H",
    "hB"
  ],
  "BJ": [
    "H",
    "hB"
  ],
  "BL": [
    "H",
    "hB"
  ],
  "BR": [
    "H",
    "hB"
  ],
  "CG": [
    "H",
    "hB"
  ],
  "CI": [
    "H",
    "hB"
  ],
  "CV": [
    "H",
    "hB"
  ],
  "DE": [
    "H",
    "hB"
  ],
  "EE": [
    "H",
    "hB"
  ],
  "FR": [
    "H",
    "hB"
  ],
  "GA": [
    "H",
    "hB"
  ],
  "GF": [
    "H",
    "hB"
  ],
  "GN": [
    "H",
    "hB"
  ],
  "GP": [
    "H",
    "hB"
  ],
  "GW": [
    "H",
    "hB"
  ],
  "HR": [
    "H",
    "hB"
  ],
  "IL": [
    "H",
    "hB"
  ],
  "IT": [
    "H",
    "hB"
  ],
  "KZ": [
    "H",
    "hB"
  ],
  "MC": [
    "H",
    "hB"
  ],
  "MD": [
    "H",
    "hB"
  ],
  "MF": [
    "H",
    "hB"
  ],
  "MQ": [
    "H",
    "hB"
  ],
  "MZ": [
    "H",
    "hB"
  ],
  "NC": [
    "H",
    "hB"
  ],
  "NL": [
    "H",
    "hB"
  ],
  "PM": [
    "H",
    "hB"
  ],
  "PT": [
    "H",
    "hB"
  ],
  "RE": [
    "H",
    "hB"
  ],
  "RO": [
    "H",
    "hB"
  ],
  "SI": [
    "H",
    "hB"
  ],
  "SR": [
    "H",
    "hB"
  ],
  "ST": [
    "H",
    "hB"
  ],
  "TG": [
    "H",
    "hB"
  ],
  "TR": [
    "H",
    "hB"
  ],
  "WF": [
    "H",
    "hB"
  ],
  "YT": [
    "H",
    "hB"
  ],
  "BD": [
    "h",
    "hB",
    "H"
  ],
  "PK": [
    "h",
    "hB",
    "H"
  ],
  "AZ": [
    "H",
    "hB",
    "h"
  ],
  "BA": [
    "H",
    "hB",
    "h"
  ],
  "BG": [
    "H",
    "hB",
    "h"
  ],
  "CH": [
    "H",
    "hB",
    "h"
  ],
  "GE": [
    "H",
    "hB",
    "h"
  ],
  "LI": [
    "H",
    "hB",
    "h"
  ],
  "ME": [
    "H",
    "hB",
    "h"
  ],
  "RS": [
    "H",
    "hB",
    "h"
  ],
  "UA": [
    "H",
    "hB",
    "h"
  ],
  "UZ": [
    "H",
    "hB",
    "h"
  ],
  "XK": [
    "H",
    "hB",
    "h"
  ],
  "AG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "AU": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BB": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BS": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "CA": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "DM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "FJ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "FM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GD": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GU": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "JM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KI": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KN": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "LC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "LR": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MH": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MP": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MW": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "NZ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SB": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SL": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SS": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SZ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TT": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "UM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "US": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VI": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "ZM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BO": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "EC": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "ES": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "GQ": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "PE": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "AE": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "BH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "DZ": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "EG": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "EH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "HK": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "IQ": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "JO": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "KW": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "LB": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "LY": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MO": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MR": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "OM": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PS": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "QA": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SA": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SD": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SY": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "TN": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "YE": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "AF": [
    "H",
    "hb",
    "hB",
    "h"
  ],
  "LA": [
    "H",
    "hb",
    "hB",
    "h"
  ],
  "CN": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "LV": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "TL": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "CD": [
    "hB",
    "H"
  ],
  "IR": [
    "hB",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  "KH": [
    "hB",
    "h",
    "H",
    "hb"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  "BN": [
    "hb",
    "hB",
    "h",
    "H"
  ],
  "MY": [
    "hb",
    "hB",
    "h",
    "H"
  ],
  "ET": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "TW": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "KE": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "MM": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "TZ": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "UG": [
    "hB",
    "hb",
    "H",
    "h"
  ]
};
function getBestPattern(skeleton, locale) {
  var skeletonCopy = "";
  for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
    var patternChar = skeleton.charAt(patternPos);
    if (patternChar === "j") {
      var extraLength = 0;
      while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
        extraLength++;
        patternPos++;
      }
      var hourLen = 1 + (extraLength & 1);
      var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
      var dayPeriodChar = "a";
      var hourChar = getDefaultHourSymbolFromLocale(locale);
      if (hourChar == "H" || hourChar == "k") {
        dayPeriodLen = 0;
      }
      while (dayPeriodLen-- > 0) {
        skeletonCopy += dayPeriodChar;
      }
      while (hourLen-- > 0) {
        skeletonCopy = hourChar + skeletonCopy;
      }
    } else if (patternChar === "J") {
      skeletonCopy += "H";
    } else {
      skeletonCopy += patternChar;
    }
  }
  return skeletonCopy;
}
function getDefaultHourSymbolFromLocale(locale) {
  var hourCycle = locale.hourCycle;
  if (hourCycle === void 0 && locale.hourCycles && locale.hourCycles.length) {
    hourCycle = locale.hourCycles[0];
  }
  if (hourCycle) {
    switch (hourCycle) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  }
  var languageTag = locale.language;
  var regionTag;
  if (languageTag !== "root") {
    regionTag = locale.maximize().region;
  }
  var hourCycles = timeData[regionTag || ""] || timeData[languageTag || ""] || timeData["".concat(languageTag, "-001")] || timeData["001"];
  return hourCycles[0];
}
var _a;
var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(SPACE_SEPARATOR_REGEX.source, "*"));
var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(SPACE_SEPARATOR_REGEX.source, "*$"));
function createLocation(start, end) {
  return { start, end };
}
var hasNativeStartsWith = !!String.prototype.startsWith;
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger ? Number.isSafeInteger : function(n2) {
  return typeof n2 === "number" && isFinite(n2) && Math.floor(n2) === n2 && Math.abs(n2) <= 9007199254740991;
};
var REGEX_SUPPORTS_U_AND_Y = true;
try {
  var re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec("a")) === null || _a === void 0 ? void 0 : _a[0]) === "a";
} catch (_) {
  REGEX_SUPPORTS_U_AND_Y = false;
}
var startsWith = hasNativeStartsWith ? function startsWith2(s, search, position2) {
  return s.startsWith(search, position2);
} : function startsWith3(s, search, position2) {
  return s.slice(position2, position2 + search.length) === search;
};
var fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : function fromCodePoint2() {
  var codePoints = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    codePoints[_i] = arguments[_i];
  }
  var elements = "";
  var length = codePoints.length;
  var i = 0;
  var code;
  while (length > i) {
    code = codePoints[i++];
    if (code > 1114111)
      throw RangeError(code + " is not a valid code point");
    elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
  }
  return elements;
};
var fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries2(entries) {
  var obj = {};
  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var _a2 = entries_1[_i], k2 = _a2[0], v = _a2[1];
    obj[k2] = v;
  }
  return obj;
};
var codePointAt = hasNativeCodePointAt ? function codePointAt2(s, index) {
  return s.codePointAt(index);
} : function codePointAt3(s, index) {
  var size = s.length;
  if (index < 0 || index >= size) {
    return void 0;
  }
  var first = s.charCodeAt(index);
  var second;
  return first < 55296 || first > 56319 || index + 1 === size || (second = s.charCodeAt(index + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
};
var trimStart = hasTrimStart ? function trimStart2(s) {
  return s.trimStart();
} : function trimStart3(s) {
  return s.replace(SPACE_SEPARATOR_START_REGEX, "");
};
var trimEnd = hasTrimEnd ? function trimEnd2(s) {
  return s.trimEnd();
} : function trimEnd3(s) {
  return s.replace(SPACE_SEPARATOR_END_REGEX, "");
};
function RE(s, flag) {
  return new RegExp(s, flag);
}
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
  var IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  matchIdentifierAtIndex = function matchIdentifierAtIndex2(s, index) {
    var _a2;
    IDENTIFIER_PREFIX_RE_1.lastIndex = index;
    var match = IDENTIFIER_PREFIX_RE_1.exec(s);
    return (_a2 = match[1]) !== null && _a2 !== void 0 ? _a2 : "";
  };
} else {
  matchIdentifierAtIndex = function matchIdentifierAtIndex2(s, index) {
    var match = [];
    while (true) {
      var c = codePointAt(s, index);
      if (c === void 0 || _isWhiteSpace(c) || _isPatternSyntax(c)) {
        break;
      }
      match.push(c);
      index += c >= 65536 ? 2 : 1;
    }
    return fromCodePoint.apply(void 0, match);
  };
}
var Parser = function() {
  function Parser2(message, options) {
    if (options === void 0) {
      options = {};
    }
    this.message = message;
    this.position = { offset: 0, line: 1, column: 1 };
    this.ignoreTag = !!options.ignoreTag;
    this.locale = options.locale;
    this.requiresOtherClause = !!options.requiresOtherClause;
    this.shouldParseSkeletons = !!options.shouldParseSkeletons;
  }
  Parser2.prototype.parse = function() {
    if (this.offset() !== 0) {
      throw Error("parser can only be used once");
    }
    return this.parseMessage(0, "", false);
  };
  Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
    var elements = [];
    while (!this.isEOF()) {
      var char = this.char();
      if (char === 123) {
        var result = this.parseArgument(nestingLevel, expectingCloseTag);
        if (result.err) {
          return result;
        }
        elements.push(result.val);
      } else if (char === 125 && nestingLevel > 0) {
        break;
      } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
        var position2 = this.clonePosition();
        this.bump();
        elements.push({
          type: TYPE.pound,
          location: createLocation(position2, this.clonePosition())
        });
      } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
        if (expectingCloseTag) {
          break;
        } else {
          return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
        }
      } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
        var result = this.parseTag(nestingLevel, parentArgType);
        if (result.err) {
          return result;
        }
        elements.push(result.val);
      } else {
        var result = this.parseLiteral(nestingLevel, parentArgType);
        if (result.err) {
          return result;
        }
        elements.push(result.val);
      }
    }
    return { val: elements, err: null };
  };
  Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
    var startPosition = this.clonePosition();
    this.bump();
    var tagName = this.parseTagName();
    this.bumpSpace();
    if (this.bumpIf("/>")) {
      return {
        val: {
          type: TYPE.literal,
          value: "<".concat(tagName, "/>"),
          location: createLocation(startPosition, this.clonePosition())
        },
        err: null
      };
    } else if (this.bumpIf(">")) {
      var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
      if (childrenResult.err) {
        return childrenResult;
      }
      var children = childrenResult.val;
      var endTagStartPosition = this.clonePosition();
      if (this.bumpIf("</")) {
        if (this.isEOF() || !_isAlpha(this.char())) {
          return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
        }
        var closingTagNameStartPosition = this.clonePosition();
        var closingTagName = this.parseTagName();
        if (tagName !== closingTagName) {
          return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (!this.bumpIf(">")) {
          return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
        }
        return {
          val: {
            type: TYPE.tag,
            value: tagName,
            children,
            location: createLocation(startPosition, this.clonePosition())
          },
          err: null
        };
      } else {
        return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
      }
    } else {
      return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
    }
  };
  Parser2.prototype.parseTagName = function() {
    var startOffset = this.offset();
    this.bump();
    while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
      this.bump();
    }
    return this.message.slice(startOffset, this.offset());
  };
  Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
    var start = this.clonePosition();
    var value = "";
    while (true) {
      var parseQuoteResult = this.tryParseQuote(parentArgType);
      if (parseQuoteResult) {
        value += parseQuoteResult;
        continue;
      }
      var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
      if (parseUnquotedResult) {
        value += parseUnquotedResult;
        continue;
      }
      var parseLeftAngleResult = this.tryParseLeftAngleBracket();
      if (parseLeftAngleResult) {
        value += parseLeftAngleResult;
        continue;
      }
      break;
    }
    var location = createLocation(start, this.clonePosition());
    return {
      val: { type: TYPE.literal, value, location },
      err: null
    };
  };
  Parser2.prototype.tryParseLeftAngleBracket = function() {
    if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
      this.bump();
      return "<";
    }
    return null;
  };
  Parser2.prototype.tryParseQuote = function(parentArgType) {
    if (this.isEOF() || this.char() !== 39) {
      return null;
    }
    switch (this.peek()) {
      case 39:
        this.bump();
        this.bump();
        return "'";
      case 123:
      case 60:
      case 62:
      case 125:
        break;
      case 35:
        if (parentArgType === "plural" || parentArgType === "selectordinal") {
          break;
        }
        return null;
      default:
        return null;
    }
    this.bump();
    var codePoints = [this.char()];
    this.bump();
    while (!this.isEOF()) {
      var ch = this.char();
      if (ch === 39) {
        if (this.peek() === 39) {
          codePoints.push(39);
          this.bump();
        } else {
          this.bump();
          break;
        }
      } else {
        codePoints.push(ch);
      }
      this.bump();
    }
    return fromCodePoint.apply(void 0, codePoints);
  };
  Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
    if (this.isEOF()) {
      return null;
    }
    var ch = this.char();
    if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
      return null;
    } else {
      this.bump();
      return fromCodePoint(ch);
    }
  };
  Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
    var openingBracePosition = this.clonePosition();
    this.bump();
    this.bumpSpace();
    if (this.isEOF()) {
      return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
    }
    if (this.char() === 125) {
      this.bump();
      return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
    }
    var value = this.parseIdentifierIfPossible().value;
    if (!value) {
      return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
    }
    this.bumpSpace();
    if (this.isEOF()) {
      return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
    }
    switch (this.char()) {
      case 125: {
        this.bump();
        return {
          val: {
            type: TYPE.argument,
            value,
            location: createLocation(openingBracePosition, this.clonePosition())
          },
          err: null
        };
      }
      case 44: {
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
      }
      default:
        return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
    }
  };
  Parser2.prototype.parseIdentifierIfPossible = function() {
    var startingPosition = this.clonePosition();
    var startOffset = this.offset();
    var value = matchIdentifierAtIndex(this.message, startOffset);
    var endOffset = startOffset + value.length;
    this.bumpTo(endOffset);
    var endPosition = this.clonePosition();
    var location = createLocation(startingPosition, endPosition);
    return { value, location };
  };
  Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
    var _a2;
    var typeStartPosition = this.clonePosition();
    var argType = this.parseIdentifierIfPossible().value;
    var typeEndPosition = this.clonePosition();
    switch (argType) {
      case "":
        return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
      case "number":
      case "date":
      case "time": {
        this.bumpSpace();
        var styleAndLocation = null;
        if (this.bumpIf(",")) {
          this.bumpSpace();
          var styleStartPosition = this.clonePosition();
          var result = this.parseSimpleArgStyleIfPossible();
          if (result.err) {
            return result;
          }
          var style2 = trimEnd(result.val);
          if (style2.length === 0) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
          }
          var styleLocation = createLocation(styleStartPosition, this.clonePosition());
          styleAndLocation = { style: style2, styleLocation };
        }
        var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
        if (argCloseResult.err) {
          return argCloseResult;
        }
        var location_1 = createLocation(openingBracePosition, this.clonePosition());
        if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, "::", 0)) {
          var skeleton = trimStart(styleAndLocation.style.slice(2));
          if (argType === "number") {
            var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
            if (result.err) {
              return result;
            }
            return {
              val: { type: TYPE.number, value, location: location_1, style: result.val },
              err: null
            };
          } else {
            if (skeleton.length === 0) {
              return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
            }
            var dateTimePattern = skeleton;
            if (this.locale) {
              dateTimePattern = getBestPattern(skeleton, this.locale);
            }
            var style2 = {
              type: SKELETON_TYPE.dateTime,
              pattern: dateTimePattern,
              location: styleAndLocation.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(dateTimePattern) : {}
            };
            var type = argType === "date" ? TYPE.date : TYPE.time;
            return {
              val: { type, value, location: location_1, style: style2 },
              err: null
            };
          }
        }
        return {
          val: {
            type: argType === "number" ? TYPE.number : argType === "date" ? TYPE.date : TYPE.time,
            value,
            location: location_1,
            style: (_a2 = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a2 !== void 0 ? _a2 : null
          },
          err: null
        };
      }
      case "plural":
      case "selectordinal":
      case "select": {
        var typeEndPosition_1 = this.clonePosition();
        this.bumpSpace();
        if (!this.bumpIf(",")) {
          return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign$1({}, typeEndPosition_1)));
        }
        this.bumpSpace();
        var identifierAndLocation = this.parseIdentifierIfPossible();
        var pluralOffset = 0;
        if (argType !== "select" && identifierAndLocation.value === "offset") {
          if (!this.bumpIf(":")) {
            return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
          }
          this.bumpSpace();
          var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
          if (result.err) {
            return result;
          }
          this.bumpSpace();
          identifierAndLocation = this.parseIdentifierIfPossible();
          pluralOffset = result.val;
        }
        var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
        if (optionsResult.err) {
          return optionsResult;
        }
        var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
        if (argCloseResult.err) {
          return argCloseResult;
        }
        var location_2 = createLocation(openingBracePosition, this.clonePosition());
        if (argType === "select") {
          return {
            val: {
              type: TYPE.select,
              value,
              options: fromEntries(optionsResult.val),
              location: location_2
            },
            err: null
          };
        } else {
          return {
            val: {
              type: TYPE.plural,
              value,
              options: fromEntries(optionsResult.val),
              offset: pluralOffset,
              pluralType: argType === "plural" ? "cardinal" : "ordinal",
              location: location_2
            },
            err: null
          };
        }
      }
      default:
        return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
    }
  };
  Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
    if (this.isEOF() || this.char() !== 125) {
      return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
    }
    this.bump();
    return { val: true, err: null };
  };
  Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
    var nestedBraces = 0;
    var startPosition = this.clonePosition();
    while (!this.isEOF()) {
      var ch = this.char();
      switch (ch) {
        case 39: {
          this.bump();
          var apostrophePosition = this.clonePosition();
          if (!this.bumpUntil("'")) {
            return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
          }
          this.bump();
          break;
        }
        case 123: {
          nestedBraces += 1;
          this.bump();
          break;
        }
        case 125: {
          if (nestedBraces > 0) {
            nestedBraces -= 1;
          } else {
            return {
              val: this.message.slice(startPosition.offset, this.offset()),
              err: null
            };
          }
          break;
        }
        default:
          this.bump();
          break;
      }
    }
    return {
      val: this.message.slice(startPosition.offset, this.offset()),
      err: null
    };
  };
  Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location) {
    var tokens = [];
    try {
      tokens = parseNumberSkeletonFromString(skeleton);
    } catch (e) {
      return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
    }
    return {
      val: {
        type: SKELETON_TYPE.number,
        tokens,
        location,
        parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
      },
      err: null
    };
  };
  Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
    var _a2;
    var hasOtherClause = false;
    var options = [];
    var parsedSelectors = /* @__PURE__ */ new Set();
    var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
    while (true) {
      if (selector.length === 0) {
        var startPosition = this.clonePosition();
        if (parentArgType !== "select" && this.bumpIf("=")) {
          var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (result.err) {
            return result;
          }
          selectorLocation = createLocation(startPosition, this.clonePosition());
          selector = this.message.slice(startPosition.offset, this.offset());
        } else {
          break;
        }
      }
      if (parsedSelectors.has(selector)) {
        return this.error(parentArgType === "select" ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
      }
      if (selector === "other") {
        hasOtherClause = true;
      }
      this.bumpSpace();
      var openingBracePosition = this.clonePosition();
      if (!this.bumpIf("{")) {
        return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
      }
      var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
      if (fragmentResult.err) {
        return fragmentResult;
      }
      var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
      if (argCloseResult.err) {
        return argCloseResult;
      }
      options.push([
        selector,
        {
          value: fragmentResult.val,
          location: createLocation(openingBracePosition, this.clonePosition())
        }
      ]);
      parsedSelectors.add(selector);
      this.bumpSpace();
      _a2 = this.parseIdentifierIfPossible(), selector = _a2.value, selectorLocation = _a2.location;
    }
    if (options.length === 0) {
      return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
    }
    if (this.requiresOtherClause && !hasOtherClause) {
      return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
    }
    return { val: options, err: null };
  };
  Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
    var sign = 1;
    var startingPosition = this.clonePosition();
    if (this.bumpIf("+"))
      ;
    else if (this.bumpIf("-")) {
      sign = -1;
    }
    var hasDigits = false;
    var decimal = 0;
    while (!this.isEOF()) {
      var ch = this.char();
      if (ch >= 48 && ch <= 57) {
        hasDigits = true;
        decimal = decimal * 10 + (ch - 48);
        this.bump();
      } else {
        break;
      }
    }
    var location = createLocation(startingPosition, this.clonePosition());
    if (!hasDigits) {
      return this.error(expectNumberError, location);
    }
    decimal *= sign;
    if (!isSafeInteger(decimal)) {
      return this.error(invalidNumberError, location);
    }
    return { val: decimal, err: null };
  };
  Parser2.prototype.offset = function() {
    return this.position.offset;
  };
  Parser2.prototype.isEOF = function() {
    return this.offset() === this.message.length;
  };
  Parser2.prototype.clonePosition = function() {
    return {
      offset: this.position.offset,
      line: this.position.line,
      column: this.position.column
    };
  };
  Parser2.prototype.char = function() {
    var offset2 = this.position.offset;
    if (offset2 >= this.message.length) {
      throw Error("out of bound");
    }
    var code = codePointAt(this.message, offset2);
    if (code === void 0) {
      throw Error("Offset ".concat(offset2, " is at invalid UTF-16 code unit boundary"));
    }
    return code;
  };
  Parser2.prototype.error = function(kind, location) {
    return {
      val: null,
      err: {
        kind,
        message: this.message,
        location
      }
    };
  };
  Parser2.prototype.bump = function() {
    if (this.isEOF()) {
      return;
    }
    var code = this.char();
    if (code === 10) {
      this.position.line += 1;
      this.position.column = 1;
      this.position.offset += 1;
    } else {
      this.position.column += 1;
      this.position.offset += code < 65536 ? 1 : 2;
    }
  };
  Parser2.prototype.bumpIf = function(prefix) {
    if (startsWith(this.message, prefix, this.offset())) {
      for (var i = 0; i < prefix.length; i++) {
        this.bump();
      }
      return true;
    }
    return false;
  };
  Parser2.prototype.bumpUntil = function(pattern) {
    var currentOffset = this.offset();
    var index = this.message.indexOf(pattern, currentOffset);
    if (index >= 0) {
      this.bumpTo(index);
      return true;
    } else {
      this.bumpTo(this.message.length);
      return false;
    }
  };
  Parser2.prototype.bumpTo = function(targetOffset) {
    if (this.offset() > targetOffset) {
      throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
    }
    targetOffset = Math.min(targetOffset, this.message.length);
    while (true) {
      var offset2 = this.offset();
      if (offset2 === targetOffset) {
        break;
      }
      if (offset2 > targetOffset) {
        throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
      }
      this.bump();
      if (this.isEOF()) {
        break;
      }
    }
  };
  Parser2.prototype.bumpSpace = function() {
    while (!this.isEOF() && _isWhiteSpace(this.char())) {
      this.bump();
    }
  };
  Parser2.prototype.peek = function() {
    if (this.isEOF()) {
      return null;
    }
    var code = this.char();
    var offset2 = this.offset();
    var nextCode = this.message.charCodeAt(offset2 + (code >= 65536 ? 2 : 1));
    return nextCode !== null && nextCode !== void 0 ? nextCode : null;
  };
  return Parser2;
}();
function _isAlpha(codepoint) {
  return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
  return _isAlpha(codepoint) || codepoint === 47;
}
function _isPotentialElementNameChar(c) {
  return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
}
function _isWhiteSpace(c) {
  return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
}
function _isPatternSyntax(c) {
  return c >= 33 && c <= 35 || c === 36 || c >= 37 && c <= 39 || c === 40 || c === 41 || c === 42 || c === 43 || c === 44 || c === 45 || c >= 46 && c <= 47 || c >= 58 && c <= 59 || c >= 60 && c <= 62 || c >= 63 && c <= 64 || c === 91 || c === 92 || c === 93 || c === 94 || c === 96 || c === 123 || c === 124 || c === 125 || c === 126 || c === 161 || c >= 162 && c <= 165 || c === 166 || c === 167 || c === 169 || c === 171 || c === 172 || c === 174 || c === 176 || c === 177 || c === 182 || c === 187 || c === 191 || c === 215 || c === 247 || c >= 8208 && c <= 8213 || c >= 8214 && c <= 8215 || c === 8216 || c === 8217 || c === 8218 || c >= 8219 && c <= 8220 || c === 8221 || c === 8222 || c === 8223 || c >= 8224 && c <= 8231 || c >= 8240 && c <= 8248 || c === 8249 || c === 8250 || c >= 8251 && c <= 8254 || c >= 8257 && c <= 8259 || c === 8260 || c === 8261 || c === 8262 || c >= 8263 && c <= 8273 || c === 8274 || c === 8275 || c >= 8277 && c <= 8286 || c >= 8592 && c <= 8596 || c >= 8597 && c <= 8601 || c >= 8602 && c <= 8603 || c >= 8604 && c <= 8607 || c === 8608 || c >= 8609 && c <= 8610 || c === 8611 || c >= 8612 && c <= 8613 || c === 8614 || c >= 8615 && c <= 8621 || c === 8622 || c >= 8623 && c <= 8653 || c >= 8654 && c <= 8655 || c >= 8656 && c <= 8657 || c === 8658 || c === 8659 || c === 8660 || c >= 8661 && c <= 8691 || c >= 8692 && c <= 8959 || c >= 8960 && c <= 8967 || c === 8968 || c === 8969 || c === 8970 || c === 8971 || c >= 8972 && c <= 8991 || c >= 8992 && c <= 8993 || c >= 8994 && c <= 9e3 || c === 9001 || c === 9002 || c >= 9003 && c <= 9083 || c === 9084 || c >= 9085 && c <= 9114 || c >= 9115 && c <= 9139 || c >= 9140 && c <= 9179 || c >= 9180 && c <= 9185 || c >= 9186 && c <= 9254 || c >= 9255 && c <= 9279 || c >= 9280 && c <= 9290 || c >= 9291 && c <= 9311 || c >= 9472 && c <= 9654 || c === 9655 || c >= 9656 && c <= 9664 || c === 9665 || c >= 9666 && c <= 9719 || c >= 9720 && c <= 9727 || c >= 9728 && c <= 9838 || c === 9839 || c >= 9840 && c <= 10087 || c === 10088 || c === 10089 || c === 10090 || c === 10091 || c === 10092 || c === 10093 || c === 10094 || c === 10095 || c === 10096 || c === 10097 || c === 10098 || c === 10099 || c === 10100 || c === 10101 || c >= 10132 && c <= 10175 || c >= 10176 && c <= 10180 || c === 10181 || c === 10182 || c >= 10183 && c <= 10213 || c === 10214 || c === 10215 || c === 10216 || c === 10217 || c === 10218 || c === 10219 || c === 10220 || c === 10221 || c === 10222 || c === 10223 || c >= 10224 && c <= 10239 || c >= 10240 && c <= 10495 || c >= 10496 && c <= 10626 || c === 10627 || c === 10628 || c === 10629 || c === 10630 || c === 10631 || c === 10632 || c === 10633 || c === 10634 || c === 10635 || c === 10636 || c === 10637 || c === 10638 || c === 10639 || c === 10640 || c === 10641 || c === 10642 || c === 10643 || c === 10644 || c === 10645 || c === 10646 || c === 10647 || c === 10648 || c >= 10649 && c <= 10711 || c === 10712 || c === 10713 || c === 10714 || c === 10715 || c >= 10716 && c <= 10747 || c === 10748 || c === 10749 || c >= 10750 && c <= 11007 || c >= 11008 && c <= 11055 || c >= 11056 && c <= 11076 || c >= 11077 && c <= 11078 || c >= 11079 && c <= 11084 || c >= 11085 && c <= 11123 || c >= 11124 && c <= 11125 || c >= 11126 && c <= 11157 || c === 11158 || c >= 11159 && c <= 11263 || c >= 11776 && c <= 11777 || c === 11778 || c === 11779 || c === 11780 || c === 11781 || c >= 11782 && c <= 11784 || c === 11785 || c === 11786 || c === 11787 || c === 11788 || c === 11789 || c >= 11790 && c <= 11798 || c === 11799 || c >= 11800 && c <= 11801 || c === 11802 || c === 11803 || c === 11804 || c === 11805 || c >= 11806 && c <= 11807 || c === 11808 || c === 11809 || c === 11810 || c === 11811 || c === 11812 || c === 11813 || c === 11814 || c === 11815 || c === 11816 || c === 11817 || c >= 11818 && c <= 11822 || c === 11823 || c >= 11824 && c <= 11833 || c >= 11834 && c <= 11835 || c >= 11836 && c <= 11839 || c === 11840 || c === 11841 || c === 11842 || c >= 11843 && c <= 11855 || c >= 11856 && c <= 11857 || c === 11858 || c >= 11859 && c <= 11903 || c >= 12289 && c <= 12291 || c === 12296 || c === 12297 || c === 12298 || c === 12299 || c === 12300 || c === 12301 || c === 12302 || c === 12303 || c === 12304 || c === 12305 || c >= 12306 && c <= 12307 || c === 12308 || c === 12309 || c === 12310 || c === 12311 || c === 12312 || c === 12313 || c === 12314 || c === 12315 || c === 12316 || c === 12317 || c >= 12318 && c <= 12319 || c === 12320 || c === 12336 || c === 64830 || c === 64831 || c >= 65093 && c <= 65094;
}
function pruneLocation(els) {
  els.forEach(function(el) {
    delete el.location;
    if (isSelectElement(el) || isPluralElement(el)) {
      for (var k2 in el.options) {
        delete el.options[k2].location;
        pruneLocation(el.options[k2].value);
      }
    } else if (isNumberElement(el) && isNumberSkeleton(el.style)) {
      delete el.style.location;
    } else if ((isDateElement(el) || isTimeElement(el)) && isDateTimeSkeleton(el.style)) {
      delete el.style.location;
    } else if (isTagElement(el)) {
      pruneLocation(el.children);
    }
  });
}
function parse(message, opts) {
  if (opts === void 0) {
    opts = {};
  }
  opts = __assign$1({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
  var result = new Parser(message, opts).parse();
  if (result.err) {
    var error = SyntaxError(ErrorKind[result.err.kind]);
    error.location = result.err.location;
    error.originalMessage = result.err.message;
    throw error;
  }
  if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
    pruneLocation(result.val);
  }
  return result.val;
}
function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;
  var serializer = options && options.serializer ? options.serializer : serializerDefault;
  var strategy = options && options.strategy ? options.strategy : strategyDefault;
  return strategy(fn, {
    cache,
    serializer
  });
}
function isPrimitive(value) {
  return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
  return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
  return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
var serializerDefault = function() {
  return JSON.stringify(arguments);
};
function ObjectWithoutPrototypeCache() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.get = function(key) {
  return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
  this.cache[key] = value;
};
var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
};
var strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["MISSING_VALUE"] = "MISSING_VALUE";
  ErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
  ErrorCode2["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = function(_super) {
  __extends(FormatError2, _super);
  function FormatError2(msg, code, originalMessage) {
    var _this = _super.call(this, msg) || this;
    _this.code = code;
    _this.originalMessage = originalMessage;
    return _this;
  }
  FormatError2.prototype.toString = function() {
    return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
  };
  return FormatError2;
}(Error);
var InvalidValueError = function(_super) {
  __extends(InvalidValueError2, _super);
  function InvalidValueError2(variableId, value, options, originalMessage) {
    return _super.call(this, 'Invalid values for "'.concat(variableId, '": "').concat(value, '". Options are "').concat(Object.keys(options).join('", "'), '"'), ErrorCode.INVALID_VALUE, originalMessage) || this;
  }
  return InvalidValueError2;
}(FormatError);
var InvalidValueTypeError = function(_super) {
  __extends(InvalidValueTypeError2, _super);
  function InvalidValueTypeError2(value, type, originalMessage) {
    return _super.call(this, 'Value for "'.concat(value, '" must be of type ').concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
  }
  return InvalidValueTypeError2;
}(FormatError);
var MissingValueError = function(_super) {
  __extends(MissingValueError2, _super);
  function MissingValueError2(variableId, originalMessage) {
    return _super.call(this, 'The intl string context variable "'.concat(variableId, '" was not provided to the string "').concat(originalMessage, '"'), ErrorCode.MISSING_VALUE, originalMessage) || this;
  }
  return MissingValueError2;
}(FormatError);
var PART_TYPE;
(function(PART_TYPE2) {
  PART_TYPE2[PART_TYPE2["literal"] = 0] = "literal";
  PART_TYPE2[PART_TYPE2["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
  if (parts.length < 2) {
    return parts;
  }
  return parts.reduce(function(all, part) {
    var lastPart = all[all.length - 1];
    if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
      all.push(part);
    } else {
      lastPart.value += part.value;
    }
    return all;
  }, []);
}
function isFormatXMLElementFn(el) {
  return typeof el === "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
  if (els.length === 1 && isLiteralElement(els[0])) {
    return [
      {
        type: PART_TYPE.literal,
        value: els[0].value
      }
    ];
  }
  var result = [];
  for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
    var el = els_1[_i];
    if (isLiteralElement(el)) {
      result.push({
        type: PART_TYPE.literal,
        value: el.value
      });
      continue;
    }
    if (isPoundElement(el)) {
      if (typeof currentPluralValue === "number") {
        result.push({
          type: PART_TYPE.literal,
          value: formatters.getNumberFormat(locales).format(currentPluralValue)
        });
      }
      continue;
    }
    var varName = el.value;
    if (!(values && varName in values)) {
      throw new MissingValueError(varName, originalMessage);
    }
    var value = values[varName];
    if (isArgumentElement(el)) {
      if (!value || typeof value === "string" || typeof value === "number") {
        value = typeof value === "string" || typeof value === "number" ? String(value) : "";
      }
      result.push({
        type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
        value
      });
      continue;
    }
    if (isDateElement(el)) {
      var style2 = typeof el.style === "string" ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style2).format(value)
      });
      continue;
    }
    if (isTimeElement(el)) {
      var style2 = typeof el.style === "string" ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : formats.time.medium;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style2).format(value)
      });
      continue;
    }
    if (isNumberElement(el)) {
      var style2 = typeof el.style === "string" ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : void 0;
      if (style2 && style2.scale) {
        value = value * (style2.scale || 1);
      }
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getNumberFormat(locales, style2).format(value)
      });
      continue;
    }
    if (isTagElement(el)) {
      var children = el.children, value_1 = el.value;
      var formatFn = values[value_1];
      if (!isFormatXMLElementFn(formatFn)) {
        throw new InvalidValueTypeError(value_1, "function", originalMessage);
      }
      var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
      var chunks = formatFn(parts.map(function(p2) {
        return p2.value;
      }));
      if (!Array.isArray(chunks)) {
        chunks = [chunks];
      }
      result.push.apply(result, chunks.map(function(c) {
        return {
          type: typeof c === "string" ? PART_TYPE.literal : PART_TYPE.object,
          value: c
        };
      }));
    }
    if (isSelectElement(el)) {
      var opt = el.options[value] || el.options.other;
      if (!opt) {
        throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      }
      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
      continue;
    }
    if (isPluralElement(el)) {
      var opt = el.options["=".concat(value)];
      if (!opt) {
        if (!Intl.PluralRules) {
          throw new FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', ErrorCode.MISSING_INTL_API, originalMessage);
        }
        var rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(value - (el.offset || 0));
        opt = el.options[rule] || el.options.other;
      }
      if (!opt) {
        throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      }
      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
      continue;
    }
  }
  return mergeLiteral(result);
}
function mergeConfig(c1, c2) {
  if (!c2) {
    return c1;
  }
  return __assign$1(__assign$1(__assign$1({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function(all, k2) {
    all[k2] = __assign$1(__assign$1({}, c1[k2]), c2[k2] || {});
    return all;
  }, {}));
}
function mergeConfigs(defaultConfig, configs) {
  if (!configs) {
    return defaultConfig;
  }
  return Object.keys(defaultConfig).reduce(function(all, k2) {
    all[k2] = mergeConfig(defaultConfig[k2], configs[k2]);
    return all;
  }, __assign$1({}, defaultConfig));
}
function createFastMemoizeCache(store) {
  return {
    create: function() {
      return {
        get: function(key) {
          return store[key];
        },
        set: function(key, value) {
          store[key] = value;
        }
      };
    }
  };
}
function createDefaultFormatters(cache) {
  if (cache === void 0) {
    cache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
  }
  return {
    getNumberFormat: memoize(function() {
      var _a2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a2 = Intl.NumberFormat).bind.apply(_a2, __spreadArray([void 0], args, false)))();
    }, {
      cache: createFastMemoizeCache(cache.number),
      strategy: strategies.variadic
    }),
    getDateTimeFormat: memoize(function() {
      var _a2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a2 = Intl.DateTimeFormat).bind.apply(_a2, __spreadArray([void 0], args, false)))();
    }, {
      cache: createFastMemoizeCache(cache.dateTime),
      strategy: strategies.variadic
    }),
    getPluralRules: memoize(function() {
      var _a2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a2 = Intl.PluralRules).bind.apply(_a2, __spreadArray([void 0], args, false)))();
    }, {
      cache: createFastMemoizeCache(cache.pluralRules),
      strategy: strategies.variadic
    })
  };
}
var IntlMessageFormat = function() {
  function IntlMessageFormat2(message, locales, overrideFormats, opts) {
    var _this = this;
    if (locales === void 0) {
      locales = IntlMessageFormat2.defaultLocale;
    }
    this.formatterCache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
    this.format = function(values) {
      var parts = _this.formatToParts(values);
      if (parts.length === 1) {
        return parts[0].value;
      }
      var result = parts.reduce(function(all, part) {
        if (!all.length || part.type !== PART_TYPE.literal || typeof all[all.length - 1] !== "string") {
          all.push(part.value);
        } else {
          all[all.length - 1] += part.value;
        }
        return all;
      }, []);
      if (result.length <= 1) {
        return result[0] || "";
      }
      return result;
    };
    this.formatToParts = function(values) {
      return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
    };
    this.resolvedOptions = function() {
      return {
        locale: _this.resolvedLocale.toString()
      };
    };
    this.getAst = function() {
      return _this.ast;
    };
    this.locales = locales;
    this.resolvedLocale = IntlMessageFormat2.resolveLocale(locales);
    if (typeof message === "string") {
      this.message = message;
      if (!IntlMessageFormat2.__parse) {
        throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
      }
      this.ast = IntlMessageFormat2.__parse(message, {
        ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag,
        locale: this.resolvedLocale
      });
    } else {
      this.ast = message;
    }
    if (!Array.isArray(this.ast)) {
      throw new TypeError("A message must be provided as a String or AST.");
    }
    this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats);
    this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
  }
  Object.defineProperty(IntlMessageFormat2, "defaultLocale", {
    get: function() {
      if (!IntlMessageFormat2.memoizedDefaultLocale) {
        IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
      }
      return IntlMessageFormat2.memoizedDefaultLocale;
    },
    enumerable: false,
    configurable: true
  });
  IntlMessageFormat2.memoizedDefaultLocale = null;
  IntlMessageFormat2.resolveLocale = function(locales) {
    var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
    if (supportedLocales.length > 0) {
      return new Intl.Locale(supportedLocales[0]);
    }
    return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
  };
  IntlMessageFormat2.__parse = parse;
  IntlMessageFormat2.formats = {
    number: {
      integer: {
        maximumFractionDigits: 0
      },
      currency: {
        style: "currency"
      },
      percent: {
        style: "percent"
      }
    },
    date: {
      short: {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      },
      medium: {
        month: "short",
        day: "numeric",
        year: "numeric"
      },
      long: {
        month: "long",
        day: "numeric",
        year: "numeric"
      },
      full: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    },
    time: {
      short: {
        hour: "numeric",
        minute: "numeric"
      },
      medium: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      },
      long: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      },
      full: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      }
    }
  };
  return IntlMessageFormat2;
}();
var $1DoQa$intlmessageformat = IntlMessageFormat;
function $parcel$export$b(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $d6fd23bc337660df$exports = {};
$parcel$export$b($d6fd23bc337660df$exports, "MessageDictionary", () => $d6fd23bc337660df$export$64839e615120df17);
class $d6fd23bc337660df$export$64839e615120df17 {
  getStringForLocale(key, locale) {
    let strings = this.messages[locale];
    if (!strings) {
      strings = $d6fd23bc337660df$var$getStringsForLocale(locale, this.messages, this.defaultLocale);
      this.messages[locale] = strings;
    }
    let string = strings[key];
    if (!string)
      throw new Error(`Could not find intl message ${key} in ${locale} locale`);
    return string;
  }
  constructor(messages, defaultLocale = "en-US") {
    this.messages = {
      ...messages
    };
    this.defaultLocale = defaultLocale;
  }
}
function $d6fd23bc337660df$var$getStringsForLocale(locale, strings, defaultLocale = "en-US") {
  if (strings[locale])
    return strings[locale];
  let language = $d6fd23bc337660df$var$getLanguage(locale);
  if (strings[language])
    return strings[language];
  for (let key in strings) {
    if (key.startsWith(language + "-"))
      return strings[key];
  }
  return strings[defaultLocale];
}
function $d6fd23bc337660df$var$getLanguage(locale) {
  if (Intl.Locale)
    return new Intl.Locale(locale).language;
  return locale.split("-")[0];
}
var $972eb555d604f491$exports = {};
$parcel$export$b($972eb555d604f491$exports, "MessageFormatter", () => $972eb555d604f491$export$526ebc05ff964723);
class $972eb555d604f491$export$526ebc05ff964723 {
  format(key, variables) {
    let message = this.cache[key];
    if (!message) {
      let msg = this.messages.getStringForLocale(key, this.locale);
      if (!msg)
        throw new Error(`Could not find intl message ${key} in ${this.locale} locale`);
      message = new $1DoQa$intlmessageformat(msg, this.locale);
      this.cache[key] = message;
    }
    let varCopy;
    if (variables)
      varCopy = Object.keys(variables).reduce((acc, key2) => {
        acc[key2] = variables[key2] == null ? false : variables[key2];
        return acc;
      }, {});
    return message.format(varCopy);
  }
  constructor(locale, messages) {
    this.locale = locale;
    this.messages = messages;
    this.cache = {};
  }
}
let $fb18d541ea1ad717$var$formatterCache = /* @__PURE__ */ new Map();
class $fb18d541ea1ad717$export$ad991b66133851cf {
  format(value) {
    return this.formatter.format(value);
  }
  formatToParts(value) {
    return this.formatter.formatToParts(value);
  }
  formatRange(start, end) {
    if (typeof this.formatter.formatRange === "function")
      return this.formatter.formatRange(start, end);
    if (end < start)
      throw new RangeError("End date must be >= start date");
    return `${this.formatter.format(start)} \u2013 ${this.formatter.format(end)}`;
  }
  formatRangeToParts(start, end) {
    if (typeof this.formatter.formatRangeToParts === "function")
      return this.formatter.formatRangeToParts(start, end);
    if (end < start)
      throw new RangeError("End date must be >= start date");
    let startParts = this.formatter.formatToParts(start);
    let endParts = this.formatter.formatToParts(end);
    return [
      ...startParts.map((p2) => ({
        ...p2,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " \u2013 ",
        source: "shared"
      },
      ...endParts.map((p2) => ({
        ...p2,
        source: "endRange"
      }))
    ];
  }
  resolvedOptions() {
    let resolvedOptions = this.formatter.resolvedOptions();
    if ($fb18d541ea1ad717$var$hasBuggyResolvedHourCycle()) {
      if (!this.resolvedHourCycle)
        this.resolvedHourCycle = $fb18d541ea1ad717$var$getResolvedHourCycle(resolvedOptions.locale, this.options);
      resolvedOptions.hourCycle = this.resolvedHourCycle;
      resolvedOptions.hour12 = this.resolvedHourCycle === "h11" || this.resolvedHourCycle === "h12";
    }
    if (resolvedOptions.calendar === "ethiopic-amete-alem")
      resolvedOptions.calendar = "ethioaa";
    return resolvedOptions;
  }
  constructor(locale, options = {}) {
    this.formatter = $fb18d541ea1ad717$var$getCachedDateFormatter(locale, options);
    this.options = options;
  }
}
const $fb18d541ea1ad717$var$hour12Preferences = {
  true: {
    ja: "h11"
  },
  false: {}
};
function $fb18d541ea1ad717$var$getCachedDateFormatter(locale, options = {}) {
  if (typeof options.hour12 === "boolean" && $fb18d541ea1ad717$var$hasBuggyHour12Behavior()) {
    options = {
      ...options
    };
    let pref = $fb18d541ea1ad717$var$hour12Preferences[String(options.hour12)][locale.split("-")[0]];
    let defaultHourCycle = options.hour12 ? "h12" : "h23";
    options.hourCycle = pref !== null && pref !== void 0 ? pref : defaultHourCycle;
    delete options.hour12;
  }
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if ($fb18d541ea1ad717$var$formatterCache.has(cacheKey))
    return $fb18d541ea1ad717$var$formatterCache.get(cacheKey);
  let numberFormatter = new Intl.DateTimeFormat(locale, options);
  $fb18d541ea1ad717$var$formatterCache.set(cacheKey, numberFormatter);
  return numberFormatter;
}
let $fb18d541ea1ad717$var$_hasBuggyHour12Behavior = null;
function $fb18d541ea1ad717$var$hasBuggyHour12Behavior() {
  if ($fb18d541ea1ad717$var$_hasBuggyHour12Behavior == null)
    $fb18d541ea1ad717$var$_hasBuggyHour12Behavior = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false
    }).format(new Date(2020, 2, 3, 0)) === "24";
  return $fb18d541ea1ad717$var$_hasBuggyHour12Behavior;
}
let $fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle = null;
function $fb18d541ea1ad717$var$hasBuggyResolvedHourCycle() {
  if ($fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle == null)
    $fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle = new Intl.DateTimeFormat("fr", {
      hour: "numeric",
      hour12: false
    }).resolvedOptions().hourCycle === "h12";
  return $fb18d541ea1ad717$var$_hasBuggyResolvedHourCycle;
}
function $fb18d541ea1ad717$var$getResolvedHourCycle(locale, options) {
  if (!options.timeStyle && !options.hour)
    return void 0;
  locale = locale.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, "");
  locale += (locale.includes("-u-") ? "" : "-u") + "-nu-latn";
  let formatter = $fb18d541ea1ad717$var$getCachedDateFormatter(locale, {
    ...options,
    timeZone: void 0
  });
  let min = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 0)).find((p2) => p2.type === "hour").value, 10);
  let max = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 23)).find((p2) => p2.type === "hour").value, 10);
  if (min === 0 && max === 23)
    return "h23";
  if (min === 24 && max === 23)
    return "h24";
  if (min === 0 && max === 11)
    return "h11";
  if (min === 12 && max === 11)
    return "h12";
  throw new Error("Unexpected hour cycle result");
}
let $488c6ddbf4ef74c2$var$formatterCache = /* @__PURE__ */ new Map();
let $488c6ddbf4ef74c2$var$supportsSignDisplay = false;
try {
  $488c6ddbf4ef74c2$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", {
    signDisplay: "exceptZero"
  }).resolvedOptions().signDisplay === "exceptZero";
} catch (e) {
}
let $488c6ddbf4ef74c2$var$supportsUnit = false;
try {
  $488c6ddbf4ef74c2$var$supportsUnit = new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "degree"
  }).resolvedOptions().style === "unit";
} catch (e1) {
}
const $488c6ddbf4ef74c2$var$UNITS = {
  degree: {
    narrow: {
      default: "\xB0",
      "ja-JP": " \u5EA6",
      "zh-TW": "\u5EA6",
      "sl-SI": " \xB0"
    }
  }
};
class $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5 {
  format(value) {
    let res = "";
    if (!$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null)
      res = $488c6ddbf4ef74c2$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
    else
      res = this.numberFormatter.format(value);
    if (this.options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
      var ref;
      let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
      let values = (ref = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || ref === void 0 ? void 0 : ref[unitDisplay];
      res += values[locale] || values.default;
    }
    return res;
  }
  formatToParts(value) {
    return this.numberFormatter.formatToParts(value);
  }
  formatRange(start, end) {
    if (typeof this.numberFormatter.formatRange === "function")
      return this.numberFormatter.formatRange(start, end);
    if (end < start)
      throw new RangeError("End date must be >= start date");
    return `${this.format(start)} \u2013 ${this.format(end)}`;
  }
  formatRangeToParts(start, end) {
    if (typeof this.numberFormatter.formatRangeToParts === "function")
      return this.numberFormatter.formatRangeToParts(start, end);
    if (end < start)
      throw new RangeError("End date must be >= start date");
    let startParts = this.numberFormatter.formatToParts(start);
    let endParts = this.numberFormatter.formatToParts(end);
    return [
      ...startParts.map((p2) => ({
        ...p2,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " \u2013 ",
        source: "shared"
      },
      ...endParts.map((p2) => ({
        ...p2,
        source: "endRange"
      }))
    ];
  }
  resolvedOptions() {
    let options = this.numberFormatter.resolvedOptions();
    if (!$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null)
      options = {
        ...options,
        signDisplay: this.options.signDisplay
      };
    if (!$488c6ddbf4ef74c2$var$supportsUnit && this.options.style === "unit")
      options = {
        ...options,
        style: "unit",
        unit: this.options.unit,
        unitDisplay: this.options.unitDisplay
      };
    return options;
  }
  constructor(locale, options = {}) {
    this.numberFormatter = $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options);
    this.options = options;
  }
}
function $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options = {}) {
  let { numberingSystem } = options;
  if (numberingSystem && locale.indexOf("-u-nu-") === -1)
    locale = `${locale}-u-nu-${numberingSystem}`;
  if (options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
    var ref;
    let { unit, unitDisplay = "short" } = options;
    if (!unit)
      throw new Error('unit option must be provided with style: "unit"');
    if (!((ref = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || ref === void 0 ? void 0 : ref[unitDisplay]))
      throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
    options = {
      ...options,
      style: "decimal"
    };
  }
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if ($488c6ddbf4ef74c2$var$formatterCache.has(cacheKey))
    return $488c6ddbf4ef74c2$var$formatterCache.get(cacheKey);
  let numberFormatter = new Intl.NumberFormat(locale, options);
  $488c6ddbf4ef74c2$var$formatterCache.set(cacheKey, numberFormatter);
  return numberFormatter;
}
function $488c6ddbf4ef74c2$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
  if (signDisplay === "auto")
    return numberFormat.format(num);
  else if (signDisplay === "never")
    return numberFormat.format(Math.abs(num));
  else {
    let needsPositiveSign = false;
    if (signDisplay === "always")
      needsPositiveSign = num > 0 || Object.is(num, 0);
    else if (signDisplay === "exceptZero") {
      if (Object.is(num, -0) || Object.is(num, 0))
        num = Math.abs(num);
      else
        needsPositiveSign = num > 0;
    }
    if (needsPositiveSign) {
      let negative = numberFormat.format(-num);
      let noSign = numberFormat.format(num);
      let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
      if ([
        ...minus
      ].length !== 1)
        console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
      let positive = negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
      return positive;
    } else
      return numberFormat.format(num);
  }
}
function $parcel$export$a(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $18f2051aff69b9bf$exports = {};
$parcel$export$a($18f2051aff69b9bf$exports, "I18nProvider", () => $18f2051aff69b9bf$export$a54013f0d02a8f82);
$parcel$export$a($18f2051aff69b9bf$exports, "useLocale", () => $18f2051aff69b9bf$export$43bb16f9c6d9e3f7);
const $148a7a147e38ea7f$var$RTL_SCRIPTS = /* @__PURE__ */ new Set([
  "Arab",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr"
]);
const $148a7a147e38ea7f$var$RTL_LANGS = /* @__PURE__ */ new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi"
]);
function $148a7a147e38ea7f$export$702d680b21cbd764(locale) {
  if (Intl.Locale) {
    let script = new Intl.Locale(locale).maximize().script;
    return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(script);
  }
  let lang = locale.split("-")[0];
  return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}
function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
  let locale = typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([
      locale
    ]);
  } catch (_err) {
    locale = "en-US";
  }
  return {
    locale,
    direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
  };
}
let $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
let $1e5a04cdaf7d1af8$var$listeners = /* @__PURE__ */ new Set();
function $1e5a04cdaf7d1af8$var$updateLocale() {
  $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
  for (let listener of $1e5a04cdaf7d1af8$var$listeners)
    listener($1e5a04cdaf7d1af8$var$currentLocale);
}
function $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a() {
  let isSSR = $704cf1d3b684cc5c$export$535bd6ca7f90a273();
  let [defaultLocale, setDefaultLocale] = useState($1e5a04cdaf7d1af8$var$currentLocale);
  useEffect(() => {
    if ($1e5a04cdaf7d1af8$var$listeners.size === 0)
      window.addEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    $1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale);
    return () => {
      $1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale);
      if ($1e5a04cdaf7d1af8$var$listeners.size === 0)
        window.removeEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
    };
  }, []);
  if (isSSR)
    return {
      locale: "en-US",
      direction: "ltr"
    };
  return defaultLocale;
}
const $18f2051aff69b9bf$var$I18nContext = /* @__PURE__ */ $5lsDl$react.createContext(null);
function $18f2051aff69b9bf$export$a54013f0d02a8f82(props) {
  let { locale, children } = props;
  let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
  let value = locale ? {
    locale,
    direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
  } : defaultLocale;
  return /* @__PURE__ */ $5lsDl$react.createElement($18f2051aff69b9bf$var$I18nContext.Provider, {
    value
  }, children);
}
function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7() {
  let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
  let context = useContext($18f2051aff69b9bf$var$I18nContext);
  return context || defaultLocale;
}
var $321bc95feeb923dd$exports = {};
$parcel$export$a($321bc95feeb923dd$exports, "useMessageFormatter", () => $321bc95feeb923dd$export$ec23bf898b1eed85);
const $321bc95feeb923dd$var$cache = /* @__PURE__ */ new WeakMap();
function $321bc95feeb923dd$var$getCachedDictionary(strings) {
  let dictionary = $321bc95feeb923dd$var$cache.get(strings);
  if (!dictionary) {
    dictionary = new $d6fd23bc337660df$export$64839e615120df17(strings);
    $321bc95feeb923dd$var$cache.set(strings, dictionary);
  }
  return dictionary;
}
function $321bc95feeb923dd$export$ec23bf898b1eed85(strings) {
  let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let dictionary = useMemo(() => $321bc95feeb923dd$var$getCachedDictionary(strings), [
    strings
  ]);
  let formatter = useMemo(() => new $972eb555d604f491$export$526ebc05ff964723(locale, dictionary), [
    locale,
    dictionary
  ]);
  return useCallback((key, variables) => formatter.format(key, variables), [
    formatter
  ]);
}
var $896ba0a80a8f4d36$exports = {};
$parcel$export$a($896ba0a80a8f4d36$exports, "useDateFormatter", () => $896ba0a80a8f4d36$export$85fd5fdf27bacc79);
function $896ba0a80a8f4d36$export$85fd5fdf27bacc79(options) {
  let lastOptions = useRef(null);
  if (options && lastOptions.current && $896ba0a80a8f4d36$var$isEqual(options, lastOptions.current))
    options = lastOptions.current;
  lastOptions.current = options;
  let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  return useMemo(() => new $fb18d541ea1ad717$export$ad991b66133851cf(locale, options), [
    locale,
    options
  ]);
}
function $896ba0a80a8f4d36$var$isEqual(a, b) {
  if (a === b)
    return true;
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length)
    return false;
  for (let key of aKeys) {
    if (b[key] !== a[key])
      return false;
  }
  return true;
}
var $a916eb452884faea$exports = {};
$parcel$export$a($a916eb452884faea$exports, "useNumberFormatter", () => $a916eb452884faea$export$b7a616150fdb9f44);
function $a916eb452884faea$export$b7a616150fdb9f44(options = {}) {
  let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  return useMemo(() => new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(locale, options), [
    locale,
    options
  ]);
}
var $325a3faab7a68acd$exports = {};
$parcel$export$a($325a3faab7a68acd$exports, "useCollator", () => $325a3faab7a68acd$export$a16aca283550c30d);
let $325a3faab7a68acd$var$cache = /* @__PURE__ */ new Map();
function $325a3faab7a68acd$export$a16aca283550c30d(options) {
  let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if ($325a3faab7a68acd$var$cache.has(cacheKey))
    return $325a3faab7a68acd$var$cache.get(cacheKey);
  let formatter = new Intl.Collator(locale, options);
  $325a3faab7a68acd$var$cache.set(cacheKey, formatter);
  return formatter;
}
var $bb77f239b46e8c72$exports = {};
$parcel$export$a($bb77f239b46e8c72$exports, "useFilter", () => $bb77f239b46e8c72$export$3274cf84b703fff);
function $bb77f239b46e8c72$export$3274cf84b703fff(options) {
  let collator = $325a3faab7a68acd$export$a16aca283550c30d({
    usage: "search",
    ...options
  });
  return {
    startsWith(string, substring) {
      if (substring.length === 0)
        return true;
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(0, substring.length), substring) === 0;
    },
    endsWith(string, substring) {
      if (substring.length === 0)
        return true;
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(-substring.length), substring) === 0;
    },
    contains(string, substring) {
      if (substring.length === 0)
        return true;
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      let scan = 0;
      let sliceLen = substring.length;
      for (; scan + sliceLen <= string.length; scan++) {
        let slice = string.slice(scan, scan + sliceLen);
        if (collator.compare(substring, slice) === 0)
          return true;
      }
      return false;
    }
  };
}
function $parcel$export$9(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $458b0a5536c1a7cf$exports = {};
$parcel$export$9($458b0a5536c1a7cf$exports, "useControlledState", () => $458b0a5536c1a7cf$export$40bfa8c7b0832715);
function $458b0a5536c1a7cf$export$40bfa8c7b0832715(value1, defaultValue, onChange) {
  let [stateValue, setStateValue] = useState(value1 || defaultValue);
  let ref = useRef(value1 !== void 0);
  let wasControlled = ref.current;
  let isControlled = value1 !== void 0;
  let stateRef = useRef(stateValue);
  if (wasControlled !== isControlled)
    console.warn(`WARN: A component changed from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}.`);
  ref.current = isControlled;
  let setValue = useCallback((value2, ...args) => {
    let onChangeCaller = (value, ...onChangeArgs) => {
      if (onChange) {
        if (!Object.is(stateRef.current, value))
          onChange(value, ...onChangeArgs);
      }
      if (!isControlled)
        stateRef.current = value;
    };
    if (typeof value2 === "function") {
      console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320");
      let updateFunction = (oldValue, ...functionArgs) => {
        let interceptedValue = value2(isControlled ? stateRef.current : oldValue, ...functionArgs);
        onChangeCaller(interceptedValue, ...args);
        if (!isControlled)
          return interceptedValue;
        return oldValue;
      };
      setStateValue(updateFunction);
    } else {
      if (!isControlled)
        setStateValue(value2);
      onChangeCaller(value2, ...args);
    }
  }, [
    isControlled,
    onChange
  ]);
  if (isControlled)
    stateRef.current = value1;
  else
    value1 = stateValue;
  return [
    value1,
    setValue
  ];
}
var $9446cca9a3875146$exports = {};
$parcel$export$9($9446cca9a3875146$exports, "clamp", () => $9446cca9a3875146$export$7d15b64cf5a3a4c4);
$parcel$export$9($9446cca9a3875146$exports, "snapValueToStep", () => $9446cca9a3875146$export$cb6e0bb50bc19463);
$parcel$export$9($9446cca9a3875146$exports, "toFixedNumber", () => $9446cca9a3875146$export$b6268554fba451f);
function $9446cca9a3875146$export$7d15b64cf5a3a4c4(value, min = -Infinity, max = Infinity) {
  let newValue = Math.min(Math.max(value, min), max);
  return newValue;
}
function $9446cca9a3875146$export$cb6e0bb50bc19463(value, min, max, step) {
  let remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!isNaN(min)) {
    if (snappedValue < min)
      snappedValue = min;
    else if (!isNaN(max) && snappedValue > max)
      snappedValue = min + Math.floor((max - min) / step) * step;
  } else if (!isNaN(max) && snappedValue > max)
    snappedValue = Math.floor(max / step) * step;
  let string = step.toString();
  let index = string.indexOf(".");
  let precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    let pow = Math.pow(10, precision);
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
function $9446cca9a3875146$export$b6268554fba451f(value, digits, base = 10) {
  const pow = Math.pow(base, digits);
  return Math.round(value * pow) / pow;
}
function $parcel$export$8(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $bdb11010cef70236$exports = {};
$parcel$export$8($bdb11010cef70236$exports, "useId", () => $bdb11010cef70236$export$f680877a34711e37);
$parcel$export$8($bdb11010cef70236$exports, "mergeIds", () => $bdb11010cef70236$export$cd8c9cb68f842629);
$parcel$export$8($bdb11010cef70236$exports, "useSlotId", () => $bdb11010cef70236$export$b4cc09c592e8fdb8);
var $f0a04ccd8dbdd83b$exports = {};
$parcel$export$8($f0a04ccd8dbdd83b$exports, "useLayoutEffect", () => $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c);
const $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof window !== "undefined" ? $5lsDl$react.useLayoutEffect : () => {
};
let $bdb11010cef70236$var$idsUpdaterMap = /* @__PURE__ */ new Map();
function $bdb11010cef70236$export$f680877a34711e37(defaultId) {
  let [value, setValue] = useState(defaultId);
  let nextId = useRef(null);
  let res = $704cf1d3b684cc5c$export$619500959fc48b26(value);
  let updateValue = useCallback((val) => {
    nextId.current = val;
  }, []);
  $bdb11010cef70236$var$idsUpdaterMap.set(res, updateValue);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    let r2 = res;
    return () => {
      $bdb11010cef70236$var$idsUpdaterMap.delete(r2);
    };
  }, [
    res
  ]);
  useEffect(() => {
    let newId = nextId.current;
    if (newId) {
      nextId.current = null;
      setValue(newId);
    }
  });
  return res;
}
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
  if (idA === idB)
    return idA;
  let setIdA = $bdb11010cef70236$var$idsUpdaterMap.get(idA);
  if (setIdA) {
    setIdA(idB);
    return idB;
  }
  let setIdB = $bdb11010cef70236$var$idsUpdaterMap.get(idB);
  if (setIdB) {
    setIdB(idA);
    return idA;
  }
  return idB;
}
function $bdb11010cef70236$export$b4cc09c592e8fdb8(depArray = []) {
  let id = $bdb11010cef70236$export$f680877a34711e37();
  let [resolvedId, setResolvedId] = $1dbecbe27a04f9af$export$14d238f342723f25(id);
  let updateId = useCallback(() => {
    setResolvedId(function* () {
      yield id;
      yield document.getElementById(id) ? id : null;
    });
  }, [
    id,
    setResolvedId
  ]);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(updateId, [
    id,
    updateId,
    ...depArray
  ]);
  return resolvedId;
}
var $ff5963eb1fccf552$exports = {};
$parcel$export$8($ff5963eb1fccf552$exports, "chain", () => $ff5963eb1fccf552$export$e08e3b67e392101e);
function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
  return (...args) => {
    for (let callback of callbacks)
      if (typeof callback === "function")
        callback(...args);
  };
}
var $3ef42575df84b30b$exports = {};
$parcel$export$8($3ef42575df84b30b$exports, "mergeProps", () => $3ef42575df84b30b$export$9d1611c77c2fe928);
function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
  let result = {
    ...args[0]
  };
  for (let i = 1; i < args.length; i++) {
    let props = args[i];
    for (let key in props) {
      let a = result[key];
      let b = props[key];
      if (typeof a === "function" && typeof b === "function" && key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= 65 && key.charCodeAt(2) <= 90)
        result[key] = $ff5963eb1fccf552$export$e08e3b67e392101e(a, b);
      else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string")
        result[key] = clsx(a, b);
      else if (key === "id" && a && b)
        result.id = $bdb11010cef70236$export$cd8c9cb68f842629(a, b);
      else
        result[key] = b !== void 0 ? b : a;
    }
  }
  return result;
}
var $5dc95899b306f630$exports = {};
$parcel$export$8($5dc95899b306f630$exports, "mergeRefs", () => $5dc95899b306f630$export$c9058316764c140e);
function $5dc95899b306f630$export$c9058316764c140e(...refs) {
  return (value) => {
    for (let ref of refs) {
      if (typeof ref === "function")
        ref(value);
      else if (ref != null)
        ref.current = value;
    }
  };
}
var $65484d02dcb7eb3e$exports = {};
$parcel$export$8($65484d02dcb7eb3e$exports, "filterDOMProps", () => $65484d02dcb7eb3e$export$457c3d6518dd4c6f);
const $65484d02dcb7eb3e$var$DOMPropNames = /* @__PURE__ */ new Set([
  "id"
]);
const $65484d02dcb7eb3e$var$labelablePropNames = /* @__PURE__ */ new Set([
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-details"
]);
const $65484d02dcb7eb3e$var$propRe = /^(data-.*)$/;
function $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, opts = {}) {
  let { labelable, propNames } = opts;
  let filteredProps = {};
  for (const prop in props)
    if (Object.prototype.hasOwnProperty.call(props, prop) && ($65484d02dcb7eb3e$var$DOMPropNames.has(prop) || labelable && $65484d02dcb7eb3e$var$labelablePropNames.has(prop) || (propNames === null || propNames === void 0 ? void 0 : propNames.has(prop)) || $65484d02dcb7eb3e$var$propRe.test(prop)))
      filteredProps[prop] = props[prop];
  return filteredProps;
}
var $7215afc6de606d6b$exports = {};
$parcel$export$8($7215afc6de606d6b$exports, "focusWithoutScrolling", () => $7215afc6de606d6b$export$de79e2c695e052f3);
function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
  if ($7215afc6de606d6b$var$supportsPreventScroll())
    element.focus({
      preventScroll: true
    });
  else {
    let scrollableElements = $7215afc6de606d6b$var$getScrollableElements(element);
    element.focus();
    $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
  }
}
let $7215afc6de606d6b$var$supportsPreventScrollCached = null;
function $7215afc6de606d6b$var$supportsPreventScroll() {
  if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
    $7215afc6de606d6b$var$supportsPreventScrollCached = false;
    try {
      var focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          $7215afc6de606d6b$var$supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch (e) {
    }
  }
  return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
  var parent = element.parentNode;
  var scrollableElements = [];
  var rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth)
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement)
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  return scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
  for (let { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}
var $ab71dadb03a6fb2e$exports = {};
$parcel$export$8($ab71dadb03a6fb2e$exports, "getOffset", () => $ab71dadb03a6fb2e$export$622cea445a1c5b7d);
function $ab71dadb03a6fb2e$export$622cea445a1c5b7d(element, reverse, orientation = "horizontal") {
  let rect = element.getBoundingClientRect();
  if (reverse)
    return orientation === "horizontal" ? rect.right : rect.bottom;
  return orientation === "horizontal" ? rect.left : rect.top;
}
var $103b0e103f1b5952$exports = {};
$parcel$export$8($103b0e103f1b5952$exports, "clamp", () => $9446cca9a3875146$export$7d15b64cf5a3a4c4);
$parcel$export$8($103b0e103f1b5952$exports, "snapValueToStep", () => $9446cca9a3875146$export$cb6e0bb50bc19463);
var $bbed8b41f857bcc0$exports = {};
$parcel$export$8($bbed8b41f857bcc0$exports, "runAfterTransition", () => $bbed8b41f857bcc0$export$24490316f764c430);
let $bbed8b41f857bcc0$var$transitionsByElement = /* @__PURE__ */ new Map();
let $bbed8b41f857bcc0$var$transitionCallbacks = /* @__PURE__ */ new Set();
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
  if (typeof window === "undefined")
    return;
  let onTransitionStart = (e) => {
    let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
    if (!transitions) {
      transitions = /* @__PURE__ */ new Set();
      $bbed8b41f857bcc0$var$transitionsByElement.set(e.target, transitions);
      e.target.addEventListener("transitioncancel", onTransitionEnd);
    }
    transitions.add(e.propertyName);
  };
  let onTransitionEnd = (e) => {
    let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
    if (!properties)
      return;
    properties.delete(e.propertyName);
    if (properties.size === 0) {
      e.target.removeEventListener("transitioncancel", onTransitionEnd);
      $bbed8b41f857bcc0$var$transitionsByElement.delete(e.target);
    }
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) {
      for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks)
        cb();
      $bbed8b41f857bcc0$var$transitionCallbacks.clear();
    }
  };
  document.body.addEventListener("transitionrun", onTransitionStart);
  document.body.addEventListener("transitionend", onTransitionEnd);
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading")
    $bbed8b41f857bcc0$var$setupGlobalEvents();
  else
    document.addEventListener("DOMContentLoaded", $bbed8b41f857bcc0$var$setupGlobalEvents);
}
function $bbed8b41f857bcc0$export$24490316f764c430(fn) {
  requestAnimationFrame(() => {
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0)
      fn();
    else
      $bbed8b41f857bcc0$var$transitionCallbacks.add(fn);
  });
}
var $9cc09df9fd7676be$exports = {};
$parcel$export$8($9cc09df9fd7676be$exports, "useDrag1D", () => $9cc09df9fd7676be$export$7bbed75feba39706);
const $9cc09df9fd7676be$var$draggingElements = [];
function $9cc09df9fd7676be$export$7bbed75feba39706(props) {
  console.warn("useDrag1D is deprecated, please use `useMove` instead https://react-spectrum.adobe.com/react-aria/useMove.html");
  let { containerRef, reverse, orientation, onHover, onDrag, onPositionChange, onIncrement, onDecrement, onIncrementToMax, onDecrementToMin, onCollapseToggle } = props;
  let getPosition = (e) => orientation === "horizontal" ? e.clientX : e.clientY;
  let getNextOffset = (e) => {
    let containerOffset = $ab71dadb03a6fb2e$export$622cea445a1c5b7d(containerRef.current, reverse, orientation);
    let mouseOffset = getPosition(e);
    let nextOffset = reverse ? containerOffset - mouseOffset : mouseOffset - containerOffset;
    return nextOffset;
  };
  let dragging = useRef(false);
  let prevPosition = useRef(0);
  let handlers = useRef({
    onPositionChange,
    onDrag
  });
  handlers.current.onDrag = onDrag;
  handlers.current.onPositionChange = onPositionChange;
  let onMouseDragged = (e) => {
    e.preventDefault();
    let nextOffset = getNextOffset(e);
    if (!dragging.current) {
      dragging.current = true;
      if (handlers.current.onDrag)
        handlers.current.onDrag(true);
      if (handlers.current.onPositionChange)
        handlers.current.onPositionChange(nextOffset);
    }
    if (prevPosition.current === nextOffset)
      return;
    prevPosition.current = nextOffset;
    if (onPositionChange)
      onPositionChange(nextOffset);
  };
  let onMouseUp = (e) => {
    const target = e.target;
    dragging.current = false;
    let nextOffset = getNextOffset(e);
    if (handlers.current.onDrag)
      handlers.current.onDrag(false);
    if (handlers.current.onPositionChange)
      handlers.current.onPositionChange(nextOffset);
    $9cc09df9fd7676be$var$draggingElements.splice($9cc09df9fd7676be$var$draggingElements.indexOf(target), 1);
    window.removeEventListener("mouseup", onMouseUp, false);
    window.removeEventListener("mousemove", onMouseDragged, false);
  };
  let onMouseDown = (e) => {
    const target = e.currentTarget;
    if ($9cc09df9fd7676be$var$draggingElements.some((elt) => target.contains(elt)))
      return;
    $9cc09df9fd7676be$var$draggingElements.push(target);
    window.addEventListener("mousemove", onMouseDragged, false);
    window.addEventListener("mouseup", onMouseUp, false);
  };
  let onMouseEnter = () => {
    if (onHover)
      onHover(true);
  };
  let onMouseOut = () => {
    if (onHover)
      onHover(false);
  };
  let onKeyDown = (e) => {
    switch (e.key) {
      case "Left":
      case "ArrowLeft":
        if (orientation === "horizontal") {
          e.preventDefault();
          if (onDecrement && !reverse)
            onDecrement();
          else if (onIncrement && reverse)
            onIncrement();
        }
        break;
      case "Up":
      case "ArrowUp":
        if (orientation === "vertical") {
          e.preventDefault();
          if (onDecrement && !reverse)
            onDecrement();
          else if (onIncrement && reverse)
            onIncrement();
        }
        break;
      case "Right":
      case "ArrowRight":
        if (orientation === "horizontal") {
          e.preventDefault();
          if (onIncrement && !reverse)
            onIncrement();
          else if (onDecrement && reverse)
            onDecrement();
        }
        break;
      case "Down":
      case "ArrowDown":
        if (orientation === "vertical") {
          e.preventDefault();
          if (onIncrement && !reverse)
            onIncrement();
          else if (onDecrement && reverse)
            onDecrement();
        }
        break;
      case "Home":
        e.preventDefault();
        if (onDecrementToMin)
          onDecrementToMin();
        break;
      case "End":
        e.preventDefault();
        if (onIncrementToMax)
          onIncrementToMax();
        break;
      case "Enter":
        e.preventDefault();
        if (onCollapseToggle)
          onCollapseToggle();
        break;
    }
  };
  return {
    onMouseDown,
    onMouseEnter,
    onMouseOut,
    onKeyDown
  };
}
var $03deb23ff14920c4$exports = {};
$parcel$export$8($03deb23ff14920c4$exports, "useGlobalListeners", () => $03deb23ff14920c4$export$4eaf04e54aa8eed6);
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
  let globalListeners = useRef(/* @__PURE__ */ new Map());
  let addGlobalListener = useCallback((eventTarget, type, listener, options) => {
    let fn = (options === null || options === void 0 ? void 0 : options.once) ? (...args) => {
      globalListeners.current.delete(listener);
      listener(...args);
    } : listener;
    globalListeners.current.set(listener, {
      type,
      eventTarget,
      fn,
      options
    });
    eventTarget.addEventListener(type, listener, options);
  }, []);
  let removeGlobalListener = useCallback((eventTarget, type, listener, options) => {
    var ref;
    let fn = ((ref = globalListeners.current.get(listener)) === null || ref === void 0 ? void 0 : ref.fn) || listener;
    eventTarget.removeEventListener(type, fn, options);
    globalListeners.current.delete(listener);
  }, []);
  let removeAllGlobalListeners = useCallback(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [
    removeGlobalListener
  ]);
  useEffect(() => {
    return removeAllGlobalListeners;
  }, [
    removeAllGlobalListeners
  ]);
  return {
    addGlobalListener,
    removeGlobalListener,
    removeAllGlobalListeners
  };
}
var $313b98861ee5dd6c$exports = {};
$parcel$export$8($313b98861ee5dd6c$exports, "useLabels", () => $313b98861ee5dd6c$export$d6875122194c7b44);
function $313b98861ee5dd6c$export$d6875122194c7b44(props, defaultLabel) {
  let { id, "aria-label": label, "aria-labelledby": labelledBy } = props;
  id = $bdb11010cef70236$export$f680877a34711e37(id);
  if (labelledBy && label) {
    let ids = /* @__PURE__ */ new Set([
      ...labelledBy.trim().split(/\s+/),
      id
    ]);
    labelledBy = [
      ...ids
    ].join(" ");
  } else if (labelledBy)
    labelledBy = labelledBy.trim().split(/\s+/).join(" ");
  if (!label && !labelledBy && defaultLabel)
    label = defaultLabel;
  return {
    id,
    "aria-label": label,
    "aria-labelledby": labelledBy
  };
}
var $df56164dff5785e2$exports = {};
$parcel$export$8($df56164dff5785e2$exports, "useObjectRef", () => $df56164dff5785e2$export$4338b53315abf666);
function $df56164dff5785e2$export$4338b53315abf666(forwardedRef) {
  const objRef = useRef();
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    if (!forwardedRef)
      return;
    if (typeof forwardedRef === "function")
      forwardedRef(objRef.current);
    else
      forwardedRef.current = objRef.current;
  }, [
    forwardedRef
  ]);
  return objRef;
}
var $4f58c5f72bcf79f7$exports = {};
$parcel$export$8($4f58c5f72bcf79f7$exports, "useUpdateEffect", () => $4f58c5f72bcf79f7$export$496315a1608d9602);
function $4f58c5f72bcf79f7$export$496315a1608d9602(effect, dependencies) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      effect();
  }, dependencies);
}
var $9daab02d461809db$exports = {};
$parcel$export$8($9daab02d461809db$exports, "useResizeObserver", () => $9daab02d461809db$export$683480f191c0e3ea);
function $9daab02d461809db$var$hasResizeObserver() {
  return typeof window.ResizeObserver !== "undefined";
}
function $9daab02d461809db$export$683480f191c0e3ea(options) {
  const { ref, onResize } = options;
  useEffect(() => {
    let element = ref === null || ref === void 0 ? void 0 : ref.current;
    if (!element)
      return;
    if (!$9daab02d461809db$var$hasResizeObserver()) {
      window.addEventListener("resize", onResize, false);
      return () => {
        window.removeEventListener("resize", onResize, false);
      };
    } else {
      const resizeObserverInstance = new window.ResizeObserver((entries) => {
        if (!entries.length)
          return;
        onResize();
      });
      resizeObserverInstance.observe(element);
      return () => {
        if (element)
          resizeObserverInstance.unobserve(element);
      };
    }
  }, [
    onResize,
    ref
  ]);
}
var $e7801be82b4b2a53$exports = {};
$parcel$export$8($e7801be82b4b2a53$exports, "useSyncRef", () => $e7801be82b4b2a53$export$4debdb1a3f0fa79e);
function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref) {
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    if (context && context.ref && ref) {
      context.ref.current = ref.current;
      return () => {
        context.ref.current = null;
      };
    }
  }, [
    context,
    ref
  ]);
}
var $62d8ded9296f3872$exports = {};
$parcel$export$8($62d8ded9296f3872$exports, "getScrollParent", () => $62d8ded9296f3872$export$cfa2225e87938781);
function $62d8ded9296f3872$export$cfa2225e87938781(node) {
  while (node && !$62d8ded9296f3872$var$isScrollable(node))
    node = node.parentElement;
  return node || document.scrollingElement || document.documentElement;
}
function $62d8ded9296f3872$var$isScrollable(node) {
  let style2 = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style2.overflow + style2.overflowX + style2.overflowY);
}
var $5df64b3807dc15ee$exports = {};
$parcel$export$8($5df64b3807dc15ee$exports, "useViewportSize", () => $5df64b3807dc15ee$export$d699905dd57c73ca);
let $5df64b3807dc15ee$var$visualViewport = typeof window !== "undefined" && window.visualViewport;
function $5df64b3807dc15ee$export$d699905dd57c73ca() {
  let [size1, setSize] = useState(() => $5df64b3807dc15ee$var$getViewportSize());
  useEffect(() => {
    let onResize = () => {
      setSize((size) => {
        let newSize = $5df64b3807dc15ee$var$getViewportSize();
        if (newSize.width === size.width && newSize.height === size.height)
          return size;
        return newSize;
      });
    };
    if (!$5df64b3807dc15ee$var$visualViewport)
      window.addEventListener("resize", onResize);
    else
      $5df64b3807dc15ee$var$visualViewport.addEventListener("resize", onResize);
    return () => {
      if (!$5df64b3807dc15ee$var$visualViewport)
        window.removeEventListener("resize", onResize);
      else
        $5df64b3807dc15ee$var$visualViewport.removeEventListener("resize", onResize);
    };
  }, []);
  return size1;
}
function $5df64b3807dc15ee$var$getViewportSize() {
  return {
    width: ($5df64b3807dc15ee$var$visualViewport === null || $5df64b3807dc15ee$var$visualViewport === void 0 ? void 0 : $5df64b3807dc15ee$var$visualViewport.width) || window.innerWidth,
    height: ($5df64b3807dc15ee$var$visualViewport === null || $5df64b3807dc15ee$var$visualViewport === void 0 ? void 0 : $5df64b3807dc15ee$var$visualViewport.height) || window.innerHeight
  };
}
var $ef06256079686ba0$exports = {};
$parcel$export$8($ef06256079686ba0$exports, "useDescription", () => $ef06256079686ba0$export$f8aeda7b10753fa1);
let $ef06256079686ba0$var$descriptionId = 0;
const $ef06256079686ba0$var$descriptionNodes = /* @__PURE__ */ new Map();
function $ef06256079686ba0$export$f8aeda7b10753fa1(description) {
  let [id1, setId] = useState(null);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    if (!description)
      return;
    let desc = $ef06256079686ba0$var$descriptionNodes.get(description);
    if (!desc) {
      let id = `react-aria-description-${$ef06256079686ba0$var$descriptionId++}`;
      setId(id);
      let node = document.createElement("div");
      node.id = id;
      node.style.display = "none";
      node.textContent = description;
      document.body.appendChild(node);
      desc = {
        refCount: 0,
        element: node
      };
      $ef06256079686ba0$var$descriptionNodes.set(description, desc);
    } else
      setId(desc.element.id);
    desc.refCount++;
    return () => {
      if (--desc.refCount === 0) {
        desc.element.remove();
        $ef06256079686ba0$var$descriptionNodes.delete(description);
      }
    };
  }, [
    description
  ]);
  return {
    "aria-describedby": description ? id1 : void 0
  };
}
var $c87311424ea30a05$exports = {};
$parcel$export$8($c87311424ea30a05$exports, "isMac", () => $c87311424ea30a05$export$9ac100e40613ea10);
$parcel$export$8($c87311424ea30a05$exports, "isIPhone", () => $c87311424ea30a05$export$186c6964ca17d99);
$parcel$export$8($c87311424ea30a05$exports, "isIPad", () => $c87311424ea30a05$export$7bef049ce92e4224);
$parcel$export$8($c87311424ea30a05$exports, "isIOS", () => $c87311424ea30a05$export$fedb369cb70207f1);
$parcel$export$8($c87311424ea30a05$exports, "isAppleDevice", () => $c87311424ea30a05$export$e1865c3bedcd822b);
$parcel$export$8($c87311424ea30a05$exports, "isWebKit", () => $c87311424ea30a05$export$78551043582a6a98);
$parcel$export$8($c87311424ea30a05$exports, "isChrome", () => $c87311424ea30a05$export$6446a186d09e379e);
$parcel$export$8($c87311424ea30a05$exports, "isAndroid", () => $c87311424ea30a05$export$a11b0059900ceec8);
function $c87311424ea30a05$var$testUserAgent(re) {
  var ref;
  if (typeof window === "undefined" || window.navigator == null)
    return false;
  return ((ref = window.navigator["userAgentData"]) === null || ref === void 0 ? void 0 : ref.brands.some((brand) => re.test(brand.brand))) || re.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test((window.navigator["userAgentData"] || window.navigator).platform) : false;
}
function $c87311424ea30a05$export$9ac100e40613ea10() {
  return $c87311424ea30a05$var$testPlatform(/^Mac/i);
}
function $c87311424ea30a05$export$186c6964ca17d99() {
  return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
}
function $c87311424ea30a05$export$7bef049ce92e4224() {
  return $c87311424ea30a05$var$testPlatform(/^iPad/i) || $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
}
function $c87311424ea30a05$export$fedb369cb70207f1() {
  return $c87311424ea30a05$export$186c6964ca17d99() || $c87311424ea30a05$export$7bef049ce92e4224();
}
function $c87311424ea30a05$export$e1865c3bedcd822b() {
  return $c87311424ea30a05$export$9ac100e40613ea10() || $c87311424ea30a05$export$fedb369cb70207f1();
}
function $c87311424ea30a05$export$78551043582a6a98() {
  return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
}
function $c87311424ea30a05$export$6446a186d09e379e() {
  return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
}
function $c87311424ea30a05$export$a11b0059900ceec8() {
  return $c87311424ea30a05$var$testUserAgent(/Android/i);
}
var $e9faafb641e167db$exports = {};
$parcel$export$8($e9faafb641e167db$exports, "useEvent", () => $e9faafb641e167db$export$90fc3a17d93f704c);
function $e9faafb641e167db$export$90fc3a17d93f704c(ref, event, handler1, options) {
  let handlerRef = useRef(handler1);
  handlerRef.current = handler1;
  let isDisabled = handler1 == null;
  useEffect(() => {
    if (isDisabled)
      return;
    let element = ref.current;
    let handler = (e) => handlerRef.current.call(this, e);
    element.addEventListener(event, handler, options);
    return () => {
      element.removeEventListener(event, handler, options);
    };
  }, [
    ref,
    event,
    options,
    isDisabled
  ]);
}
var $1dbecbe27a04f9af$exports = {};
$parcel$export$8($1dbecbe27a04f9af$exports, "useValueEffect", () => $1dbecbe27a04f9af$export$14d238f342723f25);
function $1dbecbe27a04f9af$export$14d238f342723f25(defaultValue) {
  let [value, setValue] = useState(defaultValue);
  let valueRef = useRef(value);
  let effect = useRef(null);
  valueRef.current = value;
  let nextRef = useRef(null);
  nextRef.current = () => {
    let newValue = effect.current.next();
    if (newValue.done) {
      effect.current = null;
      return;
    }
    if (value === newValue.value)
      nextRef.current();
    else
      setValue(newValue.value);
  };
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    if (effect.current)
      nextRef.current();
  });
  let queue = useCallback((fn) => {
    effect.current = fn(valueRef.current);
    nextRef.current();
  }, [
    effect,
    nextRef
  ]);
  return [
    value,
    queue
  ];
}
var $2f04cbc44ee30ce0$exports = {};
$parcel$export$8($2f04cbc44ee30ce0$exports, "scrollIntoView", () => $2f04cbc44ee30ce0$export$53a0910f038337bd);
function $2f04cbc44ee30ce0$export$53a0910f038337bd(scrollView, element) {
  let offsetX = $2f04cbc44ee30ce0$var$relativeOffset(scrollView, element, "left");
  let offsetY = $2f04cbc44ee30ce0$var$relativeOffset(scrollView, element, "top");
  let width = element.offsetWidth;
  let height = element.offsetHeight;
  let x = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  let maxX = x + scrollView.offsetWidth;
  let maxY = y + scrollView.offsetHeight;
  if (offsetX <= x)
    x = offsetX;
  else if (offsetX + width > maxX)
    x += offsetX + width - maxX;
  if (offsetY <= y)
    y = offsetY;
  else if (offsetY + height > maxY)
    y += offsetY + height - maxY;
  scrollView.scrollLeft = x;
  scrollView.scrollTop = y;
}
function $2f04cbc44ee30ce0$var$relativeOffset(ancestor, child, axis) {
  const prop = axis === "left" ? "offsetLeft" : "offsetTop";
  let sum = 0;
  while (child.offsetParent) {
    sum += child[prop];
    if (child.offsetParent === ancestor)
      break;
    else if (child.offsetParent.contains(ancestor)) {
      sum -= ancestor[prop];
      break;
    }
    child = child.offsetParent;
  }
  return sum;
}
function $parcel$export$7(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $fd933927dbac1f15$exports = {};
$parcel$export$7($fd933927dbac1f15$exports, "shouldKeepSpectrumClassNames", () => $fd933927dbac1f15$export$46d604dce8bf8724);
$parcel$export$7($fd933927dbac1f15$exports, "keepSpectrumClassNames", () => $fd933927dbac1f15$export$f9d3bfd10703eb31);
$parcel$export$7($fd933927dbac1f15$exports, "classNames", () => $fd933927dbac1f15$export$ce4ab0c55987d1ff);
let $fd933927dbac1f15$export$46d604dce8bf8724 = false;
function $fd933927dbac1f15$export$f9d3bfd10703eb31() {
  $fd933927dbac1f15$export$46d604dce8bf8724 = true;
  console.warn("Legacy spectrum-prefixed class names enabled for backward compatibility. We recommend replacing instances of CSS overrides targeting spectrum selectors in your app with custom class names of your own, and disabling this flag.");
}
function $fd933927dbac1f15$export$ce4ab0c55987d1ff(cssModule, ...values) {
  let classes = [];
  for (let value of values) {
    if (typeof value === "object" && value) {
      let mapped = {};
      for (let key in value) {
        if (cssModule[key])
          mapped[cssModule[key]] = value[key];
        if ($fd933927dbac1f15$export$46d604dce8bf8724 || !cssModule[key])
          mapped[key] = value[key];
      }
      classes.push(mapped);
    } else if (typeof value === "string") {
      if (cssModule[value])
        classes.push(cssModule[value]);
      if ($fd933927dbac1f15$export$46d604dce8bf8724 || !cssModule[value])
        classes.push(value);
    } else
      classes.push(value);
  }
  return clsx(...classes);
}
var $bde65b0159e7c06e$exports = {};
$parcel$export$7($bde65b0159e7c06e$exports, "getWrappedElement", () => $bde65b0159e7c06e$export$a5f5a6912b18861c);
function $bde65b0159e7c06e$export$a5f5a6912b18861c(children) {
  let element;
  if (typeof children === "string")
    element = /* @__PURE__ */ $5lsDl$react.createElement("span", null, children);
  else
    element = $5lsDl$react.Children.only(children);
  return element;
}
var $3df547e395c4522f$exports = {};
$parcel$export$7($3df547e395c4522f$exports, "useMediaQuery", () => $3df547e395c4522f$export$32d5543ab307c01);
function $3df547e395c4522f$export$32d5543ab307c01(query) {
  let supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
  let [matches, setMatches] = useState(() => supportsMatchMedia ? window.matchMedia(query).matches : false);
  useEffect(() => {
    if (!supportsMatchMedia)
      return;
    let mq = window.matchMedia(query);
    let onChange = (evt) => {
      setMatches(evt.matches);
    };
    mq.addListener(onChange);
    return () => {
      mq.removeListener(onChange);
    };
  }, [
    supportsMatchMedia,
    query
  ]);
  let isSSR = $704cf1d3b684cc5c$export$535bd6ca7f90a273();
  return isSSR ? false : matches;
}
var $98e5a8ae0e6415af$exports = {};
$parcel$export$7($98e5a8ae0e6415af$exports, "createDOMRef", () => $98e5a8ae0e6415af$export$a5795cc979dfae80);
$parcel$export$7($98e5a8ae0e6415af$exports, "createFocusableRef", () => $98e5a8ae0e6415af$export$79d69eee6ae4b329);
$parcel$export$7($98e5a8ae0e6415af$exports, "useDOMRef", () => $98e5a8ae0e6415af$export$c2c55ef9111cafd8);
$parcel$export$7($98e5a8ae0e6415af$exports, "useFocusableRef", () => $98e5a8ae0e6415af$export$96a734597687c040);
$parcel$export$7($98e5a8ae0e6415af$exports, "unwrapDOMRef", () => $98e5a8ae0e6415af$export$c7e28c72a4823176);
$parcel$export$7($98e5a8ae0e6415af$exports, "useUnwrapDOMRef", () => $98e5a8ae0e6415af$export$1d5cc31d9d8df817);
function $98e5a8ae0e6415af$export$a5795cc979dfae80(ref) {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    }
  };
}
function $98e5a8ae0e6415af$export$79d69eee6ae4b329(domRef, focusableRef = domRef) {
  return {
    ...$98e5a8ae0e6415af$export$a5795cc979dfae80(domRef),
    focus() {
      if (focusableRef.current)
        focusableRef.current.focus();
    }
  };
}
function $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref) {
  let domRef = useRef(null);
  useImperativeHandle(ref, () => $98e5a8ae0e6415af$export$a5795cc979dfae80(domRef));
  return domRef;
}
function $98e5a8ae0e6415af$export$96a734597687c040(ref, focusableRef) {
  let domRef = useRef(null);
  useImperativeHandle(ref, () => $98e5a8ae0e6415af$export$79d69eee6ae4b329(domRef, focusableRef));
  return domRef;
}
function $98e5a8ae0e6415af$export$c7e28c72a4823176(ref) {
  return {
    get current() {
      return ref.current && ref.current.UNSAFE_getDOMNode();
    }
  };
}
function $98e5a8ae0e6415af$export$1d5cc31d9d8df817(ref) {
  return useMemo(() => $98e5a8ae0e6415af$export$c7e28c72a4823176(ref), [
    ref
  ]);
}
var $380ed8f3903c3931$exports = {};
$parcel$export$7($380ed8f3903c3931$exports, "baseStyleProps", () => $380ed8f3903c3931$export$fe9c6e915565b4e8);
$parcel$export$7($380ed8f3903c3931$exports, "dimensionValue", () => $380ed8f3903c3931$export$abc24f5b99744ea6);
$parcel$export$7($380ed8f3903c3931$exports, "passthroughStyle", () => $380ed8f3903c3931$export$46b6c81d11d2c30a);
$parcel$export$7($380ed8f3903c3931$exports, "viewStyleProps", () => $380ed8f3903c3931$export$e0705d1a55f297c);
$parcel$export$7($380ed8f3903c3931$exports, "responsiveDimensionValue", () => $380ed8f3903c3931$export$f348bec194f2e6b5);
$parcel$export$7($380ed8f3903c3931$exports, "getResponsiveProp", () => $380ed8f3903c3931$export$52dbfdbe1b2c3541);
$parcel$export$7($380ed8f3903c3931$exports, "convertStyleProps", () => $380ed8f3903c3931$export$f3c39bb9534218d0);
$parcel$export$7($380ed8f3903c3931$exports, "useStyleProps", () => $380ed8f3903c3931$export$b8e6fb9d2dff3f41);
var $1051245f87c5981d$exports = {};
$parcel$export$7($1051245f87c5981d$exports, "BreakpointProvider", () => $1051245f87c5981d$export$8214320346cf5104);
$parcel$export$7($1051245f87c5981d$exports, "useMatchedBreakpoints", () => $1051245f87c5981d$export$140ae7baa51cca23);
$parcel$export$7($1051245f87c5981d$exports, "useBreakpoint", () => $1051245f87c5981d$export$199d6754bdf4e1e3);
const $1051245f87c5981d$var$Context = /* @__PURE__ */ $5lsDl$react.createContext(null);
$1051245f87c5981d$var$Context.displayName = "BreakpointContext";
function $1051245f87c5981d$export$8214320346cf5104(props) {
  let { children, matchedBreakpoints } = props;
  return /* @__PURE__ */ $5lsDl$react.createElement($1051245f87c5981d$var$Context.Provider, {
    value: {
      matchedBreakpoints
    }
  }, children);
}
function $1051245f87c5981d$export$140ae7baa51cca23(breakpoints) {
  let entries = Object.entries(breakpoints).sort(([, valueA], [, valueB]) => valueB - valueA);
  let breakpointQueries = entries.map(([, value]) => `(min-width: ${value}px)`);
  let supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
  let getBreakpointHandler = () => {
    let matched = [];
    for (let i in breakpointQueries) {
      let query = breakpointQueries[i];
      if (window.matchMedia(query).matches)
        matched.push(entries[i][0]);
    }
    matched.push("base");
    return matched;
  };
  let [breakpoint1, setBreakpoint] = useState(() => supportsMatchMedia ? getBreakpointHandler() : [
    "base"
  ]);
  useEffect(() => {
    if (!supportsMatchMedia)
      return;
    let onResize = () => {
      const breakpointHandler = getBreakpointHandler();
      setBreakpoint((previousBreakpointHandler) => {
        if (previousBreakpointHandler.length !== breakpointHandler.length || previousBreakpointHandler.some((breakpoint, idx) => breakpoint !== breakpointHandler[idx]))
          return [
            ...breakpointHandler
          ];
        return previousBreakpointHandler;
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [
    supportsMatchMedia
  ]);
  let isSSR = $704cf1d3b684cc5c$export$535bd6ca7f90a273();
  return isSSR ? [
    "base"
  ] : breakpoint1;
}
function $1051245f87c5981d$export$199d6754bdf4e1e3() {
  return useContext($1051245f87c5981d$var$Context);
}
const $380ed8f3903c3931$export$fe9c6e915565b4e8 = {
  margin: [
    "margin",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  marginStart: [
    $380ed8f3903c3931$var$rtl("marginLeft", "marginRight"),
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  marginEnd: [
    $380ed8f3903c3931$var$rtl("marginRight", "marginLeft"),
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  marginTop: [
    "marginTop",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  marginBottom: [
    "marginBottom",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  marginX: [
    [
      "marginLeft",
      "marginRight"
    ],
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  marginY: [
    [
      "marginTop",
      "marginBottom"
    ],
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  width: [
    "width",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  height: [
    "height",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  minWidth: [
    "minWidth",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  minHeight: [
    "minHeight",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  maxWidth: [
    "maxWidth",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  maxHeight: [
    "maxHeight",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  isHidden: [
    "display",
    $380ed8f3903c3931$var$hiddenValue
  ],
  alignSelf: [
    "alignSelf",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  justifySelf: [
    "justifySelf",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  position: [
    "position",
    $380ed8f3903c3931$var$anyValue
  ],
  zIndex: [
    "zIndex",
    $380ed8f3903c3931$var$anyValue
  ],
  top: [
    "top",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  bottom: [
    "bottom",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  start: [
    $380ed8f3903c3931$var$rtl("left", "right"),
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  end: [
    $380ed8f3903c3931$var$rtl("right", "left"),
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  left: [
    "left",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  right: [
    "right",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  order: [
    "order",
    $380ed8f3903c3931$var$anyValue
  ],
  flex: [
    "flex",
    $380ed8f3903c3931$var$flexValue
  ],
  flexGrow: [
    "flexGrow",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  flexShrink: [
    "flexShrink",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  flexBasis: [
    "flexBasis",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  gridArea: [
    "gridArea",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  gridColumn: [
    "gridColumn",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  gridColumnEnd: [
    "gridColumnEnd",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  gridColumnStart: [
    "gridColumnStart",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  gridRow: [
    "gridRow",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  gridRowEnd: [
    "gridRowEnd",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  gridRowStart: [
    "gridRowStart",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ]
};
const $380ed8f3903c3931$export$e0705d1a55f297c = {
  ...$380ed8f3903c3931$export$fe9c6e915565b4e8,
  backgroundColor: [
    "backgroundColor",
    $380ed8f3903c3931$var$backgroundColorValue
  ],
  borderWidth: [
    "borderWidth",
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderStartWidth: [
    $380ed8f3903c3931$var$rtl("borderLeftWidth", "borderRightWidth"),
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderEndWidth: [
    $380ed8f3903c3931$var$rtl("borderRightWidth", "borderLeftWidth"),
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderLeftWidth: [
    "borderLeftWidth",
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderRightWidth: [
    "borderRightWidth",
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderTopWidth: [
    "borderTopWidth",
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderBottomWidth: [
    "borderBottomWidth",
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderXWidth: [
    [
      "borderLeftWidth",
      "borderRightWidth"
    ],
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderYWidth: [
    [
      "borderTopWidth",
      "borderBottomWidth"
    ],
    $380ed8f3903c3931$var$borderSizeValue
  ],
  borderColor: [
    "borderColor",
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderStartColor: [
    $380ed8f3903c3931$var$rtl("borderLeftColor", "borderRightColor"),
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderEndColor: [
    $380ed8f3903c3931$var$rtl("borderRightColor", "borderLeftColor"),
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderLeftColor: [
    "borderLeftColor",
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderRightColor: [
    "borderRightColor",
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderTopColor: [
    "borderTopColor",
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderBottomColor: [
    "borderBottomColor",
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderXColor: [
    [
      "borderLeftColor",
      "borderRightColor"
    ],
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderYColor: [
    [
      "borderTopColor",
      "borderBottomColor"
    ],
    $380ed8f3903c3931$var$borderColorValue
  ],
  borderRadius: [
    "borderRadius",
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderTopStartRadius: [
    $380ed8f3903c3931$var$rtl("borderTopLeftRadius", "borderTopRightRadius"),
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderTopEndRadius: [
    $380ed8f3903c3931$var$rtl("borderTopRightRadius", "borderTopLeftRadius"),
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderBottomStartRadius: [
    $380ed8f3903c3931$var$rtl("borderBottomLeftRadius", "borderBottomRightRadius"),
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderBottomEndRadius: [
    $380ed8f3903c3931$var$rtl("borderBottomRightRadius", "borderBottomLeftRadius"),
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderTopLeftRadius: [
    "borderTopLeftRadius",
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderTopRightRadius: [
    "borderTopRightRadius",
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderBottomLeftRadius: [
    "borderBottomLeftRadius",
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  borderBottomRightRadius: [
    "borderBottomRightRadius",
    $380ed8f3903c3931$var$borderRadiusValue
  ],
  padding: [
    "padding",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingStart: [
    $380ed8f3903c3931$var$rtl("paddingLeft", "paddingRight"),
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingEnd: [
    $380ed8f3903c3931$var$rtl("paddingRight", "paddingLeft"),
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingLeft: [
    "paddingLeft",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingRight: [
    "paddingRight",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingTop: [
    "paddingTop",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingBottom: [
    "paddingBottom",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingX: [
    [
      "paddingLeft",
      "paddingRight"
    ],
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  paddingY: [
    [
      "paddingTop",
      "paddingBottom"
    ],
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  overflow: [
    "overflow",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ]
};
const $380ed8f3903c3931$var$borderStyleProps = {
  borderWidth: "borderStyle",
  borderLeftWidth: "borderLeftStyle",
  borderRightWidth: "borderRightStyle",
  borderTopWidth: "borderTopStyle",
  borderBottomWidth: "borderBottomStyle"
};
function $380ed8f3903c3931$var$rtl(ltr, rtl) {
  return (direction) => direction === "rtl" ? rtl : ltr;
}
const $380ed8f3903c3931$var$UNIT_RE = /(%|px|em|rem|vw|vh|auto|cm|mm|in|pt|pc|ex|ch|rem|vmin|vmax|fr)$/;
const $380ed8f3903c3931$var$FUNC_RE = /^\s*\w+\(/;
const $380ed8f3903c3931$var$SPECTRUM_VARIABLE_RE = /(static-)?size-\d+|single-line-(height|width)/g;
function $380ed8f3903c3931$export$abc24f5b99744ea6(value) {
  if (typeof value === "number")
    return value + "px";
  if ($380ed8f3903c3931$var$UNIT_RE.test(value))
    return value;
  if ($380ed8f3903c3931$var$FUNC_RE.test(value))
    return value.replace($380ed8f3903c3931$var$SPECTRUM_VARIABLE_RE, "var(--spectrum-global-dimension-$&, var(--spectrum-alias-$&))");
  return `var(--spectrum-global-dimension-${value}, var(--spectrum-alias-${value}))`;
}
function $380ed8f3903c3931$export$f348bec194f2e6b5(value, matchedBreakpoints) {
  value = $380ed8f3903c3931$export$52dbfdbe1b2c3541(value, matchedBreakpoints);
  return $380ed8f3903c3931$export$abc24f5b99744ea6(value);
}
function $380ed8f3903c3931$var$colorValue(value, type = "default") {
  return `var(--spectrum-global-color-${value}, var(--spectrum-semantic-${value}-color-${type}))`;
}
function $380ed8f3903c3931$var$backgroundColorValue(value) {
  return `var(--spectrum-alias-background-color-${value}, ${$380ed8f3903c3931$var$colorValue(value, "background")})`;
}
function $380ed8f3903c3931$var$borderColorValue(value) {
  if (value === "default")
    return "var(--spectrum-alias-border-color)";
  return `var(--spectrum-alias-border-color-${value}, ${$380ed8f3903c3931$var$colorValue(value, "border")})`;
}
function $380ed8f3903c3931$var$borderSizeValue(value) {
  return `var(--spectrum-alias-border-size-${value})`;
}
function $380ed8f3903c3931$var$borderRadiusValue(value) {
  return `var(--spectrum-alias-border-radius-${value})`;
}
function $380ed8f3903c3931$var$hiddenValue(value) {
  return value ? "none" : void 0;
}
function $380ed8f3903c3931$var$anyValue(value) {
  return value;
}
function $380ed8f3903c3931$var$flexValue(value) {
  if (typeof value === "boolean")
    return value ? "1" : void 0;
  return "" + value;
}
function $380ed8f3903c3931$export$f3c39bb9534218d0(props, handlers, direction, matchedBreakpoints) {
  let style2 = {};
  for (let key in props) {
    let styleProp = handlers[key];
    if (!styleProp || props[key] == null)
      continue;
    let [name, convert] = styleProp;
    if (typeof name === "function")
      name = name(direction);
    let prop = $380ed8f3903c3931$export$52dbfdbe1b2c3541(props[key], matchedBreakpoints);
    let value = convert(prop);
    if (Array.isArray(name))
      for (let k2 of name)
        style2[k2] = value;
    else
      style2[name] = value;
  }
  for (let prop in $380ed8f3903c3931$var$borderStyleProps)
    if (style2[prop]) {
      style2[$380ed8f3903c3931$var$borderStyleProps[prop]] = "solid";
      style2.boxSizing = "border-box";
    }
  return style2;
}
function $380ed8f3903c3931$export$b8e6fb9d2dff3f41(props, handlers = $380ed8f3903c3931$export$fe9c6e915565b4e8, options = {}) {
  let { UNSAFE_className, UNSAFE_style, ...otherProps } = props;
  let breakpointProvider = $1051245f87c5981d$export$199d6754bdf4e1e3();
  let { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let { matchedBreakpoints = (breakpointProvider === null || breakpointProvider === void 0 ? void 0 : breakpointProvider.matchedBreakpoints) || [
    "base"
  ] } = options;
  let styles = $380ed8f3903c3931$export$f3c39bb9534218d0(props, handlers, direction, matchedBreakpoints);
  let style2 = {
    ...UNSAFE_style,
    ...styles
  };
  if (otherProps.className)
    console.warn("The className prop is unsafe and is unsupported in React Spectrum v3. Please use style props with Spectrum variables, or UNSAFE_className if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.");
  if (otherProps.style)
    console.warn("The style prop is unsafe and is unsupported in React Spectrum v3. Please use style props with Spectrum variables, or UNSAFE_style if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.");
  let styleProps = {
    style: style2,
    className: UNSAFE_className
  };
  if ($380ed8f3903c3931$export$52dbfdbe1b2c3541(props.isHidden, matchedBreakpoints))
    styleProps.hidden = true;
  return {
    styleProps
  };
}
function $380ed8f3903c3931$export$46b6c81d11d2c30a(value) {
  return value;
}
function $380ed8f3903c3931$export$52dbfdbe1b2c3541(prop, matchedBreakpoints) {
  if (prop && typeof prop === "object" && !Array.isArray(prop)) {
    for (let i = 0; i < matchedBreakpoints.length; i++) {
      let breakpoint = matchedBreakpoints[i];
      if (prop[breakpoint] != null)
        return prop[breakpoint];
    }
    return prop.base;
  }
  return prop;
}
var $59d09bcc83651bf9$exports = {};
$parcel$export$7($59d09bcc83651bf9$exports, "useSlotProps", () => $59d09bcc83651bf9$export$1e5c9e6e4e15efe3);
$parcel$export$7($59d09bcc83651bf9$exports, "cssModuleToSlots", () => $59d09bcc83651bf9$export$365cf34cda9978e2);
$parcel$export$7($59d09bcc83651bf9$exports, "SlotProvider", () => $59d09bcc83651bf9$export$8107b24b91795686);
$parcel$export$7($59d09bcc83651bf9$exports, "ClearSlots", () => $59d09bcc83651bf9$export$ceb145244332b7a2);
let $59d09bcc83651bf9$var$SlotContext = /* @__PURE__ */ $5lsDl$react.createContext(null);
function $59d09bcc83651bf9$export$1e5c9e6e4e15efe3(props, defaultSlot) {
  let slot = props.slot || defaultSlot;
  let { [slot]: slotProps = {} } = useContext($59d09bcc83651bf9$var$SlotContext) || {};
  return $3ef42575df84b30b$export$9d1611c77c2fe928(props, $3ef42575df84b30b$export$9d1611c77c2fe928(slotProps, {
    id: props.id
  }));
}
function $59d09bcc83651bf9$export$365cf34cda9978e2(cssModule) {
  return Object.keys(cssModule).reduce((acc, slot) => {
    acc[slot] = {
      UNSAFE_className: cssModule[slot]
    };
    return acc;
  }, {});
}
function $59d09bcc83651bf9$export$8107b24b91795686(props) {
  let parentSlots = useContext($59d09bcc83651bf9$var$SlotContext) || {};
  let { slots = {}, children } = props;
  let value = useMemo(() => Object.keys(parentSlots).concat(Object.keys(slots)).reduce((o, p2) => ({
    ...o,
    [p2]: $3ef42575df84b30b$export$9d1611c77c2fe928(parentSlots[p2] || {}, slots[p2] || {})
  }), {}), [
    parentSlots,
    slots
  ]);
  return /* @__PURE__ */ $5lsDl$react.createElement($59d09bcc83651bf9$var$SlotContext.Provider, {
    value
  }, children);
}
function $59d09bcc83651bf9$export$ceb145244332b7a2(props) {
  let { children, ...otherProps } = props;
  let content = children;
  if ($5lsDl$react.Children.toArray(children).length <= 1) {
    if (typeof children === "function")
      content = /* @__PURE__ */ $5lsDl$react.cloneElement($5lsDl$react.Children.only(children), otherProps);
  }
  return /* @__PURE__ */ $5lsDl$react.createElement($59d09bcc83651bf9$var$SlotContext.Provider, {
    value: {}
  }, content);
}
var $54cda195bd4173fb$exports = {};
$parcel$export$7($54cda195bd4173fb$exports, "useHasChild", () => $54cda195bd4173fb$export$e52e2242b6d0f1d4);
function $54cda195bd4173fb$export$e52e2242b6d0f1d4(query, ref) {
  let [hasChild, setHasChild] = useState(true);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    setHasChild(!!(ref.current && ref.current.querySelector(query)));
  }, [
    setHasChild,
    query,
    ref
  ]);
  return hasChild;
}
var $d8f44ff5ccb41110$exports = {};
$parcel$export$7($d8f44ff5ccb41110$exports, "useResizeObserver", () => $9daab02d461809db$export$683480f191c0e3ea);
var $fdbe26a36ce1c672$exports = {};
$parcel$export$7($fdbe26a36ce1c672$exports, "useIsMobileDevice", () => $fdbe26a36ce1c672$export$736bf165441b18c7);
const $fdbe26a36ce1c672$var$MOBILE_SCREEN_WIDTH = 700;
function $fdbe26a36ce1c672$export$736bf165441b18c7() {
  let isSSR = $704cf1d3b684cc5c$export$535bd6ca7f90a273();
  if (isSSR || typeof window === "undefined")
    return false;
  return window.screen.width <= $fdbe26a36ce1c672$var$MOBILE_SCREEN_WIDTH;
}
var $7d673cd851891254$exports = {};
$parcel$export$7($7d673cd851891254$exports, "useValueEffect", () => $1dbecbe27a04f9af$export$14d238f342723f25);
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}
function getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, "-$1").toLowerCase();
}
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, "-ms-");
}
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}
function style(node, property) {
  var css2 = "";
  var transforms = "";
  if (typeof property === "string") {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
  }
  Object.keys(property).forEach(function(key) {
    var value = property[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css2 += hyphenateStyleName(key) + ": " + value + ";";
    }
  });
  if (transforms) {
    css2 += "transform: " + transforms + ";";
  }
  node.style.cssText += ";" + css2;
}
function contains(context, node) {
  if (context.contains)
    return context.contains(node);
  if (context.compareDocumentPosition)
    return context === node || !!(context.compareDocumentPosition(node) & 16);
}
function isDocument(element) {
  return "nodeType" in element && element.nodeType === document.DOCUMENT_NODE;
}
function isWindow(node) {
  if ("window" in node && node.window === node)
    return node;
  if (isDocument(node))
    return node.defaultView || false;
  return false;
}
function getscrollAccessor(offset2) {
  var prop = offset2 === "pageXOffset" ? "scrollLeft" : "scrollTop";
  function scrollAccessor(node, val) {
    var win = isWindow(node);
    if (val === void 0) {
      return win ? win[offset2] : node[prop];
    }
    if (win) {
      win.scrollTo(win[offset2], val);
    } else {
      node[prop] = val;
    }
  }
  return scrollAccessor;
}
var $k7QOs$domhelpersscrollLeft = getscrollAccessor("pageXOffset");
var $k7QOs$domhelpersscrollTop = getscrollAccessor("pageYOffset");
function offset(node) {
  var doc = ownerDocument(node);
  var box = {
    top: 0,
    left: 0,
    height: 0,
    width: 0
  };
  var docElem = doc && doc.documentElement;
  if (!docElem || !contains(docElem, node))
    return box;
  if (node.getBoundingClientRect !== void 0)
    box = node.getBoundingClientRect();
  box = {
    top: box.top + $k7QOs$domhelpersscrollTop(docElem) - (docElem.clientTop || 0),
    left: box.left + $k7QOs$domhelpersscrollLeft(docElem) - (docElem.clientLeft || 0),
    width: box.width,
    height: box.height
  };
  return box;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var isHTMLElement = function isHTMLElement2(e) {
  return !!e && "offsetParent" in e;
};
function offsetParent(node) {
  var doc = ownerDocument(node);
  var parent = node && node.offsetParent;
  while (isHTMLElement(parent) && parent.nodeName !== "HTML" && style(parent, "position") === "static") {
    parent = parent.offsetParent;
  }
  return parent || doc.documentElement;
}
var nodeName = function nodeName2(node) {
  return node.nodeName && node.nodeName.toLowerCase();
};
function position(node, offsetParent$1) {
  var parentOffset = {
    top: 0,
    left: 0
  };
  var offset$1;
  if (style(node, "position") === "fixed") {
    offset$1 = node.getBoundingClientRect();
  } else {
    var parent = offsetParent$1 || offsetParent(node);
    offset$1 = offset(node);
    if (nodeName(parent) !== "html")
      parentOffset = offset(parent);
    var borderTop = String(style(parent, "borderTopWidth") || 0);
    parentOffset.top += parseInt(borderTop, 10) - $k7QOs$domhelpersscrollTop(parent) || 0;
    var borderLeft = String(style(parent, "borderLeftWidth") || 0);
    parentOffset.left += parseInt(borderLeft, 10) - $k7QOs$domhelpersscrollLeft(parent) || 0;
  }
  var marginTop = String(style(node, "marginTop") || 0);
  var marginLeft = String(style(node, "marginLeft") || 0);
  return _extends({}, offset$1, {
    top: offset$1.top - parentOffset.top - (parseInt(marginTop, 10) || 0),
    left: offset$1.left - parentOffset.left - (parseInt(marginLeft, 10) || 0)
  });
}
function $parcel$export$6(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $3b117e43dc0ca95d$exports = {};
$parcel$export$6($3b117e43dc0ca95d$exports, "Pressable", () => $3b117e43dc0ca95d$export$27c701ed9e449e99);
var $f6c31cce2adf654f$exports = {};
$parcel$export$6($f6c31cce2adf654f$exports, "usePress", () => $f6c31cce2adf654f$export$45712eceda6fad21);
let $14c0b72509d70225$var$state = "default";
let $14c0b72509d70225$var$savedUserSelect = "";
let $14c0b72509d70225$var$modifiedElementMap = /* @__PURE__ */ new WeakMap();
function $14c0b72509d70225$export$16a4697467175487(target) {
  if ($c87311424ea30a05$export$fedb369cb70207f1()) {
    if ($14c0b72509d70225$var$state === "default") {
      $14c0b72509d70225$var$savedUserSelect = document.documentElement.style.webkitUserSelect;
      document.documentElement.style.webkitUserSelect = "none";
    }
    $14c0b72509d70225$var$state = "disabled";
  } else if (target) {
    $14c0b72509d70225$var$modifiedElementMap.set(target, target.style.userSelect);
    target.style.userSelect = "none";
  }
}
function $14c0b72509d70225$export$b0d6fa1ab32e3295(target) {
  if ($c87311424ea30a05$export$fedb369cb70207f1()) {
    if ($14c0b72509d70225$var$state !== "disabled")
      return;
    $14c0b72509d70225$var$state = "restoring";
    setTimeout(() => {
      $bbed8b41f857bcc0$export$24490316f764c430(() => {
        if ($14c0b72509d70225$var$state === "restoring") {
          if (document.documentElement.style.webkitUserSelect === "none")
            document.documentElement.style.webkitUserSelect = $14c0b72509d70225$var$savedUserSelect || "";
          $14c0b72509d70225$var$savedUserSelect = "";
          $14c0b72509d70225$var$state = "default";
        }
      });
    }, 300);
  } else if (target && $14c0b72509d70225$var$modifiedElementMap.has(target)) {
    let targetOldUserSelect = $14c0b72509d70225$var$modifiedElementMap.get(target);
    if (target.style.userSelect === "none")
      target.style.userSelect = targetOldUserSelect;
    if (target.getAttribute("style") === "")
      target.removeAttribute("style");
    $14c0b72509d70225$var$modifiedElementMap.delete(target);
  }
}
function $8a9cb279dc87e130$export$60278871457622de(event) {
  if (event.mozInputSource === 0 && event.isTrusted)
    return true;
  return event.detail === 0 && !event.pointerType;
}
class $8a9cb279dc87e130$export$905e7fc544a71f36 {
  isDefaultPrevented() {
    return this.nativeEvent.defaultPrevented;
  }
  preventDefault() {
    this.defaultPrevented = true;
    this.nativeEvent.preventDefault();
  }
  stopPropagation() {
    this.nativeEvent.stopPropagation();
    this.isPropagationStopped = () => true;
  }
  isPropagationStopped() {
    return false;
  }
  persist() {
  }
  constructor(type, nativeEvent) {
    this.nativeEvent = nativeEvent;
    this.target = nativeEvent.target;
    this.currentTarget = nativeEvent.currentTarget;
    this.relatedTarget = nativeEvent.relatedTarget;
    this.bubbles = nativeEvent.bubbles;
    this.cancelable = nativeEvent.cancelable;
    this.defaultPrevented = nativeEvent.defaultPrevented;
    this.eventPhase = nativeEvent.eventPhase;
    this.isTrusted = nativeEvent.isTrusted;
    this.timeStamp = nativeEvent.timeStamp;
    this.type = type;
  }
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
  let stateRef = useRef({
    isFocused: false,
    onBlur,
    observer: null
  });
  stateRef.current.onBlur = onBlur;
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    const state = stateRef.current;
    return () => {
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };
  }, []);
  return useCallback((e1) => {
    if (e1.target instanceof HTMLButtonElement || e1.target instanceof HTMLInputElement || e1.target instanceof HTMLTextAreaElement || e1.target instanceof HTMLSelectElement) {
      stateRef.current.isFocused = true;
      let target = e1.target;
      let onBlurHandler = (e) => {
        var _current, ref;
        stateRef.current.isFocused = false;
        if (target.disabled)
          (ref = (_current = stateRef.current).onBlur) === null || ref === void 0 ? void 0 : ref.call(_current, new $8a9cb279dc87e130$export$905e7fc544a71f36("blur", e));
        if (stateRef.current.observer) {
          stateRef.current.observer.disconnect();
          stateRef.current.observer = null;
        }
      };
      target.addEventListener("focusout", onBlurHandler, {
        once: true
      });
      stateRef.current.observer = new MutationObserver(() => {
        if (stateRef.current.isFocused && target.disabled) {
          stateRef.current.observer.disconnect();
          target.dispatchEvent(new FocusEvent("blur"));
          target.dispatchEvent(new FocusEvent("focusout", {
            bubbles: true
          }));
        }
      });
      stateRef.current.observer.observe(target, {
        attributes: true,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, []);
}
const $ae1eeba8b9eafd08$export$5165eccb35aaadb5 = $5lsDl$react.createContext(null);
$ae1eeba8b9eafd08$export$5165eccb35aaadb5.displayName = "PressResponderContext";
function $f6c31cce2adf654f$var$usePressResponderContext(props) {
  let context = useContext($ae1eeba8b9eafd08$export$5165eccb35aaadb5);
  if (context) {
    let { register, ...contextProps } = context;
    props = $3ef42575df84b30b$export$9d1611c77c2fe928(contextProps, props);
    register();
  }
  $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, props.ref);
  return props;
}
function $f6c31cce2adf654f$export$45712eceda6fad21(props) {
  let {
    onPress: onPress1,
    onPressChange: onPressChange1,
    onPressStart: onPressStart1,
    onPressEnd: onPressEnd1,
    onPressUp: onPressUp1,
    isDisabled: isDisabled1,
    isPressed: isPressedProp,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    allowTextSelectionOnPress,
    ref: _,
    ...domProps
  } = $f6c31cce2adf654f$var$usePressResponderContext(props);
  let propsRef = useRef(null);
  propsRef.current = {
    onPress: onPress1,
    onPressChange: onPressChange1,
    onPressStart: onPressStart1,
    onPressEnd: onPressEnd1,
    onPressUp: onPressUp1,
    isDisabled: isDisabled1,
    shouldCancelOnPointerExit
  };
  let [isPressed, setPressed] = useState(false);
  let ref = useRef({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    ignoreClickAfterPress: false,
    didFirePressStart: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null
  });
  let { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6();
  let pressProps1 = useMemo(() => {
    let state = ref.current;
    let triggerPressStart = (originalEvent, pointerType) => {
      let { onPressStart, onPressChange, isDisabled } = propsRef.current;
      if (isDisabled || state.didFirePressStart)
        return;
      if (onPressStart)
        onPressStart({
          type: "pressstart",
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      if (onPressChange)
        onPressChange(true);
      state.didFirePressStart = true;
      setPressed(true);
    };
    let triggerPressEnd = (originalEvent, pointerType, wasPressed = true) => {
      let { onPressEnd, onPressChange, onPress, isDisabled } = propsRef.current;
      if (!state.didFirePressStart)
        return;
      state.ignoreClickAfterPress = true;
      state.didFirePressStart = false;
      if (onPressEnd)
        onPressEnd({
          type: "pressend",
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      if (onPressChange)
        onPressChange(false);
      setPressed(false);
      if (onPress && wasPressed && !isDisabled)
        onPress({
          type: "press",
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
    };
    let triggerPressUp = (originalEvent, pointerType) => {
      let { onPressUp, isDisabled } = propsRef.current;
      if (isDisabled)
        return;
      if (onPressUp)
        onPressUp({
          type: "pressup",
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
    };
    let cancel = (e) => {
      if (state.isPressed) {
        if (state.isOverTarget)
          triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, false);
        state.isPressed = false;
        state.isOverTarget = false;
        state.activePointerId = null;
        state.pointerType = null;
        removeAllGlobalListeners();
        if (!allowTextSelectionOnPress)
          $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
      }
    };
    let pressProps = {
      onKeyDown(e) {
        if ($f6c31cce2adf654f$var$isValidKeyboardEvent(e.nativeEvent) && e.currentTarget.contains(e.target)) {
          if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(e.target))
            e.preventDefault();
          e.stopPropagation();
          if (!state.isPressed && !e.repeat) {
            state.target = e.currentTarget;
            state.isPressed = true;
            triggerPressStart(e, "keyboard");
            addGlobalListener(document, "keyup", onKeyUp, false);
          }
        }
      },
      onKeyUp(e) {
        if ($f6c31cce2adf654f$var$isValidKeyboardEvent(e.nativeEvent) && !e.repeat && e.currentTarget.contains(e.target))
          triggerPressUp($f6c31cce2adf654f$var$createEvent(state.target, e), "keyboard");
      },
      onClick(e) {
        if (e && !e.currentTarget.contains(e.target))
          return;
        if (e && e.button === 0) {
          e.stopPropagation();
          if (isDisabled1)
            e.preventDefault();
          if (!state.ignoreClickAfterPress && !state.ignoreEmulatedMouseEvents && (state.pointerType === "virtual" || $8a9cb279dc87e130$export$60278871457622de(e.nativeEvent))) {
            if (!isDisabled1 && !preventFocusOnPress)
              $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
            triggerPressStart(e, "virtual");
            triggerPressUp(e, "virtual");
            triggerPressEnd(e, "virtual");
          }
          state.ignoreEmulatedMouseEvents = false;
          state.ignoreClickAfterPress = false;
        }
      }
    };
    let onKeyUp = (e) => {
      if (state.isPressed && $f6c31cce2adf654f$var$isValidKeyboardEvent(e)) {
        if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(e.target))
          e.preventDefault();
        e.stopPropagation();
        state.isPressed = false;
        let target = e.target;
        triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), "keyboard", state.target.contains(target));
        removeAllGlobalListeners();
        if (state.target.contains(target) && $f6c31cce2adf654f$var$isHTMLAnchorLink(state.target) || state.target.getAttribute("role") === "link")
          state.target.click();
      }
    };
    if (typeof PointerEvent !== "undefined") {
      pressProps.onPointerDown = (e) => {
        if (e.button !== 0 || !e.currentTarget.contains(e.target))
          return;
        if ($f6c31cce2adf654f$var$isVirtualPointerEvent(e.nativeEvent)) {
          state.pointerType = "virtual";
          return;
        }
        if ($f6c31cce2adf654f$var$shouldPreventDefault(e.currentTarget))
          e.preventDefault();
        state.pointerType = e.pointerType;
        e.stopPropagation();
        if (!state.isPressed) {
          state.isPressed = true;
          state.isOverTarget = true;
          state.activePointerId = e.pointerId;
          state.target = e.currentTarget;
          if (!isDisabled1 && !preventFocusOnPress)
            $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
          if (!allowTextSelectionOnPress)
            $14c0b72509d70225$export$16a4697467175487(state.target);
          triggerPressStart(e, state.pointerType);
          addGlobalListener(document, "pointermove", onPointerMove, false);
          addGlobalListener(document, "pointerup", onPointerUp, false);
          addGlobalListener(document, "pointercancel", onPointerCancel, false);
        }
      };
      pressProps.onMouseDown = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        if (e.button === 0) {
          if ($f6c31cce2adf654f$var$shouldPreventDefault(e.currentTarget))
            e.preventDefault();
          e.stopPropagation();
        }
      };
      pressProps.onPointerUp = (e) => {
        if (!e.currentTarget.contains(e.target) || state.pointerType === "virtual")
          return;
        if (e.button === 0 && $f6c31cce2adf654f$var$isOverTarget(e, e.currentTarget))
          triggerPressUp(e, state.pointerType || e.pointerType);
      };
      let onPointerMove = (e) => {
        if (e.pointerId !== state.activePointerId)
          return;
        if ($f6c31cce2adf654f$var$isOverTarget(e, state.target)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, false);
          if (propsRef.current.shouldCancelOnPointerExit)
            cancel(e);
        }
      };
      let onPointerUp = (e) => {
        if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0) {
          if ($f6c31cce2adf654f$var$isOverTarget(e, state.target))
            triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType);
          else if (state.isOverTarget)
            triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, false);
          state.isPressed = false;
          state.isOverTarget = false;
          state.activePointerId = null;
          state.pointerType = null;
          removeAllGlobalListeners();
          if (!allowTextSelectionOnPress)
            $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
        }
      };
      let onPointerCancel = (e) => {
        cancel(e);
      };
      pressProps.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        cancel(e);
      };
    } else {
      pressProps.onMouseDown = (e) => {
        if (e.button !== 0 || !e.currentTarget.contains(e.target))
          return;
        if ($f6c31cce2adf654f$var$shouldPreventDefault(e.currentTarget))
          e.preventDefault();
        e.stopPropagation();
        if (state.ignoreEmulatedMouseEvents)
          return;
        state.isPressed = true;
        state.isOverTarget = true;
        state.target = e.currentTarget;
        state.pointerType = $8a9cb279dc87e130$export$60278871457622de(e.nativeEvent) ? "virtual" : "mouse";
        if (!isDisabled1 && !preventFocusOnPress)
          $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
        triggerPressStart(e, state.pointerType);
        addGlobalListener(document, "mouseup", onMouseUp, false);
      };
      pressProps.onMouseEnter = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        e.stopPropagation();
        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = true;
          triggerPressStart(e, state.pointerType);
        }
      };
      pressProps.onMouseLeave = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        e.stopPropagation();
        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = false;
          triggerPressEnd(e, state.pointerType, false);
          if (propsRef.current.shouldCancelOnPointerExit)
            cancel(e);
        }
      };
      pressProps.onMouseUp = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        if (!state.ignoreEmulatedMouseEvents && e.button === 0)
          triggerPressUp(e, state.pointerType);
      };
      let onMouseUp = (e) => {
        if (e.button !== 0)
          return;
        state.isPressed = false;
        removeAllGlobalListeners();
        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
          return;
        }
        if ($f6c31cce2adf654f$var$isOverTarget(e, state.target))
          triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType);
        else if (state.isOverTarget)
          triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, false);
        state.isOverTarget = false;
      };
      pressProps.onTouchStart = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        e.stopPropagation();
        let touch = $f6c31cce2adf654f$var$getTouchFromEvent(e.nativeEvent);
        if (!touch)
          return;
        state.activePointerId = touch.identifier;
        state.ignoreEmulatedMouseEvents = true;
        state.isOverTarget = true;
        state.isPressed = true;
        state.target = e.currentTarget;
        state.pointerType = "touch";
        if (!isDisabled1 && !preventFocusOnPress)
          $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
        if (!allowTextSelectionOnPress)
          $14c0b72509d70225$export$16a4697467175487(state.target);
        triggerPressStart(e, state.pointerType);
        addGlobalListener(window, "scroll", onScroll, true);
      };
      pressProps.onTouchMove = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        e.stopPropagation();
        if (!state.isPressed)
          return;
        let touch = $f6c31cce2adf654f$var$getTouchById(e.nativeEvent, state.activePointerId);
        if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e.currentTarget)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart(e, state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd(e, state.pointerType, false);
          if (propsRef.current.shouldCancelOnPointerExit)
            cancel(e);
        }
      };
      pressProps.onTouchEnd = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        e.stopPropagation();
        if (!state.isPressed)
          return;
        let touch = $f6c31cce2adf654f$var$getTouchById(e.nativeEvent, state.activePointerId);
        if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e.currentTarget)) {
          triggerPressUp(e, state.pointerType);
          triggerPressEnd(e, state.pointerType);
        } else if (state.isOverTarget)
          triggerPressEnd(e, state.pointerType, false);
        state.isPressed = false;
        state.activePointerId = null;
        state.isOverTarget = false;
        state.ignoreEmulatedMouseEvents = true;
        if (!allowTextSelectionOnPress)
          $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
        removeAllGlobalListeners();
      };
      pressProps.onTouchCancel = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        e.stopPropagation();
        if (state.isPressed)
          cancel(e);
      };
      let onScroll = (e) => {
        if (state.isPressed && e.target.contains(state.target))
          cancel({
            currentTarget: state.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false
          });
      };
      pressProps.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target))
          return;
        cancel(e);
      };
    }
    return pressProps;
  }, [
    addGlobalListener,
    isDisabled1,
    preventFocusOnPress,
    removeAllGlobalListeners,
    allowTextSelectionOnPress
  ]);
  useEffect(() => {
    return () => {
      if (!allowTextSelectionOnPress)
        $14c0b72509d70225$export$b0d6fa1ab32e3295(ref.current.target);
    };
  }, [
    allowTextSelectionOnPress
  ]);
  return {
    isPressed: isPressedProp || isPressed,
    pressProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, pressProps1)
  };
}
function $f6c31cce2adf654f$var$isHTMLAnchorLink(target) {
  return target.tagName === "A" && target.hasAttribute("href");
}
function $f6c31cce2adf654f$var$isValidKeyboardEvent(event) {
  const { key, code, target } = event;
  const element = target;
  const { tagName, isContentEditable } = element;
  const role = element.getAttribute("role");
  return (key === "Enter" || key === " " || key === "Spacebar" || code === "Space") && tagName !== "INPUT" && tagName !== "TEXTAREA" && isContentEditable !== true && (!$f6c31cce2adf654f$var$isHTMLAnchorLink(element) || role === "button" && key !== "Enter") && !(role === "link" && key !== "Enter");
}
function $f6c31cce2adf654f$var$getTouchFromEvent(event) {
  const { targetTouches } = event;
  if (targetTouches.length > 0)
    return targetTouches[0];
  return null;
}
function $f6c31cce2adf654f$var$getTouchById(event, pointerId) {
  const changedTouches = event.changedTouches;
  for (let i = 0; i < changedTouches.length; i++) {
    const touch = changedTouches[i];
    if (touch.identifier === pointerId)
      return touch;
  }
  return null;
}
function $f6c31cce2adf654f$var$createEvent(target, e) {
  return {
    currentTarget: target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey
  };
}
function $f6c31cce2adf654f$var$getPointClientRect(point) {
  let offsetX = point.width / 2 || point.radiusX || 0;
  let offsetY = point.height / 2 || point.radiusY || 0;
  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX
  };
}
function $f6c31cce2adf654f$var$areRectanglesOverlapping(a, b) {
  if (a.left > b.right || b.left > a.right)
    return false;
  if (a.top > b.bottom || b.top > a.bottom)
    return false;
  return true;
}
function $f6c31cce2adf654f$var$isOverTarget(point, target) {
  let rect = target.getBoundingClientRect();
  let pointRect = $f6c31cce2adf654f$var$getPointClientRect(point);
  return $f6c31cce2adf654f$var$areRectanglesOverlapping(rect, pointRect);
}
function $f6c31cce2adf654f$var$shouldPreventDefault(target) {
  return !target.draggable;
}
function $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(target) {
  return !((target.tagName === "INPUT" || target.tagName === "BUTTON") && target.type === "submit");
}
function $f6c31cce2adf654f$var$isVirtualPointerEvent(event) {
  return event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse";
}
const $3b117e43dc0ca95d$export$27c701ed9e449e99 = /* @__PURE__ */ $5lsDl$react.forwardRef(({ children, ...props }, ref) => {
  let newRef = useRef();
  ref = ref !== null && ref !== void 0 ? ref : newRef;
  let { pressProps } = $f6c31cce2adf654f$export$45712eceda6fad21({
    ...props,
    ref
  });
  let child = $5lsDl$react.Children.only(children);
  return /* @__PURE__ */ $5lsDl$react.cloneElement(child, {
    ref,
    ...$3ef42575df84b30b$export$9d1611c77c2fe928(child.props, pressProps)
  });
});
var $f1ab8c75478c6f73$exports = {};
$parcel$export$6($f1ab8c75478c6f73$exports, "PressResponder", () => $f1ab8c75478c6f73$export$3351871ee4b288b8);
const $f1ab8c75478c6f73$export$3351871ee4b288b8 = /* @__PURE__ */ $5lsDl$react.forwardRef(({ children, ...props }, ref) => {
  let isRegistered = useRef(false);
  let prevContext = useContext($ae1eeba8b9eafd08$export$5165eccb35aaadb5);
  let context = $3ef42575df84b30b$export$9d1611c77c2fe928(prevContext || {}, {
    ...props,
    ref: ref || (prevContext === null || prevContext === void 0 ? void 0 : prevContext.ref),
    register() {
      isRegistered.current = true;
      if (prevContext)
        prevContext.register();
    }
  });
  $e7801be82b4b2a53$export$4debdb1a3f0fa79e(prevContext, ref);
  useEffect(() => {
    if (!isRegistered.current)
      console.warn("A PressResponder was rendered without a pressable child. Either call the usePress hook, or wrap your DOM node with <Pressable> component.");
  }, []);
  return /* @__PURE__ */ $5lsDl$react.createElement($ae1eeba8b9eafd08$export$5165eccb35aaadb5.Provider, {
    value: context
  }, children);
});
var $a1ea59d68270f0dd$exports = {};
$parcel$export$6($a1ea59d68270f0dd$exports, "useFocus", () => $a1ea59d68270f0dd$export$f8168d8dd8fd66e6);
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
  let { isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange } = props;
  const onBlur = useCallback((e) => {
    if (e.target === e.currentTarget) {
      if (onBlurProp)
        onBlurProp(e);
      if (onFocusChange)
        onFocusChange(false);
      return true;
    }
  }, [
    onBlurProp,
    onFocusChange
  ]);
  const onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur);
  const onFocus = useCallback((e) => {
    if (e.target === e.currentTarget) {
      if (onFocusProp)
        onFocusProp(e);
      if (onFocusChange)
        onFocusChange(true);
      onSyntheticFocus(e);
    }
  }, [
    onFocusChange,
    onFocusProp,
    onSyntheticFocus
  ]);
  return {
    focusProps: {
      onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : void 0,
      onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : null
    }
  };
}
var $507fabe10e71c6fb$exports = {};
$parcel$export$6($507fabe10e71c6fb$exports, "isFocusVisible", () => $507fabe10e71c6fb$export$b9b3dfddab17db27);
$parcel$export$6($507fabe10e71c6fb$exports, "getInteractionModality", () => $507fabe10e71c6fb$export$630ff653c5ada6a9);
$parcel$export$6($507fabe10e71c6fb$exports, "setInteractionModality", () => $507fabe10e71c6fb$export$8397ddfc504fdb9a);
$parcel$export$6($507fabe10e71c6fb$exports, "useInteractionModality", () => $507fabe10e71c6fb$export$98e20ec92f614cfe);
$parcel$export$6($507fabe10e71c6fb$exports, "useFocusVisible", () => $507fabe10e71c6fb$export$ffd9e5021c1fb2d6);
$parcel$export$6($507fabe10e71c6fb$exports, "useFocusVisibleListener", () => $507fabe10e71c6fb$export$ec71b4b83ac08ec3);
let $507fabe10e71c6fb$var$currentModality = null;
let $507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set();
let $507fabe10e71c6fb$var$hasSetupGlobalListeners = false;
let $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
let $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
const $507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true
};
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e) {
  for (let handler of $507fabe10e71c6fb$var$changeHandlers)
    handler(modality, e);
}
function $507fabe10e71c6fb$var$isValidKey(e) {
  return !(e.metaKey || !$c87311424ea30a05$export$9ac100e40613ea10() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e) {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
  if ($507fabe10e71c6fb$var$isValidKey(e)) {
    $507fabe10e71c6fb$var$currentModality = "keyboard";
    $507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e);
  }
}
function $507fabe10e71c6fb$var$handlePointerEvent(e) {
  $507fabe10e71c6fb$var$currentModality = "pointer";
  if (e.type === "mousedown" || e.type === "pointerdown") {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e);
  }
}
function $507fabe10e71c6fb$var$handleClickEvent(e) {
  if ($8a9cb279dc87e130$export$60278871457622de(e)) {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$currentModality = "virtual";
  }
}
function $507fabe10e71c6fb$var$handleFocusEvent(e) {
  if (e.target === window || e.target === document)
    return;
  if (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently) {
    $507fabe10e71c6fb$var$currentModality = "virtual";
    $507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e);
  }
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
function $507fabe10e71c6fb$var$setupGlobalFocusEvents() {
  if (typeof window === "undefined" || $507fabe10e71c6fb$var$hasSetupGlobalListeners)
    return;
  let focus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function() {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };
  document.addEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  document.addEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  document.addEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
  window.addEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
  window.addEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    document.addEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else {
    document.addEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  $507fabe10e71c6fb$var$hasSetupGlobalListeners = true;
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading")
    $507fabe10e71c6fb$var$setupGlobalFocusEvents();
  else
    document.addEventListener("DOMContentLoaded", $507fabe10e71c6fb$var$setupGlobalFocusEvents);
}
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
  return $507fabe10e71c6fb$var$currentModality !== "pointer";
}
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
  return $507fabe10e71c6fb$var$currentModality;
}
function $507fabe10e71c6fb$export$8397ddfc504fdb9a(modality) {
  $507fabe10e71c6fb$var$currentModality = modality;
  $507fabe10e71c6fb$var$triggerChangeHandlers(modality, null);
}
function $507fabe10e71c6fb$export$98e20ec92f614cfe() {
  $507fabe10e71c6fb$var$setupGlobalFocusEvents();
  let [modality, setModality] = useState($507fabe10e71c6fb$var$currentModality);
  useEffect(() => {
    let handler = () => {
      setModality($507fabe10e71c6fb$var$currentModality);
    };
    $507fabe10e71c6fb$var$changeHandlers.add(handler);
    return () => {
      $507fabe10e71c6fb$var$changeHandlers.delete(handler);
    };
  }, []);
  return modality;
}
function $507fabe10e71c6fb$var$isKeyboardFocusEvent(isTextInput, modality, e) {
  return !(isTextInput && modality === "keyboard" && e instanceof KeyboardEvent && !$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
function $507fabe10e71c6fb$export$ffd9e5021c1fb2d6(props = {}) {
  let { isTextInput, autoFocus } = props;
  let [isFocusVisibleState, setFocusVisible] = useState(autoFocus || $507fabe10e71c6fb$export$b9b3dfddab17db27());
  $507fabe10e71c6fb$export$ec71b4b83ac08ec3(($507fabe10e71c6fb$export$b9b3dfddab17db272) => {
    setFocusVisible($507fabe10e71c6fb$export$b9b3dfddab17db272);
  }, [
    isTextInput
  ], {
    isTextInput
  });
  return {
    isFocusVisible: isFocusVisibleState
  };
}
function $507fabe10e71c6fb$export$ec71b4b83ac08ec3(fn, deps, opts) {
  $507fabe10e71c6fb$var$setupGlobalFocusEvents();
  useEffect(() => {
    let handler = (modality, e) => {
      if (!$507fabe10e71c6fb$var$isKeyboardFocusEvent(opts === null || opts === void 0 ? void 0 : opts.isTextInput, modality, e))
        return;
      fn($507fabe10e71c6fb$export$b9b3dfddab17db27());
    };
    $507fabe10e71c6fb$var$changeHandlers.add(handler);
    return () => {
      $507fabe10e71c6fb$var$changeHandlers.delete(handler);
    };
  }, deps);
}
var $9ab94262bd0047c7$exports = {};
$parcel$export$6($9ab94262bd0047c7$exports, "useFocusWithin", () => $9ab94262bd0047c7$export$420e68273165f4ec);
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
  let { isDisabled, onBlurWithin, onFocusWithin, onFocusWithinChange } = props;
  let state = useRef({
    isFocusWithin: false
  });
  let onBlur = useCallback((e) => {
    if (state.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
      state.current.isFocusWithin = false;
      if (onBlurWithin)
        onBlurWithin(e);
      if (onFocusWithinChange)
        onFocusWithinChange(false);
    }
  }, [
    onBlurWithin,
    onFocusWithinChange,
    state
  ]);
  let onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur);
  let onFocus = useCallback((e) => {
    if (!state.current.isFocusWithin) {
      if (onFocusWithin)
        onFocusWithin(e);
      if (onFocusWithinChange)
        onFocusWithinChange(true);
      state.current.isFocusWithin = true;
      onSyntheticFocus(e);
    }
  }, [
    onFocusWithin,
    onFocusWithinChange,
    onSyntheticFocus
  ]);
  if (isDisabled)
    return {
      focusWithinProps: {
        onFocus: null,
        onBlur: null
      }
    };
  return {
    focusWithinProps: {
      onFocus,
      onBlur
    }
  };
}
var $6179b936705e76d3$exports = {};
$parcel$export$6($6179b936705e76d3$exports, "useHover", () => $6179b936705e76d3$export$ae780daf29e6d456);
let $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
let $6179b936705e76d3$var$hoverCount = 0;
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
  $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = true;
  setTimeout(() => {
    $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
  }, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e) {
  if (e.pointerType === "touch")
    $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
  if (typeof document === "undefined")
    return;
  if (typeof PointerEvent !== "undefined")
    document.addEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent);
  else
    document.addEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents);
  $6179b936705e76d3$var$hoverCount++;
  return () => {
    $6179b936705e76d3$var$hoverCount--;
    if ($6179b936705e76d3$var$hoverCount > 0)
      return;
    if (typeof PointerEvent !== "undefined")
      document.removeEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent);
    else
      document.removeEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents);
  };
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
  let { onHoverStart, onHoverChange, onHoverEnd, isDisabled } = props;
  let [isHovered, setHovered] = useState(false);
  let state = useRef({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: "",
    target: null
  }).current;
  useEffect($6179b936705e76d3$var$setupGlobalTouchEvents, []);
  let { hoverProps: hoverProps1, triggerHoverEnd: triggerHoverEnd1 } = useMemo(() => {
    let triggerHoverStart = (event, pointerType) => {
      state.pointerType = pointerType;
      if (isDisabled || pointerType === "touch" || state.isHovered || !event.currentTarget.contains(event.target))
        return;
      state.isHovered = true;
      let target = event.currentTarget;
      state.target = target;
      if (onHoverStart)
        onHoverStart({
          type: "hoverstart",
          target,
          pointerType
        });
      if (onHoverChange)
        onHoverChange(true);
      setHovered(true);
    };
    let triggerHoverEnd = (event, pointerType) => {
      state.pointerType = "";
      state.target = null;
      if (pointerType === "touch" || !state.isHovered)
        return;
      state.isHovered = false;
      let target = event.currentTarget;
      if (onHoverEnd)
        onHoverEnd({
          type: "hoverend",
          target,
          pointerType
        });
      if (onHoverChange)
        onHoverChange(false);
      setHovered(false);
    };
    let hoverProps = {};
    if (typeof PointerEvent !== "undefined") {
      hoverProps.onPointerEnter = (e) => {
        if ($6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && e.pointerType === "mouse")
          return;
        triggerHoverStart(e, e.pointerType);
      };
      hoverProps.onPointerLeave = (e) => {
        if (!isDisabled && e.currentTarget.contains(e.target))
          triggerHoverEnd(e, e.pointerType);
      };
    } else {
      hoverProps.onTouchStart = () => {
        state.ignoreEmulatedMouseEvents = true;
      };
      hoverProps.onMouseEnter = (e) => {
        if (!state.ignoreEmulatedMouseEvents && !$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents)
          triggerHoverStart(e, "mouse");
        state.ignoreEmulatedMouseEvents = false;
      };
      hoverProps.onMouseLeave = (e) => {
        if (!isDisabled && e.currentTarget.contains(e.target))
          triggerHoverEnd(e, "mouse");
      };
    }
    return {
      hoverProps,
      triggerHoverEnd
    };
  }, [
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled,
    state
  ]);
  useEffect(() => {
    if (isDisabled)
      triggerHoverEnd1({
        currentTarget: state.target
      }, state.pointerType);
  }, [
    isDisabled
  ]);
  return {
    hoverProps: hoverProps1,
    isHovered
  };
}
var $e0b6e0b68ec7f50f$exports = {};
$parcel$export$6($e0b6e0b68ec7f50f$exports, "useInteractOutside", () => $e0b6e0b68ec7f50f$export$872b660ac5a1ff98);
function $e0b6e0b68ec7f50f$export$872b660ac5a1ff98(props) {
  let { ref, onInteractOutside, isDisabled, onInteractOutsideStart } = props;
  let stateRef = useRef({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
    onInteractOutside,
    onInteractOutsideStart
  });
  let state = stateRef.current;
  state.onInteractOutside = onInteractOutside;
  state.onInteractOutsideStart = onInteractOutsideStart;
  useEffect(() => {
    if (isDisabled)
      return;
    let onPointerDown = (e) => {
      if ($e0b6e0b68ec7f50f$var$isValidEvent(e, ref) && state.onInteractOutside) {
        if (state.onInteractOutsideStart)
          state.onInteractOutsideStart(e);
        state.isPointerDown = true;
      }
    };
    if (typeof PointerEvent !== "undefined") {
      let onPointerUp = (e) => {
        if (state.isPointerDown && state.onInteractOutside && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      };
      document.addEventListener("pointerdown", onPointerDown, true);
      document.addEventListener("pointerup", onPointerUp, true);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown, true);
        document.removeEventListener("pointerup", onPointerUp, true);
      };
    } else {
      let onMouseUp = (e) => {
        if (state.ignoreEmulatedMouseEvents)
          state.ignoreEmulatedMouseEvents = false;
        else if (state.isPointerDown && state.onInteractOutside && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      };
      let onTouchEnd = (e) => {
        state.ignoreEmulatedMouseEvents = true;
        if (state.onInteractOutside && state.isPointerDown && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      };
      document.addEventListener("mousedown", onPointerDown, true);
      document.addEventListener("mouseup", onMouseUp, true);
      document.addEventListener("touchstart", onPointerDown, true);
      document.addEventListener("touchend", onTouchEnd, true);
      return () => {
        document.removeEventListener("mousedown", onPointerDown, true);
        document.removeEventListener("mouseup", onMouseUp, true);
        document.removeEventListener("touchstart", onPointerDown, true);
        document.removeEventListener("touchend", onTouchEnd, true);
      };
    }
  }, [
    ref,
    state,
    isDisabled
  ]);
}
function $e0b6e0b68ec7f50f$var$isValidEvent(event, ref) {
  if (event.button > 0)
    return false;
  if (event.target) {
    const ownerDocument2 = event.target.ownerDocument;
    if (!ownerDocument2 || !ownerDocument2.documentElement.contains(event.target))
      return false;
  }
  return ref.current && !ref.current.contains(event.target);
}
var $46d819fcbaf35654$exports = {};
$parcel$export$6($46d819fcbaf35654$exports, "useKeyboard", () => $46d819fcbaf35654$export$8f71654801c2f7cd);
function $93925083ecbb358c$export$48d1ea6320830260(handler) {
  if (!handler)
    return;
  let shouldStopPropagation = true;
  return (e) => {
    let event = {
      ...e,
      preventDefault() {
        e.preventDefault();
      },
      isDefaultPrevented() {
        return e.isDefaultPrevented();
      },
      stopPropagation() {
        console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.");
      },
      continuePropagation() {
        shouldStopPropagation = false;
      }
    };
    handler(event);
    if (shouldStopPropagation)
      e.stopPropagation();
  };
}
function $46d819fcbaf35654$export$8f71654801c2f7cd(props) {
  return {
    keyboardProps: props.isDisabled ? {} : {
      onKeyDown: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyDown),
      onKeyUp: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyUp)
    }
  };
}
var $e8a7022cf87cba2a$exports = {};
$parcel$export$6($e8a7022cf87cba2a$exports, "useMove", () => $e8a7022cf87cba2a$export$36da96379f79f245);
function $e8a7022cf87cba2a$export$36da96379f79f245(props) {
  let { onMoveStart, onMove, onMoveEnd } = props;
  let state = useRef({
    didMove: false,
    lastPosition: null,
    id: null
  });
  let { addGlobalListener, removeGlobalListener } = $03deb23ff14920c4$export$4eaf04e54aa8eed6();
  let moveProps1 = useMemo(() => {
    let moveProps = {};
    let start = () => {
      $14c0b72509d70225$export$16a4697467175487();
      state.current.didMove = false;
    };
    let move = (originalEvent, pointerType, deltaX, deltaY) => {
      if (deltaX === 0 && deltaY === 0)
        return;
      if (!state.current.didMove) {
        state.current.didMove = true;
        onMoveStart === null || onMoveStart === void 0 ? void 0 : onMoveStart({
          type: "movestart",
          pointerType,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }
      onMove({
        type: "move",
        pointerType,
        deltaX,
        deltaY,
        shiftKey: originalEvent.shiftKey,
        metaKey: originalEvent.metaKey,
        ctrlKey: originalEvent.ctrlKey,
        altKey: originalEvent.altKey
      });
    };
    let end = (originalEvent, pointerType) => {
      $14c0b72509d70225$export$b0d6fa1ab32e3295();
      if (state.current.didMove)
        onMoveEnd === null || onMoveEnd === void 0 ? void 0 : onMoveEnd({
          type: "moveend",
          pointerType,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
    };
    if (typeof PointerEvent === "undefined") {
      let onMouseMove = (e) => {
        if (e.button === 0) {
          move(e, "mouse", e.pageX - state.current.lastPosition.pageX, e.pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
        }
      };
      let onMouseUp = (e) => {
        if (e.button === 0) {
          end(e, "mouse");
          removeGlobalListener(window, "mousemove", onMouseMove, false);
          removeGlobalListener(window, "mouseup", onMouseUp, false);
        }
      };
      moveProps.onMouseDown = (e) => {
        if (e.button === 0) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
          addGlobalListener(window, "mousemove", onMouseMove, false);
          addGlobalListener(window, "mouseup", onMouseUp, false);
        }
      };
      let onTouchMove = (e) => {
        let touch = [
          ...e.changedTouches
        ].findIndex(({ identifier }) => identifier === state.current.id);
        if (touch >= 0) {
          let { pageX, pageY } = e.changedTouches[touch];
          move(e, "touch", pageX - state.current.lastPosition.pageX, pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX,
            pageY
          };
        }
      };
      let onTouchEnd = (e) => {
        let touch = [
          ...e.changedTouches
        ].findIndex(({ identifier }) => identifier === state.current.id);
        if (touch >= 0) {
          end(e, "touch");
          state.current.id = null;
          removeGlobalListener(window, "touchmove", onTouchMove);
          removeGlobalListener(window, "touchend", onTouchEnd);
          removeGlobalListener(window, "touchcancel", onTouchEnd);
        }
      };
      moveProps.onTouchStart = (e) => {
        if (e.changedTouches.length === 0 || state.current.id != null)
          return;
        let { pageX, pageY, identifier } = e.changedTouches[0];
        start();
        e.stopPropagation();
        e.preventDefault();
        state.current.lastPosition = {
          pageX,
          pageY
        };
        state.current.id = identifier;
        addGlobalListener(window, "touchmove", onTouchMove, false);
        addGlobalListener(window, "touchend", onTouchEnd, false);
        addGlobalListener(window, "touchcancel", onTouchEnd, false);
      };
    } else {
      let onPointerMove = (e) => {
        if (e.pointerId === state.current.id) {
          let pointerType = e.pointerType || "mouse";
          move(e, pointerType, e.pageX - state.current.lastPosition.pageX, e.pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
        }
      };
      let onPointerUp = (e) => {
        if (e.pointerId === state.current.id) {
          let pointerType = e.pointerType || "mouse";
          end(e, pointerType);
          state.current.id = null;
          removeGlobalListener(window, "pointermove", onPointerMove, false);
          removeGlobalListener(window, "pointerup", onPointerUp, false);
          removeGlobalListener(window, "pointercancel", onPointerUp, false);
        }
      };
      moveProps.onPointerDown = (e) => {
        if (e.button === 0 && state.current.id == null) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
          state.current.id = e.pointerId;
          addGlobalListener(window, "pointermove", onPointerMove, false);
          addGlobalListener(window, "pointerup", onPointerUp, false);
          addGlobalListener(window, "pointercancel", onPointerUp, false);
        }
      };
    }
    let triggerKeyboardMove = (e, deltaX, deltaY) => {
      start();
      move(e, "keyboard", deltaX, deltaY);
      end(e, "keyboard");
    };
    moveProps.onKeyDown = (e) => {
      switch (e.key) {
        case "Left":
        case "ArrowLeft":
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(e, -1, 0);
          break;
        case "Right":
        case "ArrowRight":
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(e, 1, 0);
          break;
        case "Up":
        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(e, 0, -1);
          break;
        case "Down":
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(e, 0, 1);
          break;
      }
    };
    return moveProps;
  }, [
    state,
    onMoveStart,
    onMove,
    onMoveEnd,
    addGlobalListener,
    removeGlobalListener
  ]);
  return {
    moveProps: moveProps1
  };
}
var $7d0a636d7a4dcefd$exports = {};
$parcel$export$6($7d0a636d7a4dcefd$exports, "useScrollWheel", () => $7d0a636d7a4dcefd$export$2123ff2b87c81ca);
function $7d0a636d7a4dcefd$export$2123ff2b87c81ca(props, ref) {
  let { onScroll, isDisabled } = props;
  let onScrollHandler = useCallback((e) => {
    if (e.ctrlKey)
      return;
    e.preventDefault();
    e.stopPropagation();
    if (onScroll)
      onScroll({
        deltaX: e.deltaX,
        deltaY: e.deltaY
      });
  }, [
    onScroll
  ]);
  $e9faafb641e167db$export$90fc3a17d93f704c(ref, "wheel", isDisabled ? null : onScrollHandler);
}
var $8a26561d2877236e$exports = {};
$parcel$export$6($8a26561d2877236e$exports, "useLongPress", () => $8a26561d2877236e$export$c24ed0104d07eab9);
const $8a26561d2877236e$var$DEFAULT_THRESHOLD = 500;
function $8a26561d2877236e$export$c24ed0104d07eab9(props) {
  let { isDisabled, onLongPressStart, onLongPressEnd, onLongPress, threshold = $8a26561d2877236e$var$DEFAULT_THRESHOLD, accessibilityDescription } = props;
  const timeRef = useRef(null);
  let { addGlobalListener, removeGlobalListener } = $03deb23ff14920c4$export$4eaf04e54aa8eed6();
  let { pressProps } = $f6c31cce2adf654f$export$45712eceda6fad21({
    isDisabled,
    onPressStart(e1) {
      if (e1.pointerType === "mouse" || e1.pointerType === "touch") {
        if (onLongPressStart)
          onLongPressStart({
            ...e1,
            type: "longpressstart"
          });
        timeRef.current = setTimeout(() => {
          e1.target.dispatchEvent(new PointerEvent("pointercancel", {
            bubbles: true
          }));
          if (onLongPress)
            onLongPress({
              ...e1,
              type: "longpress"
            });
          timeRef.current = null;
        }, threshold);
        if (e1.pointerType === "touch") {
          let onContextMenu = (e) => {
            e.preventDefault();
          };
          addGlobalListener(e1.target, "contextmenu", onContextMenu, {
            once: true
          });
          addGlobalListener(window, "pointerup", () => {
            setTimeout(() => {
              removeGlobalListener(e1.target, "contextmenu", onContextMenu);
            }, 30);
          }, {
            once: true
          });
        }
      }
    },
    onPressEnd(e) {
      if (timeRef.current)
        clearTimeout(timeRef.current);
      if (onLongPressEnd && (e.pointerType === "mouse" || e.pointerType === "touch"))
        onLongPressEnd({
          ...e,
          type: "longpressend"
        });
    }
  });
  let descriptionProps = $ef06256079686ba0$export$f8aeda7b10753fa1(onLongPress && !isDisabled ? accessibilityDescription : null);
  return {
    longPressProps: $3ef42575df84b30b$export$9d1611c77c2fe928(pressProps, descriptionProps)
  };
}
function $parcel$export$5(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $5c3e21d68f1c4674$exports = {};
$parcel$export$5($5c3e21d68f1c4674$exports, "useVisuallyHidden", () => $5c3e21d68f1c4674$export$a966af930f325cab);
$parcel$export$5($5c3e21d68f1c4674$exports, "VisuallyHidden", () => $5c3e21d68f1c4674$export$439d29a4e110a164);
const $5c3e21d68f1c4674$var$styles = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  margin: "0 -1px -1px 0",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1,
  whiteSpace: "nowrap"
};
function $5c3e21d68f1c4674$export$a966af930f325cab(props = {}) {
  let { style: style2, isFocusable } = props;
  let [isFocused, setFocused] = useState(false);
  let { focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6({
    isDisabled: !isFocusable,
    onFocusChange: setFocused
  });
  let combinedStyles = useMemo(() => {
    if (isFocused)
      return style2;
    else if (style2)
      return {
        ...$5c3e21d68f1c4674$var$styles,
        ...style2
      };
    else
      return $5c3e21d68f1c4674$var$styles;
  }, [
    isFocused
  ]);
  return {
    visuallyHiddenProps: {
      ...focusProps,
      style: combinedStyles
    }
  };
}
function $5c3e21d68f1c4674$export$439d29a4e110a164(props) {
  let { children, elementType: Element2 = "div", isFocusable, style: style2, ...otherProps } = props;
  let { visuallyHiddenProps } = $5c3e21d68f1c4674$export$a966af930f325cab(props);
  return /* @__PURE__ */ $5lsDl$react.createElement(Element2, $3ef42575df84b30b$export$9d1611c77c2fe928(otherProps, visuallyHiddenProps), children);
}
function $parcel$export$4(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
function $parcel$interopDefault$3(a) {
  return a && a.__esModule ? a.default : a;
}
var $2a41e45df1593e64$exports = {};
$parcel$export$4($2a41e45df1593e64$exports, "useOverlayPosition", () => $2a41e45df1593e64$export$d39e1813b3bdd0e1);
const $edcf132a9284368a$var$AXIS = {
  top: "top",
  bottom: "top",
  left: "left",
  right: "left"
};
const $edcf132a9284368a$var$FLIPPED_DIRECTION = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const $edcf132a9284368a$var$CROSS_AXIS = {
  top: "left",
  left: "top"
};
const $edcf132a9284368a$var$AXIS_SIZE = {
  top: "height",
  left: "width"
};
const $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE = {};
let $edcf132a9284368a$var$visualViewport = typeof window !== "undefined" && window.visualViewport;
function $edcf132a9284368a$var$getContainerDimensions(containerNode) {
  let width = 0, height = 0, top = 0, left = 0;
  let scroll = {};
  if (containerNode.tagName === "BODY") {
    var ref;
    width = (ref = $edcf132a9284368a$var$visualViewport === null || $edcf132a9284368a$var$visualViewport === void 0 ? void 0 : $edcf132a9284368a$var$visualViewport.width) !== null && ref !== void 0 ? ref : document.documentElement.clientWidth;
    var ref1;
    height = (ref1 = $edcf132a9284368a$var$visualViewport === null || $edcf132a9284368a$var$visualViewport === void 0 ? void 0 : $edcf132a9284368a$var$visualViewport.height) !== null && ref1 !== void 0 ? ref1 : document.documentElement.clientHeight;
    scroll.top = $k7QOs$domhelpersscrollTop(ownerDocument(containerNode).documentElement) || $k7QOs$domhelpersscrollTop(containerNode);
    scroll.left = $k7QOs$domhelpersscrollLeft(ownerDocument(containerNode).documentElement) || $k7QOs$domhelpersscrollLeft(containerNode);
  } else {
    ({ width, height, top, left } = offset(containerNode));
    scroll.top = $k7QOs$domhelpersscrollTop(containerNode);
    scroll.left = $k7QOs$domhelpersscrollLeft(containerNode);
  }
  return {
    width,
    height,
    scroll,
    top,
    left
  };
}
function $edcf132a9284368a$var$getScroll(node) {
  return {
    top: node.scrollTop,
    left: node.scrollLeft,
    width: node.scrollWidth,
    height: node.scrollHeight
  };
}
function $edcf132a9284368a$var$getDelta(axis, offset2, size, containerDimensions, padding) {
  let containerScroll = containerDimensions.scroll[axis];
  let containerHeight = containerDimensions[$edcf132a9284368a$var$AXIS_SIZE[axis]];
  let startEdgeOffset = offset2 - padding - containerScroll;
  let endEdgeOffset = offset2 + padding - containerScroll + size;
  if (startEdgeOffset < 0)
    return -startEdgeOffset;
  else if (endEdgeOffset > containerHeight)
    return Math.max(containerHeight - endEdgeOffset, -startEdgeOffset);
  else
    return 0;
}
function $edcf132a9284368a$var$getMargins(node) {
  let style2 = window.getComputedStyle(node);
  return {
    top: parseInt(style2.marginTop, 10) || 0,
    bottom: parseInt(style2.marginBottom, 10) || 0,
    left: parseInt(style2.marginLeft, 10) || 0,
    right: parseInt(style2.marginRight, 10) || 0
  };
}
function $edcf132a9284368a$var$parsePlacement(input) {
  if ($edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input])
    return $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input];
  let [placement, crossPlacement] = input.split(" ");
  let axis = $edcf132a9284368a$var$AXIS[placement] || "right";
  let crossAxis = $edcf132a9284368a$var$CROSS_AXIS[axis];
  if (!$edcf132a9284368a$var$AXIS[crossPlacement])
    crossPlacement = "center";
  let size = $edcf132a9284368a$var$AXIS_SIZE[axis];
  let crossSize = $edcf132a9284368a$var$AXIS_SIZE[crossAxis];
  $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input] = {
    placement,
    crossPlacement,
    axis,
    crossAxis,
    size,
    crossSize
  };
  return $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input];
}
function $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset2, crossOffset, containerOffsetWithBoundary, isContainerPositioned) {
  let { placement, crossPlacement, axis, crossAxis, size, crossSize } = placementInfo;
  let position2 = {};
  position2[crossAxis] = childOffset[crossAxis];
  if (crossPlacement === "center")
    position2[crossAxis] += (childOffset[crossSize] - overlaySize[crossSize]) / 2;
  else if (crossPlacement !== crossAxis)
    position2[crossAxis] += childOffset[crossSize] - overlaySize[crossSize];
  position2[crossAxis] += crossOffset;
  let minViablePosition = childOffset[crossAxis] + childOffset[crossSize] / 2 - overlaySize[crossSize];
  let maxViablePosition = childOffset[crossAxis] + childOffset[crossSize] / 2;
  position2[crossAxis] = Math.min(Math.max(minViablePosition, position2[crossAxis]), maxViablePosition);
  if (placement === axis) {
    const containerHeight = isContainerPositioned ? containerOffsetWithBoundary[size] : boundaryDimensions[size];
    position2[$edcf132a9284368a$var$FLIPPED_DIRECTION[axis]] = Math.floor(containerHeight - childOffset[axis] + offset2);
  } else
    position2[axis] = Math.floor(childOffset[axis] + childOffset[size] + offset2);
  return position2;
}
function $edcf132a9284368a$var$getMaxHeight(position2, boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding) {
  return position2.top != null ? Math.max(0, boundaryDimensions.height + boundaryDimensions.top + boundaryDimensions.scroll.top - (containerOffsetWithBoundary.top + position2.top) - (margins.top + margins.bottom + padding)) : Math.max(0, childOffset.top + containerOffsetWithBoundary.top - (boundaryDimensions.top + boundaryDimensions.scroll.top) - (margins.top + margins.bottom + padding));
}
function $edcf132a9284368a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding, placementInfo) {
  let { placement, axis, size } = placementInfo;
  if (placement === axis)
    return Math.max(0, childOffset[axis] - boundaryDimensions[axis] - boundaryDimensions.scroll[axis] + containerOffsetWithBoundary[axis] - margins[axis] - margins[$edcf132a9284368a$var$FLIPPED_DIRECTION[axis]] - padding);
  return Math.max(0, boundaryDimensions[size] + boundaryDimensions[axis] + boundaryDimensions.scroll[axis] - containerOffsetWithBoundary[axis] - childOffset[axis] - childOffset[size] - margins[axis] - margins[$edcf132a9284368a$var$FLIPPED_DIRECTION[axis]] - padding);
}
function $edcf132a9284368a$export$6839422d1f33cee9(placementInput, childOffset, overlaySize, scrollSize, margins, padding, flip, boundaryDimensions, containerOffsetWithBoundary, offset2, crossOffset, isContainerPositioned, userSetMaxHeight) {
  let placementInfo = $edcf132a9284368a$var$parsePlacement(placementInput);
  let { size, crossAxis, crossSize, placement, crossPlacement } = placementInfo;
  let position2 = $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset2, crossOffset, containerOffsetWithBoundary, isContainerPositioned);
  let normalizedOffset = offset2;
  let space = $edcf132a9284368a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset2, placementInfo);
  if (flip && scrollSize[size] > space) {
    let flippedPlacementInfo = $edcf132a9284368a$var$parsePlacement(`${$edcf132a9284368a$var$FLIPPED_DIRECTION[placement]} ${crossPlacement}`);
    let flippedPosition = $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, flippedPlacementInfo, offset2, crossOffset, containerOffsetWithBoundary, isContainerPositioned);
    let flippedSpace = $edcf132a9284368a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset2, flippedPlacementInfo);
    if (flippedSpace > space) {
      placementInfo = flippedPlacementInfo;
      position2 = flippedPosition;
      normalizedOffset = offset2;
    }
  }
  let delta = $edcf132a9284368a$var$getDelta(crossAxis, position2[crossAxis], overlaySize[crossSize], boundaryDimensions, padding);
  position2[crossAxis] += delta;
  let maxHeight = $edcf132a9284368a$var$getMaxHeight(position2, boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding);
  if (userSetMaxHeight && userSetMaxHeight < maxHeight)
    maxHeight = userSetMaxHeight;
  overlaySize.height = Math.min(overlaySize.height, maxHeight);
  position2 = $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, normalizedOffset, crossOffset, containerOffsetWithBoundary, isContainerPositioned);
  delta = $edcf132a9284368a$var$getDelta(crossAxis, position2[crossAxis], overlaySize[crossSize], boundaryDimensions, padding);
  position2[crossAxis] += delta;
  let arrowPosition = {};
  arrowPosition[crossAxis] = childOffset[crossAxis] - position2[crossAxis] + childOffset[crossSize] / 2;
  return {
    position: position2,
    maxHeight,
    arrowOffsetLeft: arrowPosition.left,
    arrowOffsetTop: arrowPosition.top,
    placement: placementInfo.placement
  };
}
function $edcf132a9284368a$export$b3ceb0cbf1056d98(opts) {
  let { placement, targetNode, overlayNode, scrollNode, padding, shouldFlip, boundaryElement, offset: offset$1, crossOffset, maxHeight } = opts;
  let container = overlayNode.offsetParent || document.body;
  let isBodyContainer = container.tagName === "BODY";
  const containerPositionStyle = window.getComputedStyle(container).position;
  let isContainerPositioned = !!containerPositionStyle && containerPositionStyle !== "static";
  let childOffset = isBodyContainer ? offset(targetNode) : position(targetNode, container);
  if (!isBodyContainer) {
    let marginTop = String(style(targetNode, "marginTop"));
    let marginLeft = String(style(targetNode, "marginLeft"));
    childOffset.top += parseInt(marginTop, 10) || 0;
    childOffset.left += parseInt(marginLeft, 10) || 0;
  }
  let overlaySize = offset(overlayNode);
  let margins = $edcf132a9284368a$var$getMargins(overlayNode);
  overlaySize.width += margins.left + margins.right;
  overlaySize.height += margins.top + margins.bottom;
  let scrollSize = $edcf132a9284368a$var$getScroll(scrollNode);
  let boundaryDimensions = $edcf132a9284368a$var$getContainerDimensions(boundaryElement);
  let containerOffsetWithBoundary = boundaryElement.tagName === "BODY" ? offset(container) : position(container, boundaryElement);
  return $edcf132a9284368a$export$6839422d1f33cee9(placement, childOffset, overlaySize, scrollSize, margins, padding, shouldFlip, boundaryDimensions, containerOffsetWithBoundary, offset$1, crossOffset, isContainerPositioned, maxHeight);
}
const $dd149f63282afbbf$export$f6211563215e3b37 = /* @__PURE__ */ new WeakMap();
function $dd149f63282afbbf$export$18fc8428861184da(opts) {
  let { triggerRef, isOpen, onClose } = opts;
  useEffect(() => {
    if (!isOpen)
      return;
    let onScroll = (e) => {
      let target = e.target;
      if (!triggerRef.current || target instanceof Node && !target.contains(triggerRef.current))
        return;
      let onCloseHandler = onClose || $dd149f63282afbbf$export$f6211563215e3b37.get(triggerRef.current);
      if (onCloseHandler)
        onCloseHandler();
    };
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [
    isOpen,
    onClose,
    triggerRef
  ]);
}
let $2a41e45df1593e64$var$visualViewport = typeof window !== "undefined" && window.visualViewport;
function $2a41e45df1593e64$export$d39e1813b3bdd0e1(props) {
  let { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let { targetRef, overlayRef, scrollRef = overlayRef, placement = "bottom", containerPadding = 12, shouldFlip = true, boundaryElement = typeof document !== "undefined" ? document.body : null, offset: offset2 = 0, crossOffset = 0, shouldUpdatePosition = true, isOpen = true, onClose, maxHeight } = props;
  let [position2, setPosition] = useState({
    position: {},
    arrowOffsetLeft: void 0,
    arrowOffsetTop: void 0,
    maxHeight: void 0,
    placement: void 0
  });
  let deps = [
    shouldUpdatePosition,
    placement,
    overlayRef.current,
    targetRef.current,
    scrollRef.current,
    containerPadding,
    shouldFlip,
    boundaryElement,
    offset2,
    crossOffset,
    isOpen,
    direction,
    maxHeight
  ];
  let updatePosition = useCallback(() => {
    if (shouldUpdatePosition === false || !isOpen || !overlayRef.current || !targetRef.current || !scrollRef.current || !boundaryElement)
      return;
    setPosition($edcf132a9284368a$export$b3ceb0cbf1056d98({
      placement: $2a41e45df1593e64$var$translateRTL(placement, direction),
      overlayNode: overlayRef.current,
      targetNode: targetRef.current,
      scrollNode: scrollRef.current,
      padding: containerPadding,
      shouldFlip,
      boundaryElement,
      offset: offset2,
      crossOffset,
      maxHeight
    }));
  }, deps);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(updatePosition, deps);
  $2a41e45df1593e64$var$useResize(updatePosition);
  let isResizing = useRef(false);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    let timeout;
    let onResize = () => {
      isResizing.current = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isResizing.current = false;
      }, 500);
      updatePosition();
    };
    $2a41e45df1593e64$var$visualViewport === null || $2a41e45df1593e64$var$visualViewport === void 0 ? void 0 : $2a41e45df1593e64$var$visualViewport.addEventListener("resize", onResize);
    return () => {
      $2a41e45df1593e64$var$visualViewport === null || $2a41e45df1593e64$var$visualViewport === void 0 ? void 0 : $2a41e45df1593e64$var$visualViewport.removeEventListener("resize", onResize);
    };
  }, [
    updatePosition
  ]);
  let close = useCallback(() => {
    if (!isResizing.current)
      onClose();
  }, [
    onClose,
    isResizing
  ]);
  $dd149f63282afbbf$export$18fc8428861184da({
    triggerRef: targetRef,
    isOpen,
    onClose: onClose ? close : void 0
  });
  return {
    overlayProps: {
      style: {
        position: "absolute",
        zIndex: 1e5,
        ...position2.position,
        maxHeight: position2.maxHeight
      }
    },
    placement: position2.placement,
    arrowProps: {
      style: {
        left: position2.arrowOffsetLeft,
        top: position2.arrowOffsetTop
      }
    },
    updatePosition
  };
}
function $2a41e45df1593e64$var$useResize(onResize) {
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, [
    onResize
  ]);
}
function $2a41e45df1593e64$var$translateRTL(position2, direction) {
  if (direction === "rtl")
    return position2.replace("start", "right").replace("end", "left");
  return position2.replace("start", "left").replace("end", "right");
}
var $a11501f3d1d39e6c$exports = {};
$parcel$export$4($a11501f3d1d39e6c$exports, "useOverlay", () => $a11501f3d1d39e6c$export$ea8f71083e90600f);
const $a11501f3d1d39e6c$var$visibleOverlays = [];
function $a11501f3d1d39e6c$export$ea8f71083e90600f(props, ref) {
  let { onClose, shouldCloseOnBlur, isOpen, isDismissable = false, isKeyboardDismissDisabled = false, shouldCloseOnInteractOutside } = props;
  useEffect(() => {
    if (isOpen)
      $a11501f3d1d39e6c$var$visibleOverlays.push(ref);
    return () => {
      let index = $a11501f3d1d39e6c$var$visibleOverlays.indexOf(ref);
      if (index >= 0)
        $a11501f3d1d39e6c$var$visibleOverlays.splice(index, 1);
    };
  }, [
    isOpen,
    ref
  ]);
  let onHide = () => {
    if ($a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref && onClose)
      onClose();
  };
  let onInteractOutsideStart = (e) => {
    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target)) {
      if ($a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  };
  let onInteractOutside = (e) => {
    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target)) {
      if ($a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref) {
        e.stopPropagation();
        e.preventDefault();
      }
      onHide();
    }
  };
  let onKeyDown = (e) => {
    if (e.key === "Escape" && !isKeyboardDismissDisabled) {
      e.stopPropagation();
      e.preventDefault();
      onHide();
    }
  };
  $e0b6e0b68ec7f50f$export$872b660ac5a1ff98({
    ref,
    onInteractOutside: isDismissable ? onInteractOutside : null,
    onInteractOutsideStart
  });
  let { focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
    isDisabled: !shouldCloseOnBlur,
    onBlurWithin: (e) => {
      if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.relatedTarget))
        onClose();
    }
  });
  let onPointerDownUnderlay = (e) => {
    if (e.target === e.currentTarget)
      e.preventDefault();
  };
  return {
    overlayProps: {
      onKeyDown,
      ...focusWithinProps
    },
    underlayProps: {
      onPointerDown: onPointerDownUnderlay
    }
  };
}
var $628037886ba31236$exports = {};
$parcel$export$4($628037886ba31236$exports, "useOverlayTrigger", () => $628037886ba31236$export$f9d5c8beee7d008d);
function $628037886ba31236$export$f9d5c8beee7d008d(props, state, ref) {
  let { type } = props;
  let { isOpen } = state;
  useEffect(() => {
    if (ref && ref.current)
      $dd149f63282afbbf$export$f6211563215e3b37.set(ref.current, state.close);
  });
  let ariaHasPopup = void 0;
  if (type === "menu")
    ariaHasPopup = true;
  else if (type === "listbox")
    ariaHasPopup = "listbox";
  let overlayId = $bdb11010cef70236$export$f680877a34711e37();
  return {
    triggerProps: {
      "aria-haspopup": ariaHasPopup,
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? overlayId : null
    },
    overlayProps: {
      id: overlayId
    }
  };
}
var $49c51c25361d4cd2$exports = {};
$parcel$export$4($49c51c25361d4cd2$exports, "usePreventScroll", () => $49c51c25361d4cd2$export$ee0f7cc6afcd1c18);
const $49c51c25361d4cd2$var$visualViewport = typeof window !== "undefined" && window.visualViewport;
const $49c51c25361d4cd2$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function $49c51c25361d4cd2$export$ee0f7cc6afcd1c18(options = {}) {
  let { isDisabled } = options;
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    if (isDisabled)
      return;
    if ($c87311424ea30a05$export$fedb369cb70207f1())
      return $49c51c25361d4cd2$var$preventScrollMobileSafari();
    else
      return $49c51c25361d4cd2$var$preventScrollStandard();
  }, [
    isDisabled
  ]);
}
function $49c51c25361d4cd2$var$preventScrollStandard() {
  return $ff5963eb1fccf552$export$e08e3b67e392101e($49c51c25361d4cd2$var$setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`), $49c51c25361d4cd2$var$setStyle(document.documentElement, "overflow", "hidden"));
}
function $49c51c25361d4cd2$var$preventScrollMobileSafari() {
  let scrollable;
  let lastY = 0;
  let onTouchStart = (e) => {
    scrollable = $62d8ded9296f3872$export$cfa2225e87938781(e.target);
    if (scrollable === document.documentElement && scrollable === document.body)
      return;
    lastY = e.changedTouches[0].pageY;
  };
  let onTouchMove = (e) => {
    if (scrollable === document.documentElement || scrollable === document.body) {
      e.preventDefault();
      return;
    }
    let y = e.changedTouches[0].pageY;
    let scrollTop = scrollable.scrollTop;
    let bottom = scrollable.scrollHeight - scrollable.clientHeight;
    if (scrollTop <= 0 && y > lastY || scrollTop >= bottom && y < lastY)
      e.preventDefault();
    lastY = y;
  };
  let onTouchEnd = (e) => {
    let target = e.target;
    if ($49c51c25361d4cd2$var$willOpenKeyboard(target) && target !== document.activeElement) {
      e.preventDefault();
      target.style.transform = "translateY(-2000px)";
      target.focus();
      requestAnimationFrame(() => {
        target.style.transform = "";
      });
    }
  };
  let onFocus = (e) => {
    let target = e.target;
    if ($49c51c25361d4cd2$var$willOpenKeyboard(target)) {
      target.style.transform = "translateY(-2000px)";
      requestAnimationFrame(() => {
        target.style.transform = "";
        if ($49c51c25361d4cd2$var$visualViewport) {
          if ($49c51c25361d4cd2$var$visualViewport.height < window.innerHeight)
            requestAnimationFrame(() => {
              $49c51c25361d4cd2$var$scrollIntoView(target);
            });
          else
            $49c51c25361d4cd2$var$visualViewport.addEventListener("resize", () => $49c51c25361d4cd2$var$scrollIntoView(target), {
              once: true
            });
        }
      });
    }
  };
  let onWindowScroll = () => {
    window.scrollTo(0, 0);
  };
  let scrollX = window.pageXOffset;
  let scrollY = window.pageYOffset;
  let restoreStyles = $ff5963eb1fccf552$export$e08e3b67e392101e($49c51c25361d4cd2$var$setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`), $49c51c25361d4cd2$var$setStyle(document.documentElement, "overflow", "hidden"), $49c51c25361d4cd2$var$setStyle(document.body, "marginTop", `-${scrollY}px`));
  window.scrollTo(0, 0);
  let removeEvents = $ff5963eb1fccf552$export$e08e3b67e392101e($49c51c25361d4cd2$var$addEvent(document, "touchstart", onTouchStart, {
    passive: false,
    capture: true
  }), $49c51c25361d4cd2$var$addEvent(document, "touchmove", onTouchMove, {
    passive: false,
    capture: true
  }), $49c51c25361d4cd2$var$addEvent(document, "touchend", onTouchEnd, {
    passive: false,
    capture: true
  }), $49c51c25361d4cd2$var$addEvent(document, "focus", onFocus, true), $49c51c25361d4cd2$var$addEvent(window, "scroll", onWindowScroll));
  return () => {
    restoreStyles();
    removeEvents();
    window.scrollTo(scrollX, scrollY);
  };
}
function $49c51c25361d4cd2$var$setStyle(element, style2, value) {
  let cur = element.style[style2];
  element.style[style2] = value;
  return () => {
    element.style[style2] = cur;
  };
}
function $49c51c25361d4cd2$var$addEvent(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  return () => {
    target.removeEventListener(event, handler, options);
  };
}
function $49c51c25361d4cd2$var$scrollIntoView(target) {
  let root = document.scrollingElement || document.documentElement;
  while (target && target !== root) {
    let scrollable = $62d8ded9296f3872$export$cfa2225e87938781(target);
    if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== target) {
      let scrollableTop = scrollable.getBoundingClientRect().top;
      let targetTop = target.getBoundingClientRect().top;
      if (targetTop > scrollableTop + target.clientHeight)
        scrollable.scrollTop += targetTop - scrollableTop;
    }
    target = scrollable.parentElement;
  }
}
function $49c51c25361d4cd2$var$willOpenKeyboard(target) {
  return target instanceof HTMLInputElement && !$49c51c25361d4cd2$var$nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
var $f57aed4a881a3485$exports = {};
$parcel$export$4($f57aed4a881a3485$exports, "ModalProvider", () => $f57aed4a881a3485$export$178405afcd8c5eb);
$parcel$export$4($f57aed4a881a3485$exports, "useModalProvider", () => $f57aed4a881a3485$export$d9aaed4c3ece1bc0);
$parcel$export$4($f57aed4a881a3485$exports, "OverlayProvider", () => $f57aed4a881a3485$export$bf688221f59024e5);
$parcel$export$4($f57aed4a881a3485$exports, "OverlayContainer", () => $f57aed4a881a3485$export$b47c3594eab58386);
$parcel$export$4($f57aed4a881a3485$exports, "useModal", () => $f57aed4a881a3485$export$33ffd74ebf07f060);
const $f57aed4a881a3485$var$Context = /* @__PURE__ */ $5lsDl$react.createContext(null);
function $f57aed4a881a3485$export$178405afcd8c5eb(props) {
  let { children } = props;
  let parent = useContext($f57aed4a881a3485$var$Context);
  let [modalCount, setModalCount] = useState(0);
  let context = useMemo(() => ({
    parent,
    modalCount,
    addModal() {
      setModalCount((count) => count + 1);
      if (parent)
        parent.addModal();
    },
    removeModal() {
      setModalCount((count) => count - 1);
      if (parent)
        parent.removeModal();
    }
  }), [
    parent,
    modalCount
  ]);
  return /* @__PURE__ */ $5lsDl$react.createElement($f57aed4a881a3485$var$Context.Provider, {
    value: context
  }, children);
}
function $f57aed4a881a3485$export$d9aaed4c3ece1bc0() {
  let context = useContext($f57aed4a881a3485$var$Context);
  return {
    modalProviderProps: {
      "aria-hidden": context && context.modalCount > 0 ? true : null
    }
  };
}
function $f57aed4a881a3485$var$OverlayContainerDOM(props) {
  let { modalProviderProps } = $f57aed4a881a3485$export$d9aaed4c3ece1bc0();
  return /* @__PURE__ */ $5lsDl$react.createElement("div", {
    "data-overlay-container": true,
    ...props,
    ...modalProviderProps
  });
}
function $f57aed4a881a3485$export$bf688221f59024e5(props) {
  return /* @__PURE__ */ $5lsDl$react.createElement($f57aed4a881a3485$export$178405afcd8c5eb, null, /* @__PURE__ */ $5lsDl$react.createElement($f57aed4a881a3485$var$OverlayContainerDOM, props));
}
function $f57aed4a881a3485$export$b47c3594eab58386(props) {
  let { portalContainer = document.body, ...rest } = props;
  $5lsDl$react.useEffect(() => {
    if (portalContainer.closest("[data-overlay-container]"))
      throw new Error("An OverlayContainer must not be inside another container. Please change the portalContainer prop.");
  }, [
    portalContainer
  ]);
  let contents = /* @__PURE__ */ $5lsDl$react.createElement($f57aed4a881a3485$export$bf688221f59024e5, rest);
  return /* @__PURE__ */ $k7QOs$reactdom.createPortal(contents, portalContainer);
}
function $f57aed4a881a3485$export$33ffd74ebf07f060(options) {
  let context = useContext($f57aed4a881a3485$var$Context);
  if (!context)
    throw new Error("Modal is not contained within a provider");
  useEffect(() => {
    if ((options === null || options === void 0 ? void 0 : options.isDisabled) || !context || !context.parent)
      return;
    context.parent.addModal();
    return () => {
      if (context && context.parent)
        context.parent.removeModal();
    };
  }, [
    context,
    context.parent,
    options === null || options === void 0 ? void 0 : options.isDisabled
  ]);
  return {
    modalProps: {
      "data-ismodal": !(options === null || options === void 0 ? void 0 : options.isDisabled)
    }
  };
}
var $86ea4cb521eb2e37$exports = {};
$parcel$export$4($86ea4cb521eb2e37$exports, "DismissButton", () => $86ea4cb521eb2e37$export$2317d149ed6f78c4);
var $61fe14465afefc5e$exports = {};
var $773d5888b972f1cf$exports = {};
$773d5888b972f1cf$exports = JSON.parse('{"dismiss":"\u062A\u062C\u0627\u0647\u0644"}');
var $d11f19852b941573$exports = {};
$d11f19852b941573$exports = JSON.parse('{"dismiss":"\u041E\u0442\u0445\u0432\u044A\u0440\u043B\u044F\u043D\u0435"}');
var $b983974c2ee1efb3$exports = {};
$b983974c2ee1efb3$exports = JSON.parse('{"dismiss":"Odstranit"}');
var $5809cc9d4e92de73$exports = {};
$5809cc9d4e92de73$exports = JSON.parse('{"dismiss":"Luk"}');
var $c68c2e4fc74398d1$exports = {};
$c68c2e4fc74398d1$exports = JSON.parse('{"dismiss":"Schlie\xDFen"}');
var $0898b4c153db2b77$exports = {};
$0898b4c153db2b77$exports = JSON.parse('{"dismiss":"\u0391\u03C0\u03CC\u03C1\u03C1\u03B9\u03C8\u03B7"}');
var $6d74810286a15183$exports = {};
$6d74810286a15183$exports = JSON.parse('{"dismiss":"Dismiss"}');
var $309d73dc65f78055$exports = {};
$309d73dc65f78055$exports = JSON.parse('{"dismiss":"Descartar"}');
var $44ad94f7205cf593$exports = {};
$44ad94f7205cf593$exports = JSON.parse('{"dismiss":"L\xF5peta"}');
var $7c28f5687f0779a9$exports = {};
$7c28f5687f0779a9$exports = JSON.parse('{"dismiss":"Hylk\xE4\xE4"}');
var $e6d75df4b68bd73a$exports = {};
$e6d75df4b68bd73a$exports = JSON.parse('{"dismiss":"Rejeter"}');
var $87505c9dab186d0f$exports = {};
$87505c9dab186d0f$exports = JSON.parse('{"dismiss":"\u05D4\u05EA\u05E2\u05DC\u05DD"}');
var $553439c3ffb3e492$exports = {};
$553439c3ffb3e492$exports = JSON.parse('{"dismiss":"Odbaci"}');
var $74cf411061b983a2$exports = {};
$74cf411061b983a2$exports = JSON.parse('{"dismiss":"Elutas\xEDt\xE1s"}');
var $e933f298574dc435$exports = {};
$e933f298574dc435$exports = JSON.parse('{"dismiss":"Ignora"}');
var $ac91fc9fe02f71f6$exports = {};
$ac91fc9fe02f71f6$exports = JSON.parse('{"dismiss":"\u9589\u3058\u308B"}');
var $52b96f86422025af$exports = {};
$52b96f86422025af$exports = JSON.parse('{"dismiss":"\uBB34\uC2DC"}');
var $c0d724c3e51dafa6$exports = {};
$c0d724c3e51dafa6$exports = JSON.parse('{"dismiss":"Atmesti"}');
var $c92899672a3fe72e$exports = {};
$c92899672a3fe72e$exports = JSON.parse('{"dismiss":"Ner\u0101d\u012Bt"}');
var $9f576b39d8e7a9d6$exports = {};
$9f576b39d8e7a9d6$exports = JSON.parse('{"dismiss":"Lukk"}');
var $9d025808aeec81a7$exports = {};
$9d025808aeec81a7$exports = JSON.parse('{"dismiss":"Negeren"}');
var $fce709921e2c0fa6$exports = {};
$fce709921e2c0fa6$exports = JSON.parse('{"dismiss":"Zignoruj"}');
var $2599cf0c4ab37f59$exports = {};
$2599cf0c4ab37f59$exports = JSON.parse('{"dismiss":"Descartar"}');
var $3c220ae7ef8a35fd$exports = {};
$3c220ae7ef8a35fd$exports = JSON.parse('{"dismiss":"Dispensar"}');
var $93562b5094072f54$exports = {};
$93562b5094072f54$exports = JSON.parse('{"dismiss":"Revocare"}');
var $cd9e2abd0d06c7b4$exports = {};
$cd9e2abd0d06c7b4$exports = JSON.parse('{"dismiss":"\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C"}');
var $45375701f409adf1$exports = {};
$45375701f409adf1$exports = JSON.parse('{"dismiss":"Zru\u0161i\u0165"}');
var $27fab53a576de9dd$exports = {};
$27fab53a576de9dd$exports = JSON.parse('{"dismiss":"Opusti"}');
var $4438748d9952e7c7$exports = {};
$4438748d9952e7c7$exports = JSON.parse('{"dismiss":"Odbaci"}');
var $0936d7347ef4da4c$exports = {};
$0936d7347ef4da4c$exports = JSON.parse('{"dismiss":"Avvisa"}');
var $29700c92185d38f8$exports = {};
$29700c92185d38f8$exports = JSON.parse('{"dismiss":"Kapat"}');
var $662ccaf2be4c25b3$exports = {};
$662ccaf2be4c25b3$exports = JSON.parse('{"dismiss":"\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438"}');
var $d80a27deda7cdb3c$exports = {};
$d80a27deda7cdb3c$exports = JSON.parse('{"dismiss":"\u53D6\u6D88"}');
var $2b2734393847c884$exports = {};
$2b2734393847c884$exports = JSON.parse('{"dismiss":"\u95DC\u9589"}');
$61fe14465afefc5e$exports = {
  "ar-AE": $773d5888b972f1cf$exports,
  "bg-BG": $d11f19852b941573$exports,
  "cs-CZ": $b983974c2ee1efb3$exports,
  "da-DK": $5809cc9d4e92de73$exports,
  "de-DE": $c68c2e4fc74398d1$exports,
  "el-GR": $0898b4c153db2b77$exports,
  "en-US": $6d74810286a15183$exports,
  "es-ES": $309d73dc65f78055$exports,
  "et-EE": $44ad94f7205cf593$exports,
  "fi-FI": $7c28f5687f0779a9$exports,
  "fr-FR": $e6d75df4b68bd73a$exports,
  "he-IL": $87505c9dab186d0f$exports,
  "hr-HR": $553439c3ffb3e492$exports,
  "hu-HU": $74cf411061b983a2$exports,
  "it-IT": $e933f298574dc435$exports,
  "ja-JP": $ac91fc9fe02f71f6$exports,
  "ko-KR": $52b96f86422025af$exports,
  "lt-LT": $c0d724c3e51dafa6$exports,
  "lv-LV": $c92899672a3fe72e$exports,
  "nb-NO": $9f576b39d8e7a9d6$exports,
  "nl-NL": $9d025808aeec81a7$exports,
  "pl-PL": $fce709921e2c0fa6$exports,
  "pt-BR": $2599cf0c4ab37f59$exports,
  "pt-PT": $3c220ae7ef8a35fd$exports,
  "ro-RO": $93562b5094072f54$exports,
  "ru-RU": $cd9e2abd0d06c7b4$exports,
  "sk-SK": $45375701f409adf1$exports,
  "sl-SI": $27fab53a576de9dd$exports,
  "sr-SP": $4438748d9952e7c7$exports,
  "sv-SE": $0936d7347ef4da4c$exports,
  "tr-TR": $29700c92185d38f8$exports,
  "uk-UA": $662ccaf2be4c25b3$exports,
  "zh-CN": $d80a27deda7cdb3c$exports,
  "zh-TW": $2b2734393847c884$exports
};
function $86ea4cb521eb2e37$export$2317d149ed6f78c4(props) {
  let { onDismiss, ...otherProps } = props;
  let formatMessage = $321bc95feeb923dd$export$ec23bf898b1eed85(/* @__PURE__ */ $parcel$interopDefault$3($61fe14465afefc5e$exports));
  let labels = $313b98861ee5dd6c$export$d6875122194c7b44(otherProps, formatMessage("dismiss"));
  let onClick = () => {
    if (onDismiss)
      onDismiss();
  };
  return /* @__PURE__ */ $5lsDl$react.createElement($5c3e21d68f1c4674$export$439d29a4e110a164, null, /* @__PURE__ */ $5lsDl$react.createElement("button", {
    ...labels,
    tabIndex: -1,
    onClick
  }));
}
var $5e3802645cc19319$exports = {};
$parcel$export$4($5e3802645cc19319$exports, "ariaHideOutside", () => $5e3802645cc19319$export$1c3ebcada18427bf);
let $5e3802645cc19319$var$refCountMap = /* @__PURE__ */ new WeakMap();
function $5e3802645cc19319$export$1c3ebcada18427bf(targets, root = document.body) {
  let visibleNodes = new Set(targets);
  let hiddenNodes = /* @__PURE__ */ new Set();
  let walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (node instanceof HTMLElement && node.dataset.liveAnnouncer === "true")
        visibleNodes.add(node);
      if (visibleNodes.has(node) || hiddenNodes.has(node.parentElement))
        return NodeFilter.FILTER_REJECT;
      if (node instanceof HTMLElement && node.getAttribute("role") === "row")
        return NodeFilter.FILTER_SKIP;
      if (targets.some((target) => node.contains(target)))
        return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let hide = (node) => {
    var ref;
    let refCount = (ref = $5e3802645cc19319$var$refCountMap.get(node)) !== null && ref !== void 0 ? ref : 0;
    if (node.getAttribute("aria-hidden") === "true" && refCount === 0)
      return;
    if (refCount === 0)
      node.setAttribute("aria-hidden", "true");
    hiddenNodes.add(node);
    $5e3802645cc19319$var$refCountMap.set(node, refCount + 1);
  };
  let node1 = walker.nextNode();
  while (node1 != null) {
    hide(node1);
    node1 = walker.nextNode();
  }
  let observer = new MutationObserver((changes) => {
    for (let change of changes) {
      if (change.type !== "childList" || change.addedNodes.length === 0)
        continue;
      if (![
        ...visibleNodes,
        ...hiddenNodes
      ].some((node) => node.contains(change.target)))
        for (let node2 of change.addedNodes) {
          if (node2 instanceof HTMLElement && node2.dataset.liveAnnouncer === "true")
            visibleNodes.add(node2);
          else if (node2 instanceof Element)
            hide(node2);
        }
    }
  });
  observer.observe(root, {
    childList: true,
    subtree: true
  });
  return () => {
    observer.disconnect();
    for (let node of hiddenNodes) {
      let count = $5e3802645cc19319$var$refCountMap.get(node);
      if (count === 1) {
        node.removeAttribute("aria-hidden");
        $5e3802645cc19319$var$refCountMap.delete(node);
      } else
        $5e3802645cc19319$var$refCountMap.set(node, count - 1);
    }
  };
}
function $parcel$interopDefault$2(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export$3(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $7167f8da3cce35e4$exports = {};
$parcel$export$3($7167f8da3cce35e4$exports, "useProvider", () => $7167f8da3cce35e4$export$693cdb10cec23617);
$parcel$export$3($7167f8da3cce35e4$exports, "Provider", () => $7167f8da3cce35e4$export$2881499e37b75b9a);
$parcel$export$3($7167f8da3cce35e4$exports, "useProviderProps", () => $7167f8da3cce35e4$export$521c373ccc32c300);
var $698974e9dd92c2ec$exports = {};
$parcel$export$3($698974e9dd92c2ec$exports, "spectrum", () => $698974e9dd92c2ec$export$3311ab3a441bc141, (v) => $698974e9dd92c2ec$export$3311ab3a441bc141 = v);
var $698974e9dd92c2ec$export$3311ab3a441bc141;
$698974e9dd92c2ec$export$3311ab3a441bc141 = "spectrum_b37d53";
var $5cac98e4c80e6707$exports = {};
$parcel$export$3($5cac98e4c80e6707$exports, "spectrum", () => $5cac98e4c80e6707$export$3311ab3a441bc141, (v) => $5cac98e4c80e6707$export$3311ab3a441bc141 = v);
$parcel$export$3($5cac98e4c80e6707$exports, "spectrum-Body", () => $5cac98e4c80e6707$export$a30bf7810c8453d1, (v) => $5cac98e4c80e6707$export$a30bf7810c8453d1 = v);
$parcel$export$3($5cac98e4c80e6707$exports, "spectrum-Body--italic", () => $5cac98e4c80e6707$export$7b2dac1166f6ec4c, (v) => $5cac98e4c80e6707$export$7b2dac1166f6ec4c = v);
var $5cac98e4c80e6707$export$3311ab3a441bc141;
var $5cac98e4c80e6707$export$a30bf7810c8453d1;
var $5cac98e4c80e6707$export$7b2dac1166f6ec4c;
$5cac98e4c80e6707$export$3311ab3a441bc141 = "spectrum_2a241c";
$5cac98e4c80e6707$export$a30bf7810c8453d1 = "spectrum-Body_2a241c";
$5cac98e4c80e6707$export$7b2dac1166f6ec4c = "spectrum-Body--italic_2a241c";
function $d8453c5ae7fac713$export$6343629ee1b29116(theme, defaultColorScheme) {
  let matchesDark = $3df547e395c4522f$export$32d5543ab307c01("(prefers-color-scheme: dark)");
  let matchesLight = $3df547e395c4522f$export$32d5543ab307c01("(prefers-color-scheme: light)");
  if (theme.dark && matchesDark)
    return "dark";
  if (theme.light && matchesLight)
    return "light";
  if (theme.dark && defaultColorScheme === "dark")
    return "dark";
  if (theme.light && defaultColorScheme === "light")
    return "light";
  if (!theme.dark)
    return "light";
  if (!theme.light)
    return "dark";
  return "light";
}
function $d8453c5ae7fac713$export$a8d2043b2d807f4d(theme) {
  let matchesFine = $3df547e395c4522f$export$32d5543ab307c01("(any-pointer: fine)");
  if (matchesFine && theme.medium)
    return "medium";
  if (theme.large)
    return "large";
  return "medium";
}
var $7b22e09dddddd7da$exports = {};
$7b22e09dddddd7da$exports = JSON.parse('{"name":"@react-spectrum/provider","version":"3.4.1","description":"Spectrum UI components in React","license":"Apache-2.0","main":"dist/main.js","module":"dist/module.js","types":"dist/types.d.ts","source":"src/index.ts","files":["dist","src"],"sideEffects":["*.css"],"targets":{"main":{"includeNodeModules":["@adobe/spectrum-css-temp"]},"module":{"includeNodeModules":["@adobe/spectrum-css-temp"]}},"repository":{"type":"git","url":"https://github.com/adobe/react-spectrum"},"dependencies":{"@babel/runtime":"^7.6.2","@react-aria/i18n":"^3.4.1","@react-aria/overlays":"^3.9.1","@react-aria/utils":"^3.13.1","@react-spectrum/utils":"^3.7.1","@react-types/provider":"^3.5.1","@react-types/shared":"^3.13.1","clsx":"^1.1.1"},"devDependencies":{"@adobe/spectrum-css-temp":"3.0.0-alpha.1"},"peerDependencies":{"react":"^16.8.0 || ^17.0.0-rc.1 || ^18.0.0","react-dom":"^16.8.0 || ^17.0.0-rc.1 || ^18.0.0"},"publishConfig":{"access":"public"}}');
const $7167f8da3cce35e4$var$Context = /* @__PURE__ */ $5lsDl$react.createContext(null);
$7167f8da3cce35e4$var$Context.displayName = "ProviderContext";
const $7167f8da3cce35e4$var$DEFAULT_BREAKPOINTS = {
  S: 640,
  M: 768,
  L: 1024,
  XL: 1280,
  XXL: 1536
};
function $7167f8da3cce35e4$var$Provider(props, ref) {
  let prevContext = $7167f8da3cce35e4$export$693cdb10cec23617();
  let prevColorScheme = prevContext && prevContext.colorScheme;
  let prevBreakpoints = prevContext && prevContext.breakpoints;
  let { theme = prevContext && prevContext.theme, defaultColorScheme } = props;
  let autoColorScheme = $d8453c5ae7fac713$export$6343629ee1b29116(theme, defaultColorScheme);
  let autoScale = $d8453c5ae7fac713$export$a8d2043b2d807f4d(theme);
  let { locale: prevLocale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let usePrevColorScheme = !!theme[prevColorScheme];
  let { colorScheme = usePrevColorScheme ? prevColorScheme : autoColorScheme, scale = prevContext ? prevContext.scale : autoScale, locale = prevContext ? prevLocale : null, breakpoints = prevContext ? prevBreakpoints : $7167f8da3cce35e4$var$DEFAULT_BREAKPOINTS, children, isQuiet, isEmphasized, isDisabled, isRequired, isReadOnly, validationState, ...otherProps } = props;
  let currentProps = {
    version: $7b22e09dddddd7da$exports.version,
    theme,
    breakpoints,
    colorScheme,
    scale,
    isQuiet,
    isEmphasized,
    isDisabled,
    isRequired,
    isReadOnly,
    validationState
  };
  let matchedBreakpoints = $1051245f87c5981d$export$140ae7baa51cca23(breakpoints);
  let filteredProps = {};
  Object.entries(currentProps).forEach(([key, value]) => value !== void 0 && (filteredProps[key] = value));
  let context = Object.assign({}, prevContext, filteredProps);
  let contents = children;
  let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps);
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps, void 0, {
    matchedBreakpoints
  });
  if (!prevContext || props.locale || theme !== prevContext.theme || colorScheme !== prevContext.colorScheme || scale !== prevContext.scale || Object.keys(domProps).length > 0 || otherProps.UNSAFE_className || Object.keys(styleProps.style).length > 0)
    contents = /* @__PURE__ */ $5lsDl$react.createElement($7167f8da3cce35e4$var$ProviderWrapper, {
      ...props,
      UNSAFE_style: {
        isolation: !prevContext ? "isolate" : void 0,
        ...styleProps.style
      },
      ref
    }, contents);
  return /* @__PURE__ */ $5lsDl$react.createElement($7167f8da3cce35e4$var$Context.Provider, {
    value: context
  }, /* @__PURE__ */ $5lsDl$react.createElement($18f2051aff69b9bf$export$a54013f0d02a8f82, {
    locale
  }, /* @__PURE__ */ $5lsDl$react.createElement($1051245f87c5981d$export$8214320346cf5104, {
    matchedBreakpoints
  }, /* @__PURE__ */ $5lsDl$react.createElement($f57aed4a881a3485$export$178405afcd8c5eb, null, contents))));
}
let $7167f8da3cce35e4$export$2881499e37b75b9a = /* @__PURE__ */ $5lsDl$react.forwardRef($7167f8da3cce35e4$var$Provider);
const $7167f8da3cce35e4$var$ProviderWrapper = /* @__PURE__ */ $5lsDl$react.forwardRef(function ProviderWrapper(props, ref) {
  let { children, ...otherProps } = props;
  let { locale, direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let { theme, colorScheme, scale } = $7167f8da3cce35e4$export$693cdb10cec23617();
  let { modalProviderProps } = $f57aed4a881a3485$export$d9aaed4c3ece1bc0();
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  let themeKey = Object.keys(theme[colorScheme])[0];
  let scaleKey = Object.keys(theme[scale])[0];
  let className = clsx(styleProps.className, (/* @__PURE__ */ $parcel$interopDefault$2($698974e9dd92c2ec$exports))["spectrum"], (/* @__PURE__ */ $parcel$interopDefault$2($5cac98e4c80e6707$exports))["spectrum"], theme[colorScheme][themeKey], theme[scale][scaleKey], theme.global ? Object.values(theme.global) : null, {
    "react-spectrum-provider": $fd933927dbac1f15$export$46d604dce8bf8724,
    spectrum: $fd933927dbac1f15$export$46d604dce8bf8724,
    [themeKey]: $fd933927dbac1f15$export$46d604dce8bf8724,
    [scaleKey]: $fd933927dbac1f15$export$46d604dce8bf8724
  });
  var _colorScheme, ref1;
  let style2 = {
    ...styleProps.style,
    colorScheme: (ref1 = (_colorScheme = props.colorScheme) !== null && _colorScheme !== void 0 ? _colorScheme : colorScheme) !== null && ref1 !== void 0 ? ref1 : Object.keys(theme).filter((k2) => k2 === "light" || k2 === "dark").join(" ")
  };
  let hasWarned = useRef(false);
  useEffect(() => {
    if (direction && domRef.current) {
      let closestDir = domRef.current.parentElement.closest("[dir]");
      let dir = closestDir && closestDir.getAttribute("dir");
      if (dir && dir !== direction && !hasWarned.current) {
        console.warn(`Language directions cannot be nested. ${direction} inside ${dir}.`);
        hasWarned.current = true;
      }
    }
  }, [
    direction,
    domRef,
    hasWarned
  ]);
  return /* @__PURE__ */ $5lsDl$react.createElement("div", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ...modalProviderProps,
    className,
    style: style2,
    lang: locale,
    dir: direction,
    ref: domRef
  }, children);
});
function $7167f8da3cce35e4$export$693cdb10cec23617() {
  return useContext($7167f8da3cce35e4$var$Context);
}
function $7167f8da3cce35e4$export$521c373ccc32c300(props) {
  let context = $7167f8da3cce35e4$export$693cdb10cec23617();
  if (!context)
    return props;
  return Object.assign({}, {
    isQuiet: context.isQuiet,
    isEmphasized: context.isEmphasized,
    isDisabled: context.isDisabled,
    isRequired: context.isRequired,
    isReadOnly: context.isReadOnly,
    validationState: context.validationState
  }, props);
}
var main$1 = "";
function $parcel$interopDefault$1(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export$2(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $ea2e8e3460b67692$exports = {};
$parcel$export$2($ea2e8e3460b67692$exports, "spectrum--darkest", () => $ea2e8e3460b67692$export$4ecdba604f5f1f44, (v) => $ea2e8e3460b67692$export$4ecdba604f5f1f44 = v);
var $ea2e8e3460b67692$export$4ecdba604f5f1f44;
$ea2e8e3460b67692$export$4ecdba604f5f1f44 = "spectrum--darkest_256eeb";
var $5b6ea5874ed9af7b$exports = {};
$parcel$export$2($5b6ea5874ed9af7b$exports, "spectrum", () => $5b6ea5874ed9af7b$export$3311ab3a441bc141, (v) => $5b6ea5874ed9af7b$export$3311ab3a441bc141 = v);
$parcel$export$2($5b6ea5874ed9af7b$exports, "spectrum--medium", () => $5b6ea5874ed9af7b$export$4c0c83b3f4303ef8, (v) => $5b6ea5874ed9af7b$export$4c0c83b3f4303ef8 = v);
$parcel$export$2($5b6ea5874ed9af7b$exports, "spectrum--large", () => $5b6ea5874ed9af7b$export$a88a8dbe29386d31, (v) => $5b6ea5874ed9af7b$export$a88a8dbe29386d31 = v);
$parcel$export$2($5b6ea5874ed9af7b$exports, "spectrum--darkest", () => $5b6ea5874ed9af7b$export$4ecdba604f5f1f44, (v) => $5b6ea5874ed9af7b$export$4ecdba604f5f1f44 = v);
$parcel$export$2($5b6ea5874ed9af7b$exports, "spectrum--dark", () => $5b6ea5874ed9af7b$export$68dc111a79481afd, (v) => $5b6ea5874ed9af7b$export$68dc111a79481afd = v);
$parcel$export$2($5b6ea5874ed9af7b$exports, "spectrum--light", () => $5b6ea5874ed9af7b$export$efb37c2f79da8163, (v) => $5b6ea5874ed9af7b$export$efb37c2f79da8163 = v);
$parcel$export$2($5b6ea5874ed9af7b$exports, "spectrum--lightest", () => $5b6ea5874ed9af7b$export$baaa804dc80cce18, (v) => $5b6ea5874ed9af7b$export$baaa804dc80cce18 = v);
var $5b6ea5874ed9af7b$export$3311ab3a441bc141;
var $5b6ea5874ed9af7b$export$4c0c83b3f4303ef8;
var $5b6ea5874ed9af7b$export$a88a8dbe29386d31;
var $5b6ea5874ed9af7b$export$4ecdba604f5f1f44;
var $5b6ea5874ed9af7b$export$68dc111a79481afd;
var $5b6ea5874ed9af7b$export$efb37c2f79da8163;
var $5b6ea5874ed9af7b$export$baaa804dc80cce18;
$5b6ea5874ed9af7b$export$3311ab3a441bc141 = "spectrum_9e130c";
$5b6ea5874ed9af7b$export$4c0c83b3f4303ef8 = "spectrum--medium_9e130c";
$5b6ea5874ed9af7b$export$a88a8dbe29386d31 = "spectrum--large_9e130c";
$5b6ea5874ed9af7b$export$4ecdba604f5f1f44 = "spectrum--darkest_9e130c";
$5b6ea5874ed9af7b$export$68dc111a79481afd = "spectrum--dark_9e130c";
$5b6ea5874ed9af7b$export$efb37c2f79da8163 = "spectrum--light_9e130c";
$5b6ea5874ed9af7b$export$baaa804dc80cce18 = "spectrum--lightest_9e130c";
var $b2eefcc3e5fdb373$exports = {};
$parcel$export$2($b2eefcc3e5fdb373$exports, "spectrum--large", () => $b2eefcc3e5fdb373$export$a88a8dbe29386d31, (v) => $b2eefcc3e5fdb373$export$a88a8dbe29386d31 = v);
var $b2eefcc3e5fdb373$export$a88a8dbe29386d31;
$b2eefcc3e5fdb373$export$a88a8dbe29386d31 = "spectrum--large_c40598";
var $729ae839c55d8d77$exports = {};
$parcel$export$2($729ae839c55d8d77$exports, "spectrum--light", () => $729ae839c55d8d77$export$efb37c2f79da8163, (v) => $729ae839c55d8d77$export$efb37c2f79da8163 = v);
var $729ae839c55d8d77$export$efb37c2f79da8163;
$729ae839c55d8d77$export$efb37c2f79da8163 = "spectrum--light_a40724";
var $b4d117254fac085c$exports = {};
$parcel$export$2($b4d117254fac085c$exports, "spectrum--medium", () => $b4d117254fac085c$export$4c0c83b3f4303ef8, (v) => $b4d117254fac085c$export$4c0c83b3f4303ef8 = v);
var $b4d117254fac085c$export$4c0c83b3f4303ef8;
$b4d117254fac085c$export$4c0c83b3f4303ef8 = "spectrum--medium_4b172c";
let $bf24a13e98395dd3$export$bca14c5b3b88a9c9 = {
  global: /* @__PURE__ */ $parcel$interopDefault$1($5b6ea5874ed9af7b$exports),
  light: /* @__PURE__ */ $parcel$interopDefault$1($729ae839c55d8d77$exports),
  dark: /* @__PURE__ */ $parcel$interopDefault$1($ea2e8e3460b67692$exports),
  medium: /* @__PURE__ */ $parcel$interopDefault$1($b4d117254fac085c$exports),
  large: /* @__PURE__ */ $parcel$interopDefault$1($b2eefcc3e5fdb373$exports)
};
const useNonNullableContext = (context) => {
  const state = useContext(context);
  if (!state)
    throw new Error(`Cannot find ${context}Provider`);
  return state;
};
const interfacePlacementMaxLength = 10;
const defaultInterfacePlacement = {
  templateArea: {
    artwork: "row1-1",
    trackInfo: "row1-2",
    trackTimeCurrent: "row1-3",
    trackTimeDuration: "row1-4",
    progress: "row1-5",
    repeatType: "row1-6",
    volume: "row1-7",
    playButton: "row1-8",
    playList: "row1-9"
  }
};
const audioPlayerStateContext = createContext(null);
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = $5lsDl$react, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const SpectrumProvider = ({
  children,
  rootContainerProps
}) => {
  const {
    playerPlacement: contextPlayerPlacement
  } = useNonNullableContext(audioPlayerStateContext);
  const [placementState, setPlacementState] = useState();
  useLayoutEffect(() => {
    if (contextPlayerPlacement) {
      const placementValidation = () => {
        switch (contextPlayerPlacement) {
          case "bottom":
            return {
              bottom: 0
            };
          case "top":
            return {
              top: 0
            };
          case "bottom-left":
            return {
              bottom: 0,
              left: 0
            };
          case "bottom-right":
            return {
              bottom: 0,
              right: 0
            };
          case "top-left":
            return {
              top: 0,
              left: 0
            };
          case "top-right":
            return {
              top: 0,
              right: 0
            };
        }
      };
      setPlacementState(placementValidation());
    }
  }, [contextPlayerPlacement]);
  return /* @__PURE__ */ jsx($7167f8da3cce35e4$export$2881499e37b75b9a, {
    theme: $bf24a13e98395dd3$export$bca14c5b3b88a9c9,
    width: "100%",
    position: contextPlayerPlacement && "fixed",
    UNSAFE_className: "rs-audio-player-provider",
    ...placementState,
    ...rootContainerProps,
    children
  });
};
const audioPlayerDispatchContext = createContext(null);
const getTimeWithPadStart = (time) => {
  const minutes = `${Math.floor(time / 60)}`.padStart(2, "0");
  const seconds = `${Math.floor(time % 60)}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
};
const resetAudioValues = (elementRefs, duration, restart) => {
  if (!elementRefs)
    return;
  const {
    progressHandleEl,
    progressValueEl,
    trackCurTimeEl,
    trackDurationEl,
    audioEl,
    waveformInst
  } = elementRefs;
  if (restart) {
    if (audioEl) {
      audioEl.currentTime = 0;
    }
    waveformInst == null ? void 0 : waveformInst.seekTo(0);
  }
  if (progressHandleEl && progressValueEl) {
    progressValueEl.style.transform = `scaleX(0)`;
    progressHandleEl.style.transform = `translateX(0px)`;
  }
  if (trackCurTimeEl && trackDurationEl) {
    trackCurTimeEl.innerHTML = "00:00";
    if (!restart) {
      trackDurationEl.innerHTML = duration ? getTimeWithPadStart(duration) : "00:00";
    }
  }
};
const audioPlayerReducer = (state, action) => {
  var _a2, _b, _c, _d;
  switch (action.type) {
    case "NEXT_AUDIO": {
      if (state.curAudioState.repeatType === "NONE" && state.curIdx + 1 === state.playList.length) {
        return {
          ...state,
          curAudioState: { ...state.curAudioState, isPlaying: false }
        };
      }
      if (state.curAudioState.repeatType === "SHUFFLE") {
        let nextIdx = 0;
        const getShuffledPlayIdx = () => {
          nextIdx = Math.round(Math.random() * (state.playList.length - 1));
        };
        while (nextIdx === state.curIdx) {
          getShuffledPlayIdx();
        }
        return {
          ...state,
          curPlayId: state.playList[nextIdx].id,
          curIdx: nextIdx
        };
      }
      const infiniteLoopNextIdx = (state.curIdx + 1) % state.playList.length;
      return {
        ...state,
        curIdx: infiniteLoopNextIdx,
        curPlayId: state.playList[infiniteLoopNextIdx].id
      };
    }
    case "PREV_AUDIO": {
      if (((_a2 = state.elementRefs) == null ? void 0 : _a2.audioEl) && ((_b = state.elementRefs) == null ? void 0 : _b.audioEl.currentTime) > 1 || ((_c = state.elementRefs) == null ? void 0 : _c.waveformInst) && ((_d = state.elementRefs) == null ? void 0 : _d.waveformInst.getCurrentTime()) > 1 || state.curAudioState.repeatType === "NONE" && state.curIdx === 0) {
        resetAudioValues(state.elementRefs, void 0, true);
        return state;
      }
      if (state.curAudioState.repeatType === "SHUFFLE") {
        const shuffledPlayIdx = Math.round(Math.random() * (state.playList.length - 1));
        return {
          ...state,
          curPlayId: state.playList[shuffledPlayIdx].id,
          curIdx: shuffledPlayIdx
        };
      }
      const infiniteLoopPrevIdx = (state.curIdx - 1 + state.playList.length) % state.playList.length;
      return {
        ...state,
        curPlayId: state.playList[infiniteLoopPrevIdx].id,
        curIdx: infiniteLoopPrevIdx
      };
    }
    case "UPDATE_PLAY_LIST": {
      const curPlayListItem = action.playList.find((item) => item.id === state.curPlayId);
      if (!curPlayListItem) {
        console.error("UPDATE_PLAY_LIST ERROR - curPlayId is not found on playList");
        return state;
      }
      return {
        ...state,
        playList: action.playList,
        curIdx: curPlayListItem.index
      };
    }
    case "SET_VOLUME":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          volume: action.volume
        }
      };
    case "SET_INITIAL_AUDIO_STATE":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioInitialState },
        curPlayId: action.audioInitialState.curPlayId
      };
    case "SET_PlAY_STATE":
      if (action.state !== void 0) {
        return {
          ...state,
          curAudioState: {
            ...state.curAudioState,
            isPlaying: action.state
          }
        };
      }
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          isPlaying: !state.curAudioState.isPlaying
        }
      };
    case "SET_CURRENT_INDEX":
      return {
        ...state,
        curPlayId: action.currentAudioId,
        curIdx: action.currentIndex
      };
    case "SET_REPEAT_TYPE":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          repeatType: action.repeatType
        }
      };
    case "SET_PLACEMENTS":
      return {
        ...state,
        playerPlacement: action.playerPlacement || state.playerPlacement,
        playListPlacement: action.playListPlacement || state.playListPlacement,
        interfacePlacement: action.interfacePlacement
      };
    case "SET_MUTED":
      return {
        ...state,
        curAudioState: {
          ...state.curAudioState,
          muted: action.muted
        }
      };
    case "SET_ACTIVE_UI":
      return {
        ...state,
        activeUI: { ...action.activeUI }
      };
    case "SET_ELEMENT_REFS":
      return {
        ...state,
        elementRefs: { ...state.elementRefs, ...action.elementRefs }
      };
    case "SET_CUSTOM_ICONS":
      return {
        ...state,
        customIcons: { ...state.customIcons, ...action.customIcons }
      };
    case "SET_COVER_IMGS_CSS":
      return {
        ...state,
        coverImgsCss: { ...state.coverImgsCss, ...action.coverImgsCss }
      };
    default:
      throw new Error("Unhandled action");
  }
};
const AudioPlayerProvider = ({
  children
}) => {
  const [audioContextState, dispatchAudioContextState] = useReducer(audioPlayerReducer, {
    playList: [],
    curPlayId: 1,
    curIdx: 0,
    curAudioState: {
      isPlaying: false,
      repeatType: "ALL",
      volume: 1
    },
    activeUI: {
      playButton: true
    },
    playListPlacement: "bottom",
    interfacePlacement: {
      templateArea: {
        playButton: defaultInterfacePlacement.templateArea["playButton"]
      }
    }
  });
  return /* @__PURE__ */ jsx(audioPlayerStateContext.Provider, {
    value: audioContextState,
    children: /* @__PURE__ */ jsx(audioPlayerDispatchContext.Provider, {
      value: dispatchAudioContextState,
      children
    })
  });
};
var vars = "";
const GlobalStyle = createGlobalStyle`

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
button,
video {
  margin: 0;
  padding: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
  border: 0;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

button{
    background: transparent;
    cursor: pointer;
}

* {
  box-sizing: border-box;
}
`;
function $parcel$export$1(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
var $b9606c0c41d55371$exports = {};
$parcel$export$1($b9606c0c41d55371$exports, "View", () => $b9606c0c41d55371$export$27a5bd065ad55220);
function $b9606c0c41d55371$var$View(props, ref) {
  props = $59d09bcc83651bf9$export$1e5c9e6e4e15efe3(props);
  let { elementType: ElementType = "div", children, ...otherProps } = props;
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(props, $380ed8f3903c3931$export$e0705d1a55f297c);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  return /* @__PURE__ */ $5lsDl$react.createElement(ElementType, {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ref: domRef
  }, /* @__PURE__ */ $5lsDl$react.createElement($59d09bcc83651bf9$export$ceb145244332b7a2, null, children));
}
const $b9606c0c41d55371$export$27a5bd065ad55220 = /* @__PURE__ */ forwardRef($b9606c0c41d55371$var$View);
var $0a7c18a2ef74b280$exports = {};
$parcel$export$1($0a7c18a2ef74b280$exports, "Content", () => $0a7c18a2ef74b280$export$7c6e2c02157bb7d2);
function $0a7c18a2ef74b280$var$Content(props, ref) {
  props = $59d09bcc83651bf9$export$1e5c9e6e4e15efe3(props, "content");
  let { children, ...otherProps } = props;
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  return /* @__PURE__ */ $5lsDl$react.createElement("section", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ref: domRef
  }, /* @__PURE__ */ $5lsDl$react.createElement($59d09bcc83651bf9$export$ceb145244332b7a2, null, children));
}
const $0a7c18a2ef74b280$export$7c6e2c02157bb7d2 = /* @__PURE__ */ forwardRef($0a7c18a2ef74b280$var$Content);
var $8d68cc89c1f9278e$exports = {};
$parcel$export$1($8d68cc89c1f9278e$exports, "Footer", () => $8d68cc89c1f9278e$export$a06f1c675e846f6f);
function $8d68cc89c1f9278e$var$Footer(props, ref) {
  props = $59d09bcc83651bf9$export$1e5c9e6e4e15efe3(props, "footer");
  let { children, ...otherProps } = props;
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  return /* @__PURE__ */ $5lsDl$react.createElement("footer", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ref: domRef
  }, /* @__PURE__ */ $5lsDl$react.createElement($59d09bcc83651bf9$export$ceb145244332b7a2, null, children));
}
const $8d68cc89c1f9278e$export$a06f1c675e846f6f = /* @__PURE__ */ forwardRef($8d68cc89c1f9278e$var$Footer);
var $aedcc4886d2a392a$exports = {};
$parcel$export$1($aedcc4886d2a392a$exports, "Header", () => $aedcc4886d2a392a$export$8b251419efc915eb);
function $aedcc4886d2a392a$var$Header(props, ref) {
  props = $59d09bcc83651bf9$export$1e5c9e6e4e15efe3(props, "header");
  let { children, ...otherProps } = props;
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  return /* @__PURE__ */ $5lsDl$react.createElement("header", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ref: domRef
  }, /* @__PURE__ */ $5lsDl$react.createElement($59d09bcc83651bf9$export$ceb145244332b7a2, null, children));
}
const $aedcc4886d2a392a$export$8b251419efc915eb = /* @__PURE__ */ forwardRef($aedcc4886d2a392a$var$Header);
const useBasicAudio = () => {
  const { curAudioState, elementRefs } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onTimeUpdate = useCallback((event) => {
    if (event.currentTarget.readyState === 0 || !elementRefs)
      return;
    const currentTime = event.currentTarget.currentTime;
    const duration = event.currentTarget.duration;
    const {
      trackCurTimeEl,
      progressBarEl,
      progressValueEl,
      progressHandleEl
    } = elementRefs;
    if (trackCurTimeEl) {
      trackCurTimeEl.innerText = getTimeWithPadStart(currentTime);
    }
    if (progressBarEl && progressValueEl && progressHandleEl) {
      const progressBarWidth = progressBarEl.clientWidth;
      const progressHandlePosition = currentTime / duration * progressBarWidth;
      progressValueEl.style.transform = `scaleX(${currentTime / duration})`;
      progressHandleEl.style.transform = `translateX(${progressHandlePosition}px)`;
    }
  }, [elementRefs]);
  const onEnded = useCallback(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.audioEl))
      return;
    if (curAudioState.repeatType === "ONE") {
      elementRefs.audioEl.currentTime = 0;
      elementRefs.audioEl.play();
      return;
    }
    audioPlayerDispatch({ type: "NEXT_AUDIO" });
  }, [audioPlayerDispatch, curAudioState.repeatType, elementRefs == null ? void 0 : elementRefs.audioEl]);
  const onLoadedMetadata = useCallback((e) => {
    if (!elementRefs)
      return;
    const { duration } = e.currentTarget;
    resetAudioValues(elementRefs, duration);
  }, [elementRefs]);
  useEffect(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.audioEl))
      return;
    if (curAudioState.isPlaying) {
      elementRefs == null ? void 0 : elementRefs.audioEl.play();
    } else {
      elementRefs == null ? void 0 : elementRefs.audioEl.pause();
    }
  }, [elementRefs == null ? void 0 : elementRefs.audioEl, curAudioState.isPlaying]);
  useEffect(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.audioEl))
      return;
    elementRefs.audioEl.volume = curAudioState.volume;
  }, [elementRefs == null ? void 0 : elementRefs.audioEl, curAudioState.volume]);
  return {
    onTimeUpdate,
    onEnded,
    onLoadedMetadata
  };
};
const Basic = () => {
  const audioRef = useRef(null);
  const {
    curAudioState,
    curPlayId,
    playList
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const curPlayedAudioData = playList.find((audioData) => audioData.id === curPlayId);
  const audioNativeStates = Object.fromEntries(Object.entries(curAudioState).filter((state) => {
    if (state[0] === "isPlaying" || state[0] === "repeatType" || state[0] === "curPlayId") {
      return false;
    }
    return true;
  }));
  const useAudioEventProps = useBasicAudio();
  useEffect(() => {
    if (!audioRef.current)
      return;
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: {
        audioEl: audioRef.current
      }
    });
  }, [audioRef.current, audioPlayerDispatch]);
  return /* @__PURE__ */ jsx("audio", {
    id: "rs-audio-player-audio",
    autoPlay: curAudioState.isPlaying,
    ref: audioRef,
    src: curPlayedAudioData.src,
    ...useAudioEventProps,
    ...audioNativeStates
  });
};
const useVariableColor = (variableColors) => {
  const colorsRef = useRef();
  useLayoutEffect(() => {
    const parsedColors = Object.entries(variableColors).reduce((acc, [key, varName]) => ({
      ...acc,
      [key]: window.getComputedStyle(document.getElementsByClassName("rs-audio-player-provider")[0]).getPropertyValue(`${varName}`)
    }), {});
    colorsRef.current = parsedColors;
  }, [variableColors]);
  return colorsRef;
};
var wavesurfer = { exports: {} };
/*!
 * wavesurfer.js 6.2.0 (2022-05-16)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(self, () => {
    return (() => {
      var __webpack_modules__ = {
        "./src/drawer.canvasentry.js": (module2, exports2, __webpack_require__2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var _style = _interopRequireDefault(__webpack_require__2("./src/util/style.js"));
          var _getId = _interopRequireDefault(__webpack_require__2("./src/util/get-id.js"));
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          var CanvasEntry = /* @__PURE__ */ function() {
            function CanvasEntry2() {
              _classCallCheck(this, CanvasEntry2);
              this.wave = null;
              this.waveCtx = null;
              this.progress = null;
              this.progressCtx = null;
              this.start = 0;
              this.end = 1;
              this.id = (0, _getId.default)(typeof this.constructor.name !== "undefined" ? this.constructor.name.toLowerCase() + "_" : "canvasentry_");
              this.canvasContextAttributes = {};
            }
            _createClass(CanvasEntry2, [{
              key: "initWave",
              value: function initWave(element) {
                this.wave = element;
                this.waveCtx = this.wave.getContext("2d", this.canvasContextAttributes);
              }
            }, {
              key: "initProgress",
              value: function initProgress(element) {
                this.progress = element;
                this.progressCtx = this.progress.getContext("2d", this.canvasContextAttributes);
              }
            }, {
              key: "updateDimensions",
              value: function updateDimensions(elementWidth, totalWidth, width, height) {
                this.start = this.wave.offsetLeft / totalWidth || 0;
                this.end = this.start + elementWidth / totalWidth;
                this.wave.width = width;
                this.wave.height = height;
                var elementSize = {
                  width: elementWidth + "px"
                };
                (0, _style.default)(this.wave, elementSize);
                if (this.hasProgressCanvas) {
                  this.progress.width = width;
                  this.progress.height = height;
                  (0, _style.default)(this.progress, elementSize);
                }
              }
            }, {
              key: "clearWave",
              value: function clearWave() {
                this.waveCtx.clearRect(0, 0, this.waveCtx.canvas.width, this.waveCtx.canvas.height);
                if (this.hasProgressCanvas) {
                  this.progressCtx.clearRect(0, 0, this.progressCtx.canvas.width, this.progressCtx.canvas.height);
                }
              }
            }, {
              key: "setFillStyles",
              value: function setFillStyles(waveColor, progressColor) {
                this.waveCtx.fillStyle = this.getFillStyle(this.waveCtx, waveColor);
                if (this.hasProgressCanvas) {
                  this.progressCtx.fillStyle = this.getFillStyle(this.progressCtx, progressColor);
                }
              }
            }, {
              key: "getFillStyle",
              value: function getFillStyle(ctx, color) {
                if (typeof color == "string" || color instanceof CanvasGradient) {
                  return color;
                }
                var waveGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                color.forEach(function(value, index) {
                  return waveGradient.addColorStop(index / color.length, value);
                });
                return waveGradient;
              }
            }, {
              key: "applyCanvasTransforms",
              value: function applyCanvasTransforms(vertical) {
                if (vertical) {
                  this.waveCtx.setTransform(0, 1, 1, 0, 0, 0);
                  if (this.hasProgressCanvas) {
                    this.progressCtx.setTransform(0, 1, 1, 0, 0, 0);
                  }
                }
              }
            }, {
              key: "fillRects",
              value: function fillRects(x, y, width, height, radius) {
                this.fillRectToContext(this.waveCtx, x, y, width, height, radius);
                if (this.hasProgressCanvas) {
                  this.fillRectToContext(this.progressCtx, x, y, width, height, radius);
                }
              }
            }, {
              key: "fillRectToContext",
              value: function fillRectToContext(ctx, x, y, width, height, radius) {
                if (!ctx) {
                  return;
                }
                if (radius) {
                  this.drawRoundedRect(ctx, x, y, width, height, radius);
                } else {
                  ctx.fillRect(x, y, width, height);
                }
              }
            }, {
              key: "drawRoundedRect",
              value: function drawRoundedRect(ctx, x, y, width, height, radius) {
                if (height === 0) {
                  return;
                }
                if (height < 0) {
                  height *= -1;
                  y -= height;
                }
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.fill();
              }
            }, {
              key: "drawLines",
              value: function drawLines(peaks, absmax, halfH, offsetY, start, end) {
                this.drawLineToContext(this.waveCtx, peaks, absmax, halfH, offsetY, start, end);
                if (this.hasProgressCanvas) {
                  this.drawLineToContext(this.progressCtx, peaks, absmax, halfH, offsetY, start, end);
                }
              }
            }, {
              key: "drawLineToContext",
              value: function drawLineToContext(ctx, peaks, absmax, halfH, offsetY, start, end) {
                if (!ctx) {
                  return;
                }
                var length = peaks.length / 2;
                var first = Math.round(length * this.start);
                var last = Math.round(length * this.end) + 1;
                var canvasStart = first;
                var canvasEnd = last;
                var scale = this.wave.width / (canvasEnd - canvasStart - 1);
                var halfOffset = halfH + offsetY;
                var absmaxHalf = absmax / halfH;
                ctx.beginPath();
                ctx.moveTo((canvasStart - first) * scale, halfOffset);
                ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart] || 0) / absmaxHalf));
                var i, peak, h;
                for (i = canvasStart; i < canvasEnd; i++) {
                  peak = peaks[2 * i] || 0;
                  h = Math.round(peak / absmaxHalf);
                  ctx.lineTo((i - first) * scale + this.halfPixel, halfOffset - h);
                }
                var j = canvasEnd - 1;
                for (j; j >= canvasStart; j--) {
                  peak = peaks[2 * j + 1] || 0;
                  h = Math.round(peak / absmaxHalf);
                  ctx.lineTo((j - first) * scale + this.halfPixel, halfOffset - h);
                }
                ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart + 1] || 0) / absmaxHalf));
                ctx.closePath();
                ctx.fill();
              }
            }, {
              key: "destroy",
              value: function destroy() {
                this.waveCtx = null;
                this.wave = null;
                this.progressCtx = null;
                this.progress = null;
              }
            }, {
              key: "getImage",
              value: function getImage(format, quality, type) {
                var _this = this;
                if (type === "blob") {
                  return new Promise(function(resolve) {
                    _this.wave.toBlob(resolve, format, quality);
                  });
                } else if (type === "dataURL") {
                  return this.wave.toDataURL(format, quality);
                }
              }
            }]);
            return CanvasEntry2;
          }();
          exports2["default"] = CanvasEntry;
          module2.exports = exports2.default;
        },
        "./src/drawer.js": (module2, exports2, __webpack_require__2) => {
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var util = _interopRequireWildcard(__webpack_require__2("./src/util/index.js"));
          function _getRequireWildcardCache(nodeInterop) {
            if (typeof WeakMap !== "function")
              return null;
            var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
            var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
            return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
              return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
            })(nodeInterop);
          }
          function _interopRequireWildcard(obj, nodeInterop) {
            if (!nodeInterop && obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return { default: obj };
            }
            var cache = _getRequireWildcardCache(nodeInterop);
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj.default = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _setPrototypeOf(o, p2) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
              o2.__proto__ = p3;
              return o2;
            };
            return _setPrototypeOf(o, p2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError("Derived constructors may only return object or undefined");
            }
            return _assertThisInitialized(self2);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          var Drawer2 = /* @__PURE__ */ function(_util$Observer) {
            _inherits(Drawer3, _util$Observer);
            var _super = _createSuper(Drawer3);
            function Drawer3(container, params) {
              var _this;
              _classCallCheck(this, Drawer3);
              _this = _super.call(this);
              _this.container = util.withOrientation(container, params.vertical);
              _this.params = params;
              _this.width = 0;
              _this.height = params.height * _this.params.pixelRatio;
              _this.lastPos = 0;
              _this.wrapper = null;
              return _this;
            }
            _createClass(Drawer3, [{
              key: "style",
              value: function style2(el, styles) {
                return util.style(el, styles);
              }
            }, {
              key: "createWrapper",
              value: function createWrapper() {
                this.wrapper = util.withOrientation(this.container.appendChild(document.createElement("wave")), this.params.vertical);
                this.style(this.wrapper, {
                  display: "block",
                  position: "relative",
                  userSelect: "none",
                  webkitUserSelect: "none",
                  height: this.params.height + "px"
                });
                if (this.params.fillParent || this.params.scrollParent) {
                  this.style(this.wrapper, {
                    width: "100%",
                    cursor: this.params.hideCursor ? "none" : "auto",
                    overflowX: this.params.hideScrollbar ? "hidden" : "auto",
                    overflowY: "hidden"
                  });
                }
                this.setupWrapperEvents();
              }
            }, {
              key: "handleEvent",
              value: function handleEvent(e, noPrevent) {
                !noPrevent && e.preventDefault();
                var clientX = util.withOrientation(e.targetTouches ? e.targetTouches[0] : e, this.params.vertical).clientX;
                var bbox = this.wrapper.getBoundingClientRect();
                var nominalWidth = this.width;
                var parentWidth = this.getWidth();
                var progressPixels = this.getProgressPixels(bbox, clientX);
                var progress;
                if (!this.params.fillParent && nominalWidth < parentWidth) {
                  progress = progressPixels * (this.params.pixelRatio / nominalWidth) || 0;
                } else {
                  progress = (progressPixels + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0;
                }
                return util.clamp(progress, 0, 1);
              }
            }, {
              key: "getProgressPixels",
              value: function getProgressPixels(wrapperBbox, clientX) {
                if (this.params.rtl) {
                  return wrapperBbox.right - clientX;
                } else {
                  return clientX - wrapperBbox.left;
                }
              }
            }, {
              key: "setupWrapperEvents",
              value: function setupWrapperEvents() {
                var _this2 = this;
                this.wrapper.addEventListener("click", function(e) {
                  var orientedEvent = util.withOrientation(e, _this2.params.vertical);
                  var scrollbarHeight = _this2.wrapper.offsetHeight - _this2.wrapper.clientHeight;
                  if (scrollbarHeight !== 0) {
                    var bbox = _this2.wrapper.getBoundingClientRect();
                    if (orientedEvent.clientY >= bbox.bottom - scrollbarHeight) {
                      return;
                    }
                  }
                  if (_this2.params.interact) {
                    _this2.fireEvent("click", e, _this2.handleEvent(e));
                  }
                });
                this.wrapper.addEventListener("dblclick", function(e) {
                  if (_this2.params.interact) {
                    _this2.fireEvent("dblclick", e, _this2.handleEvent(e));
                  }
                });
                this.wrapper.addEventListener("scroll", function(e) {
                  return _this2.fireEvent("scroll", e);
                });
              }
            }, {
              key: "drawPeaks",
              value: function drawPeaks(peaks, length, start, end) {
                if (!this.setWidth(length)) {
                  this.clearWave();
                }
                this.params.barWidth ? this.drawBars(peaks, 0, start, end) : this.drawWave(peaks, 0, start, end);
              }
            }, {
              key: "resetScroll",
              value: function resetScroll() {
                if (this.wrapper !== null) {
                  this.wrapper.scrollLeft = 0;
                }
              }
            }, {
              key: "recenter",
              value: function recenter(percent) {
                var position2 = this.wrapper.scrollWidth * percent;
                this.recenterOnPosition(position2, true);
              }
            }, {
              key: "recenterOnPosition",
              value: function recenterOnPosition(position2, immediate) {
                var scrollLeft = this.wrapper.scrollLeft;
                var half = ~~(this.wrapper.clientWidth / 2);
                var maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
                var target = position2 - half;
                var offset2 = target - scrollLeft;
                if (maxScroll == 0) {
                  return;
                }
                if (!immediate && -half <= offset2 && offset2 < half) {
                  var rate = this.params.autoCenterRate;
                  rate /= half;
                  rate *= maxScroll;
                  offset2 = Math.max(-rate, Math.min(rate, offset2));
                  target = scrollLeft + offset2;
                }
                target = Math.max(0, Math.min(maxScroll, target));
                if (target != scrollLeft) {
                  this.wrapper.scrollLeft = target;
                }
              }
            }, {
              key: "getScrollX",
              value: function getScrollX() {
                var x = 0;
                if (this.wrapper) {
                  var pixelRatio = this.params.pixelRatio;
                  x = Math.round(this.wrapper.scrollLeft * pixelRatio);
                  if (this.params.scrollParent) {
                    var maxScroll = ~~(this.wrapper.scrollWidth * pixelRatio - this.getWidth());
                    x = Math.min(maxScroll, Math.max(0, x));
                  }
                }
                return x;
              }
            }, {
              key: "getWidth",
              value: function getWidth() {
                return Math.round(this.container.clientWidth * this.params.pixelRatio);
              }
            }, {
              key: "setWidth",
              value: function setWidth(width) {
                if (this.width == width) {
                  return false;
                }
                this.width = width;
                if (this.params.fillParent || this.params.scrollParent) {
                  this.style(this.wrapper, {
                    width: ""
                  });
                } else {
                  var newWidth = ~~(this.width / this.params.pixelRatio) + "px";
                  this.style(this.wrapper, {
                    width: newWidth
                  });
                }
                this.updateSize();
                return true;
              }
            }, {
              key: "setHeight",
              value: function setHeight(height) {
                if (height == this.height) {
                  return false;
                }
                this.height = height;
                this.style(this.wrapper, {
                  height: ~~(this.height / this.params.pixelRatio) + "px"
                });
                this.updateSize();
                return true;
              }
            }, {
              key: "progress",
              value: function progress(_progress) {
                var minPxDelta = 1 / this.params.pixelRatio;
                var pos = Math.round(_progress * this.width) * minPxDelta;
                if (pos < this.lastPos || pos - this.lastPos >= minPxDelta) {
                  this.lastPos = pos;
                  if (this.params.scrollParent && this.params.autoCenter) {
                    var newPos = ~~(this.wrapper.scrollWidth * _progress);
                    this.recenterOnPosition(newPos, this.params.autoCenterImmediately);
                  }
                  this.updateProgress(pos);
                }
              }
            }, {
              key: "destroy",
              value: function destroy() {
                this.unAll();
                if (this.wrapper) {
                  if (this.wrapper.parentNode == this.container.domElement) {
                    this.container.removeChild(this.wrapper.domElement);
                  }
                  this.wrapper = null;
                }
              }
            }, {
              key: "updateCursor",
              value: function updateCursor() {
              }
            }, {
              key: "updateSize",
              value: function updateSize() {
              }
            }, {
              key: "drawBars",
              value: function drawBars(peaks, channelIndex, start, end) {
              }
            }, {
              key: "drawWave",
              value: function drawWave(peaks, channelIndex, start, end) {
              }
            }, {
              key: "clearWave",
              value: function clearWave() {
              }
            }, {
              key: "updateProgress",
              value: function updateProgress(position2) {
              }
            }]);
            return Drawer3;
          }(util.Observer);
          exports2["default"] = Drawer2;
          module2.exports = exports2.default;
        },
        "./src/drawer.multicanvas.js": (module2, exports2, __webpack_require__2) => {
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var _drawer = _interopRequireDefault(__webpack_require__2("./src/drawer.js"));
          var util = _interopRequireWildcard(__webpack_require__2("./src/util/index.js"));
          var _drawer2 = _interopRequireDefault(__webpack_require__2("./src/drawer.canvasentry.js"));
          function _getRequireWildcardCache(nodeInterop) {
            if (typeof WeakMap !== "function")
              return null;
            var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
            var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
            return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
              return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
            })(nodeInterop);
          }
          function _interopRequireWildcard(obj, nodeInterop) {
            if (!nodeInterop && obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return { default: obj };
            }
            var cache = _getRequireWildcardCache(nodeInterop);
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj.default = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _setPrototypeOf(o, p2) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
              o2.__proto__ = p3;
              return o2;
            };
            return _setPrototypeOf(o, p2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError("Derived constructors may only return object or undefined");
            }
            return _assertThisInitialized(self2);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          var MultiCanvas = /* @__PURE__ */ function(_Drawer) {
            _inherits(MultiCanvas2, _Drawer);
            var _super = _createSuper(MultiCanvas2);
            function MultiCanvas2(container, params) {
              var _this;
              _classCallCheck(this, MultiCanvas2);
              _this = _super.call(this, container, params);
              _this.maxCanvasWidth = params.maxCanvasWidth;
              _this.maxCanvasElementWidth = Math.round(params.maxCanvasWidth / params.pixelRatio);
              _this.hasProgressCanvas = params.waveColor != params.progressColor;
              _this.halfPixel = 0.5 / params.pixelRatio;
              _this.canvases = [];
              _this.progressWave = null;
              _this.EntryClass = _drawer2.default;
              _this.canvasContextAttributes = params.drawingContextAttributes;
              _this.overlap = 2 * Math.ceil(params.pixelRatio / 2);
              _this.barRadius = params.barRadius || 0;
              _this.vertical = params.vertical;
              return _this;
            }
            _createClass(MultiCanvas2, [{
              key: "init",
              value: function init() {
                this.createWrapper();
                this.createElements();
              }
            }, {
              key: "createElements",
              value: function createElements() {
                this.progressWave = util.withOrientation(this.wrapper.appendChild(document.createElement("wave")), this.params.vertical);
                this.style(this.progressWave, {
                  position: "absolute",
                  zIndex: 3,
                  left: 0,
                  top: 0,
                  bottom: 0,
                  overflow: "hidden",
                  width: "0",
                  display: "none",
                  boxSizing: "border-box",
                  borderRightStyle: "solid",
                  pointerEvents: "none"
                });
                this.addCanvas();
                this.updateCursor();
              }
            }, {
              key: "updateCursor",
              value: function updateCursor() {
                this.style(this.progressWave, {
                  borderRightWidth: this.params.cursorWidth + "px",
                  borderRightColor: this.params.cursorColor
                });
              }
            }, {
              key: "updateSize",
              value: function updateSize() {
                var _this2 = this;
                var totalWidth = Math.round(this.width / this.params.pixelRatio);
                var requiredCanvases = Math.ceil(totalWidth / (this.maxCanvasElementWidth + this.overlap));
                while (this.canvases.length < requiredCanvases) {
                  this.addCanvas();
                }
                while (this.canvases.length > requiredCanvases) {
                  this.removeCanvas();
                }
                var canvasWidth = this.maxCanvasWidth + this.overlap;
                var lastCanvas = this.canvases.length - 1;
                this.canvases.forEach(function(entry, i) {
                  if (i == lastCanvas) {
                    canvasWidth = _this2.width - _this2.maxCanvasWidth * lastCanvas;
                  }
                  _this2.updateDimensions(entry, canvasWidth, _this2.height);
                  entry.clearWave();
                });
              }
            }, {
              key: "addCanvas",
              value: function addCanvas() {
                var entry = new this.EntryClass();
                entry.canvasContextAttributes = this.canvasContextAttributes;
                entry.hasProgressCanvas = this.hasProgressCanvas;
                entry.halfPixel = this.halfPixel;
                var leftOffset = this.maxCanvasElementWidth * this.canvases.length;
                var wave = util.withOrientation(this.wrapper.appendChild(document.createElement("canvas")), this.params.vertical);
                this.style(wave, {
                  position: "absolute",
                  zIndex: 2,
                  left: leftOffset + "px",
                  top: 0,
                  bottom: 0,
                  height: "100%",
                  pointerEvents: "none"
                });
                entry.initWave(wave);
                if (this.hasProgressCanvas) {
                  var progress = util.withOrientation(this.progressWave.appendChild(document.createElement("canvas")), this.params.vertical);
                  this.style(progress, {
                    position: "absolute",
                    left: leftOffset + "px",
                    top: 0,
                    bottom: 0,
                    height: "100%"
                  });
                  entry.initProgress(progress);
                }
                this.canvases.push(entry);
              }
            }, {
              key: "removeCanvas",
              value: function removeCanvas() {
                var lastEntry = this.canvases[this.canvases.length - 1];
                lastEntry.wave.parentElement.removeChild(lastEntry.wave.domElement);
                if (this.hasProgressCanvas) {
                  lastEntry.progress.parentElement.removeChild(lastEntry.progress.domElement);
                }
                if (lastEntry) {
                  lastEntry.destroy();
                  lastEntry = null;
                }
                this.canvases.pop();
              }
            }, {
              key: "updateDimensions",
              value: function updateDimensions(entry, width, height) {
                var elementWidth = Math.round(width / this.params.pixelRatio);
                var totalWidth = Math.round(this.width / this.params.pixelRatio);
                entry.updateDimensions(elementWidth, totalWidth, width, height);
                this.style(this.progressWave, {
                  display: "block"
                });
              }
            }, {
              key: "clearWave",
              value: function clearWave() {
                var _this3 = this;
                util.frame(function() {
                  _this3.canvases.forEach(function(entry) {
                    return entry.clearWave();
                  });
                })();
              }
            }, {
              key: "drawBars",
              value: function drawBars(peaks, channelIndex, start, end) {
                var _this4 = this;
                return this.prepareDraw(peaks, channelIndex, start, end, function(_ref) {
                  var absmax = _ref.absmax, hasMinVals = _ref.hasMinVals;
                  _ref.height;
                  var offsetY = _ref.offsetY, halfH = _ref.halfH, peaks2 = _ref.peaks, ch = _ref.channelIndex;
                  if (start === void 0) {
                    return;
                  }
                  var peakIndexScale = hasMinVals ? 2 : 1;
                  var length = peaks2.length / peakIndexScale;
                  var bar = _this4.params.barWidth * _this4.params.pixelRatio;
                  var gap = _this4.params.barGap === null ? Math.max(_this4.params.pixelRatio, ~~(bar / 2)) : Math.max(_this4.params.pixelRatio, _this4.params.barGap * _this4.params.pixelRatio);
                  var step = bar + gap;
                  var scale = length / _this4.width;
                  var first = start;
                  var last = end;
                  var peakIndex = first;
                  for (peakIndex; peakIndex < last; peakIndex += step) {
                    var peak = 0;
                    var peakIndexRange = Math.floor(peakIndex * scale) * peakIndexScale;
                    var peakIndexEnd = Math.floor((peakIndex + step) * scale) * peakIndexScale;
                    do {
                      var newPeak = Math.abs(peaks2[peakIndexRange]);
                      if (newPeak > peak) {
                        peak = newPeak;
                      }
                      peakIndexRange += peakIndexScale;
                    } while (peakIndexRange < peakIndexEnd);
                    var h = Math.round(peak / absmax * halfH);
                    if (h == 0 && _this4.params.barMinHeight) {
                      h = _this4.params.barMinHeight;
                    }
                    _this4.fillRect(peakIndex + _this4.halfPixel, halfH - h + offsetY, bar + _this4.halfPixel, h * 2, _this4.barRadius, ch);
                  }
                });
              }
            }, {
              key: "drawWave",
              value: function drawWave(peaks, channelIndex, start, end) {
                var _this5 = this;
                return this.prepareDraw(peaks, channelIndex, start, end, function(_ref2) {
                  var absmax = _ref2.absmax, hasMinVals = _ref2.hasMinVals;
                  _ref2.height;
                  var offsetY = _ref2.offsetY, halfH = _ref2.halfH, peaks2 = _ref2.peaks, channelIndex2 = _ref2.channelIndex;
                  if (!hasMinVals) {
                    var reflectedPeaks = [];
                    var len = peaks2.length;
                    var i = 0;
                    for (i; i < len; i++) {
                      reflectedPeaks[2 * i] = peaks2[i];
                      reflectedPeaks[2 * i + 1] = -peaks2[i];
                    }
                    peaks2 = reflectedPeaks;
                  }
                  if (start !== void 0) {
                    _this5.drawLine(peaks2, absmax, halfH, offsetY, start, end, channelIndex2);
                  }
                  _this5.fillRect(0, halfH + offsetY - _this5.halfPixel, _this5.width, _this5.halfPixel, _this5.barRadius, channelIndex2);
                });
              }
            }, {
              key: "drawLine",
              value: function drawLine(peaks, absmax, halfH, offsetY, start, end, channelIndex) {
                var _this6 = this;
                var _ref3 = this.params.splitChannelsOptions.channelColors[channelIndex] || {}, waveColor = _ref3.waveColor, progressColor = _ref3.progressColor;
                this.canvases.forEach(function(entry, i) {
                  _this6.setFillStyles(entry, waveColor, progressColor);
                  _this6.applyCanvasTransforms(entry, _this6.params.vertical);
                  entry.drawLines(peaks, absmax, halfH, offsetY, start, end);
                });
              }
            }, {
              key: "fillRect",
              value: function fillRect(x, y, width, height, radius, channelIndex) {
                var startCanvas = Math.floor(x / this.maxCanvasWidth);
                var endCanvas = Math.min(Math.ceil((x + width) / this.maxCanvasWidth) + 1, this.canvases.length);
                var i = startCanvas;
                for (i; i < endCanvas; i++) {
                  var entry = this.canvases[i];
                  var leftOffset = i * this.maxCanvasWidth;
                  var intersection = {
                    x1: Math.max(x, i * this.maxCanvasWidth),
                    y1: y,
                    x2: Math.min(x + width, i * this.maxCanvasWidth + entry.wave.width),
                    y2: y + height
                  };
                  if (intersection.x1 < intersection.x2) {
                    var _ref4 = this.params.splitChannelsOptions.channelColors[channelIndex] || {}, waveColor = _ref4.waveColor, progressColor = _ref4.progressColor;
                    this.setFillStyles(entry, waveColor, progressColor);
                    this.applyCanvasTransforms(entry, this.params.vertical);
                    entry.fillRects(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1, radius);
                  }
                }
              }
            }, {
              key: "hideChannel",
              value: function hideChannel(channelIndex) {
                return this.params.splitChannels && this.params.splitChannelsOptions.filterChannels.includes(channelIndex);
              }
            }, {
              key: "prepareDraw",
              value: function prepareDraw(peaks, channelIndex, start, end, fn, drawIndex, normalizedMax) {
                var _this7 = this;
                return util.frame(function() {
                  if (peaks[0] instanceof Array) {
                    var channels = peaks;
                    if (_this7.params.splitChannels) {
                      var filteredChannels = channels.filter(function(c, i) {
                        return !_this7.hideChannel(i);
                      });
                      if (!_this7.params.splitChannelsOptions.overlay) {
                        _this7.setHeight(Math.max(filteredChannels.length, 1) * _this7.params.height * _this7.params.pixelRatio);
                      }
                      var overallAbsMax;
                      if (_this7.params.splitChannelsOptions && _this7.params.splitChannelsOptions.relativeNormalization) {
                        overallAbsMax = util.max(channels.map(function(channelPeaks) {
                          return util.absMax(channelPeaks);
                        }));
                      }
                      return channels.forEach(function(channelPeaks, i) {
                        return _this7.prepareDraw(channelPeaks, i, start, end, fn, filteredChannels.indexOf(channelPeaks), overallAbsMax);
                      });
                    }
                    peaks = channels[0];
                  }
                  if (_this7.hideChannel(channelIndex)) {
                    return;
                  }
                  var absmax = 1 / _this7.params.barHeight;
                  if (_this7.params.normalize) {
                    absmax = normalizedMax === void 0 ? util.absMax(peaks) : normalizedMax;
                  }
                  var hasMinVals = [].some.call(peaks, function(val) {
                    return val < 0;
                  });
                  var height = _this7.params.height * _this7.params.pixelRatio;
                  var halfH = height / 2;
                  var offsetY = height * drawIndex || 0;
                  if (_this7.params.splitChannelsOptions && _this7.params.splitChannelsOptions.overlay) {
                    offsetY = 0;
                  }
                  return fn({
                    absmax,
                    hasMinVals,
                    height,
                    offsetY,
                    halfH,
                    peaks,
                    channelIndex
                  });
                })();
              }
            }, {
              key: "setFillStyles",
              value: function setFillStyles(entry) {
                var waveColor = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.params.waveColor;
                var progressColor = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.params.progressColor;
                entry.setFillStyles(waveColor, progressColor);
              }
            }, {
              key: "applyCanvasTransforms",
              value: function applyCanvasTransforms(entry) {
                var vertical = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                entry.applyCanvasTransforms(vertical);
              }
            }, {
              key: "getImage",
              value: function getImage(format, quality, type) {
                if (type === "blob") {
                  return Promise.all(this.canvases.map(function(entry) {
                    return entry.getImage(format, quality, type);
                  }));
                } else if (type === "dataURL") {
                  var images = this.canvases.map(function(entry) {
                    return entry.getImage(format, quality, type);
                  });
                  return images.length > 1 ? images : images[0];
                }
              }
            }, {
              key: "updateProgress",
              value: function updateProgress(position2) {
                this.style(this.progressWave, {
                  width: position2 + "px"
                });
              }
            }]);
            return MultiCanvas2;
          }(_drawer.default);
          exports2["default"] = MultiCanvas;
          module2.exports = exports2.default;
        },
        "./src/mediaelement-webaudio.js": (module2, exports2, __webpack_require__2) => {
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var _mediaelement = _interopRequireDefault(__webpack_require__2("./src/mediaelement.js"));
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          function _get() {
            if (typeof Reflect !== "undefined" && Reflect.get) {
              _get = Reflect.get;
            } else {
              _get = function _get2(target, property, receiver) {
                var base = _superPropBase(target, property);
                if (!base)
                  return;
                var desc = Object.getOwnPropertyDescriptor(base, property);
                if (desc.get) {
                  return desc.get.call(arguments.length < 3 ? target : receiver);
                }
                return desc.value;
              };
            }
            return _get.apply(this, arguments);
          }
          function _superPropBase(object, property) {
            while (!Object.prototype.hasOwnProperty.call(object, property)) {
              object = _getPrototypeOf(object);
              if (object === null)
                break;
            }
            return object;
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _setPrototypeOf(o, p2) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
              o2.__proto__ = p3;
              return o2;
            };
            return _setPrototypeOf(o, p2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError("Derived constructors may only return object or undefined");
            }
            return _assertThisInitialized(self2);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          var MediaElementWebAudio = /* @__PURE__ */ function(_MediaElement) {
            _inherits(MediaElementWebAudio2, _MediaElement);
            var _super = _createSuper(MediaElementWebAudio2);
            function MediaElementWebAudio2(params) {
              var _this;
              _classCallCheck(this, MediaElementWebAudio2);
              _this = _super.call(this, params);
              _this.params = params;
              _this.sourceMediaElement = null;
              return _this;
            }
            _createClass(MediaElementWebAudio2, [{
              key: "init",
              value: function init() {
                this.setPlaybackRate(this.params.audioRate);
                this.createTimer();
                this.createVolumeNode();
                this.createScriptNode();
                this.createAnalyserNode();
              }
            }, {
              key: "_load",
              value: function _load(media, peaks, preload) {
                _get(_getPrototypeOf(MediaElementWebAudio2.prototype), "_load", this).call(this, media, peaks, preload);
                this.createMediaElementSource(media);
              }
            }, {
              key: "createMediaElementSource",
              value: function createMediaElementSource(mediaElement) {
                this.sourceMediaElement = this.ac.createMediaElementSource(mediaElement);
                this.sourceMediaElement.connect(this.analyser);
              }
            }, {
              key: "play",
              value: function play(start, end) {
                this.resumeAudioContext();
                return _get(_getPrototypeOf(MediaElementWebAudio2.prototype), "play", this).call(this, start, end);
              }
            }, {
              key: "destroy",
              value: function destroy() {
                _get(_getPrototypeOf(MediaElementWebAudio2.prototype), "destroy", this).call(this);
                this.destroyWebAudio();
              }
            }]);
            return MediaElementWebAudio2;
          }(_mediaelement.default);
          exports2["default"] = MediaElementWebAudio;
          module2.exports = exports2.default;
        },
        "./src/mediaelement.js": (module2, exports2, __webpack_require__2) => {
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var _webaudio = _interopRequireDefault(__webpack_require__2("./src/webaudio.js"));
          var util = _interopRequireWildcard(__webpack_require__2("./src/util/index.js"));
          function _getRequireWildcardCache(nodeInterop) {
            if (typeof WeakMap !== "function")
              return null;
            var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
            var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
            return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
              return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
            })(nodeInterop);
          }
          function _interopRequireWildcard(obj, nodeInterop) {
            if (!nodeInterop && obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return { default: obj };
            }
            var cache = _getRequireWildcardCache(nodeInterop);
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj.default = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          function _get() {
            if (typeof Reflect !== "undefined" && Reflect.get) {
              _get = Reflect.get;
            } else {
              _get = function _get2(target, property, receiver) {
                var base = _superPropBase(target, property);
                if (!base)
                  return;
                var desc = Object.getOwnPropertyDescriptor(base, property);
                if (desc.get) {
                  return desc.get.call(arguments.length < 3 ? target : receiver);
                }
                return desc.value;
              };
            }
            return _get.apply(this, arguments);
          }
          function _superPropBase(object, property) {
            while (!Object.prototype.hasOwnProperty.call(object, property)) {
              object = _getPrototypeOf(object);
              if (object === null)
                break;
            }
            return object;
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _setPrototypeOf(o, p2) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
              o2.__proto__ = p3;
              return o2;
            };
            return _setPrototypeOf(o, p2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError("Derived constructors may only return object or undefined");
            }
            return _assertThisInitialized(self2);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          var MediaElement = /* @__PURE__ */ function(_WebAudio) {
            _inherits(MediaElement2, _WebAudio);
            var _super = _createSuper(MediaElement2);
            function MediaElement2(params) {
              var _this;
              _classCallCheck(this, MediaElement2);
              _this = _super.call(this, params);
              _this.params = params;
              _this.media = {
                currentTime: 0,
                duration: 0,
                paused: true,
                playbackRate: 1,
                play: function play() {
                },
                pause: function pause() {
                },
                volume: 0
              };
              _this.mediaType = params.mediaType.toLowerCase();
              _this.elementPosition = params.elementPosition;
              _this.peaks = null;
              _this.playbackRate = 1;
              _this.volume = 1;
              _this.isMuted = false;
              _this.buffer = null;
              _this.onPlayEnd = null;
              _this.mediaListeners = {};
              return _this;
            }
            _createClass(MediaElement2, [{
              key: "init",
              value: function init() {
                this.setPlaybackRate(this.params.audioRate);
                this.createTimer();
              }
            }, {
              key: "_setupMediaListeners",
              value: function _setupMediaListeners() {
                var _this2 = this;
                this.mediaListeners.error = function() {
                  _this2.fireEvent("error", "Error loading media element");
                };
                this.mediaListeners.canplay = function() {
                  _this2.fireEvent("canplay");
                };
                this.mediaListeners.ended = function() {
                  _this2.fireEvent("finish");
                };
                this.mediaListeners.play = function() {
                  _this2.fireEvent("play");
                };
                this.mediaListeners.pause = function() {
                  _this2.fireEvent("pause");
                };
                this.mediaListeners.seeked = function(event) {
                  _this2.fireEvent("seek");
                };
                this.mediaListeners.volumechange = function(event) {
                  _this2.isMuted = _this2.media.muted;
                  if (_this2.isMuted) {
                    _this2.volume = 0;
                  } else {
                    _this2.volume = _this2.media.volume;
                  }
                  _this2.fireEvent("volume");
                };
                Object.keys(this.mediaListeners).forEach(function(id) {
                  _this2.media.removeEventListener(id, _this2.mediaListeners[id]);
                  _this2.media.addEventListener(id, _this2.mediaListeners[id]);
                });
              }
            }, {
              key: "createTimer",
              value: function createTimer() {
                var _this3 = this;
                var onAudioProcess = function onAudioProcess2() {
                  if (_this3.isPaused()) {
                    return;
                  }
                  _this3.fireEvent("audioprocess", _this3.getCurrentTime());
                  util.frame(onAudioProcess2)();
                };
                this.on("play", onAudioProcess);
                this.on("pause", function() {
                  _this3.fireEvent("audioprocess", _this3.getCurrentTime());
                });
              }
            }, {
              key: "load",
              value: function load(url, container, peaks, preload) {
                var media = document.createElement(this.mediaType);
                media.controls = this.params.mediaControls;
                media.autoplay = this.params.autoplay || false;
                media.preload = preload == null ? "auto" : preload;
                media.src = url;
                media.style.width = "100%";
                var prevMedia = container.querySelector(this.mediaType);
                if (prevMedia) {
                  container.removeChild(prevMedia);
                }
                container.appendChild(media);
                this._load(media, peaks, preload);
              }
            }, {
              key: "loadElt",
              value: function loadElt(elt, peaks) {
                elt.controls = this.params.mediaControls;
                elt.autoplay = this.params.autoplay || false;
                this._load(elt, peaks, elt.preload);
              }
            }, {
              key: "_load",
              value: function _load(media, peaks, preload) {
                if (!(media instanceof HTMLMediaElement) || typeof media.addEventListener === "undefined") {
                  throw new Error("media parameter is not a valid media element");
                }
                if (typeof media.load == "function" && !(peaks && preload == "none")) {
                  media.load();
                }
                this.media = media;
                this._setupMediaListeners();
                this.peaks = peaks;
                this.onPlayEnd = null;
                this.buffer = null;
                this.isMuted = media.muted;
                this.setPlaybackRate(this.playbackRate);
                this.setVolume(this.volume);
              }
            }, {
              key: "isPaused",
              value: function isPaused() {
                return !this.media || this.media.paused;
              }
            }, {
              key: "getDuration",
              value: function getDuration() {
                if (this.explicitDuration) {
                  return this.explicitDuration;
                }
                var duration = (this.buffer || this.media).duration;
                if (duration >= Infinity) {
                  duration = this.media.seekable.end(0);
                }
                return duration;
              }
            }, {
              key: "getCurrentTime",
              value: function getCurrentTime() {
                return this.media && this.media.currentTime;
              }
            }, {
              key: "getPlayedPercents",
              value: function getPlayedPercents() {
                return this.getCurrentTime() / this.getDuration() || 0;
              }
            }, {
              key: "getPlaybackRate",
              value: function getPlaybackRate() {
                return this.playbackRate || this.media.playbackRate;
              }
            }, {
              key: "setPlaybackRate",
              value: function setPlaybackRate(value) {
                this.playbackRate = value || 1;
                this.media.playbackRate = this.playbackRate;
              }
            }, {
              key: "seekTo",
              value: function seekTo(start) {
                if (start != null && !isNaN(start)) {
                  this.media.currentTime = start;
                }
                this.clearPlayEnd();
              }
            }, {
              key: "play",
              value: function play(start, end) {
                this.seekTo(start);
                var promise = this.media.play();
                end && this.setPlayEnd(end);
                return promise;
              }
            }, {
              key: "pause",
              value: function pause() {
                var promise;
                if (this.media) {
                  promise = this.media.pause();
                }
                this.clearPlayEnd();
                return promise;
              }
            }, {
              key: "setPlayEnd",
              value: function setPlayEnd(end) {
                var _this4 = this;
                this.clearPlayEnd();
                this._onPlayEnd = function(time) {
                  if (time >= end) {
                    _this4.pause();
                    _this4.seekTo(end);
                  }
                };
                this.on("audioprocess", this._onPlayEnd);
              }
            }, {
              key: "clearPlayEnd",
              value: function clearPlayEnd() {
                if (this._onPlayEnd) {
                  this.un("audioprocess", this._onPlayEnd);
                  this._onPlayEnd = null;
                }
              }
            }, {
              key: "getPeaks",
              value: function getPeaks(length, first, last) {
                if (this.buffer) {
                  return _get(_getPrototypeOf(MediaElement2.prototype), "getPeaks", this).call(this, length, first, last);
                }
                return this.peaks || [];
              }
            }, {
              key: "setSinkId",
              value: function setSinkId(deviceId) {
                if (deviceId) {
                  if (!this.media.setSinkId) {
                    return Promise.reject(new Error("setSinkId is not supported in your browser"));
                  }
                  return this.media.setSinkId(deviceId);
                }
                return Promise.reject(new Error("Invalid deviceId: " + deviceId));
              }
            }, {
              key: "getVolume",
              value: function getVolume() {
                return this.volume;
              }
            }, {
              key: "setVolume",
              value: function setVolume(value) {
                this.volume = value;
                if (this.media.volume !== this.volume) {
                  this.media.volume = this.volume;
                }
              }
            }, {
              key: "setMute",
              value: function setMute(muted) {
                this.isMuted = this.media.muted = muted;
              }
            }, {
              key: "destroy",
              value: function destroy() {
                var _this5 = this;
                this.pause();
                this.unAll();
                this.destroyed = true;
                Object.keys(this.mediaListeners).forEach(function(id) {
                  if (_this5.media) {
                    _this5.media.removeEventListener(id, _this5.mediaListeners[id]);
                  }
                });
                if (this.params.removeMediaElementOnDestroy && this.media && this.media.parentNode) {
                  this.media.parentNode.removeChild(this.media);
                }
                this.media = null;
              }
            }]);
            return MediaElement2;
          }(_webaudio.default);
          exports2["default"] = MediaElement;
          module2.exports = exports2.default;
        },
        "./src/peakcache.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          var PeakCache = /* @__PURE__ */ function() {
            function PeakCache2() {
              _classCallCheck(this, PeakCache2);
              this.clearPeakCache();
            }
            _createClass(PeakCache2, [{
              key: "clearPeakCache",
              value: function clearPeakCache() {
                this.peakCacheRanges = [];
                this.peakCacheLength = -1;
              }
            }, {
              key: "addRangeToPeakCache",
              value: function addRangeToPeakCache(length, start, end) {
                if (length != this.peakCacheLength) {
                  this.clearPeakCache();
                  this.peakCacheLength = length;
                }
                var uncachedRanges = [];
                var i = 0;
                while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] < start) {
                  i++;
                }
                if (i % 2 == 0) {
                  uncachedRanges.push(start);
                }
                while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] <= end) {
                  uncachedRanges.push(this.peakCacheRanges[i]);
                  i++;
                }
                if (i % 2 == 0) {
                  uncachedRanges.push(end);
                }
                uncachedRanges = uncachedRanges.filter(function(item, pos, arr) {
                  if (pos == 0) {
                    return item != arr[pos + 1];
                  } else if (pos == arr.length - 1) {
                    return item != arr[pos - 1];
                  }
                  return item != arr[pos - 1] && item != arr[pos + 1];
                });
                this.peakCacheRanges = this.peakCacheRanges.concat(uncachedRanges);
                this.peakCacheRanges = this.peakCacheRanges.sort(function(a, b) {
                  return a - b;
                }).filter(function(item, pos, arr) {
                  if (pos == 0) {
                    return item != arr[pos + 1];
                  } else if (pos == arr.length - 1) {
                    return item != arr[pos - 1];
                  }
                  return item != arr[pos - 1] && item != arr[pos + 1];
                });
                var uncachedRangePairs = [];
                for (i = 0; i < uncachedRanges.length; i += 2) {
                  uncachedRangePairs.push([uncachedRanges[i], uncachedRanges[i + 1]]);
                }
                return uncachedRangePairs;
              }
            }, {
              key: "getCacheRanges",
              value: function getCacheRanges() {
                var peakCacheRangePairs = [];
                var i;
                for (i = 0; i < this.peakCacheRanges.length; i += 2) {
                  peakCacheRangePairs.push([this.peakCacheRanges[i], this.peakCacheRanges[i + 1]]);
                }
                return peakCacheRangePairs;
              }
            }]);
            return PeakCache2;
          }();
          exports2["default"] = PeakCache;
          module2.exports = exports2.default;
        },
        "./src/util/absMax.js": (module2, exports2, __webpack_require__2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = absMax;
          var _max = _interopRequireDefault(__webpack_require__2("./src/util/max.js"));
          var _min = _interopRequireDefault(__webpack_require__2("./src/util/min.js"));
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function absMax(values) {
            var max = (0, _max.default)(values);
            var min = (0, _min.default)(values);
            return -min > max ? -min : max;
          }
          module2.exports = exports2.default;
        },
        "./src/util/clamp.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = clamp;
          function clamp(val, min, max) {
            return Math.min(Math.max(min, val), max);
          }
          module2.exports = exports2.default;
        },
        "./src/util/fetch.js": (module2, exports2, __webpack_require__2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = fetchFile;
          var _observer = _interopRequireDefault(__webpack_require__2("./src/util/observer.js"));
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          var ProgressHandler = /* @__PURE__ */ function() {
            function ProgressHandler2(instance, contentLength, response) {
              _classCallCheck(this, ProgressHandler2);
              this.instance = instance;
              this.instance._reader = response.body.getReader();
              this.total = parseInt(contentLength, 10);
              this.loaded = 0;
            }
            _createClass(ProgressHandler2, [{
              key: "start",
              value: function start(controller) {
                var _this = this;
                var read = function read2() {
                  _this.instance._reader.read().then(function(_ref) {
                    var done = _ref.done, value = _ref.value;
                    if (done) {
                      if (_this.total === 0) {
                        _this.instance.onProgress.call(_this.instance, {
                          loaded: _this.loaded,
                          total: _this.total,
                          lengthComputable: false
                        });
                      }
                      controller.close();
                      return;
                    }
                    _this.loaded += value.byteLength;
                    _this.instance.onProgress.call(_this.instance, {
                      loaded: _this.loaded,
                      total: _this.total,
                      lengthComputable: !(_this.total === 0)
                    });
                    controller.enqueue(value);
                    read2();
                  }).catch(function(error) {
                    controller.error(error);
                  });
                };
                read();
              }
            }]);
            return ProgressHandler2;
          }();
          function fetchFile(options) {
            if (!options) {
              throw new Error("fetch options missing");
            } else if (!options.url) {
              throw new Error("fetch url missing");
            }
            var instance = new _observer.default();
            var fetchHeaders = new Headers();
            var fetchRequest = new Request(options.url);
            instance.controller = new AbortController();
            if (options && options.requestHeaders) {
              options.requestHeaders.forEach(function(header) {
                fetchHeaders.append(header.key, header.value);
              });
            }
            var responseType = options.responseType || "json";
            var fetchOptions = {
              method: options.method || "GET",
              headers: fetchHeaders,
              mode: options.mode || "cors",
              credentials: options.credentials || "same-origin",
              cache: options.cache || "default",
              redirect: options.redirect || "follow",
              referrer: options.referrer || "client",
              signal: instance.controller.signal
            };
            fetch(fetchRequest, fetchOptions).then(function(response) {
              instance.response = response;
              var progressAvailable = true;
              if (!response.body) {
                progressAvailable = false;
              }
              var contentLength = response.headers.get("content-length");
              if (contentLength === null) {
                progressAvailable = false;
              }
              if (!progressAvailable) {
                return response;
              }
              instance.onProgress = function(e) {
                instance.fireEvent("progress", e);
              };
              return new Response(new ReadableStream(new ProgressHandler(instance, contentLength, response)), fetchOptions);
            }).then(function(response) {
              var errMsg;
              if (response.ok) {
                switch (responseType) {
                  case "arraybuffer":
                    return response.arrayBuffer();
                  case "json":
                    return response.json();
                  case "blob":
                    return response.blob();
                  case "text":
                    return response.text();
                  default:
                    errMsg = "Unknown responseType: " + responseType;
                    break;
                }
              }
              if (!errMsg) {
                errMsg = "HTTP error status: " + response.status;
              }
              throw new Error(errMsg);
            }).then(function(response) {
              instance.fireEvent("success", response);
            }).catch(function(error) {
              instance.fireEvent("error", error);
            });
            instance.fetchRequest = fetchRequest;
            return instance;
          }
          module2.exports = exports2.default;
        },
        "./src/util/frame.js": (module2, exports2, __webpack_require__2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = frame;
          var _requestAnimationFrame = _interopRequireDefault(__webpack_require__2("./src/util/request-animation-frame.js"));
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function frame(func) {
            return function() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (0, _requestAnimationFrame.default)(function() {
                return func.apply(void 0, args);
              });
            };
          }
          module2.exports = exports2.default;
        },
        "./src/util/get-id.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = getId;
          function getId(prefix) {
            if (prefix === void 0) {
              prefix = "wavesurfer_";
            }
            return prefix + Math.random().toString(32).substring(2);
          }
          module2.exports = exports2.default;
        },
        "./src/util/index.js": (__unused_webpack_module, exports2, __webpack_require__2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          Object.defineProperty(exports2, "Observer", {
            enumerable: true,
            get: function get() {
              return _observer.default;
            }
          });
          Object.defineProperty(exports2, "absMax", {
            enumerable: true,
            get: function get() {
              return _absMax.default;
            }
          });
          Object.defineProperty(exports2, "clamp", {
            enumerable: true,
            get: function get() {
              return _clamp.default;
            }
          });
          Object.defineProperty(exports2, "debounce", {
            enumerable: true,
            get: function get() {
              return _debounce.default;
            }
          });
          Object.defineProperty(exports2, "fetchFile", {
            enumerable: true,
            get: function get() {
              return _fetch.default;
            }
          });
          Object.defineProperty(exports2, "frame", {
            enumerable: true,
            get: function get() {
              return _frame.default;
            }
          });
          Object.defineProperty(exports2, "getId", {
            enumerable: true,
            get: function get() {
              return _getId.default;
            }
          });
          Object.defineProperty(exports2, "ignoreSilenceMode", {
            enumerable: true,
            get: function get() {
              return _silenceMode.default;
            }
          });
          Object.defineProperty(exports2, "max", {
            enumerable: true,
            get: function get() {
              return _max.default;
            }
          });
          Object.defineProperty(exports2, "min", {
            enumerable: true,
            get: function get() {
              return _min.default;
            }
          });
          Object.defineProperty(exports2, "preventClick", {
            enumerable: true,
            get: function get() {
              return _preventClick.default;
            }
          });
          Object.defineProperty(exports2, "requestAnimationFrame", {
            enumerable: true,
            get: function get() {
              return _requestAnimationFrame.default;
            }
          });
          Object.defineProperty(exports2, "style", {
            enumerable: true,
            get: function get() {
              return _style.default;
            }
          });
          Object.defineProperty(exports2, "withOrientation", {
            enumerable: true,
            get: function get() {
              return _orientation.default;
            }
          });
          var _getId = _interopRequireDefault(__webpack_require__2("./src/util/get-id.js"));
          var _max = _interopRequireDefault(__webpack_require__2("./src/util/max.js"));
          var _min = _interopRequireDefault(__webpack_require__2("./src/util/min.js"));
          var _absMax = _interopRequireDefault(__webpack_require__2("./src/util/absMax.js"));
          var _observer = _interopRequireDefault(__webpack_require__2("./src/util/observer.js"));
          var _style = _interopRequireDefault(__webpack_require__2("./src/util/style.js"));
          var _requestAnimationFrame = _interopRequireDefault(__webpack_require__2("./src/util/request-animation-frame.js"));
          var _frame = _interopRequireDefault(__webpack_require__2("./src/util/frame.js"));
          var _debounce = _interopRequireDefault(__webpack_require__2("./node_modules/debounce/index.js"));
          var _preventClick = _interopRequireDefault(__webpack_require__2("./src/util/prevent-click.js"));
          var _fetch = _interopRequireDefault(__webpack_require__2("./src/util/fetch.js"));
          var _clamp = _interopRequireDefault(__webpack_require__2("./src/util/clamp.js"));
          var _orientation = _interopRequireDefault(__webpack_require__2("./src/util/orientation.js"));
          var _silenceMode = _interopRequireDefault(__webpack_require__2("./src/util/silence-mode.js"));
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
        },
        "./src/util/max.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = max;
          function max(values) {
            var largest = -Infinity;
            Object.keys(values).forEach(function(i) {
              if (values[i] > largest) {
                largest = values[i];
              }
            });
            return largest;
          }
          module2.exports = exports2.default;
        },
        "./src/util/min.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = min;
          function min(values) {
            var smallest = Number(Infinity);
            Object.keys(values).forEach(function(i) {
              if (values[i] < smallest) {
                smallest = values[i];
              }
            });
            return smallest;
          }
          module2.exports = exports2.default;
        },
        "./src/util/observer.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          var Observer = /* @__PURE__ */ function() {
            function Observer2() {
              _classCallCheck(this, Observer2);
              this._disabledEventEmissions = [];
              this.handlers = null;
            }
            _createClass(Observer2, [{
              key: "on",
              value: function on(event, fn) {
                var _this = this;
                if (!this.handlers) {
                  this.handlers = {};
                }
                var handlers = this.handlers[event];
                if (!handlers) {
                  handlers = this.handlers[event] = [];
                }
                handlers.push(fn);
                return {
                  name: event,
                  callback: fn,
                  un: function un(e, fn2) {
                    return _this.un(e, fn2);
                  }
                };
              }
            }, {
              key: "un",
              value: function un(event, fn) {
                if (!this.handlers) {
                  return;
                }
                var handlers = this.handlers[event];
                var i;
                if (handlers) {
                  if (fn) {
                    for (i = handlers.length - 1; i >= 0; i--) {
                      if (handlers[i] == fn) {
                        handlers.splice(i, 1);
                      }
                    }
                  } else {
                    handlers.length = 0;
                  }
                }
              }
            }, {
              key: "unAll",
              value: function unAll() {
                this.handlers = null;
              }
            }, {
              key: "once",
              value: function once(event, handler) {
                var _this2 = this;
                var fn = function fn2() {
                  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }
                  handler.apply(_this2, args);
                  setTimeout(function() {
                    _this2.un(event, fn2);
                  }, 0);
                };
                return this.on(event, fn);
              }
            }, {
              key: "setDisabledEventEmissions",
              value: function setDisabledEventEmissions(eventNames) {
                this._disabledEventEmissions = eventNames;
              }
            }, {
              key: "_isDisabledEventEmission",
              value: function _isDisabledEventEmission(event) {
                return this._disabledEventEmissions && this._disabledEventEmissions.includes(event);
              }
            }, {
              key: "fireEvent",
              value: function fireEvent(event) {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                if (!this.handlers || this._isDisabledEventEmission(event)) {
                  return;
                }
                var handlers = this.handlers[event];
                handlers && handlers.forEach(function(fn) {
                  fn.apply(void 0, args);
                });
              }
            }]);
            return Observer2;
          }();
          exports2["default"] = Observer;
          module2.exports = exports2.default;
        },
        "./src/util/orientation.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = withOrientation;
          var verticalPropMap = {
            width: "height",
            height: "width",
            overflowX: "overflowY",
            overflowY: "overflowX",
            clientWidth: "clientHeight",
            clientHeight: "clientWidth",
            clientX: "clientY",
            clientY: "clientX",
            scrollWidth: "scrollHeight",
            scrollLeft: "scrollTop",
            offsetLeft: "offsetTop",
            offsetTop: "offsetLeft",
            offsetHeight: "offsetWidth",
            offsetWidth: "offsetHeight",
            left: "top",
            right: "bottom",
            top: "left",
            bottom: "right",
            borderRightStyle: "borderBottomStyle",
            borderRightWidth: "borderBottomWidth",
            borderRightColor: "borderBottomColor"
          };
          function mapProp(prop, vertical) {
            if (Object.prototype.hasOwnProperty.call(verticalPropMap, prop)) {
              return vertical ? verticalPropMap[prop] : prop;
            } else {
              return prop;
            }
          }
          var isProxy = Symbol("isProxy");
          function withOrientation(target, vertical) {
            if (target[isProxy]) {
              return target;
            } else {
              return new Proxy(target, {
                get: function get(obj, prop, receiver) {
                  if (prop === isProxy) {
                    return true;
                  } else if (prop === "domElement") {
                    return obj;
                  } else if (prop === "style") {
                    return withOrientation(obj.style, vertical);
                  } else if (prop === "canvas") {
                    return withOrientation(obj.canvas, vertical);
                  } else if (prop === "getBoundingClientRect") {
                    return function() {
                      return withOrientation(obj.getBoundingClientRect.apply(obj, arguments), vertical);
                    };
                  } else if (prop === "getContext") {
                    return function() {
                      return withOrientation(obj.getContext.apply(obj, arguments), vertical);
                    };
                  } else {
                    var value = obj[mapProp(prop, vertical)];
                    return typeof value == "function" ? value.bind(obj) : value;
                  }
                },
                set: function set(obj, prop, value) {
                  obj[mapProp(prop, vertical)] = value;
                  return true;
                }
              });
            }
          }
          module2.exports = exports2.default;
        },
        "./src/util/prevent-click.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = preventClick;
          function preventClickHandler(event) {
            event.stopPropagation();
            document.body.removeEventListener("click", preventClickHandler, true);
          }
          function preventClick(values) {
            document.body.addEventListener("click", preventClickHandler, true);
          }
          module2.exports = exports2.default;
        },
        "./src/util/request-animation-frame.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var _default = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
            return setTimeout(callback, 1e3 / 60);
          }).bind(window);
          exports2["default"] = _default;
          module2.exports = exports2.default;
        },
        "./src/util/silence-mode.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = ignoreSilenceMode;
          function ignoreSilenceMode() {
            var audioData = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
            var tmp = document.createElement("div");
            tmp.innerHTML = '<audio x-webkit-airplay="deny"></audio>';
            var audioSilentMode = tmp.children.item(0);
            audioSilentMode.src = audioData;
            audioSilentMode.preload = "auto";
            audioSilentMode.type = "audio/mpeg";
            audioSilentMode.disableRemotePlayback = true;
            audioSilentMode.play();
            audioSilentMode.remove();
            tmp.remove();
          }
          module2.exports = exports2.default;
        },
        "./src/util/style.js": (module2, exports2) => {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = style2;
          function style2(el, styles) {
            Object.keys(styles).forEach(function(prop) {
              if (el.style[prop] !== styles[prop]) {
                el.style[prop] = styles[prop];
              }
            });
            return el;
          }
          module2.exports = exports2.default;
        },
        "./src/wavesurfer.js": (module2, exports2, __webpack_require__2) => {
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var util = _interopRequireWildcard(__webpack_require__2("./src/util/index.js"));
          var _drawer = _interopRequireDefault(__webpack_require__2("./src/drawer.multicanvas.js"));
          var _webaudio = _interopRequireDefault(__webpack_require__2("./src/webaudio.js"));
          var _mediaelement = _interopRequireDefault(__webpack_require__2("./src/mediaelement.js"));
          var _peakcache = _interopRequireDefault(__webpack_require__2("./src/peakcache.js"));
          var _mediaelementWebaudio = _interopRequireDefault(__webpack_require__2("./src/mediaelement-webaudio.js"));
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }
          function _getRequireWildcardCache(nodeInterop) {
            if (typeof WeakMap !== "function")
              return null;
            var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
            var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
            return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
              return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
            })(nodeInterop);
          }
          function _interopRequireWildcard(obj, nodeInterop) {
            if (!nodeInterop && obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return { default: obj };
            }
            var cache = _getRequireWildcardCache(nodeInterop);
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj.default = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _setPrototypeOf(o, p2) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
              o2.__proto__ = p3;
              return o2;
            };
            return _setPrototypeOf(o, p2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError("Derived constructors may only return object or undefined");
            }
            return _assertThisInitialized(self2);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
            } else {
              obj[key] = value;
            }
            return obj;
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          var WaveSurfer2 = /* @__PURE__ */ function(_util$Observer) {
            _inherits(WaveSurfer3, _util$Observer);
            var _super = _createSuper(WaveSurfer3);
            function WaveSurfer3(params) {
              var _this;
              _classCallCheck(this, WaveSurfer3);
              _this = _super.call(this);
              _defineProperty(_assertThisInitialized(_this), "defaultParams", {
                audioContext: null,
                audioScriptProcessor: null,
                audioRate: 1,
                autoCenter: true,
                autoCenterRate: 5,
                autoCenterImmediately: false,
                backend: "WebAudio",
                backgroundColor: null,
                barHeight: 1,
                barRadius: 0,
                barGap: null,
                barMinHeight: null,
                container: null,
                cursorColor: "#333",
                cursorWidth: 1,
                dragSelection: true,
                drawingContextAttributes: {
                  desynchronized: false
                },
                duration: null,
                fillParent: true,
                forceDecode: false,
                height: 128,
                hideScrollbar: false,
                hideCursor: false,
                ignoreSilenceMode: false,
                interact: true,
                loopSelection: true,
                maxCanvasWidth: 4e3,
                mediaContainer: null,
                mediaControls: false,
                mediaType: "audio",
                minPxPerSec: 20,
                normalize: false,
                partialRender: false,
                pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,
                plugins: [],
                progressColor: "#555",
                removeMediaElementOnDestroy: true,
                renderer: _drawer.default,
                responsive: false,
                rtl: false,
                scrollParent: false,
                skipLength: 2,
                splitChannels: false,
                splitChannelsOptions: {
                  overlay: false,
                  channelColors: {},
                  filterChannels: [],
                  relativeNormalization: false
                },
                vertical: false,
                waveColor: "#999",
                xhr: {}
              });
              _defineProperty(_assertThisInitialized(_this), "backends", {
                MediaElement: _mediaelement.default,
                WebAudio: _webaudio.default,
                MediaElementWebAudio: _mediaelementWebaudio.default
              });
              _defineProperty(_assertThisInitialized(_this), "util", util);
              _this.params = Object.assign({}, _this.defaultParams, params);
              _this.params.splitChannelsOptions = Object.assign({}, _this.defaultParams.splitChannelsOptions, params.splitChannelsOptions);
              _this.container = "string" == typeof params.container ? document.querySelector(_this.params.container) : _this.params.container;
              if (!_this.container) {
                throw new Error("Container element not found");
              }
              if (_this.params.mediaContainer == null) {
                _this.mediaContainer = _this.container;
              } else if (typeof _this.params.mediaContainer == "string") {
                _this.mediaContainer = document.querySelector(_this.params.mediaContainer);
              } else {
                _this.mediaContainer = _this.params.mediaContainer;
              }
              if (!_this.mediaContainer) {
                throw new Error("Media Container element not found");
              }
              if (_this.params.maxCanvasWidth <= 1) {
                throw new Error("maxCanvasWidth must be greater than 1");
              } else if (_this.params.maxCanvasWidth % 2 == 1) {
                throw new Error("maxCanvasWidth must be an even number");
              }
              if (_this.params.rtl === true) {
                if (_this.params.vertical === true) {
                  util.style(_this.container, {
                    transform: "rotateX(180deg)"
                  });
                } else {
                  util.style(_this.container, {
                    transform: "rotateY(180deg)"
                  });
                }
              }
              if (_this.params.backgroundColor) {
                _this.setBackgroundColor(_this.params.backgroundColor);
              }
              _this.savedVolume = 0;
              _this.isMuted = false;
              _this.tmpEvents = [];
              _this.currentRequest = null;
              _this.arraybuffer = null;
              _this.drawer = null;
              _this.backend = null;
              _this.peakCache = null;
              if (typeof _this.params.renderer !== "function") {
                throw new Error("Renderer parameter is invalid");
              }
              _this.Drawer = _this.params.renderer;
              if (_this.params.backend == "AudioElement") {
                _this.params.backend = "MediaElement";
              }
              if ((_this.params.backend == "WebAudio" || _this.params.backend === "MediaElementWebAudio") && !_webaudio.default.prototype.supportsWebAudio.call(null)) {
                _this.params.backend = "MediaElement";
              }
              _this.Backend = _this.backends[_this.params.backend];
              _this.initialisedPluginList = {};
              _this.isDestroyed = false;
              _this.isReady = false;
              var prevWidth = 0;
              _this._onResize = util.debounce(function() {
                if (_this.drawer.wrapper && prevWidth != _this.drawer.wrapper.clientWidth && !_this.params.scrollParent) {
                  prevWidth = _this.drawer.wrapper.clientWidth;
                  if (prevWidth) {
                    _this.drawer.fireEvent("redraw");
                  }
                }
              }, typeof _this.params.responsive === "number" ? _this.params.responsive : 100);
              return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
            }
            _createClass(WaveSurfer3, [{
              key: "init",
              value: function init() {
                this.registerPlugins(this.params.plugins);
                this.createDrawer();
                this.createBackend();
                this.createPeakCache();
                return this;
              }
            }, {
              key: "registerPlugins",
              value: function registerPlugins(plugins) {
                var _this2 = this;
                plugins.forEach(function(plugin) {
                  return _this2.addPlugin(plugin);
                });
                plugins.forEach(function(plugin) {
                  if (!plugin.deferInit) {
                    _this2.initPlugin(plugin.name);
                  }
                });
                this.fireEvent("plugins-registered", plugins);
                return this;
              }
            }, {
              key: "getActivePlugins",
              value: function getActivePlugins() {
                return this.initialisedPluginList;
              }
            }, {
              key: "addPlugin",
              value: function addPlugin(plugin) {
                var _this3 = this;
                if (!plugin.name) {
                  throw new Error("Plugin does not have a name!");
                }
                if (!plugin.instance) {
                  throw new Error("Plugin ".concat(plugin.name, " does not have an instance property!"));
                }
                if (plugin.staticProps) {
                  Object.keys(plugin.staticProps).forEach(function(pluginStaticProp) {
                    _this3[pluginStaticProp] = plugin.staticProps[pluginStaticProp];
                  });
                }
                var Instance = plugin.instance;
                var observerPrototypeKeys = Object.getOwnPropertyNames(util.Observer.prototype);
                observerPrototypeKeys.forEach(function(key) {
                  Instance.prototype[key] = util.Observer.prototype[key];
                });
                this[plugin.name] = new Instance(plugin.params || {}, this);
                this.fireEvent("plugin-added", plugin.name);
                return this;
              }
            }, {
              key: "initPlugin",
              value: function initPlugin(name) {
                if (!this[name]) {
                  throw new Error("Plugin ".concat(name, " has not been added yet!"));
                }
                if (this.initialisedPluginList[name]) {
                  this.destroyPlugin(name);
                }
                this[name].init();
                this.initialisedPluginList[name] = true;
                this.fireEvent("plugin-initialised", name);
                return this;
              }
            }, {
              key: "destroyPlugin",
              value: function destroyPlugin(name) {
                if (!this[name]) {
                  throw new Error("Plugin ".concat(name, " has not been added yet and cannot be destroyed!"));
                }
                if (!this.initialisedPluginList[name]) {
                  throw new Error("Plugin ".concat(name, " is not active and cannot be destroyed!"));
                }
                if (typeof this[name].destroy !== "function") {
                  throw new Error("Plugin ".concat(name, " does not have a destroy function!"));
                }
                this[name].destroy();
                delete this.initialisedPluginList[name];
                this.fireEvent("plugin-destroyed", name);
                return this;
              }
            }, {
              key: "destroyAllPlugins",
              value: function destroyAllPlugins() {
                var _this4 = this;
                Object.keys(this.initialisedPluginList).forEach(function(name) {
                  return _this4.destroyPlugin(name);
                });
              }
            }, {
              key: "createDrawer",
              value: function createDrawer() {
                var _this5 = this;
                this.drawer = new this.Drawer(this.container, this.params);
                this.drawer.init();
                this.fireEvent("drawer-created", this.drawer);
                if (this.params.responsive !== false) {
                  window.addEventListener("resize", this._onResize, true);
                  window.addEventListener("orientationchange", this._onResize, true);
                }
                this.drawer.on("redraw", function() {
                  _this5.drawBuffer();
                  _this5.drawer.progress(_this5.backend.getPlayedPercents());
                });
                this.drawer.on("click", function(e, progress) {
                  setTimeout(function() {
                    return _this5.seekTo(progress);
                  }, 0);
                });
                this.drawer.on("scroll", function(e) {
                  if (_this5.params.partialRender) {
                    _this5.drawBuffer();
                  }
                  _this5.fireEvent("scroll", e);
                });
              }
            }, {
              key: "createBackend",
              value: function createBackend() {
                var _this6 = this;
                if (this.backend) {
                  this.backend.destroy();
                }
                this.backend = new this.Backend(this.params);
                this.backend.init();
                this.fireEvent("backend-created", this.backend);
                this.backend.on("finish", function() {
                  _this6.drawer.progress(_this6.backend.getPlayedPercents());
                  _this6.fireEvent("finish");
                });
                this.backend.on("play", function() {
                  return _this6.fireEvent("play");
                });
                this.backend.on("pause", function() {
                  return _this6.fireEvent("pause");
                });
                this.backend.on("audioprocess", function(time) {
                  _this6.drawer.progress(_this6.backend.getPlayedPercents());
                  _this6.fireEvent("audioprocess", time);
                });
                if (this.params.backend === "MediaElement" || this.params.backend === "MediaElementWebAudio") {
                  this.backend.on("seek", function() {
                    _this6.drawer.progress(_this6.backend.getPlayedPercents());
                  });
                  this.backend.on("volume", function() {
                    var newVolume = _this6.getVolume();
                    _this6.fireEvent("volume", newVolume);
                    if (_this6.backend.isMuted !== _this6.isMuted) {
                      _this6.isMuted = _this6.backend.isMuted;
                      _this6.fireEvent("mute", _this6.isMuted);
                    }
                  });
                }
              }
            }, {
              key: "createPeakCache",
              value: function createPeakCache() {
                if (this.params.partialRender) {
                  this.peakCache = new _peakcache.default();
                }
              }
            }, {
              key: "getDuration",
              value: function getDuration() {
                return this.backend.getDuration();
              }
            }, {
              key: "getCurrentTime",
              value: function getCurrentTime() {
                return this.backend.getCurrentTime();
              }
            }, {
              key: "setCurrentTime",
              value: function setCurrentTime(seconds) {
                if (seconds >= this.getDuration()) {
                  this.seekTo(1);
                } else {
                  this.seekTo(seconds / this.getDuration());
                }
              }
            }, {
              key: "play",
              value: function play(start, end) {
                var _this7 = this;
                if (this.params.ignoreSilenceMode) {
                  util.ignoreSilenceMode();
                }
                this.fireEvent("interaction", function() {
                  return _this7.play(start, end);
                });
                return this.backend.play(start, end);
              }
            }, {
              key: "setPlayEnd",
              value: function setPlayEnd(position2) {
                this.backend.setPlayEnd(position2);
              }
            }, {
              key: "pause",
              value: function pause() {
                if (!this.backend.isPaused()) {
                  return this.backend.pause();
                }
              }
            }, {
              key: "playPause",
              value: function playPause() {
                return this.backend.isPaused() ? this.play() : this.pause();
              }
            }, {
              key: "isPlaying",
              value: function isPlaying() {
                return !this.backend.isPaused();
              }
            }, {
              key: "skipBackward",
              value: function skipBackward(seconds) {
                this.skip(-seconds || -this.params.skipLength);
              }
            }, {
              key: "skipForward",
              value: function skipForward(seconds) {
                this.skip(seconds || this.params.skipLength);
              }
            }, {
              key: "skip",
              value: function skip(offset2) {
                var duration = this.getDuration() || 1;
                var position2 = this.getCurrentTime() || 0;
                position2 = Math.max(0, Math.min(duration, position2 + (offset2 || 0)));
                this.seekAndCenter(position2 / duration);
              }
            }, {
              key: "seekAndCenter",
              value: function seekAndCenter(progress) {
                this.seekTo(progress);
                this.drawer.recenter(progress);
              }
            }, {
              key: "seekTo",
              value: function seekTo(progress) {
                var _this8 = this;
                if (typeof progress !== "number" || !isFinite(progress) || progress < 0 || progress > 1) {
                  throw new Error("Error calling wavesurfer.seekTo, parameter must be a number between 0 and 1!");
                }
                this.fireEvent("interaction", function() {
                  return _this8.seekTo(progress);
                });
                var isWebAudioBackend = this.params.backend === "WebAudio";
                var paused = this.backend.isPaused();
                if (isWebAudioBackend && !paused) {
                  this.backend.pause();
                }
                var oldScrollParent = this.params.scrollParent;
                this.params.scrollParent = false;
                this.backend.seekTo(progress * this.getDuration());
                this.drawer.progress(progress);
                if (isWebAudioBackend && !paused) {
                  this.backend.play();
                }
                this.params.scrollParent = oldScrollParent;
                this.fireEvent("seek", progress);
              }
            }, {
              key: "stop",
              value: function stop() {
                this.pause();
                this.seekTo(0);
                this.drawer.progress(0);
              }
            }, {
              key: "setSinkId",
              value: function setSinkId(deviceId) {
                return this.backend.setSinkId(deviceId);
              }
            }, {
              key: "setVolume",
              value: function setVolume(newVolume) {
                this.backend.setVolume(newVolume);
                this.fireEvent("volume", newVolume);
              }
            }, {
              key: "getVolume",
              value: function getVolume() {
                return this.backend.getVolume();
              }
            }, {
              key: "setPlaybackRate",
              value: function setPlaybackRate(rate) {
                this.backend.setPlaybackRate(rate);
              }
            }, {
              key: "getPlaybackRate",
              value: function getPlaybackRate() {
                return this.backend.getPlaybackRate();
              }
            }, {
              key: "toggleMute",
              value: function toggleMute() {
                this.setMute(!this.isMuted);
              }
            }, {
              key: "setMute",
              value: function setMute(mute) {
                if (mute === this.isMuted) {
                  this.fireEvent("mute", this.isMuted);
                  return;
                }
                if (this.backend.setMute) {
                  this.backend.setMute(mute);
                  this.isMuted = mute;
                } else {
                  if (mute) {
                    this.savedVolume = this.backend.getVolume();
                    this.backend.setVolume(0);
                    this.isMuted = true;
                    this.fireEvent("volume", 0);
                  } else {
                    this.backend.setVolume(this.savedVolume);
                    this.isMuted = false;
                    this.fireEvent("volume", this.savedVolume);
                  }
                }
                this.fireEvent("mute", this.isMuted);
              }
            }, {
              key: "getMute",
              value: function getMute() {
                return this.isMuted;
              }
            }, {
              key: "getFilters",
              value: function getFilters() {
                return this.backend.filters || [];
              }
            }, {
              key: "toggleScroll",
              value: function toggleScroll() {
                this.params.scrollParent = !this.params.scrollParent;
                this.drawBuffer();
              }
            }, {
              key: "toggleInteraction",
              value: function toggleInteraction() {
                this.params.interact = !this.params.interact;
              }
            }, {
              key: "getWaveColor",
              value: function getWaveColor() {
                var channelIdx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
                if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
                  return this.params.splitChannelsOptions.channelColors[channelIdx].waveColor;
                }
                return this.params.waveColor;
              }
            }, {
              key: "setWaveColor",
              value: function setWaveColor(color) {
                var channelIdx = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
                  this.params.splitChannelsOptions.channelColors[channelIdx].waveColor = color;
                } else {
                  this.params.waveColor = color;
                }
                this.drawBuffer();
              }
            }, {
              key: "getProgressColor",
              value: function getProgressColor() {
                var channelIdx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
                if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
                  return this.params.splitChannelsOptions.channelColors[channelIdx].progressColor;
                }
                return this.params.progressColor;
              }
            }, {
              key: "setProgressColor",
              value: function setProgressColor(color, channelIdx) {
                if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
                  this.params.splitChannelsOptions.channelColors[channelIdx].progressColor = color;
                } else {
                  this.params.progressColor = color;
                }
                this.drawBuffer();
              }
            }, {
              key: "getBackgroundColor",
              value: function getBackgroundColor() {
                return this.params.backgroundColor;
              }
            }, {
              key: "setBackgroundColor",
              value: function setBackgroundColor(color) {
                this.params.backgroundColor = color;
                util.style(this.container, {
                  background: this.params.backgroundColor
                });
              }
            }, {
              key: "getCursorColor",
              value: function getCursorColor() {
                return this.params.cursorColor;
              }
            }, {
              key: "setCursorColor",
              value: function setCursorColor(color) {
                this.params.cursorColor = color;
                this.drawer.updateCursor();
              }
            }, {
              key: "getHeight",
              value: function getHeight() {
                return this.params.height;
              }
            }, {
              key: "setHeight",
              value: function setHeight(height) {
                this.params.height = height;
                this.drawer.setHeight(height * this.params.pixelRatio);
                this.drawBuffer();
              }
            }, {
              key: "setFilteredChannels",
              value: function setFilteredChannels(channelIndices) {
                this.params.splitChannelsOptions.filterChannels = channelIndices;
                this.drawBuffer();
              }
            }, {
              key: "drawBuffer",
              value: function drawBuffer() {
                var nominalWidth = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio);
                var parentWidth = this.drawer.getWidth();
                var width = nominalWidth;
                var start = 0;
                var end = Math.max(start + parentWidth, width);
                if (this.params.fillParent && (!this.params.scrollParent || nominalWidth < parentWidth)) {
                  width = parentWidth;
                  start = 0;
                  end = width;
                }
                var peaks;
                if (this.params.partialRender) {
                  var newRanges = this.peakCache.addRangeToPeakCache(width, start, end);
                  var i;
                  for (i = 0; i < newRanges.length; i++) {
                    peaks = this.backend.getPeaks(width, newRanges[i][0], newRanges[i][1]);
                    this.drawer.drawPeaks(peaks, width, newRanges[i][0], newRanges[i][1]);
                  }
                } else {
                  peaks = this.backend.getPeaks(width, start, end);
                  this.drawer.drawPeaks(peaks, width, start, end);
                }
                this.fireEvent("redraw", peaks, width);
              }
            }, {
              key: "zoom",
              value: function zoom(pxPerSec) {
                if (!pxPerSec) {
                  this.params.minPxPerSec = this.defaultParams.minPxPerSec;
                  this.params.scrollParent = false;
                } else {
                  this.params.minPxPerSec = pxPerSec;
                  this.params.scrollParent = true;
                }
                this.drawBuffer();
                this.drawer.progress(this.backend.getPlayedPercents());
                this.drawer.recenter(this.getCurrentTime() / this.getDuration());
                this.fireEvent("zoom", pxPerSec);
              }
            }, {
              key: "loadArrayBuffer",
              value: function loadArrayBuffer(arraybuffer) {
                var _this9 = this;
                this.decodeArrayBuffer(arraybuffer, function(data) {
                  if (!_this9.isDestroyed) {
                    _this9.loadDecodedBuffer(data);
                  }
                });
              }
            }, {
              key: "loadDecodedBuffer",
              value: function loadDecodedBuffer(buffer) {
                this.backend.load(buffer);
                this.drawBuffer();
                this.isReady = true;
                this.fireEvent("ready");
              }
            }, {
              key: "loadBlob",
              value: function loadBlob(blob) {
                var _this10 = this;
                var reader = new FileReader();
                reader.addEventListener("progress", function(e) {
                  return _this10.onProgress(e);
                });
                reader.addEventListener("load", function(e) {
                  return _this10.loadArrayBuffer(e.target.result);
                });
                reader.addEventListener("error", function() {
                  return _this10.fireEvent("error", "Error reading file");
                });
                reader.readAsArrayBuffer(blob);
                this.empty();
              }
            }, {
              key: "load",
              value: function load(url, peaks, preload, duration) {
                if (!url) {
                  throw new Error("url parameter cannot be empty");
                }
                this.empty();
                if (preload) {
                  var preloadIgnoreReasons = {
                    "Preload is not 'auto', 'none' or 'metadata'": ["auto", "metadata", "none"].indexOf(preload) === -1,
                    "Peaks are not provided": !peaks,
                    "Backend is not of type 'MediaElement' or 'MediaElementWebAudio'": ["MediaElement", "MediaElementWebAudio"].indexOf(this.params.backend) === -1,
                    "Url is not of type string": typeof url !== "string"
                  };
                  var activeReasons = Object.keys(preloadIgnoreReasons).filter(function(reason) {
                    return preloadIgnoreReasons[reason];
                  });
                  if (activeReasons.length) {
                    console.warn("Preload parameter of wavesurfer.load will be ignored because:\n	- " + activeReasons.join("\n	- "));
                    preload = null;
                  }
                }
                if (this.params.backend === "WebAudio" && url instanceof HTMLMediaElement) {
                  url = url.src;
                }
                switch (this.params.backend) {
                  case "WebAudio":
                    return this.loadBuffer(url, peaks, duration);
                  case "MediaElement":
                  case "MediaElementWebAudio":
                    return this.loadMediaElement(url, peaks, preload, duration);
                }
              }
            }, {
              key: "loadBuffer",
              value: function loadBuffer(url, peaks, duration) {
                var _this11 = this;
                var load = function load2(action) {
                  if (action) {
                    _this11.tmpEvents.push(_this11.once("ready", action));
                  }
                  return _this11.getArrayBuffer(url, function(data) {
                    return _this11.loadArrayBuffer(data);
                  });
                };
                if (peaks) {
                  this.backend.setPeaks(peaks, duration);
                  this.drawBuffer();
                  this.fireEvent("waveform-ready");
                  this.tmpEvents.push(this.once("interaction", load));
                } else {
                  return load();
                }
              }
            }, {
              key: "loadMediaElement",
              value: function loadMediaElement(urlOrElt, peaks, preload, duration) {
                var _this12 = this;
                var url = urlOrElt;
                if (typeof urlOrElt === "string") {
                  this.backend.load(url, this.mediaContainer, peaks, preload);
                } else {
                  var elt = urlOrElt;
                  this.backend.loadElt(elt, peaks);
                  url = elt.src;
                }
                this.tmpEvents.push(this.backend.once("canplay", function() {
                  if (!_this12.backend.destroyed) {
                    _this12.drawBuffer();
                    _this12.isReady = true;
                    _this12.fireEvent("ready");
                  }
                }), this.backend.once("error", function(err) {
                  return _this12.fireEvent("error", err);
                }));
                if (peaks) {
                  this.backend.setPeaks(peaks, duration);
                  this.drawBuffer();
                  this.fireEvent("waveform-ready");
                }
                if ((!peaks || this.params.forceDecode) && this.backend.supportsWebAudio()) {
                  this.getArrayBuffer(url, function(arraybuffer) {
                    _this12.decodeArrayBuffer(arraybuffer, function(buffer) {
                      _this12.backend.buffer = buffer;
                      _this12.backend.setPeaks(null);
                      _this12.drawBuffer();
                      _this12.fireEvent("waveform-ready");
                    });
                  });
                }
              }
            }, {
              key: "decodeArrayBuffer",
              value: function decodeArrayBuffer(arraybuffer, callback) {
                var _this13 = this;
                if (!this.isDestroyed) {
                  this.arraybuffer = arraybuffer;
                  this.backend.decodeArrayBuffer(arraybuffer, function(data) {
                    if (!_this13.isDestroyed && _this13.arraybuffer == arraybuffer) {
                      callback(data);
                      _this13.arraybuffer = null;
                    }
                  }, function() {
                    return _this13.fireEvent("error", "Error decoding audiobuffer");
                  });
                }
              }
            }, {
              key: "getArrayBuffer",
              value: function getArrayBuffer(url, callback) {
                var _this14 = this;
                var options = Object.assign({
                  url,
                  responseType: "arraybuffer"
                }, this.params.xhr);
                var request = util.fetchFile(options);
                this.currentRequest = request;
                this.tmpEvents.push(request.on("progress", function(e) {
                  _this14.onProgress(e);
                }), request.on("success", function(data) {
                  callback(data);
                  _this14.currentRequest = null;
                }), request.on("error", function(e) {
                  _this14.fireEvent("error", e);
                  _this14.currentRequest = null;
                }));
                return request;
              }
            }, {
              key: "onProgress",
              value: function onProgress(e) {
                var percentComplete;
                if (e.lengthComputable) {
                  percentComplete = e.loaded / e.total;
                } else {
                  percentComplete = e.loaded / (e.loaded + 1e6);
                }
                this.fireEvent("loading", Math.round(percentComplete * 100), e.target);
              }
            }, {
              key: "exportPCM",
              value: function exportPCM(length, accuracy, noWindow, start, end) {
                length = length || 1024;
                start = start || 0;
                accuracy = accuracy || 1e4;
                noWindow = noWindow || false;
                var peaks = this.backend.getPeaks(length, start, end);
                var arr = [].map.call(peaks, function(val) {
                  return Math.round(val * accuracy) / accuracy;
                });
                return new Promise(function(resolve, reject) {
                  if (!noWindow) {
                    var blobJSON = new Blob([JSON.stringify(arr)], {
                      type: "application/json;charset=utf-8"
                    });
                    var objURL = URL.createObjectURL(blobJSON);
                    window.open(objURL);
                    URL.revokeObjectURL(objURL);
                  }
                  resolve(arr);
                });
              }
            }, {
              key: "exportImage",
              value: function exportImage(format, quality, type) {
                if (!format) {
                  format = "image/png";
                }
                if (!quality) {
                  quality = 1;
                }
                if (!type) {
                  type = "dataURL";
                }
                return this.drawer.getImage(format, quality, type);
              }
            }, {
              key: "cancelAjax",
              value: function cancelAjax() {
                if (this.currentRequest && this.currentRequest.controller) {
                  if (this.currentRequest._reader) {
                    this.currentRequest._reader.cancel().catch(function(err) {
                    });
                  }
                  this.currentRequest.controller.abort();
                  this.currentRequest = null;
                }
              }
            }, {
              key: "clearTmpEvents",
              value: function clearTmpEvents() {
                this.tmpEvents.forEach(function(e) {
                  return e.un();
                });
              }
            }, {
              key: "empty",
              value: function empty() {
                if (!this.backend.isPaused()) {
                  this.stop();
                  this.backend.disconnectSource();
                }
                this.isReady = false;
                this.cancelAjax();
                this.clearTmpEvents();
                this.drawer.progress(0);
                this.drawer.setWidth(0);
                this.drawer.drawPeaks({
                  length: this.drawer.getWidth()
                }, 0);
              }
            }, {
              key: "destroy",
              value: function destroy() {
                this.destroyAllPlugins();
                this.fireEvent("destroy");
                this.cancelAjax();
                this.clearTmpEvents();
                this.unAll();
                if (this.params.responsive !== false) {
                  window.removeEventListener("resize", this._onResize, true);
                  window.removeEventListener("orientationchange", this._onResize, true);
                }
                if (this.backend) {
                  this.backend.destroy();
                  this.backend = null;
                }
                if (this.drawer) {
                  this.drawer.destroy();
                }
                this.isDestroyed = true;
                this.isReady = false;
                this.arraybuffer = null;
              }
            }], [{
              key: "create",
              value: function create2(params) {
                var wavesurfer2 = new WaveSurfer3(params);
                return wavesurfer2.init();
              }
            }]);
            return WaveSurfer3;
          }(util.Observer);
          exports2["default"] = WaveSurfer2;
          _defineProperty(WaveSurfer2, "VERSION", "6.2.0");
          _defineProperty(WaveSurfer2, "util", util);
          module2.exports = exports2.default;
        },
        "./src/webaudio.js": (module2, exports2, __webpack_require__2) => {
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2["default"] = void 0;
          var util = _interopRequireWildcard(__webpack_require__2("./src/util/index.js"));
          function _getRequireWildcardCache(nodeInterop) {
            if (typeof WeakMap !== "function")
              return null;
            var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
            var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
            return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
              return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
            })(nodeInterop);
          }
          function _interopRequireWildcard(obj, nodeInterop) {
            if (!nodeInterop && obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return { default: obj };
            }
            var cache = _getRequireWildcardCache(nodeInterop);
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj.default = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", { writable: false });
            return Constructor;
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _setPrototypeOf(o, p2) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
              o2.__proto__ = p3;
              return o2;
            };
            return _setPrototypeOf(o, p2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError("Derived constructors may only return object or undefined");
            }
            return _assertThisInitialized(self2);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
            } else {
              obj[key] = value;
            }
            return obj;
          }
          var PLAYING = "playing";
          var PAUSED = "paused";
          var FINISHED = "finished";
          var WebAudio = /* @__PURE__ */ function(_util$Observer) {
            _inherits(WebAudio2, _util$Observer);
            var _super = _createSuper(WebAudio2);
            function WebAudio2(params) {
              var _defineProperty2, _this$states;
              var _this;
              _classCallCheck(this, WebAudio2);
              _this = _super.call(this);
              _defineProperty(_assertThisInitialized(_this), "audioContext", null);
              _defineProperty(_assertThisInitialized(_this), "offlineAudioContext", null);
              _defineProperty(_assertThisInitialized(_this), "stateBehaviors", (_defineProperty2 = {}, _defineProperty(_defineProperty2, PLAYING, {
                init: function init() {
                  this.addOnAudioProcess();
                },
                getPlayedPercents: function getPlayedPercents() {
                  var duration = this.getDuration();
                  return this.getCurrentTime() / duration || 0;
                },
                getCurrentTime: function getCurrentTime() {
                  return this.startPosition + this.getPlayedTime();
                }
              }), _defineProperty(_defineProperty2, PAUSED, {
                init: function init() {
                  this.removeOnAudioProcess();
                },
                getPlayedPercents: function getPlayedPercents() {
                  var duration = this.getDuration();
                  return this.getCurrentTime() / duration || 0;
                },
                getCurrentTime: function getCurrentTime() {
                  return this.startPosition;
                }
              }), _defineProperty(_defineProperty2, FINISHED, {
                init: function init() {
                  this.removeOnAudioProcess();
                  this.fireEvent("finish");
                },
                getPlayedPercents: function getPlayedPercents() {
                  return 1;
                },
                getCurrentTime: function getCurrentTime() {
                  return this.getDuration();
                }
              }), _defineProperty2));
              _this.params = params;
              _this.ac = params.audioContext || (_this.supportsWebAudio() ? _this.getAudioContext() : {});
              _this.lastPlay = _this.ac.currentTime;
              _this.startPosition = 0;
              _this.scheduledPause = null;
              _this.states = (_this$states = {}, _defineProperty(_this$states, PLAYING, Object.create(_this.stateBehaviors[PLAYING])), _defineProperty(_this$states, PAUSED, Object.create(_this.stateBehaviors[PAUSED])), _defineProperty(_this$states, FINISHED, Object.create(_this.stateBehaviors[FINISHED])), _this$states);
              _this.buffer = null;
              _this.filters = [];
              _this.gainNode = null;
              _this.mergedPeaks = null;
              _this.offlineAc = null;
              _this.peaks = null;
              _this.playbackRate = 1;
              _this.analyser = null;
              _this.scriptNode = null;
              _this.source = null;
              _this.splitPeaks = [];
              _this.state = null;
              _this.explicitDuration = params.duration;
              _this.sinkStreamDestination = null;
              _this.sinkAudioElement = null;
              _this.destroyed = false;
              return _this;
            }
            _createClass(WebAudio2, [{
              key: "supportsWebAudio",
              value: function supportsWebAudio() {
                return !!(window.AudioContext || window.webkitAudioContext);
              }
            }, {
              key: "getAudioContext",
              value: function getAudioContext() {
                if (!window.WaveSurferAudioContext) {
                  window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
                return window.WaveSurferAudioContext;
              }
            }, {
              key: "getOfflineAudioContext",
              value: function getOfflineAudioContext(sampleRate) {
                if (!window.WaveSurferOfflineAudioContext) {
                  window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, sampleRate);
                }
                return window.WaveSurferOfflineAudioContext;
              }
            }, {
              key: "init",
              value: function init() {
                this.createVolumeNode();
                this.createScriptNode();
                this.createAnalyserNode();
                this.setState(PAUSED);
                this.setPlaybackRate(this.params.audioRate);
                this.setLength(0);
              }
            }, {
              key: "disconnectFilters",
              value: function disconnectFilters() {
                if (this.filters) {
                  this.filters.forEach(function(filter) {
                    filter && filter.disconnect();
                  });
                  this.filters = null;
                  this.analyser.connect(this.gainNode);
                }
              }
            }, {
              key: "setState",
              value: function setState(state) {
                if (this.state !== this.states[state]) {
                  this.state = this.states[state];
                  this.state.init.call(this);
                }
              }
            }, {
              key: "setFilter",
              value: function setFilter() {
                for (var _len = arguments.length, filters = new Array(_len), _key = 0; _key < _len; _key++) {
                  filters[_key] = arguments[_key];
                }
                this.setFilters(filters);
              }
            }, {
              key: "setFilters",
              value: function setFilters(filters) {
                this.disconnectFilters();
                if (filters && filters.length) {
                  this.filters = filters;
                  this.analyser.disconnect();
                  filters.reduce(function(prev, curr) {
                    prev.connect(curr);
                    return curr;
                  }, this.analyser).connect(this.gainNode);
                }
              }
            }, {
              key: "createScriptNode",
              value: function createScriptNode() {
                if (this.params.audioScriptProcessor) {
                  this.scriptNode = this.params.audioScriptProcessor;
                } else {
                  if (this.ac.createScriptProcessor) {
                    this.scriptNode = this.ac.createScriptProcessor(WebAudio2.scriptBufferSize);
                  } else {
                    this.scriptNode = this.ac.createJavaScriptNode(WebAudio2.scriptBufferSize);
                  }
                }
                this.scriptNode.connect(this.ac.destination);
              }
            }, {
              key: "addOnAudioProcess",
              value: function addOnAudioProcess() {
                var _this2 = this;
                this.scriptNode.onaudioprocess = function() {
                  var time = _this2.getCurrentTime();
                  if (time >= _this2.getDuration()) {
                    _this2.setState(FINISHED);
                    _this2.fireEvent("pause");
                  } else if (time >= _this2.scheduledPause) {
                    _this2.pause();
                  } else if (_this2.state === _this2.states[PLAYING]) {
                    _this2.fireEvent("audioprocess", time);
                  }
                };
              }
            }, {
              key: "removeOnAudioProcess",
              value: function removeOnAudioProcess() {
                this.scriptNode.onaudioprocess = null;
              }
            }, {
              key: "createAnalyserNode",
              value: function createAnalyserNode() {
                this.analyser = this.ac.createAnalyser();
                this.analyser.connect(this.gainNode);
              }
            }, {
              key: "createVolumeNode",
              value: function createVolumeNode() {
                if (this.ac.createGain) {
                  this.gainNode = this.ac.createGain();
                } else {
                  this.gainNode = this.ac.createGainNode();
                }
                this.gainNode.connect(this.ac.destination);
              }
            }, {
              key: "setSinkId",
              value: function setSinkId(deviceId) {
                if (deviceId) {
                  if (!this.sinkAudioElement) {
                    this.sinkAudioElement = new window.Audio();
                    this.sinkAudioElement.autoplay = true;
                  }
                  if (!this.sinkAudioElement.setSinkId) {
                    return Promise.reject(new Error("setSinkId is not supported in your browser"));
                  }
                  if (!this.sinkStreamDestination) {
                    this.sinkStreamDestination = this.ac.createMediaStreamDestination();
                  }
                  this.gainNode.disconnect();
                  this.gainNode.connect(this.sinkStreamDestination);
                  this.sinkAudioElement.srcObject = this.sinkStreamDestination.stream;
                  return this.sinkAudioElement.setSinkId(deviceId);
                } else {
                  return Promise.reject(new Error("Invalid deviceId: " + deviceId));
                }
              }
            }, {
              key: "setVolume",
              value: function setVolume(value) {
                this.gainNode.gain.setValueAtTime(value, this.ac.currentTime);
              }
            }, {
              key: "getVolume",
              value: function getVolume() {
                return this.gainNode.gain.value;
              }
            }, {
              key: "decodeArrayBuffer",
              value: function decodeArrayBuffer(arraybuffer, callback, errback) {
                if (!this.offlineAc) {
                  this.offlineAc = this.getOfflineAudioContext(this.ac && this.ac.sampleRate ? this.ac.sampleRate : 44100);
                }
                if ("webkitAudioContext" in window) {
                  this.offlineAc.decodeAudioData(arraybuffer, function(data) {
                    return callback(data);
                  }, errback);
                } else {
                  this.offlineAc.decodeAudioData(arraybuffer).then(function(data) {
                    return callback(data);
                  }).catch(function(err) {
                    return errback(err);
                  });
                }
              }
            }, {
              key: "setPeaks",
              value: function setPeaks(peaks, duration) {
                if (duration != null) {
                  this.explicitDuration = duration;
                }
                this.peaks = peaks;
              }
            }, {
              key: "setLength",
              value: function setLength(length) {
                if (this.mergedPeaks && length == 2 * this.mergedPeaks.length - 1 + 2) {
                  return;
                }
                this.splitPeaks = [];
                this.mergedPeaks = [];
                var channels = this.buffer ? this.buffer.numberOfChannels : 1;
                var c;
                for (c = 0; c < channels; c++) {
                  this.splitPeaks[c] = [];
                  this.splitPeaks[c][2 * (length - 1)] = 0;
                  this.splitPeaks[c][2 * (length - 1) + 1] = 0;
                }
                this.mergedPeaks[2 * (length - 1)] = 0;
                this.mergedPeaks[2 * (length - 1) + 1] = 0;
              }
            }, {
              key: "getPeaks",
              value: function getPeaks(length, first, last) {
                if (this.peaks) {
                  return this.peaks;
                }
                if (!this.buffer) {
                  return [];
                }
                first = first || 0;
                last = last || length - 1;
                this.setLength(length);
                if (!this.buffer) {
                  return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
                }
                if (!this.buffer.length) {
                  var newBuffer = this.createBuffer(1, 4096, this.sampleRate);
                  this.buffer = newBuffer.buffer;
                }
                var sampleSize = this.buffer.length / length;
                var sampleStep = ~~(sampleSize / 10) || 1;
                var channels = this.buffer.numberOfChannels;
                var c;
                for (c = 0; c < channels; c++) {
                  var peaks = this.splitPeaks[c];
                  var chan = this.buffer.getChannelData(c);
                  var i = void 0;
                  for (i = first; i <= last; i++) {
                    var start = ~~(i * sampleSize);
                    var end = ~~(start + sampleSize);
                    var min = chan[start];
                    var max = min;
                    var j = void 0;
                    for (j = start; j < end; j += sampleStep) {
                      var value = chan[j];
                      if (value > max) {
                        max = value;
                      }
                      if (value < min) {
                        min = value;
                      }
                    }
                    peaks[2 * i] = max;
                    peaks[2 * i + 1] = min;
                    if (c == 0 || max > this.mergedPeaks[2 * i]) {
                      this.mergedPeaks[2 * i] = max;
                    }
                    if (c == 0 || min < this.mergedPeaks[2 * i + 1]) {
                      this.mergedPeaks[2 * i + 1] = min;
                    }
                  }
                }
                return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
              }
            }, {
              key: "getPlayedPercents",
              value: function getPlayedPercents() {
                return this.state.getPlayedPercents.call(this);
              }
            }, {
              key: "disconnectSource",
              value: function disconnectSource() {
                if (this.source) {
                  this.source.disconnect();
                }
              }
            }, {
              key: "destroyWebAudio",
              value: function destroyWebAudio() {
                this.disconnectFilters();
                this.disconnectSource();
                this.gainNode.disconnect();
                this.scriptNode.disconnect();
                this.analyser.disconnect();
                if (this.params.closeAudioContext) {
                  if (typeof this.ac.close === "function" && this.ac.state != "closed") {
                    this.ac.close();
                  }
                  this.ac = null;
                  if (!this.params.audioContext) {
                    window.WaveSurferAudioContext = null;
                  } else {
                    this.params.audioContext = null;
                  }
                  window.WaveSurferOfflineAudioContext = null;
                }
                if (this.sinkStreamDestination) {
                  this.sinkAudioElement.pause();
                  this.sinkAudioElement.srcObject = null;
                  this.sinkStreamDestination.disconnect();
                  this.sinkStreamDestination = null;
                }
              }
            }, {
              key: "destroy",
              value: function destroy() {
                if (!this.isPaused()) {
                  this.pause();
                }
                this.unAll();
                this.buffer = null;
                this.destroyed = true;
                this.destroyWebAudio();
              }
            }, {
              key: "load",
              value: function load(buffer) {
                this.startPosition = 0;
                this.lastPlay = this.ac.currentTime;
                this.buffer = buffer;
                this.createSource();
              }
            }, {
              key: "createSource",
              value: function createSource() {
                this.disconnectSource();
                this.source = this.ac.createBufferSource();
                this.source.start = this.source.start || this.source.noteGrainOn;
                this.source.stop = this.source.stop || this.source.noteOff;
                this.setPlaybackRate(this.playbackRate);
                this.source.buffer = this.buffer;
                this.source.connect(this.analyser);
              }
            }, {
              key: "resumeAudioContext",
              value: function resumeAudioContext() {
                if (this.ac.state == "suspended") {
                  this.ac.resume && this.ac.resume();
                }
              }
            }, {
              key: "isPaused",
              value: function isPaused() {
                return this.state !== this.states[PLAYING];
              }
            }, {
              key: "getDuration",
              value: function getDuration() {
                if (this.explicitDuration) {
                  return this.explicitDuration;
                }
                if (!this.buffer) {
                  return 0;
                }
                return this.buffer.duration;
              }
            }, {
              key: "seekTo",
              value: function seekTo(start, end) {
                if (!this.buffer) {
                  return;
                }
                this.scheduledPause = null;
                if (start == null) {
                  start = this.getCurrentTime();
                  if (start >= this.getDuration()) {
                    start = 0;
                  }
                }
                if (end == null) {
                  end = this.getDuration();
                }
                this.startPosition = start;
                this.lastPlay = this.ac.currentTime;
                if (this.state === this.states[FINISHED]) {
                  this.setState(PAUSED);
                }
                return {
                  start,
                  end
                };
              }
            }, {
              key: "getPlayedTime",
              value: function getPlayedTime() {
                return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
              }
            }, {
              key: "play",
              value: function play(start, end) {
                if (!this.buffer) {
                  return;
                }
                this.createSource();
                var adjustedTime = this.seekTo(start, end);
                start = adjustedTime.start;
                end = adjustedTime.end;
                this.scheduledPause = end;
                this.source.start(0, start);
                this.resumeAudioContext();
                this.setState(PLAYING);
                this.fireEvent("play");
              }
            }, {
              key: "pause",
              value: function pause() {
                this.scheduledPause = null;
                this.startPosition += this.getPlayedTime();
                try {
                  this.source && this.source.stop(0);
                } catch (err) {
                }
                this.setState(PAUSED);
                this.fireEvent("pause");
              }
            }, {
              key: "getCurrentTime",
              value: function getCurrentTime() {
                return this.state.getCurrentTime.call(this);
              }
            }, {
              key: "getPlaybackRate",
              value: function getPlaybackRate() {
                return this.playbackRate;
              }
            }, {
              key: "setPlaybackRate",
              value: function setPlaybackRate(value) {
                this.playbackRate = value || 1;
                this.source && this.source.playbackRate.setValueAtTime(this.playbackRate, this.ac.currentTime);
              }
            }, {
              key: "setPlayEnd",
              value: function setPlayEnd(end) {
                this.scheduledPause = end;
              }
            }]);
            return WebAudio2;
          }(util.Observer);
          exports2["default"] = WebAudio;
          _defineProperty(WebAudio, "scriptBufferSize", 256);
          module2.exports = exports2.default;
        },
        "./node_modules/debounce/index.js": (module2) => {
          function debounce(func, wait, immediate) {
            var timeout, args, context, timestamp, result;
            if (null == wait)
              wait = 100;
            function later() {
              var last = Date.now() - timestamp;
              if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
              } else {
                timeout = null;
                if (!immediate) {
                  result = func.apply(context, args);
                  context = args = null;
                }
              }
            }
            var debounced = function() {
              context = this;
              args = arguments;
              timestamp = Date.now();
              var callNow = immediate && !timeout;
              if (!timeout)
                timeout = setTimeout(later, wait);
              if (callNow) {
                result = func.apply(context, args);
                context = args = null;
              }
              return result;
            };
            debounced.clear = function() {
              if (timeout) {
                clearTimeout(timeout);
                timeout = null;
              }
            };
            debounced.flush = function() {
              if (timeout) {
                result = func.apply(context, args);
                context = args = null;
                clearTimeout(timeout);
                timeout = null;
              }
            };
            return debounced;
          }
          debounce.debounce = debounce;
          module2.exports = debounce;
        }
      };
      var __webpack_module_cache__ = {};
      function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) {
          return cachedModule.exports;
        }
        var module2 = __webpack_module_cache__[moduleId] = {
          exports: {}
        };
        __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
        return module2.exports;
      }
      var __webpack_exports__ = __webpack_require__("./src/wavesurfer.js");
      return __webpack_exports__;
    })();
  });
})(wavesurfer);
var WaveSurfer = /* @__PURE__ */ getDefaultExportFromCjs(wavesurfer.exports);
const useWaveSurfer = () => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { curAudioState, curIdx, playList, elementRefs } = useNonNullableContext(audioPlayerStateContext);
  const [isReady, setIsReady] = useState(false);
  const getCurTime = useCallback(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.waveformInst) || !elementRefs.trackCurTimeEl)
      return;
    const { trackCurTimeEl } = elementRefs;
    const curTime = elementRefs.waveformInst.getCurrentTime();
    trackCurTimeEl.innerText = getTimeWithPadStart(curTime);
  }, [elementRefs]);
  const [curAudioData, setCurAudioData] = useState();
  useEffect(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.waveformInst) || !playList[curIdx])
      return;
    if ((curAudioData == null ? void 0 : curAudioData.src) === playList[curIdx].src)
      return;
    setCurAudioData(playList[curIdx]);
    setIsReady(false);
    elementRefs.waveformInst.load(playList[curIdx].src);
    elementRefs.waveformInst.on("ready", () => {
      resetAudioValues(elementRefs, elementRefs.waveformInst.getDuration());
      setIsReady(true);
      elementRefs.waveformInst.on("seek", () => getCurTime());
    });
  }, [
    playList,
    curIdx,
    elementRefs == null ? void 0 : elementRefs.waveformInst,
    curAudioData,
    elementRefs,
    getCurTime
  ]);
  useEffect(() => {
    if (!isReady || !(elementRefs == null ? void 0 : elementRefs.waveformInst))
      return;
    if (curAudioState.isPlaying) {
      elementRefs.waveformInst.play();
    } else {
      elementRefs.waveformInst.pause();
    }
  }, [isReady, curAudioState.isPlaying, elementRefs == null ? void 0 : elementRefs.waveformInst]);
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.waveformInst))
      return;
    elementRefs.waveformInst.on("finish", () => setIsFinished(true));
    if (!isFinished)
      return;
    const playNext = () => {
      var _a2, _b;
      setIsFinished(false);
      if (curAudioState.repeatType === "ONE") {
        (_a2 = elementRefs.waveformInst) == null ? void 0 : _a2.seekTo(0);
        (_b = elementRefs.waveformInst) == null ? void 0 : _b.play();
        return;
      }
      audioPlayerDispatch({ type: "NEXT_AUDIO" });
    };
    playNext();
  }, [
    elementRefs == null ? void 0 : elementRefs.waveformInst,
    audioPlayerDispatch,
    curAudioState.repeatType,
    isFinished
  ]);
  useEffect(() => {
    if (!isReady)
      return;
    const setIntervalId = setInterval(getCurTime, 1e3);
    if (!curAudioState.isPlaying) {
      clearInterval(setIntervalId);
    }
    return () => clearInterval(setIntervalId);
  }, [curAudioState.isPlaying, getCurTime, isReady]);
  useEffect(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.waveformInst) || !isReady)
      return;
    if (curAudioState.muted) {
      elementRefs.waveformInst.setVolume(0);
      elementRefs.waveformInst.setMute(true);
      return;
    }
    elementRefs.waveformInst.setVolume(curAudioState.volume);
  }, [
    curAudioState.volume,
    elementRefs == null ? void 0 : elementRefs.waveformInst,
    curAudioState.muted,
    isReady
  ]);
  return null;
};
const WaveSurferAudio = () => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const {
    elementRefs
  } = useNonNullableContext(audioPlayerStateContext);
  const colorsRef = useVariableColor({
    progressColor: "--rs-audio-player-waveform-bar",
    waveColor: "--rs-audio-player-waveform-background"
  });
  useEffect(() => {
    if ((elementRefs == null ? void 0 : elementRefs.waveformInst) || !colorsRef.current)
      return;
    const waveSurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 2,
      container: "#rs-waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: `${colorsRef.current.progressColor}`,
      responsive: true,
      waveColor: `${colorsRef.current.waveColor}`,
      cursorColor: "var(--rs-audio-player-waveform-cursor)"
    });
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: {
        waveformInst: waveSurfer
      }
    });
  }, [elementRefs == null ? void 0 : elementRefs.waveformInst, audioPlayerDispatch, colorsRef.current]);
  useWaveSurfer();
  return null;
};
const Audio = () => {
  const {
    curPlayId,
    playList,
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const curPlayAudioData = playList.find((audioData) => audioData.id === curPlayId);
  const playerValidation = curPlayAudioData && playList.length !== 0;
  if (!playerValidation)
    return null;
  return activeUI.progress === "waveform" ? /* @__PURE__ */ jsx(WaveSurferAudio, {}) : /* @__PURE__ */ jsx(Basic, {});
};
const StyledBtn = styled.button`
  display: flex;
  width: 20px;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.8);
    opacity: 0.5;
    transition: all 0.2s ease-out;
  }
`;
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = $5lsDl$react.createContext && $5lsDl$react.createContext(DefaultContext);
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t[p2] = s[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t[p2[i]] = s[p2[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return $5lsDl$react.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return $5lsDl$react.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return $5lsDl$react.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && $5lsDl$react.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? $5lsDl$react.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
function MdPauseCircleFilled(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" } }] })(props);
}
function MdPlayCircleFilled(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" } }] })(props);
}
function MdPlaylistPlay(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M3 10h11v2H3zM3 6h11v2H3zM3 14h7v2H3zM16 13v8l6-4z" } }] })(props);
}
const Icon = ({
  render,
  customIcon
}) => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: customIcon != null ? customIcon : render
  });
};
const StyledPlayBtn = styled(StyledBtn)`
  width: 35px;
`;
const PlayBtn = () => {
  var _a2;
  const {
    curAudioState,
    customIcons,
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClick = () => audioPlayerDispatch({
    type: "SET_PlAY_STATE"
  });
  const PlayIcon = useMemo(() => {
    if (curAudioState.isPlaying)
      return /* @__PURE__ */ jsx(Icon, {
        render: /* @__PURE__ */ jsx(MdPauseCircleFilled, {}),
        customIcon: customIcons == null ? void 0 : customIcons.pause
      });
    return /* @__PURE__ */ jsx(Icon, {
      render: /* @__PURE__ */ jsx(MdPlayCircleFilled, {}),
      customIcon: customIcons == null ? void 0 : customIcons.play
    });
  }, [curAudioState.isPlaying, customIcons == null ? void 0 : customIcons.pause, customIcons == null ? void 0 : customIcons.play]);
  return ((_a2 = activeUI.playButton) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsx(StyledPlayBtn, {
    onClick,
    className: "play-button",
    children: PlayIcon
  }) : null;
};
function ImPrevious(props) {
  return GenIcon({ "tag": "svg", "attr": { "version": "1.1", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z" } }, { "tag": "path", "attr": { "d": "M7 8l4-3v6z" } }, { "tag": "path", "attr": { "d": "M5 5h2v6h-2v-6z" } }] })(props);
}
function ImNext(props) {
  return GenIcon({ "tag": "svg", "attr": { "version": "1.1", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zM8 14.5c3.59 0 6.5-2.91 6.5-6.5s-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5z" } }, { "tag": "path", "attr": { "d": "M9 8l-4-3v6z" } }, { "tag": "path", "attr": { "d": "M11 5h-2v6h2v-6z" } }] })(props);
}
const PrevNnextBtn = ({
  type
}) => {
  var _a2;
  const {
    customIcons,
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClickBtn = () => {
    if (type === "next") {
      audioPlayerDispatch({
        type: "NEXT_AUDIO"
      });
    }
    if (type === "prev") {
      audioPlayerDispatch({
        type: "PREV_AUDIO"
      });
    }
  };
  const PrevNnextIcon = useMemo(() => {
    if (type === "next") {
      return /* @__PURE__ */ jsx(Icon, {
        render: /* @__PURE__ */ jsx(ImNext, {}),
        customIcon: customIcons == null ? void 0 : customIcons.next
      });
    }
    if (type === "prev") {
      return /* @__PURE__ */ jsx(Icon, {
        render: /* @__PURE__ */ jsx(ImPrevious, {}),
        customIcon: customIcons == null ? void 0 : customIcons.prev
      });
    }
    return null;
  }, [customIcons == null ? void 0 : customIcons.next, customIcons == null ? void 0 : customIcons.prev, type]);
  return ((_a2 = activeUI.prevNnext) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsx(StyledBtn, {
    onClick: onClickBtn,
    className: "prev-n-next-button",
    children: PrevNnextIcon
  }) : null;
};
function TbArrowsShuffle(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "strokeWidth": "2", "stroke": "currentColor", "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "desc", "attr": {}, "child": [] }, { "tag": "path", "attr": { "stroke": "none", "d": "M0 0h24v24H0z", "fill": "none" } }, { "tag": "path", "attr": { "d": "M18 4l3 3l-3 3" } }, { "tag": "path", "attr": { "d": "M18 20l3 -3l-3 -3" } }, { "tag": "path", "attr": { "d": "M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" } }, { "tag": "path", "attr": { "d": "M21 7h-5a4.978 4.978 0 0 0 -2.998 .998m-4.002 8.003a4.984 4.984 0 0 1 -3 .999h-3" } }] })(props);
}
function TbRepeatOff(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "strokeWidth": "2", "stroke": "currentColor", "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "desc", "attr": {}, "child": [] }, { "tag": "path", "attr": { "stroke": "none", "d": "M0 0h24v24H0z", "fill": "none" } }, { "tag": "path", "attr": { "d": "M4 12v-3c0 -1.336 .873 -2.468 2.08 -2.856m3.92 -.144h10m-3 -3l3 3l-3 3" } }, { "tag": "path", "attr": { "d": "M20 12v3a3 3 0 0 1 -.133 .886m-1.99 1.984a3 3 0 0 1 -.877 .13h-13m3 3l-3 -3l3 -3" } }, { "tag": "path", "attr": { "d": "M3 3l18 18" } }] })(props);
}
function TbRepeatOnce(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "strokeWidth": "2", "stroke": "currentColor", "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "desc", "attr": {}, "child": [] }, { "tag": "path", "attr": { "stroke": "none", "d": "M0 0h24v24H0z", "fill": "none" } }, { "tag": "path", "attr": { "d": "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" } }, { "tag": "path", "attr": { "d": "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" } }, { "tag": "path", "attr": { "d": "M11 11l1 -1v4" } }] })(props);
}
function TbRepeat(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "strokeWidth": "2", "stroke": "currentColor", "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "desc", "attr": {}, "child": [] }, { "tag": "path", "attr": { "stroke": "none", "d": "M0 0h24v24H0z", "fill": "none" } }, { "tag": "path", "attr": { "d": "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" } }, { "tag": "path", "attr": { "d": "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" } }] })(props);
}
function TbVolume2(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "strokeWidth": "2", "stroke": "currentColor", "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "desc", "attr": {}, "child": [] }, { "tag": "path", "attr": { "stroke": "none", "d": "M0 0h24v24H0z", "fill": "none" } }, { "tag": "path", "attr": { "d": "M15 8a5 5 0 0 1 0 8" } }, { "tag": "path", "attr": { "d": "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" } }] })(props);
}
function TbVolume3(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "strokeWidth": "2", "stroke": "currentColor", "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "desc", "attr": {}, "child": [] }, { "tag": "path", "attr": { "stroke": "none", "d": "M0 0h24v24H0z", "fill": "none" } }, { "tag": "path", "attr": { "d": "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" } }, { "tag": "path", "attr": { "d": "M16 10l4 4m0 -4l-4 4" } }] })(props);
}
function TbVolume(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "strokeWidth": "2", "stroke": "currentColor", "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "desc", "attr": {}, "child": [] }, { "tag": "path", "attr": { "stroke": "none", "d": "M0 0h24v24H0z", "fill": "none" } }, { "tag": "path", "attr": { "d": "M15 8a5 5 0 0 1 0 8" } }, { "tag": "path", "attr": { "d": "M17.7 5a9 9 0 0 1 0 14" } }, { "tag": "path", "attr": { "d": "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" } }] })(props);
}
const RepeatTypeBtn = () => {
  var _a2;
  const {
    curAudioState,
    customIcons,
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClick = useCallback(() => {
    switch (curAudioState.repeatType) {
      case "ALL":
        audioPlayerDispatch({
          type: "SET_REPEAT_TYPE",
          repeatType: "ONE"
        });
        break;
      case "ONE":
        audioPlayerDispatch({
          type: "SET_REPEAT_TYPE",
          repeatType: "NONE"
        });
        break;
      case "NONE":
        audioPlayerDispatch({
          type: "SET_REPEAT_TYPE",
          repeatType: "SHUFFLE"
        });
        break;
      case "SHUFFLE":
        audioPlayerDispatch({
          type: "SET_REPEAT_TYPE",
          repeatType: "ALL"
        });
        break;
    }
  }, [curAudioState.repeatType, audioPlayerDispatch]);
  const RepeatIcon = useMemo(() => {
    switch (curAudioState.repeatType) {
      case "ALL":
        return /* @__PURE__ */ jsx(Icon, {
          render: /* @__PURE__ */ jsx(TbRepeat, {}),
          customIcon: customIcons == null ? void 0 : customIcons.repeatAll
        });
      case "ONE":
        return /* @__PURE__ */ jsx(Icon, {
          render: /* @__PURE__ */ jsx(TbRepeatOnce, {}),
          customIcon: customIcons == null ? void 0 : customIcons.repeatOne
        });
      case "NONE":
        return /* @__PURE__ */ jsx(Icon, {
          render: /* @__PURE__ */ jsx(TbRepeatOff, {}),
          customIcon: customIcons == null ? void 0 : customIcons.repeatNone
        });
      case "SHUFFLE":
        return /* @__PURE__ */ jsx(Icon, {
          render: /* @__PURE__ */ jsx(TbArrowsShuffle, {}),
          customIcon: customIcons == null ? void 0 : customIcons.repeatShuffle
        });
    }
  }, [curAudioState.repeatType, customIcons == null ? void 0 : customIcons.repeatAll, customIcons == null ? void 0 : customIcons.repeatNone, customIcons == null ? void 0 : customIcons.repeatOne, customIcons == null ? void 0 : customIcons.repeatShuffle]);
  return ((_a2 = activeUI.repeatType) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsx(StyledBtn, {
    onClick,
    className: "repeat-button",
    children: RepeatIcon
  }) : null;
};
const PlayListTriggerBtn = ({
  isOpen
}) => {
  const {
    customIcons
  } = useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsx(StyledBtn, {
    children: /* @__PURE__ */ jsx(Icon, {
      render: /* @__PURE__ */ jsx(MdPlaylistPlay, {
        size: "100%",
        color: isOpen ? "var(--rs-audio-player-sortable-list-button-active)" : void 0
      }),
      customIcon: customIcons == null ? void 0 : customIcons.playList
    })
  });
};
const VolumeTriggerBtn = forwardRef((_, ref) => {
  const {
    curAudioState,
    customIcons
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClickMuted = useCallback(() => audioPlayerDispatch({
    type: "SET_MUTED",
    muted: !curAudioState.muted
  }), [audioPlayerDispatch, curAudioState.muted]);
  const VolumeIcon = useMemo(() => {
    const volumeOpt = {
      size: "100%"
    };
    if (curAudioState.muted)
      return /* @__PURE__ */ jsx(Icon, {
        render: /* @__PURE__ */ jsx(TbVolume3, {
          ...volumeOpt
        }),
        customIcon: customIcons == null ? void 0 : customIcons.volumeMuted
      });
    const volumeState = (value) => {
      if (value === 0)
        return "mute";
      if (value <= 0.5)
        return "low";
      if (value > 0.5)
        return "high";
    };
    switch (volumeState(curAudioState.volume)) {
      case "mute":
        return /* @__PURE__ */ jsx(Icon, {
          render: /* @__PURE__ */ jsx(TbVolume3, {
            ...volumeOpt
          }),
          customIcon: customIcons == null ? void 0 : customIcons.volumeMuted
        });
      case "low":
        return /* @__PURE__ */ jsx(Icon, {
          render: /* @__PURE__ */ jsx(TbVolume2, {
            ...volumeOpt
          }),
          customIcon: customIcons == null ? void 0 : customIcons.volumeHalf
        });
      case "high":
        return /* @__PURE__ */ jsx(Icon, {
          render: /* @__PURE__ */ jsx(TbVolume, {
            ...volumeOpt
          }),
          customIcon: customIcons == null ? void 0 : customIcons.volumeFull
        });
      default:
        return null;
    }
  }, [curAudioState.muted, curAudioState.volume, customIcons == null ? void 0 : customIcons.volumeMuted, customIcons == null ? void 0 : customIcons.volumeFull, customIcons == null ? void 0 : customIcons.volumeHalf]);
  return /* @__PURE__ */ jsx(StyledBtn, {
    onClick: onClickMuted,
    className: "volume-trigger-container",
    ref,
    children: VolumeIcon
  });
});
VolumeTriggerBtn.displayName = "VolumeTriggerBtn";
const drawerContext = createContext(null);
const appearanceIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.95)"
  },
  "60%": {
    opacity: 0.75,
    transform: "scale(1.05)"
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)"
  }
});
const appearanceOut = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1)"
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.5)"
  }
});
const CssTransition = ({
  visible,
  name,
  leaveTime,
  enterTime,
  clearTime,
  onExited,
  onEntered,
  children
}) => {
  const [classNames2, setClassNames] = useState("");
  const [renderable, setRenderable] = useState(false);
  useLayoutEffect(() => {
    const statusClassName = visible ? "enter" : "leave";
    const time = visible ? enterTime : leaveTime;
    if (visible && !renderable) {
      setRenderable(true);
    }
    setClassNames(`${name}-${statusClassName}`);
    const timer = setTimeout(() => {
      setClassNames(`${name}-${statusClassName} ${name}-${statusClassName}-active`);
      if (statusClassName === "leave") {
        onExited == null ? void 0 : onExited();
      } else {
        onEntered == null ? void 0 : onEntered();
      }
      clearTimeout(timer);
    }, time);
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClassNames(name);
        setRenderable(false);
      }
      clearTimeout(clearClassesTimer);
    }, time + clearTime);
    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable]);
  if (!renderable)
    return null;
  return cloneElement(children, {
    className: `${children.props.className} ${classNames2}`
  });
};
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const callback = (event) => {
      const el = ref.current;
      const { target } = event;
      if (!event || !el || el.contains(target))
        return;
      handler(event);
    };
    document.addEventListener("click", callback);
    return () => document.removeEventListener("click", callback);
  }, [ref, handler]);
};
const Drawer = ({
  outboundClickActive = false,
  placement = "bottom",
  children,
  isOpen: isOpenProp,
  onOpenChange
}) => {
  const drawerRef = useRef(null);
  const [trigger, content] = $5lsDl$react.Children.toArray(children);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(drawerRef, () => {
    if (!outboundClickActive)
      return;
    setIsOpen(false);
    onOpenChange && onOpenChange(false);
  });
  useLayoutEffect(() => {
    if (isOpenProp !== void 0) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);
  return /* @__PURE__ */ jsx(DrawerContainer, {
    className: "drawer-container",
    ref: drawerRef,
    children: /* @__PURE__ */ jsx(drawerContext.Provider, {
      value: {
        isOpen,
        setIsOpen,
        onOpenChange
      },
      children: /* @__PURE__ */ jsxs(Fragment, {
        children: [placement === "top" && content, trigger, placement === "bottom" && content]
      })
    })
  });
};
const DrawerContainer = styled.div`
  position: relative;
  min-width: 20px;
  min-height: 20px;
  .drawer-trigger-wrapper {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    display: flex;
  }

  .drawer-content-wrapper {
    transform-origin: center top;
  }

  .drawer-content-wrapper-enter {
    animation: ${appearanceIn} 0.25s ease-out normal forwards;
  }

  .drawer-content-wrapper-leave {
    animation: ${appearanceOut} 0.1s ease-in forwards;
  }
`;
const DrawerContent = ({
  children,
  isWithAnimation = true
}) => {
  const {
    isOpen,
    setIsOpen
  } = useNonNullableContext(drawerContext);
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);
  const Content = useMemo(() => /* @__PURE__ */ jsx("div", {
    className: "drawer-content-container",
    children
  }), [children]);
  return isWithAnimation ? /* @__PURE__ */ jsx(CssTransition, {
    visible: isOpen,
    name: "drawer-content-wrapper",
    enterTime: 20,
    leaveTime: 60,
    clearTime: 300,
    onExited,
    onEntered,
    children: Content
  }) : Content;
};
const DrawerTrigger = ({
  children
}) => {
  const {
    isOpen,
    setIsOpen,
    onOpenChange
  } = useNonNullableContext(drawerContext);
  return /* @__PURE__ */ jsx("div", {
    className: "drawer-trigger-wrapper",
    onClick: () => {
      setIsOpen(!isOpen);
      onOpenChange && onOpenChange(!isOpen);
    },
    children
  });
};
Drawer.Content = DrawerContent;
Drawer.Trigger = DrawerTrigger;
const SortableList = ({
  children
}) => {
  return /* @__PURE__ */ jsx(SortableListContainer, {
    className: "sortable-list-container",
    children
  });
};
const SortableListContainer = styled.ul`
  ul,
  li {
    list-style-type: none;
  }
  cursor: pointer;
`;
var main = "";
function $parcel$export(e, n2, v, s) {
  Object.defineProperty(e, n2, { get: v, set: s, enumerable: true, configurable: true });
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $994c48bfb00b620b$exports = {};
$parcel$export($994c48bfb00b620b$exports, "repeat", () => $994c48bfb00b620b$export$76d90c956114f2c2);
$parcel$export($994c48bfb00b620b$exports, "minmax", () => $994c48bfb00b620b$export$9c1b655deaca4988);
$parcel$export($994c48bfb00b620b$exports, "fitContent", () => $994c48bfb00b620b$export$2f0b47b0911ce698);
$parcel$export($994c48bfb00b620b$exports, "Grid", () => $994c48bfb00b620b$export$ef2184bd89960b14);
const $994c48bfb00b620b$var$gridStyleProps = {
  ...$380ed8f3903c3931$export$fe9c6e915565b4e8,
  autoFlow: [
    "gridAutoFlow",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  autoColumns: [
    "gridAutoColumns",
    $994c48bfb00b620b$var$gridDimensionValue
  ],
  autoRows: [
    "gridAutoRows",
    $994c48bfb00b620b$var$gridDimensionValue
  ],
  areas: [
    "gridTemplateAreas",
    $994c48bfb00b620b$var$gridTemplateAreasValue
  ],
  columns: [
    "gridTemplateColumns",
    $994c48bfb00b620b$var$gridTemplateValue
  ],
  rows: [
    "gridTemplateRows",
    $994c48bfb00b620b$var$gridTemplateValue
  ],
  gap: [
    "gap",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  rowGap: [
    "rowGap",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  columnGap: [
    "columnGap",
    $380ed8f3903c3931$export$abc24f5b99744ea6
  ],
  justifyItems: [
    "justifyItems",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  justifyContent: [
    "justifyContent",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  alignItems: [
    "alignItems",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  alignContent: [
    "alignContent",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ]
};
function $994c48bfb00b620b$var$Grid(props, ref) {
  let { children, ...otherProps } = props;
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps, $994c48bfb00b620b$var$gridStyleProps);
  styleProps.style.display = "grid";
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  return /* @__PURE__ */ $5lsDl$react.createElement("div", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ref: domRef
  }, children);
}
function $994c48bfb00b620b$export$76d90c956114f2c2(count, $994c48bfb00b620b$export$76d90c956114f2c22) {
  return `repeat(${count}, ${$994c48bfb00b620b$var$gridTemplateValue($994c48bfb00b620b$export$76d90c956114f2c22)})`;
}
function $994c48bfb00b620b$export$9c1b655deaca4988(min, max) {
  return `minmax(${$994c48bfb00b620b$var$gridDimensionValue(min)}, ${$994c48bfb00b620b$var$gridDimensionValue(max)})`;
}
function $994c48bfb00b620b$export$2f0b47b0911ce698(dimension) {
  return `fit-content(${$994c48bfb00b620b$var$gridDimensionValue(dimension)})`;
}
function $994c48bfb00b620b$var$gridTemplateAreasValue(value) {
  return value.map((v) => `"${v}"`).join("\n");
}
function $994c48bfb00b620b$var$gridDimensionValue(value) {
  if (/^max-content|min-content|minmax|auto|fit-content|repeat|subgrid/.test(value))
    return value;
  return $380ed8f3903c3931$export$abc24f5b99744ea6(value);
}
function $994c48bfb00b620b$var$gridTemplateValue(value) {
  if (Array.isArray(value))
    return value.map($994c48bfb00b620b$var$gridDimensionValue).join(" ");
  return $994c48bfb00b620b$var$gridDimensionValue(value);
}
const $994c48bfb00b620b$export$ef2184bd89960b14 = /* @__PURE__ */ forwardRef($994c48bfb00b620b$var$Grid);
var $884c64d19340d345$exports = {};
$parcel$export($884c64d19340d345$exports, "Flex", () => $884c64d19340d345$export$f51f4c4ede09e011);
var $01dd1839b5376a46$exports = {};
$parcel$export($01dd1839b5376a46$exports, "flex-container", () => $01dd1839b5376a46$export$69d7a39fa31a000b, (v) => $01dd1839b5376a46$export$69d7a39fa31a000b = v);
$parcel$export($01dd1839b5376a46$exports, "flex", () => $01dd1839b5376a46$export$97691fbb80847c19, (v) => $01dd1839b5376a46$export$97691fbb80847c19 = v);
$parcel$export($01dd1839b5376a46$exports, "flex-gap", () => $01dd1839b5376a46$export$31a9da8b58047a44, (v) => $01dd1839b5376a46$export$31a9da8b58047a44 = v);
var $01dd1839b5376a46$export$69d7a39fa31a000b;
var $01dd1839b5376a46$export$97691fbb80847c19;
var $01dd1839b5376a46$export$31a9da8b58047a44;
$01dd1839b5376a46$export$69d7a39fa31a000b = "flex-container_e15493";
$01dd1839b5376a46$export$97691fbb80847c19 = "flex_e15493";
$01dd1839b5376a46$export$31a9da8b58047a44 = "flex-gap_e15493";
const $884c64d19340d345$var$flexStyleProps = {
  direction: [
    "flexDirection",
    $380ed8f3903c3931$export$46b6c81d11d2c30a
  ],
  wrap: [
    "flexWrap",
    $884c64d19340d345$var$flexWrapValue
  ],
  justifyContent: [
    "justifyContent",
    $884c64d19340d345$var$flexAlignValue
  ],
  alignItems: [
    "alignItems",
    $884c64d19340d345$var$flexAlignValue
  ],
  alignContent: [
    "alignContent",
    $884c64d19340d345$var$flexAlignValue
  ]
};
function $884c64d19340d345$var$Flex(props, ref) {
  let { children, ...otherProps } = props;
  let breakpointProvider = $1051245f87c5981d$export$199d6754bdf4e1e3();
  let matchedBreakpoints = (breakpointProvider === null || breakpointProvider === void 0 ? void 0 : breakpointProvider.matchedBreakpoints) || [
    "base"
  ];
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps);
  let { styleProps: flexStyle } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps, $884c64d19340d345$var$flexStyleProps);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  let isSSR = $704cf1d3b684cc5c$export$535bd6ca7f90a273();
  if ((props.gap || props.rowGap || props.columnGap) && (isSSR || !$884c64d19340d345$var$isFlexGapSupported())) {
    let style3 = {
      ...flexStyle.style,
      "--column-gap": props.columnGap != null ? $380ed8f3903c3931$export$f348bec194f2e6b5(props.columnGap, matchedBreakpoints) : void 0,
      "--row-gap": props.rowGap != null ? $380ed8f3903c3931$export$f348bec194f2e6b5(props.rowGap, matchedBreakpoints) : void 0,
      "--gap": props.gap != null ? $380ed8f3903c3931$export$f348bec194f2e6b5(props.gap, matchedBreakpoints) : void 0
    };
    return /* @__PURE__ */ $5lsDl$react.createElement("div", {
      ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
      ...styleProps,
      className: $fd933927dbac1f15$export$ce4ab0c55987d1ff(/* @__PURE__ */ $parcel$interopDefault($01dd1839b5376a46$exports), "flex-container", styleProps.className),
      ref: domRef
    }, /* @__PURE__ */ $5lsDl$react.createElement("div", {
      className: $fd933927dbac1f15$export$ce4ab0c55987d1ff(/* @__PURE__ */ $parcel$interopDefault($01dd1839b5376a46$exports), "flex", "flex-gap"),
      style: style3
    }, children));
  }
  let style2 = {
    ...styleProps.style,
    ...flexStyle.style
  };
  if (props.gap != null)
    style2.gap = $380ed8f3903c3931$export$f348bec194f2e6b5(props.gap, matchedBreakpoints);
  if (props.columnGap != null)
    style2.columnGap = $380ed8f3903c3931$export$f348bec194f2e6b5(props.columnGap, matchedBreakpoints);
  if (props.rowGap != null)
    style2.rowGap = $380ed8f3903c3931$export$f348bec194f2e6b5(props.rowGap, matchedBreakpoints);
  return /* @__PURE__ */ $5lsDl$react.createElement("div", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    className: $fd933927dbac1f15$export$ce4ab0c55987d1ff(/* @__PURE__ */ $parcel$interopDefault($01dd1839b5376a46$exports), "flex", styleProps.className),
    style: style2,
    ref: domRef
  }, children);
}
function $884c64d19340d345$var$flexAlignValue(value) {
  if (value === "start")
    return "flex-start";
  if (value === "end")
    return "flex-end";
  return value;
}
function $884c64d19340d345$var$flexWrapValue(value) {
  if (typeof value === "boolean")
    return value ? "wrap" : "nowrap";
  return value;
}
let $884c64d19340d345$var$_isFlexGapSupported = null;
function $884c64d19340d345$var$isFlexGapSupported() {
  if ($884c64d19340d345$var$_isFlexGapSupported != null)
    return $884c64d19340d345$var$_isFlexGapSupported;
  if (typeof document === "undefined")
    return false;
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  $884c64d19340d345$var$_isFlexGapSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  return $884c64d19340d345$var$_isFlexGapSupported;
}
const $884c64d19340d345$export$f51f4c4ede09e011 = /* @__PURE__ */ forwardRef($884c64d19340d345$var$Flex);
const useSortableListItem = ({
  index,
  dragStartIdx,
  listData,
  draggable = true,
  onDragStart: onDragStartCb,
  onDragOver: onDragOverCb,
  onDrop: onDropCb,
  onClick: onClickCb
}) => {
  return {
    draggable,
    onDragStart: (e) => {
      e.stopPropagation();
      e.currentTarget.classList.add("dragstart");
      onDragStartCb && onDragStartCb(e);
    },
    onDragEnd: (e) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("dragstart");
    },
    onDragEnter: (e) => {
      e.stopPropagation();
      e.currentTarget.classList.add("dragover");
    },
    onDragLeave: (e) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("dragover");
    },
    onDragOver: (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDragOverCb && onDragOverCb(e);
    },
    onDrop: (e) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("dragover");
      const curListData = [...listData];
      const draggedItem = listData[dragStartIdx];
      curListData.splice(dragStartIdx, 1);
      const newListData = (dragStartIdx < index ? [
        ...curListData.slice(0, index),
        draggedItem,
        ...curListData.slice(index, curListData.length)
      ] : [
        ...curListData.slice(0, index),
        draggedItem,
        ...curListData.slice(index, curListData.length)
      ]).map((item, idx) => ({ ...item, index: idx }));
      onDropCb && onDropCb(e, newListData);
    },
    onClick: (e) => {
      e.stopPropagation();
      onClickCb && onClickCb(e);
    }
  };
};
const SortableListItem = (props) => {
  const {
    children,
    ...useListItemProps
  } = props;
  const eventProps = useSortableListItem(useListItemProps);
  return /* @__PURE__ */ jsx(SortableListItemContainer, {
    className: "list-item-root-container",
    ...eventProps,
    children: /* @__PURE__ */ jsx($884c64d19340d345$export$f51f4c4ede09e011, {
      alignItems: "center",
      children
    })
  });
};
const SortableListItemContainer = styled.li`
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;

  & * {
    pointer-events: none;
  }

  &.dragstart {
    opacity: 0.5;
  }

  &.dragover {
    transform: scale(1.02);
    backdrop-filter: blur(20px);
    box-shadow: 0px 3.58195px 22.3872px -2.68646px rgb(0 0 0 / 20%);
  }
`;
SortableList.Item = SortableListItem;
var classnames = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames2() {
      var classes = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames2.apply(null, arg);
            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          } else {
            classes.push(arg.toString());
          }
        }
      }
      return classes.join(" ");
    }
    if (module.exports) {
      classNames2.default = classNames2;
      module.exports = classNames2;
    } else {
      window.classNames = classNames2;
    }
  })();
})(classnames);
var classNames = classnames.exports;
const PlayListItem = ({
  data
}) => {
  const {
    curPlayId,
    coverImgsCss
  } = useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsx(ListItemContainer, {
    className: classNames("list-item-container", {
      curPlayed: curPlayId === data.id
    }),
    children: /* @__PURE__ */ jsxs("div", {
      className: "list-item-contents-wrapper",
      children: [/* @__PURE__ */ jsx("div", {
        className: "album-cover-wrapper",
        children: /* @__PURE__ */ jsx("img", {
          src: data.img,
          alt: "",
          style: coverImgsCss == null ? void 0 : coverImgsCss.listThumbnail
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "album-info-wrapper",
        children: [data.writer && /* @__PURE__ */ jsx("span", {
          className: "writer",
          children: data.writer
        }), data.name && /* @__PURE__ */ jsx("span", {
          className: "title",
          children: data.name
        }), data.description && /* @__PURE__ */ jsx("div", {
          className: "description",
          children: data.description
        })]
      })]
    })
  });
};
const ListItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  &.curPlayed {
    background: var(--rs-audio-player-selected-list-item-background);
  }
  .list-item-contents-wrapper {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  .album-cover-wrapper {
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
    }
  }
  .album-info-wrapper {
    display: grid;
    min-width: 10px;
    font-size: 13px;
    margin-right: 1.5rem;
    padding: 2px 0%;
    span {
      align-self: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;
const usePlayList = ({
  setIsOpen
}) => {
  const { playList, activeUI } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const [dragStartIdx, setDragStartIdx] = useState(0);
  const onClickItem = useCallback((index) => {
    audioPlayerDispatch({
      type: "SET_CURRENT_INDEX",
      currentIndex: index,
      currentAudioId: playList[index].id
    });
  }, [audioPlayerDispatch, playList]);
  return {
    cssTransitionEventProps: {
      onExited: () => setIsOpen(false),
      onEntered: () => setIsOpen(true)
    },
    sortableItemEventProps: {
      draggable: activeUI.playList !== "unSortable" || activeUI.all,
      dragStartIdx,
      onDragStart: (index) => setDragStartIdx(index),
      onDrop: (e, newPlayList) => audioPlayerDispatch({
        type: "UPDATE_PLAY_LIST",
        playList: newPlayList
      }),
      onClick: (index) => onClickItem(index)
    }
  };
};
const PlayList = ({
  isOpen,
  setIsOpen
}) => {
  const {
    playList
  } = useNonNullableContext(audioPlayerStateContext);
  const {
    cssTransitionEventProps,
    sortableItemEventProps
  } = usePlayList({
    setIsOpen
  });
  const {
    onClick: onClickItem,
    onDragStart: onDragStartItem,
    ...otherSortableItemEventProps
  } = sortableItemEventProps;
  return playList.length !== 0 ? $k7QOs$reactdom.createPortal(/* @__PURE__ */ jsx(CssTransition, {
    visible: isOpen,
    name: "playlist-content",
    enterTime: 20,
    leaveTime: 20,
    clearTime: 300,
    ...cssTransitionEventProps,
    children: /* @__PURE__ */ jsx(PlayListContainer, {
      className: "play-list-container",
      children: /* @__PURE__ */ jsx(SortableList, {
        children: playList.map((data, index) => /* @__PURE__ */ jsx(SortableList.Item, {
          index,
          listData: playList,
          onClick: () => onClickItem(index),
          onDragStart: () => onDragStartItem(index),
          ...otherSortableItemEventProps,
          children: /* @__PURE__ */ jsx(PlayListItem, {
            data
          })
        }, `sortable-item-${index}`))
      })
    })
  }), document.querySelector(".sortable-play-list")) : /* @__PURE__ */ jsx(Fragment, {});
};
const PlayListContainer = styled.div`
  height: 20vh;
  transition-property: max-height, opacity;
  overflow-x: hidden;
  overflow-y: auto;

  &.playlist-content-enter {
    opacity: 0;
    max-height: 0;
  }
  &.playlist-content-enter-active {
    opacity: 1;
    max-height: 20vh;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0, 0, 0, 1.2);
  }
  &.playlist-content-leave {
    opacity: 1;
    max-height: 20vh;
  }
  &.playlist-content-leave-active {
    opacity: 0;
    max-height: 0;
    transition-duration: 0.25s;
    transition-timing-function: 0.2s cubic-bezier(0.66, -0.41, 1, 1);
  }
`;
const SortablePlayList = () => {
  var _a2;
  const {
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const [isOpen, setIsOpen] = useState(false);
  return ((_a2 = activeUI.playList) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsxs(Drawer, {
    onOpenChange: setIsOpen,
    children: [/* @__PURE__ */ jsx(Drawer.Trigger, {
      children: /* @__PURE__ */ jsx(PlayListTriggerBtn, {
        isOpen
      })
    }), /* @__PURE__ */ jsx(Drawer.Content, {
      children: /* @__PURE__ */ jsx(PlayList, {
        isOpen,
        setIsOpen
      })
    })]
  }) : null;
};
const useBarProgress = () => {
  const { elementRefs } = useNonNullableContext(audioPlayerStateContext);
  const [isTimeChangeActive, setTimeChangeActive] = useState(false);
  const onMoveAudioTime = useCallback((e) => {
    if (!(elementRefs == null ? void 0 : elementRefs.audioEl))
      return;
    const { clientX } = e;
    const { clientWidth } = e.currentTarget;
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const curPositionX = clientX - boundingRect.x;
    const curPositionPercent = curPositionX / clientWidth;
    const curPositionTime = curPositionPercent * elementRefs.audioEl.duration;
    elementRefs.audioEl.currentTime = curPositionTime;
  }, [elementRefs == null ? void 0 : elementRefs.audioEl]);
  return {
    onMouseDown: () => setTimeChangeActive(true),
    onMouseUp: () => setTimeChangeActive(false),
    onMouseLeave: () => setTimeChangeActive(false),
    onMouseMove: isTimeChangeActive ? onMoveAudioTime : void 0,
    onClick: onMoveAudioTime
  };
};
const BarProgress = () => {
  const progressBarRef = useRef(null);
  const progressValueRef = useRef(null);
  const progressHandleRef = useRef(null);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const eventProps = useBarProgress();
  useEffect(() => {
    if (progressBarRef.current && progressValueRef.current && progressHandleRef.current) {
      const progressBarEl = progressBarRef.current;
      const progressValueEl = progressValueRef.current;
      const progressHandleEl = progressHandleRef.current;
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: {
          progressBarEl,
          progressValueEl,
          progressHandleEl
        }
      });
    }
  }, [progressHandleRef, progressBarRef, progressValueRef, audioPlayerDispatch]);
  return /* @__PURE__ */ jsxs(BarProgressWrapper, {
    className: "bar-progress-wrapper",
    ...eventProps,
    children: [/* @__PURE__ */ jsx("div", {
      className: "rs-player-progress-bar",
      ref: progressBarRef,
      children: /* @__PURE__ */ jsx("div", {
        className: "rs-player-progress",
        ref: progressValueRef
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "rs-player-progress-handle",
      ref: progressHandleRef
    })]
  });
};
const BarProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 18px;
  padding: 8px 0;
  cursor: pointer;
  position: relative;
  align-items: center;
  .rs-player-progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--rs-audio-player-progress-bar-background);
  }
  .rs-player-progress {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--rs-audio-player-progress-bar);
    transform-origin: 0 0;
    transform: scaleX(0);
  }
  &:hover {
    .rs-player-progress-handle {
      opacity: 1;
    }
  }
  .rs-player-progress-handle {
    position: absolute;
    left: -4px;
    background-color: var(--rs-audio-player-progress-bar);
    border-radius: 100%;
    height: 8px;
    width: 8px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
`;
const WaveformWrapper = styled.div`
  display: flex;
  width: 100%;
  #rs-waveform {
    width: 100%;
    wave {
      cursor: pointer !important;
    }
  }
`;
const WaveformProgress = () => {
  return /* @__PURE__ */ jsx(WaveformWrapper, {
    className: "waveform-wrapper",
    children: /* @__PURE__ */ jsx("div", {
      id: "rs-waveform"
    })
  });
};
const ProgressContainer = styled.div`
  min-width: 200px;
  padding: 0 10px;
`;
const Progress = () => {
  const {
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const active = activeUI.progress !== void 0 ? !!activeUI.progress : activeUI.all;
  const CurProgress = useMemo(() => {
    if (activeUI.progress === "waveform")
      return /* @__PURE__ */ jsx(WaveformProgress, {});
    return /* @__PURE__ */ jsx(BarProgress, {});
  }, [activeUI.progress]);
  return active ? /* @__PURE__ */ jsx(ProgressContainer, {
    className: "progress-container",
    children: CurProgress
  }) : null;
};
const Grid = $994c48bfb00b620b$export$ef2184bd89960b14;
const GridItem = forwardRef((viewProps, ref) => {
  return /* @__PURE__ */ jsx($b9606c0c41d55371$export$27a5bd065ad55220, {
    justifySelf: "center",
    padding: "0 5px",
    ref,
    ...viewProps,
    children: viewProps.children
  });
});
GridItem.displayName = "GridItem";
Grid.Item = GridItem;
const VolumeSlider = ({
  placement
}) => {
  const contentRef = useRef(null);
  const {
    curAudioState
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onChangeVolume = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (curAudioState.muted) {
      audioPlayerDispatch({
        type: "SET_MUTED",
        muted: false
      });
    }
    const {
      value
    } = e.target;
    const parsedValue = parseFloat(value);
    audioPlayerDispatch({
      type: "SET_VOLUME",
      volume: parsedValue
    });
  }, [curAudioState.muted, audioPlayerDispatch]);
  return /* @__PURE__ */ jsx(VolumeSliderContainer, {
    contentPlacement: placement,
    volumeValue: curAudioState.volume * 100,
    ref: contentRef,
    className: "volume-content-container",
    children: /* @__PURE__ */ jsx("div", {
      className: "volume-panel-wrapper",
      children: /* @__PURE__ */ jsx("input", {
        className: "volume-slider-input",
        type: "range",
        style: {
          cursor: "pointer"
        },
        defaultValue: curAudioState.volume,
        onChange: onChangeVolume,
        min: "0",
        max: "1",
        step: "0.01"
      })
    })
  });
};
const VolumeSliderContainer = styled.div`
  ${({
  contentPlacement,
  volumeValue
}) => css`
    --rs-audio-player-volume-value: ${volumeValue}%;
    position: relative;
    height: 119px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${(contentPlacement == null ? void 0 : contentPlacement.includes("top")) && css`
      bottom: auto;
    `}

    .volume-panel-wrapper {
      width: 30px;
      background-color: var(--rs-audio-player-volume-panel-background);
      border: 1px solid var(--rs-audio-player-volume-panel-border);
      border-radius: 5px;
      height: 118px;
      box-shadow: 0 2px 4px rgb(0 0 0 /10%);
      position: absolute;
      bottom: 5px;
      ${(contentPlacement == null ? void 0 : contentPlacement.includes("bottom")) && css`
        transform: rotateX(180deg);
        top: 5px;
      `}
      &:before {
        content: "";
        bottom: -10px;
        left: 7.9px;
        border-color: transparent transparent
          var(--rs-audio-player-volume-panel-border)
          var(--rs-audio-player-volume-panel-border);
        border-style: solid;
        border-width: 5px;
        box-shadow: -3px 3px 4px rgb(0 0 0 / 10%);
        position: absolute;
        width: 0;
        height: 0;
        box-sizing: border-box;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        pointer-events: none;
        z-index: 0;
      }
      &:after {
        content: "";
        bottom: -8px;
        left: 9px;
        border-color: transparent transparent
          var(--rs-audio-player-volume-panel-background)
          var(--rs-audio-player-volume-panel-background);
        border-style: solid;
        border-width: 4px;
        z-index: 1;
        position: absolute;
        width: 0;
        height: 0;
        box-sizing: border-box;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        pointer-events: none;
      }
    }

    input {
      &[type="range"] {
        margin-left: 14px;
        position: absolute;
        display: block;
        top: -45px;
        left: 0;
        height: 2px;
        width: 92px;
        -webkit-appearance: none;
        background-color: var(--rs-audio-player-volume-background);
        outline-color: transparent;
        transform-origin: 75px 75px;
        transform: rotate(-90deg);
      }

      &:focus {
        outline-color: transparent;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 12px;
        overflow: visible;
        background: var(--rs-audio-player-volume-thumb);
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 12px;
        overflow: visible;
        background: var(--rs-audio-player-volume-thumb);
        border: none;
      }
      &::-moz-range-track {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        overflow: visible;
        color: transparent;
        cursor: pointer;
        border-radius: 2%/50%;
        border-color: transparent;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 3px;
        background-image: linear-gradient(
          90deg,
          var(--rs-audio-player-volume-fill) var(--rs-audio-player-volume-value),
          var(--rs-audio-player-volume-track)
            var(--rs-audio-player-volume-value)
        );
      }

      &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        overflow: visible;
        color: transparent;
        cursor: pointer;
        border-radius: 2%/50%;
        border-color: transparent;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 3px;
        background-image: linear-gradient(
          90deg,
          var(--rs-audio-player-volume-fill) var(--rs-audio-player-volume-value),
          var(--rs-audio-player-volume-track)
            var(--rs-audio-player-volume-value)
        );
      }
    }
  `}
`;
const dropdownContext = createContext(null);
const useDropdown = ({
  clickArea,
  triggerType,
  isOpen,
  setIsOpen,
  onOpenChange
}) => {
  const timer = useRef();
  const lazyChangeVisible = (nextState) => {
    const clear = () => {
      clearTimeout(timer.current);
      timer.current = void 0;
    };
    const handler = (nextState2) => {
      setIsOpen(nextState2);
      onOpenChange && onOpenChange(nextState2);
      clear();
    };
    clear();
    if (nextState) {
      timer.current = window.setTimeout(() => handler(true), 100);
      return;
    }
    timer.current = window.setTimeout(() => handler(false), 100);
  };
  const mouseEventHandler = (next) => {
    triggerType === "hover" && lazyChangeVisible(next);
  };
  const clickEventHandler = () => {
    if (triggerType !== "click")
      return;
    setIsOpen(!isOpen);
    onOpenChange && onOpenChange(!isOpen);
  };
  const preventHandler = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };
  return {
    onClick: clickArea === "content" ? preventHandler : clickEventHandler,
    onKeyUp: () => mouseEventHandler(true),
    onMouseEnter: () => mouseEventHandler(true),
    onMouseLeave: () => mouseEventHandler(false),
    onFocus: () => mouseEventHandler(true),
    onBlur: () => mouseEventHandler(false)
  };
};
const Dropdown = ({
  triggerType = "click",
  outboundClickActive = true,
  children,
  isOpen: isOpenProp,
  placement = "bottom",
  onOpenChange
}) => {
  const dropdownRef = useRef(null);
  const [trigger, content] = $5lsDl$react.Children.toArray(children);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownEventProps = useDropdown({
    setIsOpen,
    isOpen,
    triggerType,
    clickArea: "root"
  });
  useClickOutside(dropdownRef, () => outboundClickActive && setIsOpen(false));
  useLayoutEffect(() => {
    if (isOpenProp !== void 0) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);
  return /* @__PURE__ */ jsx(DropdownContainer, {
    className: "dropdown-container",
    ref: dropdownRef,
    ...dropdownEventProps,
    children: /* @__PURE__ */ jsx(dropdownContext.Provider, {
      value: {
        dropdownRef,
        placement,
        isOpen,
        setIsOpen,
        onOpenChange
      },
      children: /* @__PURE__ */ jsxs(Fragment, {
        children: [trigger, content]
      })
    })
  });
};
const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  .dropdown-trigger-wrapper {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    display: flex;
  }

  .dropdown-content-wrapper {
    transform-origin: center top;
  }

  .dropdown-content-wrapper-enter {
    animation: ${appearanceIn} 0.25s ease-out normal forwards;
  }

  .dropdown-content-wrapper-leave {
    animation: ${appearanceOut} 0.1s ease-in forwards;
  }
`;
const DropdownContent = ({
  children,
  isWithAnimation = true,
  ...dropdownContentProps
}) => {
  const {
    dropdownRef,
    placement,
    isOpen,
    setIsOpen
  } = useNonNullableContext(dropdownContext);
  const [dropdownSize, setDropdownSize] = useState();
  const {
    onClick
  } = useDropdown({
    setIsOpen,
    isOpen,
    clickArea: "content"
  });
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);
  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownSize({
        width: dropdownRef.current.offsetWidth,
        height: dropdownRef.current.offsetHeight
      });
    }
  }, [dropdownRef.current]);
  const Content = useMemo(() => dropdownSize ? /* @__PURE__ */ jsx(DropdownContentContainer, {
    ...dropdownContentProps,
    dropdownSize,
    placement,
    onClick,
    children
  }) : null, [children, dropdownContentProps, dropdownSize, placement, onClick]);
  return isWithAnimation ? /* @__PURE__ */ jsx(CssTransition, {
    visible: isOpen,
    name: "dropdown-content-wrapper",
    enterTime: 20,
    leaveTime: 60,
    clearTime: 300,
    onExited,
    onEntered,
    children: Content
  }) : Content;
};
const DropdownContentContainer = styled.div`
  ${({
  placement,
  dropdownSize
}) => css`
    position: absolute;
    top: ${placement === "bottom" ? `${dropdownSize.height}px` : void 0};
    margin-top: ${placement === "bottom" ? `5px` : void 0};
    bottom: ${placement === "top" ? `${dropdownSize.height}px` : void 0};
    margin-bottom: ${placement === "top" ? `5px` : void 0};
    left: ${placement === "right" ? `${dropdownSize.width}px` : void 0};
    right: ${placement === "left" ? `${dropdownSize.width}px` : void 0};
  `}
`;
const DropdownTrigger = ({
  children
}) => {
  return /* @__PURE__ */ jsx("div", {
    className: "dropdown-trigger-wrapper",
    children
  });
};
Dropdown.Content = DropdownContent;
Dropdown.Trigger = DropdownTrigger;
const Volume = () => {
  var _a2;
  const {
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const triggerRef = useRef(null);
  const [volumeSliderPlacement, setVolumeSliderPlacement] = useState("bottom");
  useEffect(() => {
    if (triggerRef.current) {
      const placementValidation = () => {
        if (triggerRef.current.getBoundingClientRect().top < window.innerHeight / 2) {
          return "bottom";
        }
        return "top";
      };
      setVolumeSliderPlacement(placementValidation());
    }
  }, [triggerRef.current]);
  return ((_a2 = activeUI.volume) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsxs(Dropdown, {
    placement: volumeSliderPlacement,
    triggerType: "hover",
    children: [/* @__PURE__ */ jsx(Dropdown.Trigger, {
      children: /* @__PURE__ */ jsx(VolumeTriggerBtn, {
        ref: triggerRef
      })
    }), /* @__PURE__ */ jsx(Dropdown.Content, {
      children: /* @__PURE__ */ jsx(VolumeSlider, {
        placement: volumeSliderPlacement
      })
    })]
  }) : null;
};
const Controller = () => {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const {
    interfacePlacement
  } = useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_a2 = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _a2.progress) || ((_b = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _b.progress) || defaultInterfacePlacement.templateArea.progress,
      width: "100%",
      children: /* @__PURE__ */ jsx(Progress, {})
    }), /* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_c = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _c.repeatType) || ((_d = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _d.repeatType) || defaultInterfacePlacement.templateArea.repeatType,
      children: /* @__PURE__ */ jsx(RepeatTypeBtn, {})
    }), /* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_e = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _e.playButton) || ((_f = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _f.playButton) || defaultInterfacePlacement.templateArea.playButton,
      children: /* @__PURE__ */ jsxs($884c64d19340d345$export$f51f4c4ede09e011, {
        UNSAFE_className: "btn-wrapper",
        alignItems: "center",
        gap: "10px",
        children: [/* @__PURE__ */ jsx(PrevNnextBtn, {
          type: "prev"
        }), /* @__PURE__ */ jsx(PlayBtn, {}), /* @__PURE__ */ jsx(PrevNnextBtn, {
          type: "next"
        })]
      })
    }), /* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_g = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _g.volume) || ((_h = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _h.volume) || defaultInterfacePlacement.templateArea.volume,
      children: /* @__PURE__ */ jsx(Volume, {})
    }), /* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_i = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _i.playList) || ((_j = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _j.playList) || defaultInterfacePlacement.templateArea.playList,
      children: /* @__PURE__ */ jsx(SortablePlayList, {})
    })]
  });
};
const ArtworkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width: 50px;
    height: 50px;
  }
`;
const Artwork = () => {
  var _a2;
  const {
    activeUI,
    playList,
    curIdx,
    coverImgsCss
  } = useNonNullableContext(audioPlayerStateContext);
  return playList[curIdx] && ((_a2 = activeUI.artwork) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsx(ArtworkContainer, {
    className: "artwork-container",
    children: /* @__PURE__ */ jsx("img", {
      src: playList[curIdx].img,
      alt: "",
      style: coverImgsCss == null ? void 0 : coverImgsCss.artwork
    })
  }) : null;
};
const TrackInfoContainer = styled.div`
  display: grid;
  align-items: center;
  row-gap: 5px;
  width: 200px;
  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    font-size: 1rem;
  }
  .writer {
    font-size: 0.875rem;
  }
`;
const TrackInfo = () => {
  var _a2;
  const {
    activeUI,
    playList,
    curIdx
  } = useNonNullableContext(audioPlayerStateContext);
  const curPlayData = playList[curIdx];
  return curPlayData && ((_a2 = activeUI.trackInfo) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsx(TrackInfoContainer, {
    className: "track-info-container",
    children: curPlayData.customTrackInfo ? curPlayData.customTrackInfo : /* @__PURE__ */ jsxs(Fragment, {
      children: [curPlayData.name && /* @__PURE__ */ jsx("span", {
        className: "title",
        children: curPlayData.name
      }), curPlayData.writer && /* @__PURE__ */ jsx("span", {
        className: "writer",
        children: curPlayData.writer
      })]
    })
  }) : null;
};
const TrackTimeCurrent = () => {
  var _a2;
  const trackCurTimeRef = useRef(null);
  const {
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useEffect(() => {
    if (trackCurTimeRef.current) {
      const trackCurTimeEl = trackCurTimeRef.current;
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: {
          trackCurTimeEl
        }
      });
    }
  }, [trackCurTimeRef.current, audioPlayerDispatch]);
  return ((_a2 = activeUI.trackTime) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsx(TrackTimeCurrentContainer, {
    type: activeUI.trackTime,
    className: "track-time-current-container",
    children: /* @__PURE__ */ jsx("span", {
      ref: trackCurTimeRef,
      className: "track-current-time",
      children: "00:00"
    })
  }) : null;
};
const TrackTimeDuration = () => {
  var _a2;
  const trackDurationRef = useRef(null);
  const {
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useEffect(() => {
    if (trackDurationRef.current) {
      const trackDurationEl = trackDurationRef.current;
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: {
          trackDurationEl
        }
      });
    }
  }, [trackDurationRef.current, audioPlayerDispatch]);
  return ((_a2 = activeUI.trackTime) != null ? _a2 : activeUI.all) ? /* @__PURE__ */ jsx(TrackTimeDurationContainer, {
    type: activeUI.trackTime,
    className: "track-time-duration-container",
    children: /* @__PURE__ */ jsx("span", {
      ref: trackDurationRef,
      className: "track-duration",
      children: "00:00"
    })
  }) : null;
};
const TrackTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 16px;
  font-family: monospace;
  font-size: 1.2rem;
`;
const TrackTimeCurrentContainer = styled(TrackTimeContainer)`
  ${({
  type
}) => css`
    .track-current-time {
      font-weight: 700;
      letter-spacing: -0.1rem;
      color: var(--rs-audio-player-track-current-time);
      margin-right: ${type !== "separation-mode" && "-10px"};
    }
  `}
`;
const TrackTimeDurationContainer = styled(TrackTimeContainer)`
  ${({
  type
}) => css`
    .track-duration {
      display: flex;
      color: var(--rs-audio-player-track-duration);
      letter-spacing: -0.1rem;
    }
    ${type !== "separation-mode" && css`
      .track-duration:before {
        content: "/";
        margin: 0 0.3rem;
      }
    `}
  `}
`;
const Information = () => {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const {
    interfacePlacement
  } = useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_a2 = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _a2.artwork) || ((_b = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _b.artwork) || defaultInterfacePlacement.templateArea.artwork,
      children: /* @__PURE__ */ jsx(Artwork, {})
    }), /* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_c = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _c.trackInfo) || ((_d = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _d.trackInfo) || defaultInterfacePlacement.templateArea.trackInfo,
      justifySelf: "center",
      children: /* @__PURE__ */ jsx(TrackInfo, {})
    }), /* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_e = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _e.trackTimeCurrent) || ((_f = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _f.trackTimeCurrent) || defaultInterfacePlacement.templateArea.trackTimeCurrent,
      justifySelf: "center",
      children: /* @__PURE__ */ jsx(TrackTimeCurrent, {})
    }), /* @__PURE__ */ jsx(Grid.Item, {
      gridArea: ((_g = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _g.trackTimeDuration) || ((_h = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _h.trackTimeDuration) || defaultInterfacePlacement.templateArea.trackTimeDuration,
      justifySelf: "center",
      children: /* @__PURE__ */ jsx(TrackTimeDuration, {})
    })]
  });
};
const generateGridTemplateValues = (activeUi, placement) => {
  let maxRowLength = 1;
  let maxColLength = 1;
  const placementValueArr = Object.values(placement || {}).map((value) => value.split("row")[1]);
  const getMaxLength = () => {
    if (placementValueArr.length !== 0) {
      for (let i = 0; i < placementValueArr.length; i++) {
        const row = placementValueArr[i].split("-")[0];
        const col = placementValueArr[i].split("-")[1];
        maxRowLength = Math.max(maxRowLength, +row);
        maxColLength = Math.max(maxColLength, +col);
      }
    }
    if (activeUi.all) {
      maxColLength = interfacePlacementMaxLength - 1;
      return;
    }
    maxColLength = Object.values(activeUi).filter((boolean) => Boolean(boolean)).length;
    return;
  };
  getMaxLength();
  const gridAreas = new Array(maxRowLength).fill("").map((_, rowIdx) => {
    let cols = "";
    for (let i = 0; i < maxColLength; i++) {
      cols += ` row${rowIdx + 1}-${i + 1}`;
      if (i === 0) {
        cols = cols.trim();
      }
    }
    return cols;
  });
  const gridColumns = new Array(maxRowLength).fill("").map((_, rowIdx) => {
    const maxWidth = window ? window.innerWidth - 100 : 1500;
    const [, progressCol] = ((placement == null ? void 0 : placement.progress) || defaultInterfacePlacement.templateArea.progress).replace("row", "").split("-");
    let cols = "";
    for (let i = 0; i < maxColLength; i++) {
      if (i === 0) {
        cols = cols.trim();
      }
      if (rowIdx === 0 && i + 1 === +progressCol) {
        cols += ` 1fr`;
        continue;
      }
      cols += ` fit-content(${maxWidth}px)`;
    }
    return cols;
  });
  return { gridAreas, gridColumns };
};
const InterfaceContainer = styled.div`
  .interface-grid {
    padding: 0.5rem 10px;
  }
`;
const Interface = () => {
  const {
    interfacePlacement,
    activeUI,
    playListPlacement
  } = useNonNullableContext(audioPlayerStateContext);
  const {
    gridAreas,
    gridColumns
  } = generateGridTemplateValues(activeUI, interfacePlacement == null ? void 0 : interfacePlacement.templateArea);
  return /* @__PURE__ */ jsxs(InterfaceContainer, {
    className: "interface-container",
    children: [playListPlacement === "top" && /* @__PURE__ */ jsx("div", {
      className: "sortable-play-list"
    }), /* @__PURE__ */ jsxs(Grid, {
      alignItems: "center",
      justifyContent: "center",
      areas: gridAreas,
      minHeight: "30px",
      columns: gridColumns,
      UNSAFE_className: "interface-grid",
      children: [/* @__PURE__ */ jsx(Information, {}), /* @__PURE__ */ jsx(Controller, {})]
    }), playListPlacement === "bottom" && /* @__PURE__ */ jsx("div", {
      className: "sortable-play-list"
    })]
  });
};
const AudioPlayer = ({
  playList,
  audioInitialState,
  placement = {},
  activeUI,
  customIcons,
  coverImgsCss
}) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useLayoutEffect(() => {
    const {
      player: playerPlacement,
      playList: playListPlacement,
      interface: interfacePlacement
    } = placement;
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      playListPlacement,
      interfacePlacement
    });
  }, [audioPlayerDispatch, placement]);
  useLayoutEffect(() => {
    if (activeUI) {
      audioPlayerDispatch({
        type: "SET_ACTIVE_UI",
        activeUI
      });
    }
  }, [activeUI, audioPlayerDispatch]);
  useLayoutEffect(() => {
    if (coverImgsCss) {
      audioPlayerDispatch({
        type: "SET_COVER_IMGS_CSS",
        coverImgsCss
      });
    }
  }, [audioPlayerDispatch, coverImgsCss]);
  useEffect(() => {
    if (audioInitialState) {
      audioPlayerDispatch({
        type: "SET_INITIAL_AUDIO_STATE",
        audioInitialState
      });
    }
  }, [audioInitialState, audioPlayerDispatch]);
  useEffect(() => {
    audioPlayerDispatch({
      type: "UPDATE_PLAY_LIST",
      playList
    });
  }, [audioPlayerDispatch, playList]);
  useEffect(() => {
    if (customIcons) {
      audioPlayerDispatch({
        type: "SET_CUSTOM_ICONS",
        customIcons
      });
    }
  }, [customIcons, audioPlayerDispatch]);
  return /* @__PURE__ */ jsxs($b9606c0c41d55371$export$27a5bd065ad55220, {
    id: "rs-audio-player",
    UNSAFE_className: "rs-audio-player-container",
    children: [/* @__PURE__ */ jsx(Audio, {}), /* @__PURE__ */ jsx(Interface, {})]
  });
};
const AudioPlayerWithProvider = ({
  rootContainerProps,
  ...audioPlayProps
}) => {
  return /* @__PURE__ */ jsx(AudioPlayerProvider, {
    children: /* @__PURE__ */ jsxs(SpectrumProvider, {
      rootContainerProps,
      children: [/* @__PURE__ */ jsx(GlobalStyle, {}), /* @__PURE__ */ jsx(AudioPlayer, {
        ...audioPlayProps
      })]
    })
  });
};
export { AudioPlayerWithProvider, AudioPlayerWithProvider as default };
