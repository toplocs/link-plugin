import { importShared, __tla as __tla_0 } from "./__federation_fn_import-dmqIiFee.js";
import { u as useLinks, _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, l as linkProvider, __tla as __tla_1 } from "./LinkForm.vue_vue_type_script_setup_true_lang-BlnMT_pw.js";
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
  const { toDisplayString: _toDisplayString$1, openBlock: _openBlock$3, createElementBlock: _createElementBlock$2 } = await importShared("vue");
  const _sfc_main$3 = _defineComponent$3({
    __name: "ActionButton",
    props: {
      title: {
        type: String,
        required: true
      }
    },
    emits: [
      "useAction"
    ],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const useAction = () => {
        emit("useAction");
      };
      return (_ctx, _cache) => {
        return _openBlock$3(), _createElementBlock$2("button", {
          onClick: useAction,
          class: "w-full cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium rounded-lg text-green-600 dark:text-green-300 bg-green-50 dark:bg-green-800 hover:bg-green-100 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
        }, _toDisplayString$1(__props.title), 1);
      };
    }
  });
  const { defineComponent: _defineComponent$2 } = await importShared("vue");
  const { renderSlot: _renderSlot, createElementVNode: _createElementVNode$1, openBlock: _openBlock$2, createElementBlock: _createElementBlock$1, createCommentVNode: _createCommentVNode, Transition: _Transition, withCtx: _withCtx$1, createVNode: _createVNode$1 } = await importShared("vue");
  const _hoisted_1$1 = {
    key: 0,
    class: "fixed inset-0 flex items-center justify-center z-50"
  };
  const _hoisted_2$1 = {
    class: "bg-white dark:bg-gray-800 w-[400px] rounded-lg shadow-lg p-4 z-50"
  };
  const { ref } = await importShared("vue");
  const _sfc_main$2 = _defineComponent$2({
    __name: "Dialog",
    setup(__props) {
      const isOpen = ref(false);
      const openDialog = () => {
        isOpen.value = true;
      };
      const closeDialog = () => {
        isOpen.value = false;
      };
      return (_ctx, _cache) => {
        return _openBlock$2(), _createElementBlock$1("div", null, [
          _renderSlot(_ctx.$slots, "trigger", {
            openDialog
          }),
          _createVNode$1(_Transition, {
            "enter-active-class": "transition-opacity duration-300 ease-out",
            "leave-active-class": "transition-opacity duration-300 ease-in",
            "enter-from-class": "opacity-0",
            "enter-to-class": "opacity-100",
            "leave-from-class": "opacity-100",
            "leave-to-class": "opacity-0"
          }, {
            default: _withCtx$1(() => [
              isOpen.value ? (_openBlock$2(), _createElementBlock$1("div", _hoisted_1$1, [
                _createElementVNode$1("div", {
                  class: "fixed inset-0 bg-black bg-opacity-50",
                  onClick: closeDialog
                }),
                _createElementVNode$1("div", _hoisted_2$1, [
                  _renderSlot(_ctx.$slots, "content", {
                    closeDialog
                  })
                ])
              ])) : _createCommentVNode("", true)
            ]),
            _: 3
          })
        ]);
      };
    }
  });
  const { defineComponent: _defineComponent$1 } = await importShared("vue");
  const { createTextVNode: _createTextVNode, withCtx: _withCtx, createVNode: _createVNode, withModifiers: _withModifiers, createElementVNode: _createElementVNode, unref: _unref, renderList: _renderList, Fragment: _Fragment, openBlock: _openBlock$1, createElementBlock: _createElementBlock, toDisplayString: _toDisplayString } = await importShared("vue");
  const _hoisted_1 = {
    class: "flex flex-row items-center justify-between"
  };
  const _hoisted_2 = [
    "href"
  ];
  const _sfc_main$1 = _defineComponent$1({
    __name: "SideBar",
    setup(__props) {
      const linkProvider2 = useLinks();
      const links = linkProvider2.links;
      return (_ctx, _cache) => {
        return _openBlock$1(), _createElementBlock(_Fragment, null, [
          _createElementVNode("div", _hoisted_1, [
            _createVNode(_sfc_main$4, null, {
              default: _withCtx(() => _cache[0] || (_cache[0] = [
                _createTextVNode("Links")
              ])),
              _: 1,
              __: [
                0
              ]
            }),
            _createVNode(_sfc_main$2, null, {
              trigger: _withCtx(({ openDialog }) => [
                _createVNode(_sfc_main$3, {
                  title: "Add",
                  onClick: openDialog
                }, null, 8, [
                  "onClick"
                ])
              ]),
              content: _withCtx(({ closeDialog }) => [
                _createVNode(_sfc_main$5, {
                  onSubmit: closeDialog
                }, null, 8, [
                  "onSubmit"
                ]),
                _createVNode(_sfc_main$6, {
                  onClick: _withModifiers(($event) => closeDialog(), [
                    "stop"
                  ]),
                  className: "w-full mt-1"
                }, {
                  default: _withCtx(() => _cache[1] || (_cache[1] = [
                    _createTextVNode(" Close ")
                  ])),
                  _: 2,
                  __: [
                    1
                  ]
                }, 1032, [
                  "onClick"
                ])
              ]),
              _: 1
            })
          ]),
          (_openBlock$1(true), _createElementBlock(_Fragment, null, _renderList(_unref(links), (link) => {
            return _openBlock$1(), _createElementBlock("div", {
              key: link.id,
              class: "mb-2 dark:text-white"
            }, [
              _cache[2] || (_cache[2] = _createTextVNode(" \u2022 ")),
              (_openBlock$1(), _createElementBlock("a", {
                key: link.href,
                href: link.href,
                target: "_blank",
                class: "cursor-pointer text-blue-500 hover:text-blue-700 underline"
              }, _toDisplayString(link.title || link.href), 9, _hoisted_2))
            ]);
          }), 128))
        ], 64);
      };
    }
  });
  const { defineComponent: _defineComponent } = await importShared("vue");
  const { openBlock: _openBlock, createBlock: _createBlock } = await importShared("vue");
  _sfc_main = _defineComponent({
    ...{
      name: "LinkInfoSidebar"
    },
    __name: "Sidebar",
    props: {
      parentId: String
    },
    setup(__props) {
      const props = __props;
      console.log("SideBar instance: ", props.parentId);
      linkProvider(props.parentId ?? "test");
      return (_ctx, _cache) => {
        return _openBlock(), _createBlock(_sfc_main$1);
      };
    }
  });
});
export {
  _sfc_main as _,
  __tla
};
