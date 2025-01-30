import './index.css';
import $670gB$react, { useContext, useState, useRef, useEffect, useImperativeHandle, useMemo, createContext, useLayoutEffect, useReducer, forwardRef, useCallback, cloneElement } from "react";
import $4AOtR$reactdom from "react-dom";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
const $a8430f637b4ccbce$export$841858b892ce1f4c = $670gB$react.createContext(null);
$a8430f637b4ccbce$export$841858b892ce1f4c.displayName = "ProviderContext";
var vars_8344a1cc = "";
function $parcel$export$7(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $698974e9dd92c2ec$exports = {};
$parcel$export$7($698974e9dd92c2ec$exports, "focus-ring", () => $698974e9dd92c2ec$export$f39a09f249340e2a, (v) => $698974e9dd92c2ec$export$f39a09f249340e2a = v);
$parcel$export$7($698974e9dd92c2ec$exports, "i18nFontFamily", () => $698974e9dd92c2ec$export$8c4ee2c50c22c514, (v) => $698974e9dd92c2ec$export$8c4ee2c50c22c514 = v);
$parcel$export$7($698974e9dd92c2ec$exports, "spectrum", () => $698974e9dd92c2ec$export$3311ab3a441bc141, (v) => $698974e9dd92c2ec$export$3311ab3a441bc141 = v);
$parcel$export$7($698974e9dd92c2ec$exports, "spectrum-FocusRing-ring", () => $698974e9dd92c2ec$export$4109102f950813a6, (v) => $698974e9dd92c2ec$export$4109102f950813a6 = v);
$parcel$export$7($698974e9dd92c2ec$exports, "spectrum-FocusRing", () => $698974e9dd92c2ec$export$24c7f46a6e3605dd, (v) => $698974e9dd92c2ec$export$24c7f46a6e3605dd = v);
$parcel$export$7($698974e9dd92c2ec$exports, "spectrum-FocusRing--quiet", () => $698974e9dd92c2ec$export$2927016961429360, (v) => $698974e9dd92c2ec$export$2927016961429360 = v);
var $698974e9dd92c2ec$export$f39a09f249340e2a;
var $698974e9dd92c2ec$export$8c4ee2c50c22c514;
var $698974e9dd92c2ec$export$3311ab3a441bc141;
var $698974e9dd92c2ec$export$4109102f950813a6;
var $698974e9dd92c2ec$export$24c7f46a6e3605dd;
var $698974e9dd92c2ec$export$2927016961429360;
$698974e9dd92c2ec$export$f39a09f249340e2a = `_t8qIa_focus-ring`;
$698974e9dd92c2ec$export$8c4ee2c50c22c514 = `_t8qIa_i18nFontFamily`;
$698974e9dd92c2ec$export$3311ab3a441bc141 = `_t8qIa_spectrum`;
$698974e9dd92c2ec$export$4109102f950813a6 = `_t8qIa_spectrum-FocusRing-ring`;
$698974e9dd92c2ec$export$24c7f46a6e3605dd = `_t8qIa_spectrum-FocusRing ${$698974e9dd92c2ec$export$4109102f950813a6}`;
$698974e9dd92c2ec$export$2927016961429360 = `_t8qIa_spectrum-FocusRing--quiet`;
var typography_a20446f2 = "";
function $parcel$export$6(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $5cac98e4c80e6707$exports = {};
$parcel$export$6($5cac98e4c80e6707$exports, "focus-ring", () => $5cac98e4c80e6707$export$f39a09f249340e2a, (v) => $5cac98e4c80e6707$export$f39a09f249340e2a = v);
$parcel$export$6($5cac98e4c80e6707$exports, "i18nFontFamily", () => $5cac98e4c80e6707$export$8c4ee2c50c22c514, (v) => $5cac98e4c80e6707$export$8c4ee2c50c22c514 = v);
$parcel$export$6($5cac98e4c80e6707$exports, "spectrum", () => $5cac98e4c80e6707$export$3311ab3a441bc141, (v) => $5cac98e4c80e6707$export$3311ab3a441bc141 = v);
$parcel$export$6($5cac98e4c80e6707$exports, "spectrum-Body", () => $5cac98e4c80e6707$export$a30bf7810c8453d1, (v) => $5cac98e4c80e6707$export$a30bf7810c8453d1 = v);
$parcel$export$6($5cac98e4c80e6707$exports, "spectrum-Body--italic", () => $5cac98e4c80e6707$export$7b2dac1166f6ec4c, (v) => $5cac98e4c80e6707$export$7b2dac1166f6ec4c = v);
$parcel$export$6($5cac98e4c80e6707$exports, "spectrum-FocusRing-ring", () => $5cac98e4c80e6707$export$4109102f950813a6, (v) => $5cac98e4c80e6707$export$4109102f950813a6 = v);
$parcel$export$6($5cac98e4c80e6707$exports, "spectrum-FocusRing", () => $5cac98e4c80e6707$export$24c7f46a6e3605dd, (v) => $5cac98e4c80e6707$export$24c7f46a6e3605dd = v);
$parcel$export$6($5cac98e4c80e6707$exports, "spectrum-FocusRing--quiet", () => $5cac98e4c80e6707$export$2927016961429360, (v) => $5cac98e4c80e6707$export$2927016961429360 = v);
var $5cac98e4c80e6707$export$f39a09f249340e2a;
var $5cac98e4c80e6707$export$8c4ee2c50c22c514;
var $5cac98e4c80e6707$export$3311ab3a441bc141;
var $5cac98e4c80e6707$export$a30bf7810c8453d1;
var $5cac98e4c80e6707$export$7b2dac1166f6ec4c;
var $5cac98e4c80e6707$export$4109102f950813a6;
var $5cac98e4c80e6707$export$24c7f46a6e3605dd;
var $5cac98e4c80e6707$export$2927016961429360;
$5cac98e4c80e6707$export$f39a09f249340e2a = `kDKRXa_focus-ring`;
$5cac98e4c80e6707$export$8c4ee2c50c22c514 = `kDKRXa_i18nFontFamily`;
$5cac98e4c80e6707$export$3311ab3a441bc141 = `kDKRXa_spectrum ${$5cac98e4c80e6707$export$8c4ee2c50c22c514}`;
$5cac98e4c80e6707$export$a30bf7810c8453d1 = `kDKRXa_spectrum-Body`;
$5cac98e4c80e6707$export$7b2dac1166f6ec4c = `kDKRXa_spectrum-Body--italic`;
$5cac98e4c80e6707$export$4109102f950813a6 = `kDKRXa_spectrum-FocusRing-ring`;
$5cac98e4c80e6707$export$24c7f46a6e3605dd = `kDKRXa_spectrum-FocusRing ${$5cac98e4c80e6707$export$4109102f950813a6}`;
$5cac98e4c80e6707$export$2927016961429360 = `kDKRXa_spectrum-FocusRing--quiet`;
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
let $fd933927dbac1f15$export$46d604dce8bf8724 = false;
function $fd933927dbac1f15$export$ce4ab0c55987d1ff(cssModule, ...values) {
  let classes = [];
  for (let value of values) {
    if (typeof value === "object" && value) {
      let mapped = {};
      for (let key in value) {
        if (cssModule[key])
          mapped[cssModule[key]] = value[key];
        if (!cssModule[key])
          mapped[key] = value[key];
      }
      classes.push(mapped);
    } else if (typeof value === "string") {
      if (cssModule[value])
        classes.push(cssModule[value]);
      if (!cssModule[value])
        classes.push(value);
    } else
      classes.push(value);
  }
  return clsx(...classes);
}
const $b5e257d569688ac6$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 1e10)),
  current: 0
};
const $b5e257d569688ac6$var$SSRContext = /* @__PURE__ */ $670gB$react.createContext($b5e257d569688ac6$var$defaultContext);
const $b5e257d569688ac6$var$IsSSRContext = /* @__PURE__ */ $670gB$react.createContext(false);
let $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
let $b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
  let ctx = useContext($b5e257d569688ac6$var$SSRContext);
  let ref = useRef(null);
  if (ref.current === null && !isDisabled) {
    var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $670gB$react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
    if (currentOwner) {
      let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
      if (prevComponentValue == null)
        $b5e257d569688ac6$var$componentIds.set(currentOwner, {
          id: ctx.current,
          state: currentOwner.memoizedState
        });
      else if (currentOwner.memoizedState !== prevComponentValue.state) {
        ctx.current = prevComponentValue.id;
        $b5e257d569688ac6$var$componentIds.delete(currentOwner);
      }
    }
    ref.current = ++ctx.current;
  }
  return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
  let ctx = useContext($b5e257d569688ac6$var$SSRContext);
  if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM)
    console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
  let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
  let prefix = ctx === $b5e257d569688ac6$var$defaultContext && false ? "react-aria" : `react-aria${ctx.prefix}`;
  return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
  let id = $670gB$react.useId();
  let [didSSR] = useState($b5e257d569688ac6$export$535bd6ca7f90a273());
  let prefix = didSSR || false ? "react-aria" : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
  return defaultId || `${prefix}-${id}`;
}
typeof $670gB$react["useId"] === "function" ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
  return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
  return true;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
  return () => {
  };
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
  if (typeof $670gB$react["useSyncExternalStore"] === "function")
    return $670gB$react["useSyncExternalStore"]($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
  return useContext($b5e257d569688ac6$var$IsSSRContext);
}
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
  let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
  return isSSR ? false : matches;
}
function $98e5a8ae0e6415af$export$a5795cc979dfae80(ref) {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    }
  };
}
function $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref) {
  let domRef = useRef(null);
  useImperativeHandle(ref, () => $98e5a8ae0e6415af$export$a5795cc979dfae80(domRef));
  return domRef;
}
const $1051245f87c5981d$var$Context = /* @__PURE__ */ $670gB$react.createContext(null);
$1051245f87c5981d$var$Context.displayName = "BreakpointContext";
function $1051245f87c5981d$export$8214320346cf5104(props) {
  let { children, matchedBreakpoints } = props;
  return /* @__PURE__ */ $670gB$react.createElement($1051245f87c5981d$var$Context.Provider, {
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
  let [breakpoint, setBreakpoint] = useState(() => supportsMatchMedia ? getBreakpointHandler() : [
    "base"
  ]);
  useEffect(() => {
    if (!supportsMatchMedia)
      return;
    let onResize = () => {
      const breakpointHandler = getBreakpointHandler();
      setBreakpoint((previousBreakpointHandler) => {
        if (previousBreakpointHandler.length !== breakpointHandler.length || previousBreakpointHandler.some((breakpoint2, idx) => breakpoint2 !== breakpointHandler[idx]))
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
  let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
  return isSSR ? [
    "base"
  ] : breakpoint;
}
function $1051245f87c5981d$export$199d6754bdf4e1e3() {
  return useContext($1051245f87c5981d$var$Context);
}
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
function $148a7a147e38ea7f$export$702d680b21cbd764(localeString) {
  if (Intl.Locale) {
    let locale = new Intl.Locale(localeString).maximize();
    let textInfo = typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;
    if (textInfo)
      return textInfo.direction === "rtl";
    if (locale.script)
      return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(locale.script);
  }
  let lang = localeString.split("-")[0];
  return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}
const $1e5a04cdaf7d1af8$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
  let locale = typeof window !== "undefined" && window[$1e5a04cdaf7d1af8$var$localeSymbol] || typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([
      locale
    ]);
  } catch {
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
  let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
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
const $18f2051aff69b9bf$var$I18nContext = /* @__PURE__ */ $670gB$react.createContext(null);
function $18f2051aff69b9bf$export$a54013f0d02a8f82(props) {
  let { locale, children } = props;
  let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
  let value = $670gB$react.useMemo(() => {
    if (!locale)
      return defaultLocale;
    return {
      locale,
      direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
    };
  }, [
    defaultLocale,
    locale
  ]);
  return /* @__PURE__ */ $670gB$react.createElement($18f2051aff69b9bf$var$I18nContext.Provider, {
    value
  }, children);
}
function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7() {
  let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
  let context = useContext($18f2051aff69b9bf$var$I18nContext);
  return context || defaultLocale;
}
let $bdb11010cef70236$var$idsUpdaterMap = /* @__PURE__ */ new Map();
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
  if (idA === idB)
    return idA;
  let setIdsA = $bdb11010cef70236$var$idsUpdaterMap.get(idA);
  if (setIdsA) {
    setIdsA.forEach((fn) => fn(idB));
    return idB;
  }
  let setIdsB = $bdb11010cef70236$var$idsUpdaterMap.get(idB);
  if (setIdsB) {
    setIdsB.forEach((fn) => fn(idA));
    return idA;
  }
  return idB;
}
function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
  return (...args) => {
    for (let callback of callbacks)
      if (typeof callback === "function")
        callback(...args);
  };
}
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
const $65484d02dcb7eb3e$var$DOMPropNames = /* @__PURE__ */ new Set([
  "id"
]);
const $65484d02dcb7eb3e$var$labelablePropNames = /* @__PURE__ */ new Set([
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-details"
]);
const $65484d02dcb7eb3e$var$linkPropNames = /* @__PURE__ */ new Set([
  "href",
  "hrefLang",
  "target",
  "rel",
  "download",
  "ping",
  "referrerPolicy"
]);
const $65484d02dcb7eb3e$var$propRe = /^(data-.*)$/;
function $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, opts = {}) {
  let { labelable, isLink, propNames } = opts;
  let filteredProps = {};
  for (const prop in props)
    if (Object.prototype.hasOwnProperty.call(props, prop) && ($65484d02dcb7eb3e$var$DOMPropNames.has(prop) || labelable && $65484d02dcb7eb3e$var$labelablePropNames.has(prop) || isLink && $65484d02dcb7eb3e$var$linkPropNames.has(prop) || (propNames === null || propNames === void 0 ? void 0 : propNames.has(prop)) || $65484d02dcb7eb3e$var$propRe.test(prop)))
      filteredProps[prop] = props[prop];
  return filteredProps;
}
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
      let focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          $7215afc6de606d6b$var$supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch {
    }
  }
  return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
  let parent = element.parentNode;
  let scrollableElements = [];
  let rootScrollingElement = document.scrollingElement || document.documentElement;
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
function $c87311424ea30a05$var$testUserAgent(re) {
  var _window_navigator_userAgentData;
  if (typeof window === "undefined" || window.navigator == null)
    return false;
  return ((_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.brands.some((brand) => re.test(brand.brand))) || re.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re) {
  var _window_navigator_userAgentData;
  return typeof window !== "undefined" && window.navigator != null ? re.test(((_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.platform) || window.navigator.platform) : false;
}
function $c87311424ea30a05$var$cached(fn) {
  let res = null;
  return () => {
    if (res == null)
      res = fn();
    return res;
  };
}
const $c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^Mac/i);
});
const $c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^iPad/i) || $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
const $c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
});
const $c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
});
const $c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
});
const $ea8dcbcb9ea1b556$var$RouterContext = /* @__PURE__ */ createContext({
  isNative: true,
  open: $ea8dcbcb9ea1b556$var$openSyntheticLink,
  useHref: (href) => href
});
function $ea8dcbcb9ea1b556$export$323e4fc2fa4753fb(props) {
  let { children, navigate, useHref } = props;
  let ctx = useMemo(() => ({
    isNative: false,
    open: (target, modifiers, href, routerOptions) => {
      $ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link) => {
        if ($ea8dcbcb9ea1b556$export$efa8c9099e530235(link, modifiers))
          navigate(href, routerOptions);
        else
          $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers);
      });
    },
    useHref: useHref || ((href) => href)
  }), [
    navigate,
    useHref
  ]);
  return /* @__PURE__ */ $670gB$react.createElement($ea8dcbcb9ea1b556$var$RouterContext.Provider, {
    value: ctx
  }, children);
}
function $ea8dcbcb9ea1b556$export$efa8c9099e530235(link, modifiers) {
  let target = link.getAttribute("target");
  return (!target || target === "_self") && link.origin === location.origin && !link.hasAttribute("download") && !modifiers.metaKey && !modifiers.ctrlKey && !modifiers.altKey && !modifiers.shiftKey;
}
function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
  var _window_event_type, _window_event;
  let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
  if ($c87311424ea30a05$export$b7d78993b74f766d() && ((_window_event = window.event) === null || _window_event === void 0 ? void 0 : (_window_event_type = _window_event.type) === null || _window_event_type === void 0 ? void 0 : _window_event_type.startsWith("key")) && target.target === "_blank") {
    if ($c87311424ea30a05$export$9ac100e40613ea10())
      metaKey = true;
    else
      ctrlKey = true;
  }
  let event = $c87311424ea30a05$export$78551043582a6a98() && $c87311424ea30a05$export$9ac100e40613ea10() && !$c87311424ea30a05$export$7bef049ce92e4224() && true ? new KeyboardEvent("keydown", {
    keyIdentifier: "Enter",
    metaKey,
    ctrlKey,
    altKey,
    shiftKey
  }) : new MouseEvent("click", {
    metaKey,
    ctrlKey,
    altKey,
    shiftKey,
    bubbles: true,
    cancelable: true
  });
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = setOpening;
  $7215afc6de606d6b$export$de79e2c695e052f3(target);
  target.dispatchEvent(event);
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
}
$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
function $ea8dcbcb9ea1b556$var$getSyntheticLink(target, open) {
  if (target instanceof HTMLAnchorElement)
    open(target);
  else if (target.hasAttribute("data-href")) {
    let link = document.createElement("a");
    link.href = target.getAttribute("data-href");
    if (target.hasAttribute("data-target"))
      link.target = target.getAttribute("data-target");
    if (target.hasAttribute("data-rel"))
      link.rel = target.getAttribute("data-rel");
    if (target.hasAttribute("data-download"))
      link.download = target.getAttribute("data-download");
    if (target.hasAttribute("data-ping"))
      link.ping = target.getAttribute("data-ping");
    if (target.hasAttribute("data-referrer-policy"))
      link.referrerPolicy = target.getAttribute("data-referrer-policy");
    target.appendChild(link);
    open(link);
    target.removeChild(link);
  }
}
function $ea8dcbcb9ea1b556$var$openSyntheticLink(target, modifiers) {
  $ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link) => $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers));
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
  if (!value)
    return void 0;
  if ($380ed8f3903c3931$var$UNIT_RE.test(value))
    return value;
  if ($380ed8f3903c3931$var$FUNC_RE.test(value))
    return value.replace($380ed8f3903c3931$var$SPECTRUM_VARIABLE_RE, "var(--spectrum-global-dimension-$&, var(--spectrum-alias-$&))");
  return `var(--spectrum-global-dimension-${value}, var(--spectrum-alias-${value}))`;
}
function $380ed8f3903c3931$export$f348bec194f2e6b5(value, matchedBreakpoints) {
  let responsiveValue = $380ed8f3903c3931$export$52dbfdbe1b2c3541(value, matchedBreakpoints);
  if (responsiveValue != null)
    return $380ed8f3903c3931$export$abc24f5b99744ea6(responsiveValue);
}
function $380ed8f3903c3931$var$colorValue(value, type = "default", version = 5) {
  if (version > 5)
    return `var(--spectrum-${value}, var(--spectrum-semantic-${value}-color-${type}))`;
  return `var(--spectrum-legacy-color-${value}, var(--spectrum-global-color-${value}, var(--spectrum-semantic-${value}-color-${type})))`;
}
function $380ed8f3903c3931$var$backgroundColorValue(value, version = 5) {
  if (!value)
    return void 0;
  return `var(--spectrum-alias-background-color-${value}, ${$380ed8f3903c3931$var$colorValue(value, "background", version)})`;
}
function $380ed8f3903c3931$var$borderColorValue(value, version = 5) {
  if (!value)
    return void 0;
  if (value === "default")
    return "var(--spectrum-alias-border-color)";
  return `var(--spectrum-alias-border-color-${value}, ${$380ed8f3903c3931$var$colorValue(value, "border", version)})`;
}
function $380ed8f3903c3931$var$borderSizeValue(value) {
  return value && value !== "none" ? `var(--spectrum-alias-border-size-${value})` : "0";
}
function $380ed8f3903c3931$var$borderRadiusValue(value) {
  if (!value)
    return void 0;
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
  let style = {};
  for (let key in props) {
    let styleProp = handlers[key];
    if (!styleProp || props[key] == null)
      continue;
    let [name, convert] = styleProp;
    if (typeof name === "function")
      name = name(direction);
    let prop = $380ed8f3903c3931$export$52dbfdbe1b2c3541(props[key], matchedBreakpoints);
    let value = convert(prop, props.colorVersion);
    if (Array.isArray(name))
      for (let k of name)
        style[k] = value;
    else
      style[name] = value;
  }
  for (let prop in $380ed8f3903c3931$var$borderStyleProps)
    if (style[prop]) {
      style[$380ed8f3903c3931$var$borderStyleProps[prop]] = "solid";
      style.boxSizing = "border-box";
    }
  return style;
}
function $380ed8f3903c3931$export$b8e6fb9d2dff3f41(props, handlers = $380ed8f3903c3931$export$fe9c6e915565b4e8, options = {}) {
  let { UNSAFE_className, UNSAFE_style, ...otherProps } = props;
  let breakpointProvider = $1051245f87c5981d$export$199d6754bdf4e1e3();
  let { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let { matchedBreakpoints = (breakpointProvider === null || breakpointProvider === void 0 ? void 0 : breakpointProvider.matchedBreakpoints) || [
    "base"
  ] } = options;
  let styles = $380ed8f3903c3931$export$f3c39bb9534218d0(props, handlers, direction, matchedBreakpoints);
  let style = {
    ...UNSAFE_style,
    ...styles
  };
  if (otherProps.className)
    console.warn("The className prop is unsafe and is unsupported in React Spectrum v3. Please use style props with Spectrum variables, or UNSAFE_className if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.");
  if (otherProps.style)
    console.warn("The style prop is unsafe and is unsupported in React Spectrum v3. Please use style props with Spectrum variables, or UNSAFE_style if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.");
  let styleProps = {
    style,
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
let $59d09bcc83651bf9$var$SlotContext = /* @__PURE__ */ $670gB$react.createContext(null);
function $59d09bcc83651bf9$export$1e5c9e6e4e15efe3(props, defaultSlot) {
  let slot = props.slot || defaultSlot;
  let { [slot]: slotProps = {} } = useContext($59d09bcc83651bf9$var$SlotContext) || {};
  return $3ef42575df84b30b$export$9d1611c77c2fe928(props, $3ef42575df84b30b$export$9d1611c77c2fe928(slotProps, {
    id: props.id
  }));
}
function $59d09bcc83651bf9$export$ceb145244332b7a2(props) {
  let { children, ...otherProps } = props;
  const emptyObj = useMemo(() => ({}), []);
  let content = children;
  if ($670gB$react.Children.toArray(children).length <= 1) {
    if (typeof children === "function")
      content = /* @__PURE__ */ $670gB$react.cloneElement($670gB$react.Children.only(children), otherProps);
  }
  return /* @__PURE__ */ $670gB$react.createElement($59d09bcc83651bf9$var$SlotContext.Provider, {
    value: emptyObj
  }, content);
}
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
$7b22e09dddddd7da$exports = JSON.parse('{"name":"@react-spectrum/provider","version":"3.10.1","description":"Spectrum UI components in React","license":"Apache-2.0","main":"dist/main.js","module":"dist/module.js","exports":{"types":"./dist/types.d.ts","import":"./dist/import.mjs","require":"./dist/main.js"},"types":"dist/types.d.ts","source":"src/index.ts","files":["dist","src"],"sideEffects":["*.css"],"targets":{"main":{"includeNodeModules":["@adobe/spectrum-css-temp"]},"module":{"includeNodeModules":["@adobe/spectrum-css-temp"]}},"repository":{"type":"git","url":"https://github.com/adobe/react-spectrum"},"dependencies":{"@react-aria/i18n":"^3.12.5","@react-aria/overlays":"^3.25.0","@react-aria/utils":"^3.27.0","@react-spectrum/utils":"^3.12.1","@react-types/provider":"^3.8.6","@react-types/shared":"^3.27.0","@swc/helpers":"^0.5.0","clsx":"^2.0.0"},"devDependencies":{"@adobe/spectrum-css-temp":"3.0.0-alpha.1"},"peerDependencies":{"react":"^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1","react-dom":"^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"},"publishConfig":{"access":"public"}}');
const $f57aed4a881a3485$var$Context = /* @__PURE__ */ $670gB$react.createContext(null);
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
  return /* @__PURE__ */ $670gB$react.createElement($f57aed4a881a3485$var$Context.Provider, {
    value: context
  }, children);
}
function $f57aed4a881a3485$export$d9aaed4c3ece1bc0() {
  let context = useContext($f57aed4a881a3485$var$Context);
  return {
    modalProviderProps: {
      "aria-hidden": context && context.modalCount > 0 ? true : void 0
    }
  };
}
function $parcel$interopDefault$2(a) {
  return a && a.__esModule ? a.default : a;
}
const $7167f8da3cce35e4$var$DEFAULT_BREAKPOINTS = {
  S: 640,
  M: 768,
  L: 1024,
  XL: 1280,
  XXL: 1536
};
const $7167f8da3cce35e4$export$2881499e37b75b9a = /* @__PURE__ */ $670gB$react.forwardRef(function Provider(props, ref) {
  let prevContext = useContext($a8430f637b4ccbce$export$841858b892ce1f4c);
  let prevColorScheme = prevContext && prevContext.colorScheme;
  let prevBreakpoints = prevContext && prevContext.breakpoints;
  let { theme = prevContext && prevContext.theme, defaultColorScheme } = props;
  if (!theme)
    throw new Error("theme not found, the parent provider must have a theme provided");
  let autoColorScheme = $d8453c5ae7fac713$export$6343629ee1b29116(theme, defaultColorScheme || "light");
  let autoScale = $d8453c5ae7fac713$export$a8d2043b2d807f4d(theme);
  let { locale: prevLocale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let usePrevColorScheme = prevColorScheme ? !!theme[prevColorScheme] : false;
  let { colorScheme = usePrevColorScheme ? prevColorScheme : autoColorScheme, scale = prevContext ? prevContext.scale : autoScale, locale = prevContext ? prevLocale : void 0, breakpoints = prevContext ? prevBreakpoints : $7167f8da3cce35e4$var$DEFAULT_BREAKPOINTS, children, isQuiet, isEmphasized, isDisabled, isRequired, isReadOnly, validationState, router, ...otherProps } = props;
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
  if (!prevContext || props.locale || theme !== prevContext.theme || colorScheme !== prevContext.colorScheme || scale !== prevContext.scale || Object.keys(domProps).length > 0 || otherProps.UNSAFE_className || styleProps.style && Object.keys(styleProps.style).length > 0)
    contents = /* @__PURE__ */ $670gB$react.createElement($7167f8da3cce35e4$var$ProviderWrapper, {
      ...props,
      UNSAFE_style: {
        isolation: !prevContext ? "isolate" : void 0,
        ...styleProps.style
      },
      ref
    }, contents);
  if (router)
    contents = /* @__PURE__ */ $670gB$react.createElement($ea8dcbcb9ea1b556$export$323e4fc2fa4753fb, router, contents);
  return /* @__PURE__ */ $670gB$react.createElement($a8430f637b4ccbce$export$841858b892ce1f4c.Provider, {
    value: context
  }, /* @__PURE__ */ $670gB$react.createElement($18f2051aff69b9bf$export$a54013f0d02a8f82, {
    locale
  }, /* @__PURE__ */ $670gB$react.createElement($1051245f87c5981d$export$8214320346cf5104, {
    matchedBreakpoints
  }, /* @__PURE__ */ $670gB$react.createElement($f57aed4a881a3485$export$178405afcd8c5eb, null, contents))));
});
const $7167f8da3cce35e4$var$ProviderWrapper = /* @__PURE__ */ $670gB$react.forwardRef(function ProviderWrapper(props, ref) {
  let { children, ...otherProps } = props;
  let { locale, direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let { theme, colorScheme, scale } = $7167f8da3cce35e4$export$693cdb10cec23617();
  let { modalProviderProps } = $f57aed4a881a3485$export$d9aaed4c3ece1bc0();
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  let themeKey = Object.keys(theme[colorScheme])[0];
  let scaleKey = Object.keys(theme[scale])[0];
  let className = clsx(styleProps.className, $parcel$interopDefault$2($698974e9dd92c2ec$exports)["spectrum"], $parcel$interopDefault$2($5cac98e4c80e6707$exports)["spectrum"], Object.values(theme[colorScheme]), Object.values(theme[scale]), theme.global ? Object.values(theme.global) : null, {
    "react-spectrum-provider": $fd933927dbac1f15$export$46d604dce8bf8724,
    spectrum: $fd933927dbac1f15$export$46d604dce8bf8724,
    [themeKey]: $fd933927dbac1f15$export$46d604dce8bf8724,
    [scaleKey]: $fd933927dbac1f15$export$46d604dce8bf8724
  });
  var _props_colorScheme, _ref;
  let style = {
    ...styleProps.style,
    colorScheme: (_ref = (_props_colorScheme = props.colorScheme) !== null && _props_colorScheme !== void 0 ? _props_colorScheme : colorScheme) !== null && _ref !== void 0 ? _ref : Object.keys(theme).filter((k) => k === "light" || k === "dark").join(" ")
  };
  let hasWarned = useRef(false);
  useEffect(() => {
    if (direction && domRef.current) {
      var _domRef_current_parentElement, _domRef_current;
      let closestDir = (_domRef_current = domRef.current) === null || _domRef_current === void 0 ? void 0 : (_domRef_current_parentElement = _domRef_current.parentElement) === null || _domRef_current_parentElement === void 0 ? void 0 : _domRef_current_parentElement.closest("[dir]");
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
  return /* @__PURE__ */ $670gB$react.createElement("div", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ...modalProviderProps,
    className,
    style,
    lang: locale,
    dir: direction,
    ref: domRef
  }, children);
});
function $7167f8da3cce35e4$export$693cdb10cec23617() {
  let context = useContext($a8430f637b4ccbce$export$841858b892ce1f4c);
  if (!context)
    throw new Error("No root provider found, please make sure your app is wrapped within a <Provider>. Alternatively, this issue may be caused by duplicate packages, see https://github.com/adobe/react-spectrum/wiki/Frequently-Asked-Questions-(FAQs)#why-are-there-errors-after-upgrading-a-react-spectrum-package for more information.");
  return context;
}
var spectrumDarkest_67091368 = "";
function $parcel$export$5(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $ea2e8e3460b67692$exports = {};
$parcel$export$5($ea2e8e3460b67692$exports, "spectrum--darkest", () => $ea2e8e3460b67692$export$4ecdba604f5f1f44, (v) => $ea2e8e3460b67692$export$4ecdba604f5f1f44 = v);
var $ea2e8e3460b67692$export$4ecdba604f5f1f44;
$ea2e8e3460b67692$export$4ecdba604f5f1f44 = `R-l9gW_spectrum--darkest`;
var spectrumGlobal_caa2d955 = "";
function $parcel$export$4(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $5b6ea5874ed9af7b$exports = {};
$parcel$export$4($5b6ea5874ed9af7b$exports, "spectrum", () => $5b6ea5874ed9af7b$export$3311ab3a441bc141, (v) => $5b6ea5874ed9af7b$export$3311ab3a441bc141 = v);
$parcel$export$4($5b6ea5874ed9af7b$exports, "spectrum--dark", () => $5b6ea5874ed9af7b$export$68dc111a79481afd, (v) => $5b6ea5874ed9af7b$export$68dc111a79481afd = v);
$parcel$export$4($5b6ea5874ed9af7b$exports, "spectrum--darkest", () => $5b6ea5874ed9af7b$export$4ecdba604f5f1f44, (v) => $5b6ea5874ed9af7b$export$4ecdba604f5f1f44 = v);
$parcel$export$4($5b6ea5874ed9af7b$exports, "spectrum--large", () => $5b6ea5874ed9af7b$export$a88a8dbe29386d31, (v) => $5b6ea5874ed9af7b$export$a88a8dbe29386d31 = v);
$parcel$export$4($5b6ea5874ed9af7b$exports, "spectrum--light", () => $5b6ea5874ed9af7b$export$efb37c2f79da8163, (v) => $5b6ea5874ed9af7b$export$efb37c2f79da8163 = v);
$parcel$export$4($5b6ea5874ed9af7b$exports, "spectrum--lightest", () => $5b6ea5874ed9af7b$export$baaa804dc80cce18, (v) => $5b6ea5874ed9af7b$export$baaa804dc80cce18 = v);
$parcel$export$4($5b6ea5874ed9af7b$exports, "spectrum--medium", () => $5b6ea5874ed9af7b$export$4c0c83b3f4303ef8, (v) => $5b6ea5874ed9af7b$export$4c0c83b3f4303ef8 = v);
var $5b6ea5874ed9af7b$export$3311ab3a441bc141;
var $5b6ea5874ed9af7b$export$68dc111a79481afd;
var $5b6ea5874ed9af7b$export$4ecdba604f5f1f44;
var $5b6ea5874ed9af7b$export$a88a8dbe29386d31;
var $5b6ea5874ed9af7b$export$efb37c2f79da8163;
var $5b6ea5874ed9af7b$export$baaa804dc80cce18;
var $5b6ea5874ed9af7b$export$4c0c83b3f4303ef8;
$5b6ea5874ed9af7b$export$3311ab3a441bc141 = `XhWg9q_spectrum`;
$5b6ea5874ed9af7b$export$68dc111a79481afd = `XhWg9q_spectrum--dark`;
$5b6ea5874ed9af7b$export$4ecdba604f5f1f44 = `XhWg9q_spectrum--darkest`;
$5b6ea5874ed9af7b$export$a88a8dbe29386d31 = `XhWg9q_spectrum--large`;
$5b6ea5874ed9af7b$export$efb37c2f79da8163 = `XhWg9q_spectrum--light`;
$5b6ea5874ed9af7b$export$baaa804dc80cce18 = `XhWg9q_spectrum--lightest`;
$5b6ea5874ed9af7b$export$4c0c83b3f4303ef8 = `XhWg9q_spectrum--medium`;
var spectrumLarge_f5a2a677 = "";
function $parcel$export$3(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $b2eefcc3e5fdb373$exports = {};
$parcel$export$3($b2eefcc3e5fdb373$exports, "spectrum--large", () => $b2eefcc3e5fdb373$export$a88a8dbe29386d31, (v) => $b2eefcc3e5fdb373$export$a88a8dbe29386d31 = v);
var $b2eefcc3e5fdb373$export$a88a8dbe29386d31;
$b2eefcc3e5fdb373$export$a88a8dbe29386d31 = `_1DrGeG_spectrum--large`;
var spectrumLight_79488b2a = "";
function $parcel$export$2(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $729ae839c55d8d77$exports = {};
$parcel$export$2($729ae839c55d8d77$exports, "spectrum--light", () => $729ae839c55d8d77$export$efb37c2f79da8163, (v) => $729ae839c55d8d77$export$efb37c2f79da8163 = v);
var $729ae839c55d8d77$export$efb37c2f79da8163;
$729ae839c55d8d77$export$efb37c2f79da8163 = `YqfL3a_spectrum--light`;
var spectrumMedium_11aa6e7d = "";
function $parcel$export$1(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $b4d117254fac085c$exports = {};
$parcel$export$1($b4d117254fac085c$exports, "spectrum--medium", () => $b4d117254fac085c$export$4c0c83b3f4303ef8, (v) => $b4d117254fac085c$export$4c0c83b3f4303ef8 = v);
var $b4d117254fac085c$export$4c0c83b3f4303ef8;
$b4d117254fac085c$export$4c0c83b3f4303ef8 = `rfm_fq_spectrum--medium`;
function $parcel$interopDefault$1(a) {
  return a && a.__esModule ? a.default : a;
}
let $bf24a13e98395dd3$export$bca14c5b3b88a9c9 = {
  global: $parcel$interopDefault$1($5b6ea5874ed9af7b$exports),
  light: $parcel$interopDefault$1($729ae839c55d8d77$exports),
  dark: $parcel$interopDefault$1($ea2e8e3460b67692$exports),
  medium: $parcel$interopDefault$1($b4d117254fac085c$exports),
  large: $parcel$interopDefault$1($b2eefcc3e5fdb373$exports)
};
const useNonNullableContext = (context) => {
  const state = useContext(context);
  if (!state)
    throw new Error(`${context} is not provided or null`);
  return state;
};
const defaultInterfacePlacementMaxLength = 10;
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
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
function jsxProd(type, config, maybeKey) {
  var key = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  if ("key" in config) {
    maybeKey = {};
    for (var propName in config)
      "key" !== propName && (maybeKey[propName] = config[propName]);
  } else
    maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref: void 0 !== config ? config : null,
    props: maybeKey
  };
}
reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
reactJsxRuntime_production.jsx = jsxProd;
reactJsxRuntime_production.jsxs = jsxProd;
{
  jsxRuntime.exports = reactJsxRuntime_production;
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
    position: contextPlayerPlacement === "static" || !contextPlayerPlacement ? "static" : "fixed",
    UNSAFE_className: "rm-audio-player-provider",
    ...placementState,
    ...rootContainerProps,
    children
  });
};
const audioPlayerDispatchContext = createContext(null);
const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
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
    audioEl
  } = elementRefs;
  if (restart) {
    if (audioEl) {
      audioEl.currentTime = 0;
    }
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
const getRandomIdx = (curIdx, minNumber, maxNumber) => {
  let nextIdx = getRandomNumber(minNumber, maxNumber);
  while (nextIdx === curIdx) {
    nextIdx = getRandomNumber(minNumber, maxNumber);
  }
  return nextIdx;
};
const audioPlayerReducer = (state, action) => {
  var _a, _b, _c, _d;
  switch (action.type) {
    case "NEXT_AUDIO": {
      resetAudioValues(state.elementRefs, void 0, true);
      if (state.curAudioState.repeatType === "NONE" && state.curIdx + 1 === state.playList.length) {
        return {
          ...state,
          curAudioState: { ...state.curAudioState, isPlaying: false }
        };
      }
      if (state.curAudioState.repeatType === "SHUFFLE") {
        const randomIdx = getRandomIdx(
          state.curIdx,
          0,
          state.playList.length - 1
        );
        return {
          ...state,
          curPlayId: state.playList[randomIdx].id,
          curIdx: randomIdx,
          curAudioState: {
            ...state.curAudioState,
            isLoadedMetaData: false
          }
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
      if (((_a = state.elementRefs) == null ? void 0 : _a.audioEl) && ((_b = state.elementRefs) == null ? void 0 : _b.audioEl.currentTime) > 1 || ((_c = state.elementRefs) == null ? void 0 : _c.waveformInst) && ((_d = state.elementRefs) == null ? void 0 : _d.waveformInst.getCurrentTime()) > 1 || state.curAudioState.repeatType === "NONE" && state.curIdx === 0) {
        resetAudioValues(state.elementRefs, void 0, true);
        return state;
      }
      if (state.curAudioState.repeatType === "SHUFFLE") {
        const randomIdx = getRandomIdx(
          state.curIdx,
          0,
          state.playList.length - 1
        );
        return {
          ...state,
          curPlayId: state.playList[randomIdx].id,
          curIdx: randomIdx
        };
      }
      const infiniteLoopPrevIdx = (state.curIdx - 1 + state.playList.length) % state.playList.length;
      return {
        ...state,
        curPlayId: state.playList[infiniteLoopPrevIdx].id,
        curIdx: infiniteLoopPrevIdx,
        curAudioState: {
          ...state.curAudioState,
          isLoadedMetaData: false
        }
      };
    }
    case "UPDATE_PLAY_LIST": {
      const curPlayListItem = action.playList.find(
        (item) => item.id === state.curPlayId
      );
      if (!curPlayListItem) {
        console.error(
          "UPDATE_PLAY_LIST ERROR - curPlayId is not found on playList"
        );
        return state;
      }
      const curIdx = action.playList.findIndex(
        (item) => item.id === state.curPlayId
      );
      return {
        ...state,
        playList: action.playList,
        curIdx
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
    case "SET_AUDIO_STATE":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioState }
      };
    case "SET_INITIAL_STATES":
      return {
        ...state,
        curAudioState: { ...state.curAudioState, ...action.audioState },
        curPlayId: action.curPlayId
      };
    case "CHANGE_PLAYING_STATE":
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
    case "SET_CURRENT_AUDIO":
      return {
        ...state,
        curPlayId: action.currentAudioId,
        curIdx: action.currentIndex,
        curAudioState: {
          ...state.curAudioState,
          isLoadedMetaData: false
        }
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
        interfacePlacement: action.interfacePlacement,
        volumeSliderPlacement: action.volumeSliderPlacement
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
  children,
  ...props
}) => {
  const {
    playList,
    audioInitialState,
    activeUI: activeUIProp,
    placement: placementProp,
    ...otherProps
  } = props;
  const curAudioState = {
    isPlaying: (audioInitialState == null ? void 0 : audioInitialState.isPlaying) || false,
    repeatType: (audioInitialState == null ? void 0 : audioInitialState.repeatType) || "ALL",
    volume: (audioInitialState == null ? void 0 : audioInitialState.volume) || 1,
    muted: audioInitialState == null ? void 0 : audioInitialState.muted
  };
  const activeUI = activeUIProp || {
    playButton: true
  };
  const placement = {
    playerPlacement: placementProp == null ? void 0 : placementProp.player,
    playListPlacement: (placementProp == null ? void 0 : placementProp.playList) || "bottom",
    interfacePlacement: (placementProp == null ? void 0 : placementProp.interface) || {
      templateArea: {
        playButton: defaultInterfacePlacement.templateArea["playButton"]
      }
    },
    volumeSliderPlacement: placementProp == null ? void 0 : placementProp.volumeSlider
  };
  const [audioContextState, dispatchAudioContextState] = useReducer(audioPlayerReducer, {
    playList,
    curPlayId: (audioInitialState == null ? void 0 : audioInitialState.curPlayId) || 1,
    curIdx: (audioInitialState == null ? void 0 : audioInitialState.curPlayId) ? playList.findIndex((audioData) => audioData.id === (audioInitialState == null ? void 0 : audioInitialState.curPlayId)) : 0,
    curAudioState,
    activeUI,
    ...placement,
    ...otherProps
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

.rm-audio-player-provider {
  * {
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
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
  button {
    margin: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    vertical-align: baseline;
    border: 0;
  }
}`;
const $b9606c0c41d55371$export$27a5bd065ad55220 = /* @__PURE__ */ forwardRef(function View(props, ref) {
  props = $59d09bcc83651bf9$export$1e5c9e6e4e15efe3(props);
  let { elementType: ElementType = "div", children, ...otherProps } = props;
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(props, $380ed8f3903c3931$export$e0705d1a55f297c);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  return /* @__PURE__ */ $670gB$react.createElement(ElementType, {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ref: domRef
  }, /* @__PURE__ */ $670gB$react.createElement($59d09bcc83651bf9$export$ceb145244332b7a2, null, children));
});
const useAudio = () => {
  const { curAudioState, elementRefs } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onTimeUpdate = useCallback(
    (event) => {
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
    },
    [elementRefs]
  );
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
  const onLoadedMetadata = useCallback(
    (e) => {
      if (!elementRefs)
        return;
      const { duration } = e.currentTarget;
      resetAudioValues(elementRefs, duration);
      audioPlayerDispatch({
        type: "SET_AUDIO_STATE",
        audioState: { isLoadedMetaData: true }
      });
    },
    [elementRefs]
  );
  useEffect(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.audioEl))
      return;
    if (curAudioState.isPlaying) {
      elementRefs == null ? void 0 : elementRefs.audioEl.play();
    } else {
      elementRefs == null ? void 0 : elementRefs.audioEl.pause();
    }
  }, [elementRefs == null ? void 0 : elementRefs.audioEl, curAudioState.isPlaying, audioPlayerDispatch]);
  useEffect(() => {
    if (!(elementRefs == null ? void 0 : elementRefs.audioEl) || !curAudioState.volume)
      return;
    elementRefs.audioEl.volume = curAudioState.volume;
  }, [elementRefs == null ? void 0 : elementRefs.audioEl, curAudioState.volume]);
  return {
    onTimeUpdate,
    onEnded,
    onLoadedMetadata
  };
};
const Audio = ({
  audioRef: propsAudioRef
}) => {
  const audioRef = useRef(null);
  const {
    curAudioState,
    curPlayId,
    playList
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const curPlayedAudioData = playList.find((audioData) => audioData.id === curPlayId);
  const audioNativeStates = Object.fromEntries(Object.entries(curAudioState).filter((state) => {
    if (state[0] === "isPlaying" || state[0] === "repeatType" || state[0] === "curPlayId" || state[0] === "isLoadedMetaData") {
      return false;
    }
    return true;
  }));
  const useAudioEventProps = useAudio();
  useEffect(() => {
    if (!audioRef.current)
      return;
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: {
        audioEl: audioRef.current
      }
    });
    if (propsAudioRef) {
      propsAudioRef.current = audioRef.current;
    }
  }, [audioPlayerDispatch, propsAudioRef]);
  return /* @__PURE__ */ jsx("audio", {
    id: "rm-audio-player-audio",
    autoPlay: curAudioState.isPlaying,
    ref: audioRef,
    src: curPlayedAudioData == null ? void 0 : curPlayedAudioData.src,
    ...useAudioEventProps,
    ...audioNativeStates
  });
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

  /** //TODO : animation on off  */
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
var IconContext = $670gB$react.createContext && /* @__PURE__ */ $670gB$react.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
  }
  return target;
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
function ownKeys(e, r2) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e, r3).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t), true).forEach(function(r3) {
      _defineProperty(e, r3, t[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r3) {
      Object.defineProperty(e, r3, Object.getOwnPropertyDescriptor(t, r3));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r2) {
  if ("object" != typeof t || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r2 || "default");
    if ("object" != typeof i)
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ $670gB$react.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ $670gB$react.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ $670gB$react.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ $670gB$react.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ $670gB$react.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function MdPauseCircleFilled(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" }, "child": [] }] })(props);
}
function MdPlayCircleFilled(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" }, "child": [] }] })(props);
}
function MdPlaylistPlay(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M3 10h11v2H3zM3 6h11v2H3zM3 14h7v2H3zM16 13v8l6-4z" }, "child": [] }] })(props);
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
  const {
    curAudioState,
    customIcons
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changePlayState = () => audioPlayerDispatch({
    type: "CHANGE_PLAYING_STATE"
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
  return /* @__PURE__ */ jsx(StyledPlayBtn, {
    onClick: changePlayState,
    className: "play-button",
    children: PlayIcon
  });
};
function ImPrevious(props) {
  return GenIcon({ "tag": "svg", "attr": { "version": "1.1", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z" }, "child": [] }, { "tag": "path", "attr": { "d": "M7 8l4-3v6z" }, "child": [] }, { "tag": "path", "attr": { "d": "M5 5h2v6h-2v-6z" }, "child": [] }] })(props);
}
function ImNext(props) {
  return GenIcon({ "tag": "svg", "attr": { "version": "1.1", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zM8 14.5c3.59 0 6.5-2.91 6.5-6.5s-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5z" }, "child": [] }, { "tag": "path", "attr": { "d": "M9 8l-4-3v6z" }, "child": [] }, { "tag": "path", "attr": { "d": "M11 5h-2v6h2v-6z" }, "child": [] }] })(props);
}
const PrevNnextBtn = ({
  type,
  visible
}) => {
  const {
    customIcons
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeAudio = () => {
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
  return visible ? /* @__PURE__ */ jsx(StyledBtn, {
    onClick: changeAudio,
    className: "prev-n-next-button",
    children: PrevNnextIcon
  }) : null;
};
function TbArrowsShuffle(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M18 4l3 3l-3 3" }, "child": [] }, { "tag": "path", "attr": { "d": "M18 20l3 -3l-3 -3" }, "child": [] }, { "tag": "path", "attr": { "d": "M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" }, "child": [] }, { "tag": "path", "attr": { "d": "M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" }, "child": [] }] })(props);
}
function TbRepeatOff(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M4 12v-3c0 -1.336 .873 -2.468 2.08 -2.856m3.92 -.144h10m-3 -3l3 3l-3 3" }, "child": [] }, { "tag": "path", "attr": { "d": "M20 12v3a3 3 0 0 1 -.133 .886m-1.99 1.984a3 3 0 0 1 -.877 .13h-13m3 3l-3 -3l3 -3" }, "child": [] }, { "tag": "path", "attr": { "d": "M3 3l18 18" }, "child": [] }] })(props);
}
function TbRepeatOnce(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" }, "child": [] }, { "tag": "path", "attr": { "d": "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" }, "child": [] }, { "tag": "path", "attr": { "d": "M11 11l1 -1v4" }, "child": [] }] })(props);
}
function TbRepeat(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" }, "child": [] }, { "tag": "path", "attr": { "d": "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" }, "child": [] }] })(props);
}
function TbVolume2(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M15 8a5 5 0 0 1 0 8" }, "child": [] }, { "tag": "path", "attr": { "d": "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, "child": [] }] })(props);
}
function TbVolume3(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, "child": [] }, { "tag": "path", "attr": { "d": "M16 10l4 4m0 -4l-4 4" }, "child": [] }] })(props);
}
function TbVolume(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M15 8a5 5 0 0 1 0 8" }, "child": [] }, { "tag": "path", "attr": { "d": "M17.7 5a9 9 0 0 1 0 14" }, "child": [] }, { "tag": "path", "attr": { "d": "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" }, "child": [] }] })(props);
}
const RepeatTypeBtn = () => {
  const {
    curAudioState,
    customIcons
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeRepeatType = useCallback(() => {
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
  return /* @__PURE__ */ jsx(StyledBtn, {
    onClick: changeRepeatType,
    className: "repeat-button",
    children: RepeatIcon
  });
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
        color: isOpen ? "var(--rm-audio-player-sortable-list-button-active)" : void 0
      }),
      customIcon: customIcons == null ? void 0 : customIcons.playList
    })
  });
};
const VolumeTriggerBtn = forwardRef((_, ref) => {
  const {
    curAudioState,
    customIcons,
    elementRefs
  } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeMuteState = useCallback(() => audioPlayerDispatch({
    type: "SET_MUTED",
    muted: !curAudioState.muted
  }), [audioPlayerDispatch, curAudioState.muted]);
  const VolumeIcon = useMemo(() => {
    var _a;
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
    switch (volumeState(curAudioState.volume || ((_a = elementRefs == null ? void 0 : elementRefs.audioEl) == null ? void 0 : _a.volume) || 0)) {
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
    onClick: changeMuteState,
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
  const [trigger, content] = $670gB$react.Children.toArray(children);
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
const $994c48bfb00b620b$export$ef2184bd89960b14 = /* @__PURE__ */ forwardRef(function Grid(props, ref) {
  let { children, ...otherProps } = props;
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps, $994c48bfb00b620b$var$gridStyleProps);
  if (styleProps.style)
    styleProps.style.display = "grid";
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  return /* @__PURE__ */ $670gB$react.createElement("div", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    ...styleProps,
    ref: domRef
  }, children);
});
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
var flexGap_bf0f97f4 = "";
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $01dd1839b5376a46$exports = {};
$parcel$export($01dd1839b5376a46$exports, "flex", () => $01dd1839b5376a46$export$97691fbb80847c19, (v) => $01dd1839b5376a46$export$97691fbb80847c19 = v);
$parcel$export($01dd1839b5376a46$exports, "flex-container", () => $01dd1839b5376a46$export$69d7a39fa31a000b, (v) => $01dd1839b5376a46$export$69d7a39fa31a000b = v);
$parcel$export($01dd1839b5376a46$exports, "flex-gap", () => $01dd1839b5376a46$export$31a9da8b58047a44, (v) => $01dd1839b5376a46$export$31a9da8b58047a44 = v);
var $01dd1839b5376a46$export$97691fbb80847c19;
var $01dd1839b5376a46$export$69d7a39fa31a000b;
var $01dd1839b5376a46$export$31a9da8b58047a44;
$01dd1839b5376a46$export$97691fbb80847c19 = `vi3c6W_flex`;
$01dd1839b5376a46$export$69d7a39fa31a000b = `vi3c6W_flex-container`;
$01dd1839b5376a46$export$31a9da8b58047a44 = `vi3c6W_flex-gap`;
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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
const $884c64d19340d345$export$f51f4c4ede09e011 = /* @__PURE__ */ forwardRef(function Flex(props, ref) {
  let { children, ...otherProps } = props;
  let breakpointProvider = $1051245f87c5981d$export$199d6754bdf4e1e3();
  let matchedBreakpoints = (breakpointProvider === null || breakpointProvider === void 0 ? void 0 : breakpointProvider.matchedBreakpoints) || [
    "base"
  ];
  let { styleProps } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps);
  let { styleProps: flexStyle } = $380ed8f3903c3931$export$b8e6fb9d2dff3f41(otherProps, $884c64d19340d345$var$flexStyleProps);
  let domRef = $98e5a8ae0e6415af$export$c2c55ef9111cafd8(ref);
  let style = {
    ...styleProps.style,
    ...flexStyle.style
  };
  if (props.gap != null)
    style.gap = $380ed8f3903c3931$export$f348bec194f2e6b5(props.gap, matchedBreakpoints);
  if (props.columnGap != null)
    style.columnGap = $380ed8f3903c3931$export$f348bec194f2e6b5(props.columnGap, matchedBreakpoints);
  if (props.rowGap != null)
    style.rowGap = $380ed8f3903c3931$export$f348bec194f2e6b5(props.rowGap, matchedBreakpoints);
  return /* @__PURE__ */ $670gB$react.createElement("div", {
    ...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps),
    className: $fd933927dbac1f15$export$ce4ab0c55987d1ff($parcel$interopDefault($01dd1839b5376a46$exports), "flex", styleProps.className),
    style,
    ref: domRef
  }, children);
});
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
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
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
          if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
            classes.push(arg.toString());
            continue;
          }
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
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
    background: var(--rm-audio-player-selected-list-item-background);
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
  const onClickItem = useCallback(
    (index) => {
      audioPlayerDispatch({
        type: "SET_CURRENT_AUDIO",
        currentIndex: index,
        currentAudioId: playList[index].id
      });
    },
    [audioPlayerDispatch, playList]
  );
  return {
    cssTransitionEventProps: {
      onExited: () => setIsOpen(false),
      onEntered: () => setIsOpen(true)
    },
    sortableItemEventProps: {
      draggable: activeUI.playList !== "unSortable",
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
  return playList.length !== 0 ? $4AOtR$reactdom.createPortal(/* @__PURE__ */ jsx(CssTransition, {
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
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Drawer, {
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
  });
};
const useVariableColor = (variableColors) => {
  const colorsRef = useRef(null);
  useLayoutEffect(() => {
    const parsedColors = Object.entries(
      variableColors
    ).reduce(
      (acc, [key, varName]) => ({
        ...acc,
        [key]: window.getComputedStyle(
          document.getElementsByClassName("rm-audio-player-provider")[0]
        ).getPropertyValue(`${varName}`)
      }),
      {}
    );
    colorsRef.current = parsedColors;
  }, [variableColors]);
  return colorsRef;
};
const useRefsDispatch = ({ refs }, deps) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useEffect(() => {
    const isAllExist = Object.values(refs).every((ref) => ref.current);
    if (isAllExist) {
      const elementRefs = Object.entries(refs).reduce(
        (accObj, [key, ref]) => ({ ...accObj, [key]: ref.current }),
        {}
      );
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs
      });
    }
  }, [audioPlayerDispatch, ...Object.values(refs), ...deps]);
};
const useProgress = () => {
  const { elementRefs, curAudioState } = useNonNullableContext(
    audioPlayerStateContext
  );
  const [isTimeChangeActive, setTimeChangeActive] = useState(false);
  const moveAudioTime = useCallback(
    (e) => {
      if (!(elementRefs == null ? void 0 : elementRefs.audioEl) || !(curAudioState == null ? void 0 : curAudioState.isLoadedMetaData))
        return;
      const { clientX } = e;
      const { clientWidth } = e.currentTarget;
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const curPositionX = clientX - boundingRect.x;
      const curPositionPercent = curPositionX / clientWidth;
      const curPositionTime = curPositionPercent * elementRefs.audioEl.duration;
      elementRefs.audioEl.currentTime = curPositionTime;
    },
    [curAudioState == null ? void 0 : curAudioState.isLoadedMetaData, elementRefs == null ? void 0 : elementRefs.audioEl]
  );
  const setSelectStartActive = useCallback(
    (state) => document.onselectstart = () => state,
    []
  );
  return {
    onMouseDown: () => setTimeChangeActive(true),
    onMouseUp: () => setTimeChangeActive(false),
    onMouseLeave: () => setTimeChangeActive(false),
    onMouseMove: isTimeChangeActive ? moveAudioTime : void 0,
    onClick: moveAudioTime,
    onMouseOver: () => setSelectStartActive(false),
    onMouseOut: () => isTimeChangeActive && setSelectStartActive(true)
  };
};
const BarProgress = ({
  isActive
}) => {
  const progressBarRef = useRef(null);
  const progressValueRef = useRef(null);
  const progressHandleRef = useRef(null);
  useRefsDispatch({
    refs: {
      progressBarEl: progressBarRef,
      progressValueEl: progressValueRef,
      progressHandleEl: progressHandleRef
    }
  }, [isActive]);
  const {
    elementRefs,
    curAudioState
  } = useNonNullableContext(audioPlayerStateContext);
  useEffect(() => {
    if (!progressBarRef.current || !progressValueRef.current || !progressHandleRef.current || !(elementRefs == null ? void 0 : elementRefs.audioEl) || !curAudioState.isLoadedMetaData || curAudioState.isPlaying)
      return;
    const progressBarWidth = progressBarRef.current.clientWidth;
    const progressHandlePosition = elementRefs.audioEl.currentTime / elementRefs.audioEl.duration * progressBarWidth;
    progressValueRef.current.style.transform = `scaleX(${elementRefs.audioEl.currentTime / elementRefs.audioEl.duration})`;
    progressHandleRef.current.style.transform = `translateX(${progressHandlePosition}px)`;
  }, [isActive, curAudioState.isLoadedMetaData]);
  const eventProps = useProgress();
  return isActive ? /* @__PURE__ */ jsxs(BarProgressWrapper, {
    className: "bar-progress-wrapper",
    ...eventProps,
    children: [/* @__PURE__ */ jsx("div", {
      className: "rm-player-progress-bar",
      ref: progressBarRef,
      children: /* @__PURE__ */ jsx("div", {
        className: "rm-player-progress",
        ref: progressValueRef
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "rm-player-progress-handle",
      ref: progressHandleRef
    })]
  }) : null;
};
const BarProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 18px;
  padding: 8px 0;
  cursor: pointer;
  position: relative;
  align-items: center;
  .rm-player-progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--rm-audio-player-progress-bar-background);
  }
  .rm-player-progress {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--rm-audio-player-progress-bar);
    transform-origin: 0 0;
    transform: scaleX(0);
  }
  .rm-player-progress-handle {
    position: absolute;
    left: -4px;
    background-color: var(--rm-audio-player-progress-bar);
    border-radius: 100%;
    height: 8px;
    width: 8px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover {
    .rm-player-progress-handle {
      opacity: 1;
    }
  }
`;
var wavesurfer = { exports: {} };
/*!
 * wavesurfer.js 6.6.4 (2023-06-10)
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
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
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
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
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
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
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
              value: function style(el, styles) {
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
                var position = this.wrapper.scrollWidth * percent;
                this.recenterOnPosition(position, true);
              }
            }, {
              key: "recenterOnPosition",
              value: function recenterOnPosition(position, immediate) {
                var scrollLeft = this.wrapper.scrollLeft;
                var half = ~~(this.wrapper.clientWidth / 2);
                var maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
                var target = position - half;
                var offset = target - scrollLeft;
                if (maxScroll == 0) {
                  return;
                }
                if (!immediate && -half <= offset && offset < half) {
                  var rate = this.params.autoCenterRate;
                  rate /= half;
                  rate *= maxScroll;
                  offset = Math.max(-rate, Math.min(rate, offset));
                  target = scrollLeft + offset;
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
              value: function updateProgress(position) {
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
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
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
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
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
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
                    if (_this4.params.barMinHeight) {
                      h = Math.max(h, _this4.params.barMinHeight);
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
              value: function updateProgress(position) {
                this.style(this.progressWave, {
                  width: position + "px"
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
          }
          function _get() {
            if (typeof Reflect !== "undefined" && Reflect.get) {
              _get = Reflect.get.bind();
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
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
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
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
          }
          function _get() {
            if (typeof Reflect !== "undefined" && Reflect.get) {
              _get = Reflect.get.bind();
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
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
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
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
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
                this.mediaListeners.waiting = function() {
                  _this2.fireEvent("waiting");
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
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
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
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
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
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
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
            var silentAC = new AudioContext();
            var silentBS = silentAC.createBufferSource();
            silentBS.buffer = silentAC.createBuffer(1, 1, 44100);
            silentBS.connect(silentAC.destination);
            silentBS.start();
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
          exports2["default"] = style;
          function style(el, styles) {
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
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
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
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          function _defineProperty2(obj, key, value) {
            key = _toPropertyKey2(key);
            if (key in obj) {
              Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
            } else {
              obj[key] = value;
            }
            return obj;
          }
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
          }
          var WaveSurfer2 = /* @__PURE__ */ function(_util$Observer) {
            _inherits(WaveSurfer3, _util$Observer);
            var _super = _createSuper(WaveSurfer3);
            function WaveSurfer3(params) {
              var _this;
              _classCallCheck(this, WaveSurfer3);
              _this = _super.call(this);
              _defineProperty2(_assertThisInitialized(_this), "defaultParams", {
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
                  relativeNormalization: false,
                  splitDragSelection: false
                },
                vertical: false,
                waveColor: "#999",
                xhr: {}
              });
              _defineProperty2(_assertThisInitialized(_this), "backends", {
                MediaElement: _mediaelement.default,
                WebAudio: _webaudio.default,
                MediaElementWebAudio: _mediaelementWebaudio.default
              });
              _defineProperty2(_assertThisInitialized(_this), "util", util);
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
                this.drawer.on("dblclick", function(e, progress) {
                  _this5.fireEvent("dblclick", e, progress);
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
              value: function setPlayEnd(position) {
                this.backend.setPlayEnd(position);
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
              value: function skip(offset) {
                var duration = this.getDuration() || 1;
                var position = this.getCurrentTime() || 0;
                position = Math.max(0, Math.min(duration, position + (offset || 0)));
                this.seekAndCenter(position / duration);
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
                if (this.isMuted === true) {
                  this.savedVolume = newVolume;
                  return;
                }
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
              value: function create(params) {
                var wavesurfer2 = new WaveSurfer3(params);
                return wavesurfer2.init();
              }
            }]);
            return WaveSurfer3;
          }(util.Observer);
          exports2["default"] = WaveSurfer2;
          _defineProperty2(WaveSurfer2, "VERSION", "6.6.4");
          _defineProperty2(WaveSurfer2, "util", util);
          module2.exports = exports2.default;
        },
        "./src/webaudio.js": (module2, exports2, __webpack_require__2) => {
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
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
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
              Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
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
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
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
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          function _defineProperty2(obj, key, value) {
            key = _toPropertyKey2(key);
            if (key in obj) {
              Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
            } else {
              obj[key] = value;
            }
            return obj;
          }
          function _toPropertyKey2(arg) {
            var key = _toPrimitive2(arg, "string");
            return _typeof(key) === "symbol" ? key : String(key);
          }
          function _toPrimitive2(input, hint) {
            if (_typeof(input) !== "object" || input === null)
              return input;
            var prim = input[Symbol.toPrimitive];
            if (prim !== void 0) {
              var res = prim.call(input, hint || "default");
              if (_typeof(res) !== "object")
                return res;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (hint === "string" ? String : Number)(input);
          }
          var PLAYING = "playing";
          var PAUSED = "paused";
          var FINISHED = "finished";
          var WebAudio = /* @__PURE__ */ function(_util$Observer) {
            _inherits(WebAudio2, _util$Observer);
            var _super = _createSuper(WebAudio2);
            function WebAudio2(params) {
              var _defineProperty22, _this$states;
              var _this;
              _classCallCheck(this, WebAudio2);
              _this = _super.call(this);
              _defineProperty2(_assertThisInitialized(_this), "audioContext", null);
              _defineProperty2(_assertThisInitialized(_this), "stateBehaviors", (_defineProperty22 = {}, _defineProperty2(_defineProperty22, PLAYING, {
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
              }), _defineProperty2(_defineProperty22, PAUSED, {
                init: function init() {
                },
                getPlayedPercents: function getPlayedPercents() {
                  var duration = this.getDuration();
                  return this.getCurrentTime() / duration || 0;
                },
                getCurrentTime: function getCurrentTime() {
                  return this.startPosition;
                }
              }), _defineProperty2(_defineProperty22, FINISHED, {
                init: function init() {
                  this.fireEvent("finish");
                },
                getPlayedPercents: function getPlayedPercents() {
                  return 1;
                },
                getCurrentTime: function getCurrentTime() {
                  return this.getDuration();
                }
              }), _defineProperty22));
              _this.params = params;
              _this.ac = params.audioContext || (_this.supportsWebAudio() ? _this.getAudioContext() : {});
              _this.lastPlay = _this.ac.currentTime;
              _this.startPosition = 0;
              _this.scheduledPause = null;
              _this.states = (_this$states = {}, _defineProperty2(_this$states, PLAYING, Object.create(_this.stateBehaviors[PLAYING])), _defineProperty2(_this$states, PAUSED, Object.create(_this.stateBehaviors[PAUSED])), _defineProperty2(_this$states, FINISHED, Object.create(_this.stateBehaviors[FINISHED])), _this$states);
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
                  this.scriptNode.connect(this.ac.destination);
                }
              }
            }, {
              key: "addOnAudioProcess",
              value: function addOnAudioProcess() {
                var _this2 = this;
                var loop = function loop2() {
                  var time = _this2.getCurrentTime();
                  if (time >= _this2.getDuration() && _this2.state !== _this2.states[FINISHED]) {
                    _this2.setState(FINISHED);
                    _this2.fireEvent("pause");
                  } else if (time >= _this2.scheduledPause && _this2.state !== _this2.states[PAUSED]) {
                    _this2.pause();
                  } else if (_this2.state === _this2.states[PLAYING]) {
                    _this2.fireEvent("audioprocess", time);
                    util.frame(loop2)();
                  }
                };
                loop();
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
                this.scriptNode && this.scriptNode.disconnect();
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
const waveformColors = {
  progressColor: "--rm-audio-player-waveform-bar",
  waveColor: "--rm-audio-player-waveform-background"
};
const useWaveSurfer = (waveformRef) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { elementRefs, curPlayId, curAudioState } = useNonNullableContext(
    audioPlayerStateContext
  );
  const colorsRef = useVariableColor(waveformColors);
  useEffect(() => {
    if ((elementRefs == null ? void 0 : elementRefs.waveformInst) || !colorsRef.current)
      return;
    const waveSurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 2,
      container: "#rm-waveform",
      height: 80,
      progressColor: `${colorsRef.current.progressColor}`,
      responsive: true,
      waveColor: `${colorsRef.current.waveColor}`,
      cursorColor: "var(--rm-audio-player-waveform-cursor)",
      backend: "MediaElement",
      removeMediaElementOnDestroy: false
    });
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: { waveformInst: waveSurfer }
    });
  }, [elementRefs == null ? void 0 : elementRefs.waveformInst, audioPlayerDispatch, colorsRef]);
  useEffect(() => {
    var _a;
    if (!(elementRefs == null ? void 0 : elementRefs.audioEl) || !(elementRefs == null ? void 0 : elementRefs.waveformInst))
      return;
    elementRefs.audioEl.pause();
    elementRefs.waveformInst.load(elementRefs == null ? void 0 : elementRefs.audioEl);
    if (curAudioState.volume) {
      elementRefs.audioEl.volume = curAudioState.volume;
    }
    if (curAudioState.isPlaying)
      (_a = elementRefs == null ? void 0 : elementRefs.audioEl) == null ? void 0 : _a.play();
  }, [curPlayId, elementRefs == null ? void 0 : elementRefs.audioEl, elementRefs == null ? void 0 : elementRefs.waveformInst]);
  useEffect(() => {
    if (!waveformRef.current || !(elementRefs == null ? void 0 : elementRefs.waveformInst))
      return;
    const redrawWaveform = () => {
      var _a;
      (_a = elementRefs.waveformInst) == null ? void 0 : _a.drawBuffer();
    };
    const resizeObserver = new ResizeObserver(redrawWaveform);
    resizeObserver.observe(waveformRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRefs == null ? void 0 : elementRefs.waveformInst, waveformRef]);
  useEffect(
    () => () => {
      var _a;
      const waveEl = document.getElementsByTagName("wave");
      if (waveEl.length) {
        waveEl[0].remove();
        audioPlayerDispatch({
          type: "SET_ELEMENT_REFS",
          elementRefs: { waveformInst: void 0 }
        });
        (_a = elementRefs == null ? void 0 : elementRefs.waveformInst) == null ? void 0 : _a.destroy();
      }
    },
    []
  );
};
const WaveformWrapper = styled.div`
  ${({
  isActive
}) => css`
    display: flex;
    width: 100%;
    #rm-waveform {
      width: 100%;
      wave {
        cursor: pointer !important;
      }

      ${!isActive && css`
        height: 0;
        opacity: 0;
        pointer-events: none;
      `}
    }
  `}
`;
const WaveformProgress = ({
  isActive
}) => {
  const waveformRef = useRef(null);
  const {
    elementRefs,
    curAudioState
  } = useNonNullableContext(audioPlayerStateContext);
  useWaveSurfer(waveformRef);
  useEffect(() => {
    if (!isActive || !(elementRefs == null ? void 0 : elementRefs.waveformInst) || !(elementRefs == null ? void 0 : elementRefs.audioEl) || !curAudioState.isLoadedMetaData || curAudioState.isPlaying)
      return;
    elementRefs.waveformInst.seekTo(elementRefs.audioEl.currentTime / elementRefs.audioEl.duration);
  }, [isActive, curAudioState.isLoadedMetaData]);
  const eventProps = useProgress();
  return /* @__PURE__ */ jsx(WaveformWrapper, {
    className: "waveform-wrapper",
    isActive,
    children: /* @__PURE__ */ jsx("div", {
      id: "rm-waveform",
      ref: waveformRef,
      ...eventProps
    })
  });
};
const ProgressContainer = styled.div`
  min-width: 100px;
`;
const Progress = () => {
  const {
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsxs(ProgressContainer, {
    className: "progress-container",
    children: [/* @__PURE__ */ jsx(WaveformProgress, {
      isActive: activeUI.progress === "waveform"
    }), /* @__PURE__ */ jsx(BarProgress, {
      isActive: activeUI.progress !== "waveform"
    })]
  });
};
const Grid2 = $994c48bfb00b620b$export$ef2184bd89960b14;
const GridItem = forwardRef(({
  children,
  visible = true,
  ...viewProps
}, ref) => {
  return /* @__PURE__ */ jsx($b9606c0c41d55371$export$27a5bd065ad55220, {
    justifySelf: "center",
    padding: visible ? "0 5px" : void 0,
    ref,
    ...viewProps,
    children: visible && children
  });
});
GridItem.displayName = "GridItem";
Grid2.Item = GridItem;
const VolumeSlider = ({
  placement
}) => {
  var _a;
  const contentRef = useRef(null);
  const {
    curAudioState,
    elementRefs
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
    volumeValue: (curAudioState.volume || ((_a = elementRefs == null ? void 0 : elementRefs.audioEl) == null ? void 0 : _a.volume) || 0) * 100,
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
    --rm-audio-player-volume-value: ${volumeValue}%;
    position: relative;
    height: 119px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${contentPlacement === "top" && css`
      bottom: auto;
    `}

    ${contentPlacement === "left" && css`
      transform: rotate(-90deg);
      right: 50px;
    `}

    ${contentPlacement === "right" && css`
      transform: rotate(90deg);
      left: 50px;
    `}

    ${contentPlacement === "bottom" && css`
      transform: rotateX(180deg);
      top: 5px;
    `}

    .volume-panel-wrapper {
      width: 30px;
      background-color: var(--rm-audio-player-volume-panel-background);
      border: 1px solid var(--rm-audio-player-volume-panel-border);
      border-radius: 5px;
      height: 118px;
      box-shadow: 0 2px 4px rgb(0 0 0 /10%);
      position: absolute;
      bottom: 5px;

      &:before {
        content: "";
        bottom: -10px;
        left: 7.9px;
        border-color: transparent transparent
          var(--rm-audio-player-volume-panel-border)
          var(--rm-audio-player-volume-panel-border);
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
          var(--rm-audio-player-volume-panel-background)
          var(--rm-audio-player-volume-panel-background);
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
        background-color: var(--rm-audio-player-volume-background);
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
        background: var(--rm-audio-player-volume-thumb);
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 12px;
        overflow: visible;
        background: var(--rm-audio-player-volume-thumb);
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
          var(--rm-audio-player-volume-fill) var(--rm-audio-player-volume-value),
          var(--rm-audio-player-volume-track)
            var(--rm-audio-player-volume-value)
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
          var(--rm-audio-player-volume-fill) var(--rm-audio-player-volume-value),
          var(--rm-audio-player-volume-track)
            var(--rm-audio-player-volume-value)
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
  const timer = useRef(0);
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
  disabled = false,
  onOpenChange
}) => {
  const dropdownRef = useRef(null);
  const [trigger, content] = $670gB$react.Children.toArray(children);
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
  return /* @__PURE__ */ jsx(dropdownContext.Provider, {
    value: {
      dropdownRef,
      placement,
      isOpen,
      setIsOpen,
      onOpenChange
    },
    children: /* @__PURE__ */ jsx(DropdownContainer, {
      className: "dropdown-container",
      ref: dropdownRef,
      ...dropdownEventProps,
      children: /* @__PURE__ */ jsxs(Fragment, {
        children: [trigger, !disabled && content]
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
  }, [dropdownRef]);
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
  }) : isOpen ? Content : null;
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
const useVolumeSliderPlacement = ({
  triggerRef,
  initialState
}) => {
  const { playerPlacement } = useNonNullableContext(audioPlayerStateContext);
  const [volumeSliderPlacement, setVolumeSliderPlacement] = useState(initialState);
  useEffect(() => {
    if (triggerRef.current) {
      const placementValidation = () => {
        if (triggerRef.current.getBoundingClientRect().top < window.innerHeight / 2) {
          return "bottom";
        }
        return "top";
      };
      const volumeSliderPlacementTimeout = setTimeout(() => {
        setVolumeSliderPlacement(placementValidation());
      }, 0);
      return () => {
        clearTimeout(volumeSliderPlacementTimeout);
      };
    }
  }, [playerPlacement, triggerRef]);
  return volumeSliderPlacement;
};
const Volume = () => {
  const triggerRef = useRef(null);
  const {
    activeUI: {
      volumeSlider: volumeSliderEl
    },
    volumeSliderPlacement: contextVolumePlacement
  } = useNonNullableContext(audioPlayerStateContext);
  const volumeSliderPlacement = useVolumeSliderPlacement({
    triggerRef,
    initialState: "bottom"
  });
  return /* @__PURE__ */ jsxs(Dropdown, {
    placement: contextVolumePlacement || volumeSliderPlacement,
    triggerType: "hover",
    disabled: !(volumeSliderEl != null ? volumeSliderEl : true),
    children: [/* @__PURE__ */ jsx(Dropdown.Trigger, {
      children: /* @__PURE__ */ jsx(VolumeTriggerBtn, {
        ref: triggerRef
      })
    }), /* @__PURE__ */ jsx(Dropdown.Content, {
      children: /* @__PURE__ */ jsx(VolumeSlider, {
        placement: contextVolumePlacement || volumeSliderPlacement
      })
    })]
  });
};
const Controller = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const {
    interfacePlacement,
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_a = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _a.progress) || ((_b = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _b.progress) || defaultInterfacePlacement.templateArea.progress,
      width: "100%",
      visible: Boolean(activeUI.progress !== void 0 ? activeUI.progress : activeUI.all),
      children: /* @__PURE__ */ jsx(Progress, {})
    }), /* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_c = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _c.repeatType) || ((_d = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _d.repeatType) || defaultInterfacePlacement.templateArea.repeatType,
      visible: Boolean((_e = activeUI.repeatType) != null ? _e : activeUI.all),
      children: /* @__PURE__ */ jsx(RepeatTypeBtn, {})
    }), /* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_f = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _f.playButton) || ((_g = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _g.playButton) || defaultInterfacePlacement.templateArea.playButton,
      visible: Boolean((_h = activeUI.playButton) != null ? _h : activeUI.all),
      children: /* @__PURE__ */ jsxs($884c64d19340d345$export$f51f4c4ede09e011, {
        UNSAFE_className: "btn-wrapper",
        alignItems: "center",
        gap: "10px",
        children: [/* @__PURE__ */ jsx(PrevNnextBtn, {
          type: "prev",
          visible: Boolean((_i = activeUI.prevNnext) != null ? _i : activeUI.all)
        }), /* @__PURE__ */ jsx(PlayBtn, {}), /* @__PURE__ */ jsx(PrevNnextBtn, {
          type: "next",
          visible: Boolean((_j = activeUI.prevNnext) != null ? _j : activeUI.all)
        })]
      })
    }), /* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_k = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _k.volume) || ((_l = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _l.volume) || defaultInterfacePlacement.templateArea.volume,
      visible: Boolean((_m = activeUI.volume) != null ? _m : activeUI.all),
      children: /* @__PURE__ */ jsx(Volume, {})
    }), /* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_n = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _n.playList) || ((_o = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _o.playList) || defaultInterfacePlacement.templateArea.playList,
      visible: Boolean((_p = activeUI.playList) != null ? _p : activeUI.all),
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
  var _a;
  const {
    playList,
    curIdx,
    coverImgsCss
  } = useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsx(ArtworkContainer, {
    className: "artwork-container",
    children: /* @__PURE__ */ jsx("img", {
      src: (_a = playList[curIdx]) == null ? void 0 : _a.img,
      alt: "",
      style: coverImgsCss == null ? void 0 : coverImgsCss.artwork
    })
  });
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
    font-size: 16px;
  }
  .writer {
    font-size: 12px;
  }
`;
const TrackInfo = () => {
  const {
    playList,
    curIdx
  } = useNonNullableContext(audioPlayerStateContext);
  const curPlayData = playList[curIdx];
  return /* @__PURE__ */ jsx(TrackInfoContainer, {
    className: "track-info-container",
    children: (curPlayData == null ? void 0 : curPlayData.customTrackInfo) ? curPlayData.customTrackInfo : /* @__PURE__ */ jsxs(Fragment, {
      children: [(curPlayData == null ? void 0 : curPlayData.name) && /* @__PURE__ */ jsx("span", {
        className: "title",
        children: curPlayData.name
      }), (curPlayData == null ? void 0 : curPlayData.writer) && /* @__PURE__ */ jsx("span", {
        className: "writer",
        children: curPlayData.writer
      })]
    })
  });
};
const TrackTimeContainer = styled.div`
  ${({ position, childrenClassName }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 16px;
    font-family: monospace !important;
    font-size: 16px !important;

    .${childrenClassName} {
      margin-right: ${position === "left" && "-10px"};
    }

    ${position === "right" && css`
      .${childrenClassName}:before {
        content: "/";
        margin: 0 0.3rem;
      }
    `}
  `}
`;
const Current = ({
  position
}) => {
  var _a;
  const trackCurTimeRef = useRef(null);
  const {
    elementRefs
  } = useNonNullableContext(audioPlayerStateContext);
  useRefsDispatch({
    refs: {
      trackCurTimeEl: trackCurTimeRef
    }
  }, []);
  return /* @__PURE__ */ jsx(TrackTimeCurrentContainer, {
    position,
    className: "track-time-current-container",
    childrenClassName: "track-current-time",
    children: /* @__PURE__ */ jsx("span", {
      ref: trackCurTimeRef,
      className: "track-current-time",
      children: ((_a = elementRefs == null ? void 0 : elementRefs.audioEl) == null ? void 0 : _a.currentTime) ? getTimeWithPadStart(elementRefs.audioEl.currentTime) : "00:00"
    })
  });
};
const TrackTimeCurrentContainer = styled(TrackTimeContainer)`
  .track-current-time {
    font-weight: 700;
    letter-spacing: -0.1rem;
    color: var(--rm-audio-player-track-current-time);
  }
`;
const Duration = ({
  position
}) => {
  var _a;
  const trackDurationRef = useRef(null);
  const {
    elementRefs
  } = useNonNullableContext(audioPlayerStateContext);
  useRefsDispatch({
    refs: {
      trackDurationEl: trackDurationRef
    }
  }, []);
  return /* @__PURE__ */ jsx(TrackTimeDurationContainer, {
    position,
    className: "track-time-duration-container",
    childrenClassName: "track-duration",
    children: /* @__PURE__ */ jsx("span", {
      ref: trackDurationRef,
      className: "track-duration",
      children: ((_a = elementRefs == null ? void 0 : elementRefs.audioEl) == null ? void 0 : _a.duration) ? getTimeWithPadStart(elementRefs.audioEl.duration) : "00:00"
    })
  });
};
const TrackTimeDurationContainer = styled(TrackTimeContainer)`
  .track-duration {
    display: flex;
    color: var(--rm-audio-player-track-duration);
    letter-spacing: -0.1rem;
  }
`;
const TrackTime = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const {
    interfacePlacement,
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const parsePosition = useCallback((str) => +str.split(/[^\d]/).join(""), []);
  const currentTimePosition = parsePosition(((_a = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _a.trackTimeCurrent) || ((_b = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _b.trackTimeCurrent) || defaultInterfacePlacement.templateArea.trackTimeCurrent);
  const durationTimePosition = parsePosition(((_c = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _c.trackTimeDuration) || ((_d = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _d.trackTimeDuration) || defaultInterfacePlacement.templateArea.trackTimeDuration);
  const getPosition = useCallback((positionNumber) => {
    switch (positionNumber) {
      case 1:
        return "right";
      case -1:
        return "left";
      default:
        return "separation";
    }
  }, []);
  const positions = {
    current: getPosition(currentTimePosition - durationTimePosition),
    duration: getPosition(durationTimePosition - currentTimePosition)
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_e = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _e.trackTimeCurrent) || ((_f = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _f.trackTimeCurrent) || defaultInterfacePlacement.templateArea.trackTimeCurrent,
      visible: Boolean((_g = activeUI.trackTime) != null ? _g : activeUI.all),
      children: /* @__PURE__ */ jsx(Current, {
        position: positions.current
      })
    }), /* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_h = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _h.trackTimeDuration) || ((_i = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _i.trackTimeDuration) || defaultInterfacePlacement.templateArea.trackTimeDuration,
      visible: Boolean((_j = activeUI.trackTime) != null ? _j : activeUI.all),
      children: /* @__PURE__ */ jsx(Duration, {
        position: positions.duration
      })
    })]
  });
};
const Information = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const {
    interfacePlacement,
    playList,
    curIdx,
    activeUI
  } = useNonNullableContext(audioPlayerStateContext);
  const isTrackInfoActive = Boolean((_e = (_c = (_a = playList[curIdx]) == null ? void 0 : _a.customTrackInfo) != null ? _c : (_b = playList[curIdx]) == null ? void 0 : _b.writer) != null ? _e : (_d = playList[curIdx]) == null ? void 0 : _d.name) && Boolean((_f = activeUI.trackInfo) != null ? _f : activeUI.all);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_g = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _g.artwork) || ((_h = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _h.artwork) || defaultInterfacePlacement.templateArea.artwork,
      visible: Boolean(((_i = playList[curIdx]) == null ? void 0 : _i.img) && ((_j = activeUI.artwork) != null ? _j : activeUI.all)),
      children: /* @__PURE__ */ jsx(Artwork, {})
    }), /* @__PURE__ */ jsx(Grid2.Item, {
      gridArea: ((_k = interfacePlacement == null ? void 0 : interfacePlacement.itemCustomArea) == null ? void 0 : _k.trackInfo) || ((_l = interfacePlacement == null ? void 0 : interfacePlacement.templateArea) == null ? void 0 : _l.trackInfo) || defaultInterfacePlacement.templateArea.trackInfo,
      visible: isTrackInfoActive,
      children: /* @__PURE__ */ jsx(TrackInfo, {})
    }), /* @__PURE__ */ jsx(TrackTime, {})]
  });
};
const useGridTemplate = (activeUI, templateArea, customComponentsArea) => {
  const generateGridTemplateValues = useCallback(
    (activeUi, templatePlacement, customComponentsPlacement) => {
      const activeUIAllKeys = Object.keys(
        defaultInterfacePlacement.templateArea
      ).filter((key) => {
        if ((key === "trackTimeCurrent" || key === "trackTimeDuration") && activeUi.trackTime === false) {
          return false;
        }
        if (activeUi[key] !== void 0) {
          return activeUi[key];
        }
        return true;
      });
      const activeUIKeysArr = activeUi.all ? activeUIAllKeys : Object.entries(activeUi).filter(([, value]) => value).map(([key]) => key);
      const renameTrackTime = () => {
        if (activeUIKeysArr.find((key) => key === "trackTime")) {
          activeUIKeysArr.splice(activeUIKeysArr.indexOf("trackTime"), 1);
          activeUIKeysArr.push("trackTimeCurrent");
          activeUIKeysArr.push("trackTimeDuration");
        }
      };
      renameTrackTime();
      const totalTemplatePlacement = {
        ...defaultInterfacePlacement.templateArea,
        ...templatePlacement
      };
      const activeTemplatePlacementArr = Object.entries(
        totalTemplatePlacement
      ).filter(([key]) => activeUIKeysArr.includes(key));
      let maxRow = 1;
      const colsCntRecord = {};
      const totalPlacementArr = [
        ...activeTemplatePlacementArr,
        ...Object.entries(customComponentsPlacement || {})
      ].map(([key, value]) => {
        const [rowWithText, colStrNum] = value.split("-");
        const row = +rowWithText.split("row")[1];
        maxRow = Math.max(maxRow, row);
        colsCntRecord[row] = colsCntRecord[row] ? colsCntRecord[row] + 1 : 1;
        return {
          key,
          row,
          col: +colStrNum
        };
      }).sort((a, b) => a.col - b.col);
      const maxCol = Math.max(...Object.values(colsCntRecord));
      let progressColIdx;
      const gridAreas2 = new Array(maxRow).fill("").map((_, rowIdx) => {
        var _a;
        let cols = "";
        let isWithProgress = false;
        const curRowPlacementArr = totalPlacementArr.filter(({ key, row }) => {
          if (row === rowIdx + 1) {
            if (key === "progress") {
              isWithProgress = true;
            }
            return true;
          }
          return false;
        });
        if (isWithProgress) {
          const progressCnt = maxCol - (curRowPlacementArr.length - 1);
          for (let i = 0; i < maxCol - (progressCnt - 1); i++) {
            if (((_a = curRowPlacementArr[i]) == null ? void 0 : _a.key) === "progress") {
              cols += ` row${rowIdx + 1}-${curRowPlacementArr[i].col} `.repeat(
                progressCnt
              );
              progressColIdx = Math.ceil(progressCnt / 2) + i - 1;
            } else {
              cols += ` row${rowIdx + 1}-${curRowPlacementArr[i] ? curRowPlacementArr[i].col : i + 1}`;
            }
          }
        } else {
          for (let i = 0; i < maxCol; i++) {
            cols += ` row${rowIdx + 1}-${curRowPlacementArr[i] ? curRowPlacementArr[i].col : i + 1}`;
          }
        }
        return cols.trimStart();
      });
      const maxWidth = window ? window.innerWidth - 100 : 1500;
      const gridColumns2 = new Array(maxRow).fill("").map((_, rowIdx) => {
        let cols = "";
        for (let i = 0; i < maxCol; i++) {
          if (progressColIdx === i && rowIdx === 0) {
            cols += ` 1fr`;
            continue;
          }
          cols += ` fit-content(${maxWidth}px)`;
        }
        return cols.trimStart();
      });
      return { gridAreas: gridAreas2, gridColumns: gridColumns2 };
    },
    []
  );
  const [curActiveUI, setCurActiveUI] = useState(activeUI);
  const [curPlacementArea, setCurPlacementArea] = useState({
    templateArea,
    customComponentsArea
  });
  const [curPlacementAreaValues, setCurPlacementAreaValues] = useState();
  if (!curPlacementAreaValues) {
    const { gridAreas: gridAreas2, gridColumns: gridColumns2 } = generateGridTemplateValues(
      curActiveUI,
      curPlacementArea.templateArea,
      curPlacementArea.customComponentsArea
    );
    setCurPlacementAreaValues({ gridAreas: gridAreas2, gridColumns: gridColumns2 });
    return [gridAreas2, gridColumns2];
  }
  if (curActiveUI !== activeUI || curPlacementArea.templateArea !== templateArea || curPlacementArea.customComponentsArea !== customComponentsArea) {
    setCurActiveUI(activeUI);
    setCurPlacementArea({ templateArea, customComponentsArea });
    const { gridAreas: gridAreas2, gridColumns: gridColumns2 } = generateGridTemplateValues(
      activeUI,
      templateArea,
      customComponentsArea
    );
    setCurPlacementAreaValues({ gridAreas: gridAreas2, gridColumns: gridColumns2 });
  }
  const { gridAreas, gridColumns } = curPlacementAreaValues;
  return [gridAreas, gridColumns];
};
const Interface = ({
  children
}) => {
  const {
    interfacePlacement,
    activeUI,
    playListPlacement
  } = useNonNullableContext(audioPlayerStateContext);
  const CustomComponents = $670gB$react.Children.toArray(children);
  const [gridAreas, gridColumns] = useGridTemplate(activeUI, interfacePlacement == null ? void 0 : interfacePlacement.templateArea, interfacePlacement == null ? void 0 : interfacePlacement.customComponentsArea);
  return /* @__PURE__ */ jsxs(InterfaceContainer, {
    className: "interface-container",
    children: [playListPlacement === "top" && /* @__PURE__ */ jsx("div", {
      className: "sortable-play-list"
    }), /* @__PURE__ */ jsxs(Grid2, {
      alignItems: "center",
      justifyContent: "center",
      areas: gridAreas,
      minHeight: "30px",
      columns: gridColumns,
      UNSAFE_className: "interface-grid",
      children: [/* @__PURE__ */ jsx(Information, {}), /* @__PURE__ */ jsx(Controller, {}), CustomComponents]
    }), playListPlacement === "bottom" && /* @__PURE__ */ jsx("div", {
      className: "sortable-play-list"
    })]
  });
};
const InterfaceContainer = styled.div`
  .interface-grid {
    background: var(--rm-audio-player-interface-container);
  }
  .interface-grid {
    padding: 0.5rem 10px;
  }
  .sortable-play-list {
    background: var(--rm-audio-player-sortable-list);
    box-shadow: -5px 2px 4px 0px rgb(0 0 0 / 4%) inset;
  }
`;
const usePropsStateEffect = ({
  placement = {},
  activeUI,
  coverImgsCss,
  audioInitialState,
  playList,
  customIcons
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useLayoutEffect(() => {
    if (!isMounted)
      return;
    const {
      player: playerPlacement,
      playList: playListPlacement,
      interface: interfacePlacement,
      volumeSlider: volumeSliderPlacement
    } = placement;
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      playListPlacement,
      interfacePlacement,
      volumeSliderPlacement
    });
  }, [audioPlayerDispatch, placement]);
  useLayoutEffect(() => {
    if (!isMounted || !activeUI)
      return;
    audioPlayerDispatch({ type: "SET_ACTIVE_UI", activeUI });
  }, [activeUI, audioPlayerDispatch]);
  useLayoutEffect(() => {
    if (!isMounted || !coverImgsCss)
      return;
    audioPlayerDispatch({ type: "SET_COVER_IMGS_CSS", coverImgsCss });
  }, [audioPlayerDispatch, coverImgsCss]);
  useEffect(() => {
    if (!isMounted || !audioInitialState)
      return;
    audioPlayerDispatch({
      type: "SET_INITIAL_STATES",
      audioState: audioInitialState,
      curPlayId: audioInitialState.curPlayId
    });
  }, [audioInitialState, audioPlayerDispatch]);
  useEffect(() => {
    if (!isMounted)
      return;
    audioPlayerDispatch({ type: "UPDATE_PLAY_LIST", playList });
  }, [audioPlayerDispatch, playList]);
  useEffect(() => {
    if (!isMounted || !customIcons)
      return;
    audioPlayerDispatch({ type: "SET_CUSTOM_ICONS", customIcons });
  }, [customIcons, audioPlayerDispatch]);
  useEffect(() => {
    setIsMounted(true);
  }, []);
};
const AudioPlayer = ({
  audioRef,
  children,
  ...restProps
}) => {
  usePropsStateEffect(restProps);
  return /* @__PURE__ */ jsxs($b9606c0c41d55371$export$27a5bd065ad55220, {
    id: "rm-audio-player",
    UNSAFE_className: "rm-audio-player-container",
    children: [/* @__PURE__ */ jsx(Audio, {
      audioRef
    }), /* @__PURE__ */ jsx(Interface, {
      children
    })]
  });
};
const AudioPlayerWithProviders = ({
  rootContainerProps,
  ...audioPlayProps
}) => {
  return /* @__PURE__ */ jsx(AudioPlayerProvider, {
    ...audioPlayProps,
    children: /* @__PURE__ */ jsxs(SpectrumProvider, {
      rootContainerProps,
      children: [/* @__PURE__ */ jsx(AudioPlayer, {
        ...audioPlayProps
      }), /* @__PURE__ */ jsx(GlobalStyle, {})]
    })
  });
};
const CustomComponent = ({
  children,
  id,
  ...gridItemProps
}) => {
  var _a;
  const audioPlayerState = useNonNullableContext(audioPlayerStateContext);
  const placement = audioPlayerState.interfacePlacement;
  const gridArea = (_a = placement == null ? void 0 : placement.customComponentsArea) == null ? void 0 : _a[id];
  return /* @__PURE__ */ jsx(Grid2.Item, {
    UNSAFE_className: "custom_component",
    gridArea,
    ...gridItemProps,
    children: $670gB$react.cloneElement(children, {
      audioPlayerState
    })
  });
};
AudioPlayerWithProviders.CustomComponent = CustomComponent;
export { AudioPlayer, SpectrumProvider, audioPlayerDispatchContext, audioPlayerReducer, audioPlayerStateContext, AudioPlayerWithProviders as default, defaultInterfacePlacement, defaultInterfacePlacementMaxLength };
