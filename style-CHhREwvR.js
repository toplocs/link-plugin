import { importShared, __tla as __tla_0 } from "./__federation_fn_import-dmqIiFee.js";
let nt, tt;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  (function polyfill() {
    const relList = document.createElement("link").relList;
    if (relList && relList.supports && relList.supports("modulepreload")) {
      return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
      processPreload(link);
    }
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== "childList") {
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
        }
      }
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function getFetchOpts(link) {
      const fetchOpts = {};
      if (link.integrity) fetchOpts.integrity = link.integrity;
      if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
      if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
      else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
      else fetchOpts.credentials = "same-origin";
      return fetchOpts;
    }
    function processPreload(link) {
      if (link.ep) return;
      link.ep = true;
      const fetchOpts = getFetchOpts(link);
      fetch(link.href, fetchOpts);
    }
  })();
  const scriptRel = "modulepreload";
  const assetsURL = function(dep, importerUrl) {
    return new URL(dep, importerUrl).href;
  };
  const seen = {};
  const __vitePreload = function preload(baseModule, deps, importerUrl) {
    let promise = Promise.resolve();
    if (deps && deps.length > 0) {
      const links = document.getElementsByTagName("link");
      const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
      const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
      promise = Promise.allSettled(deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i2 = links.length - 1; i2 >= 0; i2--) {
            const link2 = links[i2];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
          });
        }
      }));
    }
    function handlePreloadError(err) {
      const e2 = new Event("vite:preloadError", {
        cancelable: true
      });
      e2.payload = err;
      window.dispatchEvent(e2);
      if (!e2.defaultPrevented) {
        throw err;
      }
    }
    return promise.then((res) => {
      for (const item of res || []) {
        if (item.status !== "rejected") continue;
        handlePreloadError(item.reason);
      }
      return baseModule().catch(handlePreloadError);
    });
  };
  const { getCurrentInstance, inject, onUnmounted, onDeactivated, onActivated, computed, unref, watchEffect, defineComponent, reactive, h: h$1, provide, ref, watch, shallowRef, shallowReactive, nextTick } = await importShared("vue");
  const isBrowser = typeof document !== "undefined";
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function isESModule(obj) {
    return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
  }
  const assign = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = isArray(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop = () => {
  };
  const isArray = Array.isArray;
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery2, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const hashPos = location2.indexOf("#");
    let searchPos = location2.indexOf("?");
    if (hashPos < searchPos && hashPos >= 0) {
      searchPos = -1;
    }
    if (searchPos > -1) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
      query = parseQuery2(searchString);
    }
    if (hashPos > -1) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + (searchString && "?") + searchString + hash,
      path,
      query,
      hash: decode(hash)
    };
  }
  function stringifyURL(stringifyQuery2, location2) {
    const query = location2.query ? stringifyQuery2(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery2, a, b2) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b2.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b2.params) && stringifyQuery2(a.query) === stringifyQuery2(b2.query) && a.hash === b2.hash;
  }
  function isSameRouteRecord(a, b2) {
    return (a.aliasOf || a) === (b2.aliasOf || b2);
  }
  function isSameRouteLocationParams(a, b2) {
    if (Object.keys(a).length !== Object.keys(b2).length) return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b2[key])) return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b2) {
    return isArray(a) ? isEquivalentArray(a, b2) : isArray(b2) ? isEquivalentArray(b2, a) : a === b2;
  }
  function isEquivalentArray(a, b2) {
    return isArray(b2) ? a.length === b2.length && a.every((value, i2) => value === b2[i2]) : a.length === 1 && a[0] === b2;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/")) return to;
    if (!to) return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    const lastToSegment = toSegments[toSegments.length - 1];
    if (lastToSegment === ".." || lastToSegment === ".") {
      toSegments.push("");
    }
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (segment === ".") continue;
      if (segment === "..") {
        if (position > 1) position--;
      } else break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  function normalizeBase(base) {
    if (!base) {
      if (isBrowser) {
        const baseEl = document.querySelector("base");
        base = baseEl && baseEl.getAttribute("href") || "/";
        base = base.replace(/^\w+:\/\/[^\/]+/, "");
      } else {
        base = "/";
      }
    }
    if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  function getElementPosition(el, offset) {
    const docRect = document.documentElement.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      behavior: offset.behavior,
      left: elRect.left - docRect.left - (offset.left || 0),
      top: elRect.top - docRect.top - (offset.top || 0)
    };
  }
  const computeScrollPosition = () => ({
    left: window.scrollX,
    top: window.scrollY
  });
  function scrollToPosition(position) {
    let scrollToOptions;
    if ("el" in position) {
      const positionEl = position.el;
      const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
      const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
      if (!el) {
        return;
      }
      scrollToOptions = getElementPosition(el, position);
    } else {
      scrollToOptions = position;
    }
    if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
    else {
      window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
    }
  }
  function getScrollKey(path, delta) {
    const position = history.state ? history.state.position - delta : -1;
    return position + path;
  }
  const scrollPositions = /* @__PURE__ */ new Map();
  function saveScrollPosition(key, scrollPosition) {
    scrollPositions.set(key, scrollPosition);
  }
  function getSavedScrollPosition(key) {
    const scroll = scrollPositions.get(key);
    scrollPositions.delete(key);
    return scroll;
  }
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location2) {
    const { pathname, search, hash } = location2;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    const path = stripBase(pathname, base);
    return path + search + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      const { history: history2 } = window;
      if (!history2.state) return;
      history2.replaceState(assign({}, history2.state, {
        scroll: computeScrollPosition()
      }), "");
    }
    function destroy() {
      for (const teardown of teardowns) teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("beforeunload", beforeUnloadListener, {
      passive: true
    });
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history2, location: location2 } = window;
    const currentLocation = {
      value: createCurrentLocation(base, location2)
    };
    const historyState = {
      value: history2.state
    };
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history2.length - 1,
        replaced: true,
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace2) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history2[replace2 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        {
          console.error(err);
        }
        location2[replace2 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data) {
      const state = assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, {
        position: historyState.value.position
      });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data) {
      const currentState = assign({}, historyState.value, history2.state, {
        forward: to,
        scroll: computeScrollPosition()
      });
      changeLocation(currentState.current, currentState, true);
      const state = assign({}, buildState(currentLocation.value, to, null), {
        position: currentState.position + 1
      }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners) historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign({
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  const NavigationFailureSymbol = Symbol("");
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  function createRouterError(type, params) {
    {
      return assign(new Error(), {
        type,
        [NavigationFailureSymbol]: true
      }, params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [
        90
      ];
      if (options.strict && !segment.length) pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
        if (token.type === 0) {
          if (!tokenIndex) pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += 40;
        } else if (token.type === 1) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re22 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re22 !== BASE_PARAM_PATTERN) {
            subSegmentScore += 10;
            try {
              new RegExp(`(${re22})`);
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re22}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re22})(?:/(?:${re22}))*)` : `(${re22})`;
          if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional) subPattern += "?";
          pattern += subPattern;
          subSegmentScore += 20;
          if (optional) subSegmentScore += -8;
          if (repeatable) subSegmentScore += -20;
          if (re22 === ".*") subSegmentScore += -50;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i2 = score.length - 1;
      score[i2][score[i2].length - 1] += 0.7000000000000001;
    }
    if (!options.strict) pattern += "/?";
    if (options.end) pattern += "$";
    else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
    const re2 = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse(path) {
      const match = path.match(re2);
      const params = {};
      if (!match) return null;
      for (let i2 = 1; i2 < match.length; i2++) {
        const value = match[i2] || "";
        const key = keys[i2 - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) {
          if (token.type === 0) {
            path += token.value;
          } else if (token.type === 1) {
            const { value, repeatable, optional } = token;
            const param = value in params ? params[value] : "";
            if (isArray(param) && !repeatable) {
              throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
            }
            const text = isArray(param) ? param.join("/") : param;
            if (!text) {
              if (optional) {
                if (segment.length < 2) {
                  if (path.endsWith("/")) path = path.slice(0, -1);
                  else avoidDuplicatedSlash = true;
                }
              } else throw new Error(`Missing required param "${value}"`);
            }
            path += text;
          }
        }
      }
      return path || "/";
    }
    return {
      re: re2,
      score,
      keys,
      parse,
      stringify
    };
  }
  function compareScoreArray(a, b2) {
    let i2 = 0;
    while (i2 < a.length && i2 < b2.length) {
      const diff = b2[i2] - a[i2];
      if (diff) return diff;
      i2++;
    }
    if (a.length < b2.length) {
      return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
    } else if (a.length > b2.length) {
      return b2.length === 1 && b2[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
  }
  function comparePathParserScore(a, b2) {
    let i2 = 0;
    const aScore = a.score;
    const bScore = b2.score;
    while (i2 < aScore.length && i2 < bScore.length) {
      const comp = compareScoreArray(aScore[i2], bScore[i2]);
      if (comp) return comp;
      i2++;
    }
    if (Math.abs(bScore.length - aScore.length) === 1) {
      if (isLastScoreNegative(aScore)) return 1;
      if (isLastScoreNegative(bScore)) return -1;
    }
    return bScore.length - aScore.length;
  }
  function isLastScoreNegative(score) {
    const last = score[score.length - 1];
    return score.length > 0 && last[last.length - 1] < 0;
  }
  const ROOT_TOKEN = {
    type: 0,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path) return [
      []
    ];
    if (path === "/") return [
      [
        ROOT_TOKEN
      ]
    ];
    if (!path.startsWith("/")) {
      throw new Error(`Invalid path "${path}"`);
    }
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment) tokens.push(segment);
      segment = [];
    }
    let i2 = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer) return;
      if (state === 0) {
        segment.push({
          type: 0,
          value: buffer
        });
      } else if (state === 1 || state === 2 || state === 3) {
        if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: 1,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else {
        crash("Invalid state to consume buffer");
      }
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i2 < path.length) {
      char = path[i2++];
      if (char === "\\" && state !== 2) {
        previousState = state;
        state = 4;
        continue;
      }
      switch (state) {
        case 0:
          if (char === "/") {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = 1;
          } else {
            addCharToBuffer();
          }
          break;
        case 4:
          addCharToBuffer();
          state = previousState;
          break;
        case 1:
          if (char === "(") {
            state = 2;
          } else if (VALID_PARAM_RE.test(char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0;
            if (char !== "*" && char !== "?" && char !== "+") i2--;
          }
          break;
        case 2:
          if (char === ")") {
            if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
            else state = 3;
          } else {
            customRe += char;
          }
          break;
        case 3:
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+") i2--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === 2) crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign(parser, {
      record,
      parent,
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions({
      strict: false,
      end: true,
      sensitive: false
    }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions(globalOptions, record);
      const normalizedRecords = [
        mainNormalizedRecord
      ];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [
          record.alias
        ] : record.alias;
        for (const alias of aliases) {
          normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          })));
        }
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher)) {
            removeRoute(record.name);
          }
        }
        if (isMatchable(matcher)) {
          insertMatcher(matcher);
        }
        if (mainNormalizedRecord.children) {
          const children = mainNormalizedRecord.children;
          for (let i2 = 0; i2 < children.length; i2++) {
            addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
          }
        }
        originalRecord = originalRecord || matcher;
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index = matchers.indexOf(matcherRef);
        if (index > -1) {
          matchers.splice(index, 1);
          if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      const index = findInsertionIndex(matcher, matchers);
      matchers.splice(index, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location2, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location2 && location2.name) {
        matcher = matcherMap.get(location2.name);
        if (!matcher) throw createRouterError(1, {
          location: location2
        });
        name = matcher.record.name;
        params = assign(paramsFromLocation(currentLocation.params, matcher.keys.filter((k2) => !k2.optional).concat(matcher.parent ? matcher.parent.keys.filter((k2) => k2.optional) : []).map((k2) => k2.name)), location2.params && paramsFromLocation(location2.params, matcher.keys.map((k2) => k2.name)));
        path = matcher.stringify(params);
      } else if (location2.path != null) {
        path = location2.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher) throw createRouterError(1, {
          location: location2,
          currentLocation
        });
        name = matcher.record.name;
        params = assign({}, currentLocation.params, location2.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes.forEach((route) => addRoute(route));
    function clearRoutes() {
      matchers.length = 0;
      matcherMap.clear();
    }
    return {
      addRoute,
      resolve,
      removeRoute,
      clearRoutes,
      getRoutes,
      getRecordMatcher
    };
  }
  function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
      if (key in params) newParams[key] = params[key];
    }
    return newParams;
  }
  function normalizeRouteRecord(record) {
    const normalized = {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: record.aliasOf,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in record ? record.components || null : record.component && {
        default: record.component
      }
    };
    Object.defineProperty(normalized, "mods", {
      value: {}
    });
    return normalized;
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) {
      propsObject.default = props;
    } else {
      for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
    }
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf) return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta, record) => assign(meta, record.meta), {});
  }
  function mergeOptions(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
  }
  function findInsertionIndex(matcher, matchers) {
    let lower = 0;
    let upper = matchers.length;
    while (lower !== upper) {
      const mid = lower + upper >> 1;
      const sortOrder = comparePathParserScore(matcher, matchers[mid]);
      if (sortOrder < 0) {
        upper = mid;
      } else {
        lower = mid + 1;
      }
    }
    const insertionAncestor = getInsertionAncestor(matcher);
    if (insertionAncestor) {
      upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    }
    return upper;
  }
  function getInsertionAncestor(matcher) {
    let ancestor = matcher;
    while (ancestor = ancestor.parent) {
      if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) {
        return ancestor;
      }
    }
    return;
  }
  function isMatchable({ record }) {
    return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
  }
  function parseQuery(search) {
    const query = {};
    if (search === "" || search === "?") return query;
    const hasLeadingIM = search[0] === "?";
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
    for (let i2 = 0; i2 < searchParams.length; ++i2) {
      const searchParam = searchParams[i2].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!isArray(currentValue)) {
          currentValue = query[key] = [
            currentValue
          ];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  function stringifyQuery(query) {
    let search = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) {
          search += (search.length ? "&" : "") + key;
        }
        continue;
      }
      const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [
        value && encodeQueryValue(value)
      ];
      values.forEach((value2) => {
        if (value2 !== void 0) {
          search += (search.length ? "&" : "") + key;
          if (value2 != null) search += "=" + value2;
        }
      });
    }
    return search;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) {
        normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
      }
    }
    return normalizedQuery;
  }
  const matchedRouteKey = Symbol("");
  const viewDepthKey = Symbol("");
  const routerKey = Symbol("");
  const routeLocationKey = Symbol("");
  const routerViewLocationKey = Symbol("");
  function useCallbacks() {
    let handlers = [];
    function add(handler) {
      handlers.push(handler);
      return () => {
        const i2 = handlers.indexOf(handler);
        if (i2 > -1) handlers.splice(i2, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add,
      list: () => handlers.slice(),
      reset
    };
  }
  function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
    const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
      const next = (valid) => {
        if (valid === false) {
          reject(createRouterError(4, {
            from,
            to
          }));
        } else if (valid instanceof Error) {
          reject(valid);
        } else if (isRouteLocation(valid)) {
          reject(createRouterError(2, {
            from: to,
            to: valid
          }));
        } else {
          if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
            enterCallbackArray.push(valid);
          }
          resolve();
        }
      };
      const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3) guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
        if (isRouteComponent(rawComponent)) {
          const options = rawComponent.__vccOpts || rawComponent;
          const guard = options[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.mods[name] = resolved;
            record.components[name] = resolvedComponent;
            const options = resolvedComponent.__vccOpts || resolvedComponent;
            const guard = options[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
          }));
        }
      }
    }
    return guards;
  }
  function useLink(props) {
    const router = inject(routerKey);
    const currentRoute = inject(routeLocationKey);
    const route = computed(() => {
      const to = unref(props.to);
      return router.resolve(to);
    });
    const activeRecordIndex = computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length) return -1;
      const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index > -1) return index;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
    });
    const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e2 = {}) {
      if (guardEvent(e2)) {
        const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
        if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
          document.startViewTransition(() => p);
        }
        return p;
      }
      return Promise.resolve();
    }
    return {
      route,
      href: computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  function preferSingleVNode(vnodes) {
    return vnodes.length === 1 ? vnodes[0] : vnodes;
  }
  const RouterLinkImpl = defineComponent({
    name: "RouterLink",
    compatConfig: {
      MODE: 3
    },
    props: {
      to: {
        type: [
          String,
          Object
        ],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      },
      viewTransition: Boolean
    },
    useLink,
    setup(props, { slots }) {
      const link = reactive(useLink(props));
      const { options } = inject(routerKey);
      const elClass = computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && preferSingleVNode(slots.default(link));
        return props.custom ? children : h$1("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e2) {
    if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey) return;
    if (e2.defaultPrevented) return;
    if (e2.button !== void 0 && e2.button !== 0) return;
    if (e2.currentTarget && e2.currentTarget.getAttribute) {
      const target = e2.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target)) return;
    }
    if (e2.preventDefault) e2.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue) return false;
      } else {
        if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2])) return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = defineComponent({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: {
      MODE: 3
    },
    setup(props, { attrs, slots }) {
      const injectedRoute = inject(routerViewLocationKey);
      const routeToDisplay = computed(() => props.route || injectedRoute.value);
      const injectedDepth = inject(viewDepthKey, 0);
      const depth = computed(() => {
        let initialDepth = unref(injectedDepth);
        const { matched } = routeToDisplay.value;
        let matchedRoute;
        while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
          initialDepth++;
        }
        return initialDepth;
      });
      const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
      provide(viewDepthKey, computed(() => depth.value + 1));
      provide(matchedRouteKey, matchedRouteRef);
      provide(routerViewLocationKey, routeToDisplay);
      const viewRef = ref();
      watch(() => [
        viewRef.value,
        matchedRouteRef.value,
        props.name
      ], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
        }
      }, {
        flush: "post"
      });
      return () => {
        const route = routeToDisplay.value;
        const currentName = props.name;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[currentName];
        if (!ViewComponent) {
          return normalizeSlot(slots.default, {
            Component: ViewComponent,
            route
          });
        }
        const routePropsOption = matchedRoute.props[currentName];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return normalizeSlot(slots.default, {
          Component: component,
          route
        }) || component;
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot) return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
      currentLocation = assign({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute2 = matcher.resolve({
          path: locationNormalized.path
        }, currentLocation);
        const href2 = routerHistory.createHref(locationNormalized.fullPath);
        return assign(locationNormalized, matchedRoute2, {
          params: decodeParams(matchedRoute2.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href2
        });
      }
      let matcherLocation;
      if (rawLocation.path != null) {
        matcherLocation = assign({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        const targetParams = assign({}, rawLocation.params);
        for (const key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        matcherLocation = assign({}, rawLocation, {
          params: encodeParams(targetParams)
        });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign({
        fullPath,
        hash,
        query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8, {
          from,
          to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign(locationAsObject(to), {
        replace: true
      }));
    }
    function handleRedirectRecord(to) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : {
            path: newTargetLocation
          };
          newTargetLocation.params = {};
        }
        return assign({
          query: to.query,
          hash: to.hash,
          params: newTargetLocation.path != null ? {} : to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve(to);
      const from = currentRoute.value;
      const data = to.state;
      const force = to.force;
      const replace2 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
        state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
        force,
        replace: replace2
      }), redirectedFrom || targetLocation);
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16, {
          to: toLocation,
          from
        });
        handleScroll(from, from, true, false);
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
        if (failure2) {
          if (isNavigationFailure(failure2, 2)) {
            return pushWithRedirect(assign({
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }), redirectedFrom || toLocation);
          }
        } else {
          failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
        }
        triggerAfterEach(toLocation, from, failure2);
        return failure2;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function runWithContext(fn) {
      const app = installedApps.values().next().value;
      return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) {
        record.leaveGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of enteringRecords) {
          if (record.beforeEnter) {
            if (isArray(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
    }
    function finalizeNavigation(toLocation, from, isPush, replace2, data) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error) return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = !isBrowser ? {} : history.state;
      if (isPush) {
        if (replace2 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
        else routerHistory.push(toLocation.fullPath, data);
      }
      currentRoute.value = toLocation;
      handleScroll(toLocation, from, isPush, isFirstNavigation);
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      if (removeHistoryListener) return;
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        if (!router.listening) return;
        const toLocation = resolve(to);
        const shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign(shouldRedirect, {
            replace: true,
            force: true
          }), toLocation).catch(noop);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        if (isBrowser) {
          saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
        }
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(error, 4 | 8)) {
            return error;
          }
          if (isNavigationFailure(error, 2)) {
            pushWithRedirect(assign(locationAsObject(error.to), {
              force: true
            }), toLocation).then((failure) => {
              if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            }).catch(noop);
            return Promise.reject();
          }
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          }
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(toLocation, from, false);
          if (failure) {
            if (info.delta && !isNavigationFailure(failure, 8)) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop);
      });
    }
    let readyHandlers = useCallbacks();
    let errorListeners = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorListeners.list();
      if (list.length) {
        list.forEach((handler) => handler(error, to, from));
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
      return new Promise((resolve2, reject) => {
        readyHandlers.add([
          resolve2,
          reject
        ]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      const { scrollBehavior } = options;
      if (!isBrowser || !scrollBehavior) return Promise.resolve();
      const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
      return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
    }
    const go = (delta) => routerHistory.go(delta);
    let started;
    const installedApps = /* @__PURE__ */ new Set();
    const router = {
      currentRoute,
      listening: true,
      addRoute,
      removeRoute,
      clearRoutes: matcher.clearRoutes,
      hasRoute,
      getRoutes,
      resolve,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorListeners.add,
      isReady,
      install(app) {
        const router2 = this;
        app.component("RouterLink", RouterLink);
        app.component("RouterView", RouterView);
        app.config.globalProperties.$router = router2;
        Object.defineProperty(app.config.globalProperties, "$route", {
          enumerable: true,
          get: () => unref(currentRoute)
        });
        if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
          started = true;
          push(routerHistory.location).catch((err) => {
          });
        }
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) {
          Object.defineProperty(reactiveRoute, key, {
            get: () => currentRoute.value[key],
            enumerable: true
          });
        }
        app.provide(routerKey, router2);
        app.provide(routeLocationKey, shallowReactive(reactiveRoute));
        app.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app.unmount;
        installedApps.add(app);
        app.unmount = function() {
          installedApps.delete(app);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            started = false;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    function runGuardQueue(guards) {
      return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
    }
    return router;
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i2 = 0; i2 < len; i2++) {
      const recordFrom = from.matched[i2];
      if (recordFrom) {
        if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
        else leavingRecords.push(recordFrom);
      }
      const recordTo = to.matched[i2];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
          enteringRecords.push(recordTo);
        }
      }
    }
    return [
      leavingRecords,
      updatingRecords,
      enteringRecords
    ];
  }
  function useRoute(_name) {
    return inject(routeLocationKey);
  }
  const { defineComponent: C, createElementBlock: i, openBlock: n, createElementVNode: e, createBlock: b, unref: T, Suspense: A, withCtx: k, resolveDynamicComponent: H, shallowRef: J, onMounted: N, toDisplayString: r, ref: S, withDirectives: W, vModelSelect: K, normalizeClass: D, Fragment: $, renderList: P, createApp: Q, computed: M, createCommentVNode: h, renderSlot: X, createVNode: R, createTextVNode: x } = await importShared("vue");
  const te = {
    class: "min-h-screen bg-white dark:bg-black"
  }, ne = {
    class: "mx-auto max-w-5xl"
  }, oe = C({
    __name: "App",
    setup(p) {
      return (o, c) => (n(), i("div", te, [
        e("div", ne, [
          (n(), b(T(RouterView), {
            key: o.$route.params.id || ""
          }))
        ])
      ]));
    }
  }), se = {
    key: 1
  }, le = C({
    __name: "DirectComponent",
    props: {
      component: {
        type: Object,
        required: true
      }
    },
    setup(p) {
      const o = useRoute();
      return console.log("Route params:", o.params), (c, s) => (n(), b(A, null, {
        default: k(() => [
          p.component ? (n(), b(H(p.component), {
            key: 0,
            parentId: T(o).params.id,
            query: T(o).query
          }, null, 8, [
            "parentId",
            "query"
          ])) : (n(), i("div", se, s[0] || (s[0] = [
            e("i", {
              class: "text-sm text-gray-400"
            }, " Component is not available ", -1)
          ])))
        ]),
        fallback: k(() => s[1] || (s[1] = [
          e("div", null, "Loading remote component...", -1)
        ])),
        _: 1
      }));
    }
  }), ie = {
    key: 1
  }, re = {
    class: "text-sm text-gray-400"
  }, ae = C({
    __name: "PluginComponent",
    props: {
      plugin: {},
      position: {}
    },
    setup(p) {
      const o = async () => {
        try {
          const t = await __vitePreload(() => import("./_virtual___federation__-DLC65K32.js").then(async (m) => {
            await m.__tla;
            return m;
          }), true ? [] : void 0, import.meta.url);
          return {
            getRemote: t.__federation_method_getRemote,
            setRemote: t.__federation_method_setRemote,
            unwrapModule: t.__federation_method_unwrapDefault
          };
        } catch {
          return console.warn("Federation not available, federation features will be disabled"), {
            getRemote: () => Promise.reject("Federation not available"),
            setRemote: () => {
            },
            unwrapModule: (l) => l
          };
        }
      }, c = p, s = useRoute(), g = J(), v = async () => {
        try {
          const { getRemote: t, setRemote: l, unwrapModule: u } = await o(), m = c.plugin;
          if (m) {
            l(m.name, {
              url: () => Promise.resolve(m.url),
              format: "esm",
              from: "vite"
            });
            const _ = await t(m.name, `./${c.position}`), F = await u(_);
            g.value = F;
          }
        } catch (t) {
          console.error("Failed to load remote plugin:", t);
        }
      };
      return N(async () => {
        await v();
      }), (t, l) => (n(), b(A, null, {
        default: k(() => {
          var u;
          return [
            g.value ? (n(), b(H(g.value), {
              key: 0,
              parentId: T(s).params.id,
              query: T(s).query
            }, null, 8, [
              "parentId",
              "query"
            ])) : (n(), i("div", ie, [
              e("i", re, r(((u = t.plugin) == null ? void 0 : u.name) || "Plugin") + " is not available ", 1)
            ]))
          ];
        }),
        fallback: k(() => l[0] || (l[0] = [
          e("div", null, "Loading remote component...", -1)
        ])),
        _: 1
      }));
    }
  }), ue = {
    class: "p-4 max-w-6xl mx-auto"
  }, de = {
    class: "flex items-center justify-between border-b-2 border-blue-600 pb-2 mb-2"
  }, pe = {
    class: "flex items-center gap-6"
  }, ce = {
    class: "flex items-center gap-2"
  }, me = {
    class: "flex items-center gap-2"
  }, ge = {
    class: "mb-4"
  }, fe = {
    class: "flex border-b border-gray-200"
  }, ve = [
    "onClick"
  ], _e = {
    class: "mb-4"
  }, he = {
    class: "flex gap-8 min-h-96 overflow-x-auto"
  }, ye = {
    key: 1,
    class: "flex items-center justify-center h-full text-gray-500"
  }, be = {
    class: "text-center"
  }, ke = {
    class: "text-xs mt-1 text-gray-400"
  }, j = C({
    __name: "PluginEnvironment",
    props: {
      devConfig: {
        type: Object,
        default: () => ({})
      }
    },
    setup(p) {
      let o = null;
      const c = async () => {
        if (o) return o;
        try {
          const f = await __vitePreload(() => import("./_virtual___federation__-DLC65K32.js").then(async (m2) => {
            await m2.__tla;
            return m2;
          }), true ? [] : void 0, import.meta.url);
          return o = {
            getRemote: f.__federation_method_getRemote,
            setRemote: f.__federation_method_setRemote,
            unwrapModule: f.__federation_method_unwrapDefault
          }, o;
        } catch {
          return console.warn("Federation not available, federation features will be disabled"), o = {
            getRemote: () => Promise.reject("Federation not available"),
            setRemote: () => {
            },
            unwrapModule: (a) => a
          }, o;
        }
      }, s = p, g = S(false), v = S(null), t = S({}), l = [
        "Info",
        "Settings"
      ], u = [
        "Content",
        "Sidebar"
      ], m = S("Topic"), _ = S("Info"), F = (f, a, d) => {
        if (!v.value || g.value) return null;
        const y = v.value.slots.find((w) => w.entity === f && w.page === a && w.slot === d);
        return y ? t.value[y.component] : null;
      }, B = (f, a, d) => {
        if (!v.value) return "";
        const y = v.value.slots.find((w) => w.entity === f && w.page === a && w.slot === d);
        return y ? y.component : "";
      }, E = (f, a, d) => v.value ? v.value.slots.some((y) => y.entity === f && y.page === a && y.slot === d) : false;
      async function O() {
        try {
          await fetch("http://localhost:3006/assets/plugin.js", {
            method: "HEAD"
          }), g.value = true;
        } catch {
          g.value = false;
        }
      }
      const G = async (f) => {
        try {
          const { getRemote: a, setRemote: d, unwrapModule: y } = await c();
          d("plugin", {
            url: () => Promise.resolve(f),
            format: "esm",
            from: "vite"
          });
          const w = await a("plugin", "./PluginConfig");
          return await y(w);
        } catch (a) {
          console.error("Failed to load remote plugin config:", a);
        }
      };
      async function U() {
        await O(), g.value ? v.value = await G("http://localhost:3006/assets/plugin.js") : (console.log("Dev mode: Loading direct imports from ../src"), await z()), console.log("Plugin Config: ", v.value);
      }
      async function z() {
        try {
          s.devConfig.pluginConfig && (v.value = s.devConfig.pluginConfig), s.devConfig.components && (t.value = s.devConfig.components), console.log("Direct imports loaded from devConfig:", {
            pluginConfig: v.value,
            components: Object.keys(t.value)
          });
        } catch (f) {
          console.error("Failed to load direct imports:", f);
        }
      }
      return N(() => {
        U();
      }), (f, a) => (n(), i("div", ue, [
        e("div", de, [
          a[4] || (a[4] = e("h1", {
            class: "text-3xl font-bold text-gray-900"
          }, "Plugin DevEnv", -1)),
          e("div", pe, [
            e("div", ce, [
              a[2] || (a[2] = e("span", {
                class: "text-sm text-gray-600"
              }, "Entity:", -1)),
              W(e("select", {
                "onUpdate:modelValue": a[0] || (a[0] = (d) => m.value = d),
                class: "px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }, a[1] || (a[1] = [
                e("option", {
                  value: "Topic"
                }, "Topic", -1),
                e("option", {
                  value: "Location"
                }, "Location", -1)
              ]), 512), [
                [
                  K,
                  m.value
                ]
              ])
            ]),
            e("div", me, [
              a[3] || (a[3] = e("span", {
                class: "text-sm text-gray-600"
              }, "Mode:", -1)),
              e("span", {
                class: D([
                  "px-3 py-1 rounded-full text-sm font-semibold",
                  g.value ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                ])
              }, r(g.value ? "Preview (Federation)" : "Dev (Hot Reload)"), 3)
            ])
          ])
        ]),
        e("div", ge, [
          e("div", fe, [
            (n(), i($, null, P(l, (d) => e("button", {
              key: d,
              onClick: (y) => _.value = d,
              class: D([
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                _.value === d ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
              ])
            }, r(d), 11, ve)), 64))
          ])
        ]),
        e("div", _e, [
          e("div", he, [
            (n(), i($, null, P(u, (d) => e("div", {
              key: `${m.value}-${_.value}-${d}`,
              class: D(d === "Content" ? "flex-1 min-w-96" : "w-72 min-w-72 flex-shrink-0")
            }, [
              e("div", {
                class: D([
                  "border-2 rounded-lg p-4 bg-white min-h-72",
                  E(m.value, _.value, d) ? "border-blue-600" : "border-gray-300"
                ])
              }, [
                E(m.value, _.value, d) ? (n(), i($, {
                  key: 0
                }, [
                  F(m.value, _.value, d) ? (n(), b(le, {
                    key: 0,
                    component: F(m.value, _.value, d),
                    parentId: m.value.toLowerCase() + "-" + _.value.toLowerCase()
                  }, null, 8, [
                    "component",
                    "parentId"
                  ])) : (n(), b(ae, {
                    key: 1,
                    plugin: {
                      name: "link-plugin",
                      url: "http://localhost:3006/assets/plugin.js"
                    },
                    position: B(m.value, _.value, d),
                    parentId: m.value.toLowerCase() + "-" + _.value.toLowerCase()
                  }, null, 8, [
                    "position",
                    "parentId"
                  ]))
                ], 64)) : (n(), i("div", ye, [
                  e("div", be, [
                    a[5] || (a[5] = e("div", {
                      class: "text-lg font-medium mb-2"
                    }, "No Component", -1)),
                    a[6] || (a[6] = e("div", {
                      class: "text-sm"
                    }, "This slot is not provided by the plugin", -1)),
                    e("div", ke, r(m.value) + " \u2192 " + r(_.value) + " \u2192 " + r(d), 1)
                  ])
                ]))
              ], 2)
            ], 2)), 64))
          ])
        ]),
        a[7] || (a[7] = e("div", {
          class: "flex items-center justify-between border-b-2 border-blue-600 pb-2 mb-8"
        }, [
          e("h1", {
            class: "text-3xl font-bold text-gray-900"
          }, "Plugin Registry")
        ], -1))
      ]));
    }
  });
  tt = function(p = {}) {
    const o = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          component: j,
          props: {
            devConfig: p
          }
        },
        {
          path: "/:id",
          component: j,
          props: (s) => ({
            devConfig: p,
            id: s.params.id
          })
        }
      ]
    }), c = Q(oe);
    return c.use(o), c.provide("devConfig", p), c;
  };
  let Ce, we, $e, I, Pe, Re, xe, L, Le, De, Ie, Se, Me, q, Te, Fe, Ee, je, qe, Ae, He, Ne, Ve, Be, Oe, Ge, Ue, ze, Je, We, Ke, Qe, Xe;
  Ce = {
    class: "plugin-header"
  };
  we = {
    class: "subtitle"
  };
  $e = C({
    __name: "PluginHeader",
    props: {
      title: {},
      subtitle: {},
      icon: {
        default: "\u{1F50C}"
      },
      status: {}
    },
    setup(p) {
      const o = p, c = M(() => {
        if (!o.status) return "";
        const s = o.status.toLowerCase();
        return s.includes("federated") || s.includes("modern") ? "status-modern" : s.includes("hybrid") ? "status-hybrid" : s.includes("legacy") ? "status-legacy" : "";
      });
      return (s, g) => (n(), i("header", Ce, [
        e("h1", null, r(s.icon) + " TopLocs " + r(s.title) + " Plugin", 1),
        e("p", we, r(s.subtitle), 1),
        s.status ? (n(), i("span", {
          key: 0,
          class: D([
            "status-badge",
            c.value
          ])
        }, r(s.status), 3)) : h("", true)
      ]));
    }
  });
  I = (p, o) => {
    const c = p.__vccOpts || p;
    for (const [s, g] of o) c[s] = g;
    return c;
  };
  Pe = I($e, [
    [
      "__scopeId",
      "data-v-1e3831fb"
    ]
  ]);
  Re = {
    class: "plugin-section"
  };
  xe = C({
    __name: "PluginSection",
    props: {
      title: {}
    },
    setup(p) {
      return (o, c) => (n(), i("div", Re, [
        e("h2", null, r(o.title), 1),
        X(o.$slots, "default", {}, void 0, true)
      ]));
    }
  });
  L = I(xe, [
    [
      "__scopeId",
      "data-v-fc21c327"
    ]
  ]);
  Le = {
    class: "feature-grid"
  };
  De = C({
    __name: "PluginFeatureGrid",
    props: {
      features: {}
    },
    setup(p) {
      return (o, c) => (n(), i("div", Le, [
        (n(true), i($, null, P(o.features, (s) => (n(), i("div", {
          key: s.title,
          class: "feature"
        }, [
          e("h3", null, r(s.icon) + " " + r(s.title), 1),
          e("p", null, r(s.description), 1)
        ]))), 128))
      ]));
    }
  });
  Ie = I(De, [
    [
      "__scopeId",
      "data-v-453d781e"
    ]
  ]);
  Se = {
    class: "code-block"
  };
  Me = C({
    __name: "PluginCodeBlock",
    props: {
      code: {}
    },
    setup(p) {
      return (o, c) => (n(), i("div", Se, [
        e("pre", null, [
          e("code", null, r(o.code), 1)
        ])
      ]));
    }
  });
  q = I(Me, [
    [
      "__scopeId",
      "data-v-67b69bfe"
    ]
  ]);
  Te = {
    class: "links"
  };
  Fe = [
    "href"
  ];
  Ee = C({
    __name: "PluginLinks",
    props: {
      links: {}
    },
    setup(p) {
      return (o, c) => (n(), i("div", Te, [
        (n(true), i($, null, P(o.links, (s) => (n(), i("a", {
          key: s.href,
          href: s.href,
          class: D([
            "link-button",
            {
              secondary: !s.primary
            }
          ]),
          target: "_blank",
          rel: "noopener noreferrer"
        }, r(s.label), 11, Fe))), 128))
      ]));
    }
  });
  je = I(Ee, [
    [
      "__scopeId",
      "data-v-767eaf10"
    ]
  ]);
  qe = {
    class: "plugin-info-page"
  };
  Ae = {
    class: "container"
  };
  He = {
    key: 0
  };
  Ne = {
    key: 0
  };
  Ve = {
    key: 0
  };
  Be = {
    class: "highlight"
  };
  Oe = {
    class: "highlight"
  };
  Ge = {
    class: "highlight"
  };
  Ue = {
    key: 0
  };
  ze = {
    class: "highlight"
  };
  Je = {
    key: 0
  };
  We = {
    key: 1
  };
  Ke = {
    key: 2
  };
  Qe = {
    class: "highlight"
  };
  Xe = C({
    __name: "PluginInfoPage",
    props: {
      pluginConfig: {},
      icon: {
        default: "\u{1F50C}"
      },
      status: {},
      about: {},
      features: {},
      architecture: {},
      endpoints: {},
      development: {},
      slotDescriptions: {},
      links: {}
    },
    setup(p) {
      const o = p, c = M(() => [
        {
          href: `https://github.com/toplocs/${o.pluginConfig.id.replace(/_/g, "-")}`,
          label: "GitHub Repository",
          primary: true
        },
        {
          href: "https://github.com/toplocs/tribelike",
          label: "TopLocs Platform"
        },
        {
          href: "https://toplocs.github.io/toplocs-workspace/",
          label: "Documentation"
        }
      ]), s = M(() => o.links || c.value), g = M(() => {
        var t;
        return JSON.stringify({
          id: o.pluginConfig.id,
          name: o.pluginConfig.name,
          url: ((t = o.endpoints) == null ? void 0 : t.plugin) || o.pluginConfig.url,
          version: o.pluginConfig.version || "1.0.0",
          description: o.pluginConfig.description,
          author: o.pluginConfig.author || "TopLocs Team"
        }, null, 2);
      }), v = M(() => {
        if (!o.pluginConfig.slots) return [];
        const t = /* @__PURE__ */ new Map();
        return o.pluginConfig.slots.forEach((l) => {
          var m;
          const u = `${l.page}/${l.slot}`;
          t.has(u) || t.set(u, {
            path: u,
            description: ((m = o.slotDescriptions) == null ? void 0 : m[`${l.page}/${l.slot}`]) || `${l.component} component`
          });
        }), Array.from(t.values());
      });
      return (t, l) => (n(), i("div", qe, [
        e("div", Ae, [
          R(Pe, {
            title: t.pluginConfig.name,
            subtitle: t.pluginConfig.description,
            icon: t.icon,
            status: t.status
          }, null, 8, [
            "title",
            "subtitle",
            "icon",
            "status"
          ]),
          t.about ? (n(), b(L, {
            key: 0,
            title: "About"
          }, {
            default: k(() => [
              e("p", null, r(t.about), 1),
              t.features ? (n(), b(Ie, {
                key: 0,
                features: t.features
              }, null, 8, [
                "features"
              ])) : h("", true)
            ]),
            _: 1
          })) : h("", true),
          t.architecture ? (n(), b(L, {
            key: 1,
            title: "Architecture"
          }, {
            default: k(() => [
              e("p", null, r(t.architecture.description), 1),
              t.architecture.points ? (n(), i("ul", He, [
                (n(true), i($, null, P(t.architecture.points, (u, m) => (n(), i("li", {
                  key: m
                }, [
                  u.label ? (n(), i("strong", Ne, r(u.label) + ":", 1)) : h("", true),
                  x(" " + r(u.text), 1)
                ]))), 128))
              ])) : h("", true)
            ]),
            _: 1
          })) : h("", true),
          R(L, {
            title: "Integration"
          }, {
            default: k(() => [
              l[1] || (l[1] = e("p", null, "To use this plugin in your TopLocs instance, add it to your plugin configuration:", -1)),
              R(q, {
                code: g.value
              }, null, 8, [
                "code"
              ]),
              t.pluginConfig.slots && t.pluginConfig.slots.length > 0 ? (n(), i("div", Ve, [
                l[0] || (l[0] = e("p", null, "The plugin exposes components for the following slots:", -1)),
                e("ul", null, [
                  (n(true), i($, null, P(v.value, (u) => (n(), i("li", {
                    key: u
                  }, [
                    e("span", Be, r(u.path), 1),
                    x(" - " + r(u.description), 1)
                  ]))), 128))
                ])
              ])) : h("", true)
            ]),
            _: 1,
            __: [
              1
            ]
          }),
          t.endpoints ? (n(), b(L, {
            key: 2,
            title: "Plugin Endpoints"
          }, {
            default: k(() => [
              l[8] || (l[8] = e("p", null, "The plugin is served via GitHub Pages with the following key endpoints:", -1)),
              e("ul", null, [
                e("li", null, [
                  l[2] || (l[2] = e("strong", null, "Plugin Entry:", -1)),
                  l[3] || (l[3] = x()),
                  e("span", Oe, r(t.endpoints.plugin), 1)
                ]),
                e("li", null, [
                  l[4] || (l[4] = e("strong", null, "Landing Page:", -1)),
                  l[5] || (l[5] = x()),
                  e("span", Ge, r(t.endpoints.landing), 1)
                ]),
                t.endpoints.demo ? (n(), i("li", Ue, [
                  l[6] || (l[6] = e("strong", null, "Live Demo:", -1)),
                  l[7] || (l[7] = x()),
                  e("span", ze, r(t.endpoints.demo), 1)
                ])) : h("", true)
              ])
            ]),
            _: 1,
            __: [
              8
            ]
          })) : h("", true),
          t.development ? (n(), b(L, {
            key: 3,
            title: "Development"
          }, {
            default: k(() => [
              t.development.stack ? (n(), i("div", Je, [
                e("p", null, "The " + r(t.pluginConfig.name) + " Plugin is built with:", 1),
                e("ul", null, [
                  (n(true), i($, null, P(t.development.stack, (u) => (n(), i("li", {
                    key: u
                  }, r(u), 1))), 128))
                ])
              ])) : h("", true),
              t.development.setup ? (n(), i("div", We, [
                l[9] || (l[9] = e("p", null, "To run locally:", -1)),
                R(q, {
                  code: t.development.setup
                }, null, 8, [
                  "code"
                ])
              ])) : h("", true),
              t.development.urls ? (n(), i("div", Ke, [
                l[10] || (l[10] = e("p", null, [
                  e("strong", null, "Development URLs:")
                ], -1)),
                e("ul", null, [
                  (n(true), i($, null, P(t.development.urls, (u) => (n(), i("li", {
                    key: u.label
                  }, [
                    x(r(u.label) + ": ", 1),
                    e("span", Qe, r(u.url), 1)
                  ]))), 128))
                ])
              ])) : h("", true)
            ]),
            _: 1
          })) : h("", true),
          R(L, {
            title: "Resources"
          }, {
            default: k(() => [
              R(je, {
                links: s.value
              }, null, 8, [
                "links"
              ])
            ]),
            _: 1
          })
        ])
      ]));
    }
  });
  nt = I(Xe, [
    [
      "__scopeId",
      "data-v-b465bc8c"
    ]
  ]);
});
export {
  __tla,
  nt as n,
  tt as t
};
