import { importShared, __tla as __tla_0 } from "./__federation_fn_import-dmqIiFee.js";
import { u as useLinks, l as linkProvider, _ as _sfc_main$4, a as _sfc_main$5, __tla as __tla_1 } from "./LinkForm.vue_vue_type_script_setup_true_lang-BlnMT_pw.js";
let _sfc_main;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  const { defineComponent: _defineComponent$3 } = await importShared("vue");
  const { normalizeClass: _normalizeClass, openBlock: _openBlock$4, createElementBlock: _createElementBlock$4 } = await importShared("vue");
  const _sfc_main$3 = _defineComponent$3({
    __name: "Divider",
    props: {
      direction: "horizontal"
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return _openBlock$4(), _createElementBlock$4("div", {
          class: _normalizeClass([
            "bg-gray-300",
            __props.direction === "vertical" ? "w-px h-full" : "h-px w-full",
            "my-1"
          ])
        }, null, 2);
      };
    }
  });
  const { createElementVNode: _createElementVNode$1, openBlock: _openBlock$3, createElementBlock: _createElementBlock$3 } = await importShared("vue");
  function render(_ctx, _cache) {
    return _openBlock$3(), _createElementBlock$3("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      "aria-hidden": "true",
      "data-slot": "icon"
    }, [
      _createElementVNode$1("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      })
    ]);
  }
  const { defineComponent: _defineComponent$2 } = await importShared("vue");
  const { toDisplayString: _toDisplayString, unref: _unref$1, createVNode: _createVNode$1, createTextVNode: _createTextVNode$1, openBlock: _openBlock$2, createElementBlock: _createElementBlock$2 } = await importShared("vue");
  const _hoisted_1$2 = {
    class: "flex flex-row items-center justify-between p-2 w-full border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 text-blue-500 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
  };
  const _sfc_main$2 = _defineComponent$2({
    __name: "LinkListItem",
    props: {
      link: {
        type: Object,
        required: true
      }
    },
    setup(__props) {
      const props = __props;
      const { removeLink } = useLinks();
      const handleRemove = async () => {
        var _a;
        await removeLink((_a = props.link) == null ? void 0 : _a.id);
      };
      return (_ctx, _cache) => {
        var _a, _b;
        return _openBlock$2(), _createElementBlock$2("span", _hoisted_1$2, [
          _createTextVNode$1(_toDisplayString(((_a = __props.link) == null ? void 0 : _a.title) || ((_b = __props.link) == null ? void 0 : _b.href)) + " ", 1),
          _createVNode$1(_unref$1(render), {
            class: "w-6 h-6 text-blue-500 cursor-pointer",
            onClick: handleRemove
          })
        ]);
      };
    }
  });
  const { defineComponent: _defineComponent$1 } = await importShared("vue");
  const { unref: _unref, renderList: _renderList, Fragment: _Fragment$1, openBlock: _openBlock$1, createElementBlock: _createElementBlock$1, createBlock: _createBlock } = await importShared("vue");
  const _hoisted_1$1 = {
    class: "max-h-[200px] overflow-y-auto"
  };
  const _sfc_main$1 = _defineComponent$1({
    __name: "LinkList",
    setup(__props) {
      const { links } = useLinks();
      return (_ctx, _cache) => {
        return _openBlock$1(), _createElementBlock$1("div", _hoisted_1$1, [
          (_openBlock$1(true), _createElementBlock$1(_Fragment$1, null, _renderList(_unref(links), (link) => {
            return _openBlock$1(), _createBlock(_sfc_main$2, {
              link,
              key: link.id
            }, null, 8, [
              "link"
            ]);
          }), 128))
        ]);
      };
    }
  });
  const { defineComponent: _defineComponent } = await importShared("vue");
  const { createTextVNode: _createTextVNode, withCtx: _withCtx, createVNode: _createVNode, createElementVNode: _createElementVNode, Fragment: _Fragment, openBlock: _openBlock, createElementBlock: _createElementBlock } = await importShared("vue");
  const _hoisted_1 = {
    class: "mb-4"
  };
  const _hoisted_2 = {
    class: "mb-4"
  };
  _sfc_main = _defineComponent({
    ...{
      name: "LinkSettingsContent"
    },
    __name: "Content",
    props: {
      parentId: String
    },
    setup(__props) {
      const props = __props;
      linkProvider(props.parentId ?? "test");
      return (_ctx, _cache) => {
        return _openBlock(), _createElementBlock(_Fragment, null, [
          _createElementVNode("section", _hoisted_1, [
            _createVNode(_sfc_main$4, null, {
              default: _withCtx(() => _cache[0] || (_cache[0] = [
                _createTextVNode("Link Settings")
              ])),
              _: 1,
              __: [
                0
              ]
            }),
            _createVNode(_sfc_main$3)
          ]),
          _createElementVNode("section", _hoisted_2, [
            _createVNode(_sfc_main$1),
            _createVNode(_sfc_main$3)
          ]),
          _createElementVNode("section", null, [
            _createVNode(_sfc_main$5)
          ])
        ], 64);
      };
    }
  });
});
export {
  _sfc_main as _,
  __tla
};
