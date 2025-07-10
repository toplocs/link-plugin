/**
 * Main plugin entry point
 * This file defines the plugin configuration and exports it for use in TopLocs
 */

interface BasePluginConfig {
  id: string;
  name: string;
  url: string;
  version?: string;
  description?: string;
  author?: string;
  slots: Array<PluginSlot>;
}

interface PluginSlot {
  slot: string;
  component: string;
}

const pluginConfig: BasePluginConfig = {
  id: 'link_plugin',
  name: 'Link',
  url: 'http://localhost:3006/assets/plugin.js',
  version: '1.0.0',
  description: 'Share and organize links within TopLocs spheres',
  author: 'TopLocs Team',
  slots: [
    { slot: 'Info', component: 'Sidebar' },
    { slot: 'Settings', component: 'Content' }
  ]
};

export default pluginConfig;
