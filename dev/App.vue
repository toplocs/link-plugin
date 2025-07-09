<template>
  <div class="p-8 max-w-6xl mx-auto">
    <div class="flex items-center justify-between border-b-2 border-blue-600 pb-2 mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Plugin Development Environment</h1>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Mode:</span>
        <span 
          class="px-3 py-1 rounded-full text-sm font-semibold"
          :class="isPreviewMode ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
        >
          {{ isPreviewMode ? 'Preview (Federation)' : 'Dev (Hot Reload)' }}
        </span>
      </div>
    </div>
    
    <!-- Plugin Components Showcase (Settings slot = main, InfoView slot = sidebar) -->
    <div class="flex gap-8 mb-12 min-h-96 overflow-x-auto">
      <div class="flex-1 min-w-96">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Main Content Area</h2>
        <p class="text-gray-600 mb-2">Slot: Settings</p>
        <p class="text-gray-600 mb-4">Settings Component</p>
        <div class="border-2 border-blue-600 rounded-lg p-4 bg-white min-h-72">
          <!-- Dev mode: Direct component rendering -->
          <DirectComponent
            v-if="components?.Settings"
            :component="components.Settings"
          />
          <!-- Preview mode: Federated component via PluginComponent -->
          <PluginComponent 
            v-else
            :plugin="{name: 'link-plugin', url: 'http://localhost:3006/assets/plugin.js'}"
            position="Settings" 
          />
        </div>
      </div>
      
      <div class="w-72 min-w-72 flex-shrink-0">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Sidebar</h2>
        <p class="text-gray-600 mb-2">Slot: InfoView</p>
        <p class="text-gray-600 mb-4">Sidebar Component</p>
        <div class="border-2 border-blue-600 rounded-lg p-4 bg-white min-h-72">
          <!-- Dev mode: Direct component rendering -->
          <DirectComponent
            v-if="components?.Sidebar"
            :component="components.Sidebar"
          />
          <!-- Preview mode: Federated component via PluginComponent -->
          <PluginComponent 
            v-else
            :plugin="{name: 'link-plugin', url: 'http://localhost:3006/assets/plugin.js'}"
            position="Sidebar" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePluginDev } from './composables/usePluginDev';
import DirectComponent from './components/DirectComponent.vue';
import PluginComponent from './components/PluginComponent.vue';

import {
  __federation_method_getRemote as getRemote,
  __federation_method_setRemote as setRemote,
  __federation_method_unwrapDefault as unwrapModule,
} from 'virtual:__federation__';

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

// Mode detection
const isPreviewMode = ref(false);
const pluginConfig = ref<BasePluginConfig | null>(null);
const components = ref({});

// Check if preview mode (plugin server at 3006) is running
async function detectMode() {
  try {
    const response = await fetch('http://localhost:3006/assets/plugin.js');
    isPreviewMode.value = response.ok;
  } catch {
    isPreviewMode.value = false;
  }
}

const loadPluginConfig = async () => {
  try {
    const plugin = {
      name: 'link-plugin',
      url: 'http://localhost:3006/assets/plugin.js',
    };

    setRemote(plugin.name, {
      url: () => Promise.resolve(plugin.url),
      format: 'esm',
      from: 'vite'
    });

    const module = await getRemote('link-plugin', `./PluginConfig`);
    const component = await unwrapModule(module);
    return component;
  } catch (e) {
    console.error('Failed to load remote plugin config:', e);
  }
};

// Load plugin in appropriate mode
async function loadPlugin() {
  await detectMode();
  
  if (isPreviewMode.value) {
    pluginConfig.value = await loadPluginConfig();
  } else {
    console.log('Dev mode: Loading direct imports from ../src');
    await loadDirectImports();
  }
  console.log("Plugin Config: ", pluginConfig.value);
}

// Load components directly from source in dev mode
async function loadDirectImports() {
  try {
    const [configModule, sidebarModule, settingsModule] = await Promise.all([
      import('../src/index.ts'),
      import('../src/views/SidebarView.vue'),
      import('../src/views/SettingsView.vue')
    ]);
    console.log('Direct imports loaded:', configModule);

    pluginConfig.value = configModule.default;
    components.value = {
      Sidebar: sidebarModule.default,
      Settings: settingsModule.default
    };
  } catch (error) {
    console.error('Failed to load direct imports:', error);
  }
}

onMounted(() => {
  loadPlugin();
});

</script>

