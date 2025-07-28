/**
 * Main plugin entry point
 * This file defines the plugin configuration and exports it for use in TopLocs
 */

import type { BasePluginConfig } from '@toplocs/plugin-sdk'

const pluginConfig: BasePluginConfig = {
  id: 'link_plugin',
  name: 'Link',
  url: 'http://localhost:3006/assets/plugin.js',
  version: '1.0.0',
  description: 'Share and organize links within TopLocs spheres',
  author: 'TopLocs Team',
  slots: [
    { entity: 'Topic', page: 'Info', slot: 'Sidebar', component: 'Sidebar' },
    { entity: 'Topic', page: 'Settings', slot: 'Content', component: 'Content' },
    { entity: 'Location', page: 'Info', slot: 'Sidebar', component: 'Sidebar' },
    { entity: 'Location', page: 'Settings', slot: 'Content', component: 'Content' }
  ]
};

export default pluginConfig;
