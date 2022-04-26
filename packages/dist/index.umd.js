var Q = Object.defineProperty,
  V = Object.defineProperties;
var X = Object.getOwnPropertyDescriptors;
var I = Object.getOwnPropertySymbols;
var Z = Object.prototype.hasOwnProperty,
  q = Object.prototype.propertyIsEnumerable;
var O = (a, r, l) =>
    r in a
      ? Q(a, r, { enumerable: !0, configurable: !0, writable: !0, value: l })
      : (a[r] = l),
  m = (a, r) => {
    for (var l in r || (r = {})) Z.call(r, l) && O(a, l, r[l]);
    if (I) for (var l of I(r)) q.call(r, l) && O(a, l, r[l]);
    return a;
  },
  p = (a, r) => V(a, X(r));
(function (a, r) {
  typeof exports == "object" && typeof module != "undefined"
    ? r(exports, require("react"), require("styled-components"))
    : typeof define == "function" && define.amd
    ? define(["exports", "react", "styled-components"], r)
    : ((a = typeof globalThis != "undefined" ? globalThis : a || self),
      r((a["react-simple-audio-player"] = {}), a.React, a.styled));
})(this, function (a, r, l) {
  "use strict";
  function P(e) {
    return e && typeof e == "object" && "default" in e ? e : { default: e };
  }
  var R = P(r),
    j = P(l);
  const S = (e) => {
      const t = r.useContext(e);
      if (!t) throw new Error(`Cannot find ${e}Provider`);
      return t;
    },
    L = r.createContext(null),
    _ = r.createContext(null),
    N = (e, t) => {
      var s;
      switch (t.type) {
        case "UPDATE_PLAY_LIST":
          return p(m({}, e), { playList: t.playList });
        case "SET_INITIAL_AUDIO_STATE":
          return p(m({}, e), {
            curAudioState: m(m({}, e.curAudioState), t.audioInitialState),
          });
        case "SET_PlAY_STATE":
          return p(m({}, e), {
            curAudioState: p(m({}, e.curAudioState), {
              isPlaying: !((s = e.curAudioState) != null && s.isPlaying),
            }),
          });
        default:
          throw new Error("Unhandled action");
      }
    };
  var g = { exports: {} },
    v = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var w = R.default,
    k = Symbol.for("react.element"),
    M = Symbol.for("react.fragment"),
    U = Object.prototype.hasOwnProperty,
    Y = w.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    W = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(e, t, s) {
    var n,
      u = {},
      y = null,
      c = null;
    s !== void 0 && (y = "" + s),
      t.key !== void 0 && (y = "" + t.key),
      t.ref !== void 0 && (c = t.ref);
    for (n in t) U.call(t, n) && !W.hasOwnProperty(n) && (u[n] = t[n]);
    if (e && e.defaultProps)
      for (n in ((t = e.defaultProps), t)) u[n] === void 0 && (u[n] = t[n]);
    return {
      $$typeof: k,
      type: e,
      key: y,
      ref: c,
      props: u,
      _owner: Y.current,
    };
  }
  (v.Fragment = M), (v.jsx = h), (v.jsxs = h), (g.exports = v);
  const i = g.exports.jsx,
    A = g.exports.jsxs,
    B = ({ children: e }) => {
      const [t, s] = r.useReducer(N, {
        playList: [],
        curAudioState: { isPlaying: !1, repeatType: "ALL", muted: !1 },
      });
      return i(_.Provider, {
        value: t,
        children: i(L.Provider, { value: s, children: e }),
      });
    },
    F = ({}) => i("div", {}),
    E = ({
      index: e,
      draggable: t,
      children: s,
      onDragStartCb: n,
      onDropCb: u,
      onClickCb: y,
    }) => {
      const c = r.useRef(null);
      return i("li", {
        ref: c,
        className: "list-item",
        draggable: !!t,
        onDragStart: () => {
          var o;
          (o = c.current) == null || o.classList.add("dragstart"), n && n(e);
        },
        onDragEnd: () => {
          var o;
          return (o = c.current) == null
            ? void 0
            : o.classList.remove("dragstart");
        },
        onDragEnter: () => {
          var o;
          return (o = c.current) == null ? void 0 : o.classList.add("dragover");
        },
        onDragLeave: () => {
          var o;
          return (o = c.current) == null
            ? void 0
            : o.classList.remove("dragover");
        },
        onDragOver: (o) => o.preventDefault(),
        onDrop: () => {
          var o;
          (o = c.current) == null || o.classList.remove("dragover"), u && u(e);
        },
        children: s,
      });
    };
  var $ = "";
  const J = ({ data: e, onDropCb: t, onClickCb: s, renderItem: n }) => {
      const [u, y] = r.useState(0),
        [c, b] = r.useState(e),
        x = (f) => y(f),
        D = r.useCallback(
          (f) => {
            const d = [...c],
              o = c[u];
            d.splice(u, 1);
            const C =
              u < f
                ? [...d.slice(0, f - 1), o, ...d.slice(f - 1, d.length)]
                : [...d.slice(0, f), o, ...d.slice(f, d.length)];
            b(C), t(C);
          },
          [c, t, u]
        );
      return A("ul", {
        className: "sortable-list",
        children: [
          c.map((f, d) =>
            i(
              E,
              {
                index: d,
                draggable: !0,
                onDragStartCb: x,
                onDropCb: D,
                onClickCb: s,
                children: n(f, d),
              },
              `item-initial-idx-${d}`
            )
          ),
          i(E, { index: c.length, draggable: !1, onDropCb: D }),
        ],
      });
    },
    z = ({}) => {
      const e = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
        { id: 4, name: "D" },
      ];
      return (
        S(_),
        i("div", {
          children: i(J, {
            data: e,
            renderItem: (t, s) => i("div", { children: t.name }, s),
            onDropCb: (t) => console.log(t),
          }),
        })
      );
    },
    G = () => {
      const { curAudioState: e } = S(_),
        t = Object.entries(e).filter(
          (n) => n[0] === "muted" || n[0] === "volume"
        ),
        s = Object.fromEntries(t);
      return i("audio", m({}, s));
    },
    H = j.default.div`
  border: 1px solid red;
  background-color: blue;
`,
    K = ({ playList: e, audioInitialState: t }) => {
      const s = r.useRef(t),
        n = S(L);
      return (
        r.useLayoutEffect(() => {
          n({ type: "UPDATE_PLAY_LIST", playList: e });
        }, [n, e]),
        r.useLayoutEffect(() => {
          n({ type: "SET_INITIAL_AUDIO_STATE", audioInitialState: s.current });
        }, [n]),
        A(H, { children: [i(z, {}), i(G, {}), i(F, {})] })
      );
    },
    T = (e) => i(B, { children: i(K, m({}, e)) });
  (a.AudioPlayerWithProvider = T),
    (a.default = T),
    Object.defineProperties(a, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: "Module" },
    });
});
