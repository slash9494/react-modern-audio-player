var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import require$$0, {
  useContext,
  createContext,
  useReducer,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
const useNonNullableContext = (context) => {
  const state = useContext(context);
  if (!state) throw new Error(`Cannot find ${context}Provider`);
  return state;
};
const audioPlayerDispatchContext = createContext(null);
const audioPlayerStateContext = createContext(null);
const audioPlayerReducer = (state, action) => {
  var _a;
  switch (action.type) {
    case "UPDATE_PLAY_LIST":
      return __spreadProps(__spreadValues({}, state), {
        playList: action.playList,
      });
    case "SET_INITIAL_AUDIO_STATE":
      return __spreadProps(__spreadValues({}, state), {
        curAudioState: __spreadValues(
          __spreadValues({}, state.curAudioState),
          action.audioInitialState
        ),
      });
    case "SET_PlAY_STATE":
      return __spreadProps(__spreadValues({}, state), {
        curAudioState: __spreadProps(__spreadValues({}, state.curAudioState), {
          isPlaying: !((_a = state.curAudioState) == null
            ? void 0
            : _a.isPlaying),
        }),
      });
    default:
      throw new Error("Unhandled action");
  }
};
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
var f = require$$0,
  k = Symbol.for("react.element"),
  l = Symbol.for("react.fragment"),
  m = Object.prototype.hasOwnProperty,
  n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b,
    d = {},
    e = null,
    h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in ((a = c.defaultProps), a)) d[b] === void 0 && (d[b] = a[b]);
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
const AudioPlayerProvider = ({ children }) => {
  const [audioContextState, dispatchAudioContextState] = useReducer(
    audioPlayerReducer,
    {
      playList: [],
      curAudioState: {
        isPlaying: false,
        repeatType: "ALL",
        muted: false,
      },
    }
  );
  return /* @__PURE__ */ jsx(audioPlayerStateContext.Provider, {
    value: audioContextState,
    children: /* @__PURE__ */ jsx(audioPlayerDispatchContext.Provider, {
      value: dispatchAudioContextState,
      children,
    }),
  });
};
const Control = ({}) => {
  return /* @__PURE__ */ jsx("div", {});
};
const SortableListItem = ({
  index: index2,
  draggable,
  children,
  onDragStartCb,
  onDropCb,
  onClickCb,
}) => {
  const itemRef = useRef(null);
  const onDragStart = () => {
    var _a;
    (_a = itemRef.current) == null ? void 0 : _a.classList.add("dragstart");
    onDragStartCb && onDragStartCb(index2);
  };
  const onDragEnd = () => {
    var _a;
    return (_a = itemRef.current) == null
      ? void 0
      : _a.classList.remove("dragstart");
  };
  const onDragEnter = () => {
    var _a;
    return (_a = itemRef.current) == null
      ? void 0
      : _a.classList.add("dragover");
  };
  const onDragLeave = () => {
    var _a;
    return (_a = itemRef.current) == null
      ? void 0
      : _a.classList.remove("dragover");
  };
  const onDrop = () => {
    var _a;
    (_a = itemRef.current) == null ? void 0 : _a.classList.remove("dragover");
    onDropCb && onDropCb(index2);
  };
  return /* @__PURE__ */ jsx("li", {
    ref: itemRef,
    className: "list-item",
    draggable: !!draggable,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver: (e) => e.preventDefault(),
    onDrop,
    children,
  });
};
var index = "";
const SortableList = ({
  data: initialData,
  onDropCb,
  onClickCb,
  renderItem,
}) => {
  const [startIdx, setStartIdx] = useState(0);
  const [listData, setListData] = useState(initialData);
  const onDragStart = (index2) => setStartIdx(index2);
  const onDrop = useCallback(
    (dropIdx) => {
      const curListData = [...listData];
      const draggedItem = listData[startIdx];
      curListData.splice(startIdx, 1);
      const newListData =
        startIdx < dropIdx
          ? [
              ...curListData.slice(0, dropIdx - 1),
              draggedItem,
              ...curListData.slice(dropIdx - 1, curListData.length),
            ]
          : [
              ...curListData.slice(0, dropIdx),
              draggedItem,
              ...curListData.slice(dropIdx, curListData.length),
            ];
      setListData(newListData);
      onDropCb(newListData);
    },
    [listData, onDropCb, startIdx]
  );
  return /* @__PURE__ */ jsxs("ul", {
    className: "sortable-list",
    children: [
      listData.map((item, index2) =>
        /* @__PURE__ */ jsx(
          SortableListItem,
          {
            index: index2,
            draggable: true,
            onDragStartCb: onDragStart,
            onDropCb: onDrop,
            onClickCb,
            children: renderItem(item, index2),
          },
          `item-initial-idx-${index2}`
        )
      ),
      /* @__PURE__ */ jsx(SortableListItem, {
        index: listData.length,
        draggable: false,
        onDropCb: onDrop,
      }),
    ],
  });
};
const List = ({}) => {
  const dummyData = [
    {
      id: 1,
      name: "A",
    },
    {
      id: 2,
      name: "B",
    },
    {
      id: 3,
      name: "C",
    },
    {
      id: 4,
      name: "D",
    },
  ];
  useNonNullableContext(audioPlayerStateContext);
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(SortableList, {
      data: dummyData,
      renderItem: (dummyData2, index2) =>
        /* @__PURE__ */ jsx(
          "div",
          {
            children: dummyData2.name,
          },
          index2
        ),
      onDropCb: (newData) => console.log(newData),
    }),
  });
};
const Player = () => {
  const { curAudioState } = useNonNullableContext(audioPlayerStateContext);
  const audioNativeStateArr = Object.entries(curAudioState).filter((state) => {
    if (state[0] === "muted" || state[0] === "volume") {
      return true;
    }
    return false;
  });
  const audioNativeState = Object.fromEntries(audioNativeStateArr);
  return /* @__PURE__ */ jsx("audio", __spreadValues({}, audioNativeState));
};
const AudioPlayerContainer = styled.div`
  border: 1px solid red;
  background-color: blue;
`;
const AudioPlayer = ({ playList, audioInitialState }) => {
  const audioInitialStateRef = useRef(audioInitialState);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useLayoutEffect(() => {
    audioPlayerDispatch({
      type: "UPDATE_PLAY_LIST",
      playList,
    });
  }, [audioPlayerDispatch, playList]);
  useLayoutEffect(() => {
    audioPlayerDispatch({
      type: "SET_INITIAL_AUDIO_STATE",
      audioInitialState: audioInitialStateRef.current,
    });
  }, [audioPlayerDispatch]);
  return /* @__PURE__ */ jsxs(AudioPlayerContainer, {
    children: [
      /* @__PURE__ */ jsx(List, {}),
      /* @__PURE__ */ jsx(Player, {}),
      /* @__PURE__ */ jsx(Control, {}),
    ],
  });
};
const AudioPlayerWithProvider = (props) =>
  /* @__PURE__ */ jsx(AudioPlayerProvider, {
    children: /* @__PURE__ */ jsx(AudioPlayer, __spreadValues({}, props)),
  });
export { AudioPlayerWithProvider, AudioPlayerWithProvider as default };
