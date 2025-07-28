<template>
  <PluginInfoPage
    :plugin-config="pluginConfig"
    icon="🔗"
    :about="about"
    :features="features"
    :endpoints="endpoints"
    :development="development"
    :slot-descriptions="slotDescriptions"
  />
</template>

<script setup lang="ts">
import { PluginInfoPage } from '@toplocs/plugin-sdk'
import pluginConfig from './index'

const about = `
The Link Plugin enables communities to share, organize, and discover valuable resources through curated link collections. It seamlessly integrates with TopLocs spheres to provide topic-specific link management with rich metadata and Gun.js P2P synchronization.
`

const features = [
  {
    icon: '🔖',
    title: 'Link Collection',
    description: 'Save and organize links with titles, descriptions, and automatic metadata extraction'
  },
  {
    icon: '📱',
    title: 'Share Extension',
    description: 'Built-in share extension for easy link saving from any browser tab'
  },
  {
    icon: '🏷️',
    title: 'Topic Integration',
    description: 'Links are automatically associated with the current topic or location context'
  },
  {
    icon: '🔄',
    title: 'P2P Sync',
    description: 'Real-time synchronization across all sphere members using Gun.js'
  },
  {
    icon: '👁️',
    title: 'Rich Previews',
    description: 'Automatic extraction of link metadata including title, description, and preview images'
  },
  {
    icon: '⚙️',
    title: 'Flexible Settings',
    description: 'Configure link display preferences and sharing options per sphere'
  }
]

const endpoints = {
  plugin: 'http://localhost:3006/assets/plugin.js',
  landing: 'https://toplocs.github.io/link-plugin',
  demo: 'http://localhost:3000'
}

const development = {
  stack: ['Vue 3', 'TypeScript', 'Gun.js', 'Tailwind CSS'],
  setup: `pnpm install && pnpm dev`,
  urls: [
    { label: 'GitHub Repository', url: 'https://github.com/toplocs/link-plugin' },
    { label: 'Plugin Development', url: 'http://localhost:3006' }
  ]
}

const slotDescriptions = {
  'Topic → Info → Sidebar': 'Sidebar: Displays recent links and quick add functionality',
  'Topic → Settings → Content': 'Content: Link sharing preferences and display options',
  'Location → Info → Sidebar': 'Sidebar: Location-specific link collections',
  'Location → Settings → Content': 'Content: Location-based link settings'
}
</script>