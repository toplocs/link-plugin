import { n as nt, __tla as __tla_0 } from "./style-CHhREwvR.js";
import { importShared, __tla as __tla_1 } from "./__federation_fn_import-dmqIiFee.js";
import pluginConfig from "./__federation_expose_PluginConfig-mw7Nj2lz.js";
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
  })()
]).then(async () => {
  const { defineComponent: _defineComponent } = await importShared("vue");
  const { unref: _unref, openBlock: _openBlock, createBlock: _createBlock } = await importShared("vue");
  const about = `
The Link Plugin enables communities to share, organize, and discover valuable resources through curated link collections. It seamlessly integrates with TopLocs spheres to provide topic-specific link management with rich metadata and Gun.js P2P synchronization.
`;
  const _sfc_main = _defineComponent({
    __name: "InfoPage",
    setup(__props) {
      const features = [
        {
          icon: "\u{1F516}",
          title: "Link Collection",
          description: "Save and organize links with titles, descriptions, and automatic metadata extraction"
        },
        {
          icon: "\u{1F4F1}",
          title: "Share Extension",
          description: "Built-in share extension for easy link saving from any browser tab"
        },
        {
          icon: "\u{1F3F7}\uFE0F",
          title: "Topic Integration",
          description: "Links are automatically associated with the current topic or location context"
        },
        {
          icon: "\u{1F504}",
          title: "P2P Sync",
          description: "Real-time synchronization across all sphere members using Gun.js"
        },
        {
          icon: "\u{1F441}\uFE0F",
          title: "Rich Previews",
          description: "Automatic extraction of link metadata including title, description, and preview images"
        },
        {
          icon: "\u2699\uFE0F",
          title: "Flexible Settings",
          description: "Configure link display preferences and sharing options per sphere"
        }
      ];
      const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "");
      const isDevelopment = window.location.hostname === "localhost";
      const endpoints = {
        plugin: `${baseUrl}/plugin.js`,
        landing: baseUrl,
        demo: "https://toplocs.github.io/tribelike/"
      };
      const development = {
        stack: [
          "Vue 3",
          "TypeScript",
          "Gun.js",
          "Tailwind CSS"
        ],
        setup: `pnpm install && pnpm dev`,
        urls: [
          {
            label: "GitHub Repository",
            url: "https://github.com/toplocs/link-plugin"
          },
          {
            label: isDevelopment ? "Local Development" : "Plugin Landing Page",
            url: baseUrl
          }
        ]
      };
      const slotDescriptions = {
        "Topic \u2192 Info \u2192 Sidebar": "Sidebar: Displays recent links and quick add functionality",
        "Topic \u2192 Settings \u2192 Content": "Content: Link sharing preferences and display options",
        "Location \u2192 Info \u2192 Sidebar": "Sidebar: Location-specific link collections",
        "Location \u2192 Settings \u2192 Content": "Content: Location-based link settings"
      };
      return (_ctx, _cache) => {
        return _openBlock(), _createBlock(_unref(nt), {
          "plugin-config": _unref(pluginConfig),
          icon: "\u{1F517}",
          about,
          features,
          endpoints,
          development,
          "slot-descriptions": slotDescriptions
        }, null, 8, [
          "plugin-config"
        ]);
      };
    }
  });
  const { createApp } = await importShared("vue");
  createApp(_sfc_main).mount("#app");
});
