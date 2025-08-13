import { t as tt, __tla as __tla_0 } from "./style-CHhREwvR.js";
import pluginConfig from "./__federation_expose_PluginConfig-mw7Nj2lz.js";
import { _ as _sfc_main$1, __tla as __tla_1 } from "./Sidebar.vue_vue_type_script_setup_true_lang-X2OWzd_f.js";
import { _ as _sfc_main, __tla as __tla_2 } from "./Content.vue_vue_type_script_setup_true_lang-D7Q-ZW6O.js";
Promise.all([
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  const devConfig = {
    pluginConfig,
    components: {
      Sidebar: _sfc_main$1,
      Content: _sfc_main
    }
  };
  const app = tt(devConfig);
  app.mount("#plugin-dev");
});
