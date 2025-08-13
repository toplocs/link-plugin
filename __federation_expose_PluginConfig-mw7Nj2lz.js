const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "");
const pluginConfig = {
  id: "link_plugin",
  name: "Link",
  url: `${baseUrl}/plugin.js`,
  version: "1.0.0",
  description: "Share and organize links within TopLocs spheres",
  author: "TopLocs Team",
  slots: [
    { entity: "Topic", page: "Info", slot: "Sidebar", component: "InfoSidebar" },
    { entity: "Topic", page: "Settings", slot: "Content", component: "SettingsContent" },
    { entity: "Location", page: "Info", slot: "Sidebar", component: "InfoSidebar" },
    { entity: "Location", page: "Settings", slot: "Content", component: "SettingsContent" }
  ]
};
export {
  pluginConfig as default
};
