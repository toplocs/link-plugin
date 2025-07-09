# Link Plugin for TopLocs

## Status: Decoupled Plugin Architecture
- **Architecture**: Federated P## 🚀 Getting Started

### Hot-Reload Development Setup

The project uses a **dual-server architecture** for optimal development experience:

1. **Plugin Server** (Port 3006): Serves the federated plugin with hot-reload
2. **Dev Environment** (Port 3005): Loads and showcases the plugin dynamically

```bash
# Install dependencies
pnpm install

# Start both servers simultaneously (recommended)
pnpm dev:full

# Or start individually:
# Terminal 1: Plugin server with hot-reload
pnpm dev:plugin

# Terminal 2: Dev environment  
pnpm dev
```

**Development URLs:**
- **Dev Environment**: http://localhost:3005 (main development interface)
- **Plugin Server**: http://localhost:3006 (federated plugin with hot-reload)
- **Plugin URL**: http://localhost:3006/plugin.js (federation endpoint)

### Hot-Reload Benefits

- ✅ **Instant Updates**: Changes to plugin code hot-reload automatically
- ✅ **Federation Testing**: Real federated module loading during development  
- ✅ **Component Isolation**: Test plugin components independently
- ✅ **Environment Separation**: Clear separation between dev tools and plugin logicironment Separation  
- **Last Updated**: January 2025
- **Maturity**: Active Development

## Overview
The Link Plugin enables users to share and organize links within TopLocs spheres. It features a modern decoupled architecture with separate development and plugin environments, using Module Federa### Core Plugin Registration
- **`src/config.ts`**: Plugin configuration using the SDK's fluent API
- **`src/gun.ts`**: Gun.js instance configuration
- **`src/plugin/index.ts`**: Main plugin entry point using SDK directly

### Development Environment
- **`dev/composables/usePluginDev.ts`**: Development composable using SDK directly
- **`dev/App.vue`**: Development interface with plugin preview and registration controls

### Key Architecture:
- **Direct SDK Usage**: No wrapper services or composables, uses SDK directly
- **Simplified Structure**: Removed redundant types and wrapper servicesamic loading and configurable plugin registration.

## 🔧 Plugin Registration System

### Configurable URLs
The plugin URL is computed based on the environment:

```typescript
// Development: http://localhost:3005/assets/plugin.js
// Production: configurable via VITE_PLUGIN_URL environment variable
```

### Environment Configuration
Configure the plugin URL using environment variables:

```bash
# Development (default)
VITE_DEV=true VITE_PORT=3005 VITE_HOST=localhost

# Custom development port  
VITE_DEV=true VITE_PORT=3005 VITE_HOST=localhost

# Production deployment
VITE_PLUGIN_URL=https://your-domain.com/plugins/link-plugin/plugin.js
```

### Development Environment Features
The dev environment (`/dev`) provides:

1. **Registration Status Display**: Shows current plugin registration info
2. **Auto-Registration**: Automatically registers the plugin if not found
3. **Plugin Discovery**: Lists all registered plugins for debugging
4. **Manual Controls**: Buttons to refresh or re-register the plugin
5. **Component Testing**: Live preview of federated components

### Package.json Scripts
```bash
# Quick start (recommended) - Uses startup script
./dev-start.sh

# Standard development environment only
pnpm dev

# Production build
pnpm build

# Start plugin server (after build)  
pnpm run dev:serve

# Run both dev environment and plugin server
pnpm run dev:full
```

## 🏗️ Architecture Overview

### Decoupled Structure
```
link-plugin/
├── dev/                    # 🔧 Development Environment
│   ├── index.html         # Dev HTML entry point
│   ├── main.ts           # Dev bootstrap (no plugin logic)
│   └── App.vue           # Dev showcase with federation loading
├── src/                   # 🧩 Plugin Source Code
│   ├── plugin/           # Federation entry points
│   │   ├── index.ts      # Plugin registration
│   │   ├── Sidebar.ts    # Sidebar component export
│   │   └── Settings.ts   # Settings component export
│   ├── views/            # Plugin components
│   ├── main.ts           # Plugin standalone entry
│   └── ...               # Core plugin code
└── vite.config.ts        # Federation configuration
```

### Technology Stack
- **Frontend**: Vue 3, TypeScript, Tailwind CSS
- **P2P Data**: Gun.js (distributed graph database)
- **Federation**: Module Federation for dynamic plugin loading
- **Build**: Vite with federation plugin
- **Package Manager**: pnpm

## 🚀 Getting Started

### Development Environment
Start the development environment that loads the plugin dynamically:

```bash
# Install dependencies
pnpm install

# Start development with federation
pnpm dev
```

This starts the Vite dev server on `http://localhost:3005` with:
- **Development showcase** environment using PluginComponent
- **Plugin registration monitoring** and controls  
- **Component federation testing** via the plugin server
- **Live plugin status** information

**Two-Server Development Setup:**
- **Dev Environment**: `http://localhost:3005` - Serves the development interface
- **Plugin Server**: `http://localhost:3006/assets/plugin.js` - Serves the built federated plugin

The development environment uses `PluginComponent` to dynamically load the federated plugin from the plugin server, simulating how it would work in production.

### Development Workflow

1. **Start Hot-Reload Development**:
   ```bash
   pnpm dev:full
   ```
   This starts both the plugin server (3006) and dev environment (3005)

2. **Edit Plugin Code**:
   - Modify files in `src/` 
   - Changes hot-reload automatically in the plugin server
   - Dev environment updates via federation

3. **Monitor Plugin Registration**:
   - Open `http://localhost:3005` in your browser
   - Check the "Plugin Registration Information" section
   - View current registration status and URL
   - See all registered plugins in the system

4. **Plugin Status Indicators**:
   - ✅ **Registered**: Plugin is properly registered and available
   - ⚠️ **Not Found**: Plugin needs registration (auto-triggered)
   - ❌ **Error**: Registration failed (manual retry available)

5. **Manual Controls**:
   - **Refresh Info**: Reload registration status
   - **Re-register Plugin**: Force re-registration
   - **Register Plugin Now**: Initial registration if not found

6. **Component Testing**:
   - Test federated components in the showcase area
   - Verify plugin loading from registration URL
   - Debug component interactions with hot-reload

### Plugin-Only Development
Work directly with the plugin components:

```bash
# Build the plugin for federation
pnpm build

# Preview the built plugin
pnpm preview
```

The built plugin exposes federated modules that can be consumed by other applications.

## 🧩 Plugin Federation

### Exposed Modules
The plugin exposes these federated modules:

```javascript
// vite.config.ts federation setup
exposes: {
  './Sidebar': './src/plugin/Sidebar.ts',     // Link navigation sidebar
  './Settings': './src/plugin/Settings.ts',   // Plugin settings dialog  
  './Plugin': './src/plugin/index.ts',        // Plugin registration
}
```

### Dynamic Loading in Development
The dev environment loads plugins dynamically:

```javascript
// dev/App.vue - Federation loading with fallback
try {
  // Try to load as federated modules
  const sidebarModule = await import('link-plugin/Sidebar');
  const settingsModule = await import('link-plugin/Settings');
  
  SidebarComponent.value = sidebarModule.default;
  SettingsComponent.value = settingsModule.default;
} catch (error) {
  // Fallback to local components for development
  const { default: SidebarView } = await import('../src/views/SidebarView.vue');
  const { default: SettingsView } = await import('../src/views/SettingsView.vue');
  
  SidebarComponent.value = SidebarView;
  SettingsComponent.value = SettingsView;
}
```

## 🚪 Entry Points

### Plugin Entry Point (Production)
- **File**: `src/plugin/index.ts`
- **Purpose**: Main plugin registration and federation exports
- **Build**: Configured in `vite.config.ts` → `build.lib.entry`
- **Federation**: Exposes components via `./Plugin`, `./Sidebar`, `./Settings`

### Development Entry Point
- **File**: `dev/main.ts` 
- **Purpose**: Development environment for testing and debugging
- **HTML**: `dev/index.html`
- **Server**: Configured in `vite.config.ts` → `root: './dev'` (dev mode)

## 🔧 Development Workflows

### 1. Plugin Development Workflow
```bash
# Start development environment
pnpm dev

# Edit plugin components in src/
# Changes auto-reload in dev environment

# Test federation loading
# Check browser console for federation status
```

### 2. Integration Testing
```bash
# Build plugin for integration
pnpm build

# Test in host application
# Plugin available at http://localhost:3005/assets/plugin.js
```

### 3. Production Deployment
```bash
# Build plugin for production
pnpm build

# Plugin assets output to dist/
# Deploy dist/ to CDN or static hosting
```

## 📦 Plugin Deployment

### Build Output Structure
```
dist/
├── assets/
│   ├── plugin.js          # Federation entry point
│   ├── Sidebar-[hash].js  # Sidebar component
│   ├── Settings-[hash].js # Settings component
│   └── ...                # Other assets
└── index.html            # Plugin standalone page
```

### Deployment Options

#### 1. CDN Deployment
```bash
# Build for production
pnpm build

# Upload dist/ to CDN
# Update plugin URL in host application
```

#### 2. Static Hosting
```bash
# Build for production
pnpm build

# Deploy to static hosting (Netlify, Vercel, etc.)
# Use dist/ as deployment directory
```

#### 3. Integration with TopLocs
```javascript
// Host application loads plugin
const pluginUrl = 'https://your-cdn.com/link-plugin/assets/plugin.js';

// Dynamic import
const linkPlugin = await import(pluginUrl);
```

## 🗄️ Data Architecture

### Gun.js Integration
```javascript
// Links stored in Gun.js distributed graph
gun.get('links').get(sphereId).get(linkId)

// Link categories
gun.get('links').get(sphereId).get('categories')

// User link collections  
gun.user().get('links').get(collectionId)

// Real-time link updates
gun.get('links').get(sphereId).on(data => {
  // Update link list
})
```

### Plugin Registration
```javascript
// src/plugin/index.ts - Automatic registration
const registerPlugin = () => {
  const chain = gun.get('link_plugin');
  chain.once(data => {
    if (!data) {
      const node = chain.put({
        id: 'link_plugin',
        name: 'Link',
        url: 'http://localhost:3005/assets/plugin.js',
      });

      const slots = gun.get('link_plugin/slots');
      slots.set({ slot: 'InfoView', component: 'Sidebar' });
      slots.set({ slot: 'Settings', component: 'Settings' });
      
      node.get('slots').put(slots);
      gun.get('plugins').set(node);
    }
  });
};
```

## 🎯 Key Benefits of Decoupled Architecture

### 1. Clear Separation of Concerns
- **Development environment** (`dev/`) is purely for showcasing and testing
- **Plugin code** (`src/`) contains only business logic and components
- **No mixing** of dev tooling with plugin functionality

### 2. Federation-First Design
- **Dynamic loading** of plugin components
- **Shared dependencies** (Vue, TailwindCSS) for optimal bundle size
- **Runtime integration** with host applications

### 3. Flexible Development
- **Rapid iteration** with hot reload in dev environment
- **Isolated testing** of plugin components
- **Multiple deployment targets** (standalone, federated, embedded)

### 4. Production Ready
- **Optimized builds** with proper code splitting
- **CDN-friendly** static assets
- **Version management** through federation

## 🚨 Troubleshooting

### Federation Loading Issues
```javascript
// Check browser console for federation errors
// Verify plugin URL is accessible
// Check CORS configuration for cross-origin loading
```

### Development Server Issues
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules
pnpm install

# Check port conflicts (default: 3005)
```

### Build Issues
```bash
# Type check
pnpm type-check

# Lint code
pnpm lint

# Clean build
rm -rf dist && pnpm build
```

## 🔮 Future Enhancements

### Pure P2P Architecture
- [ ] Client-side link preview generation
- [ ] Distributed link metadata cache  
- [ ] IPFS integration for preview images
- [ ] Offline-first link management

### Advanced Federation
- [ ] Plugin hot-swapping in host applications
- [ ] Version compatibility checks
- [ ] Automatic plugin updates
- [ ] Plugin dependency management

## 🤝 Contributing

### Development Setup
```bash
# Clone repository
git clone <repository-url>
cd link-plugin

# Install dependencies
pnpm install

# Start development
pnpm dev
```

### Contributing Guidelines
1. **Keep dev and plugin code separate** - don't mix development tooling with plugin logic
2. **Test federation loading** - ensure components load properly as federated modules
3. **Follow TypeScript patterns** - maintain type safety throughout
4. **Update documentation** - keep README and comments current

### Areas for Contribution
- Enhanced link preview generation
- Better categorization and tagging
- Improved collaborative features
- Performance optimizations
- Mobile-responsive design improvements

## 📚 Related Documentation
- [TopLocs Plugin Development Guide](https://github.com/toplocs/tribelike/blob/main/docs/plugin-development.md)
- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Gun.js Documentation](https://gun.eco/docs/)

## 📄 License
MIT License - See the main TopLocs project for details.

## 🏗️ Architecture Components

### Core Plugin Registration
- **`src/composables/usePluginRegistration.ts`**: Production-ready plugin registration functionality
- **`src/services/PluginManager.ts`**: Core registration service handling Gun.js interactions
- **`src/config/plugin.ts`**: Environment-aware configuration and URL computation

### Development Environment
- **`dev/composables/usePluginDev.ts`**: Development-specific debugging and management features
- **`dev/App.vue`**: Development interface with plugin preview and registration controls

### Key Differences:
- **Production composable** (`usePluginRegistration`): Lightweight, essential registration functions only
- **Development composable** (`usePluginDev`): Full debugging features, reactive state, UI integration

## 🎯 Simplified Architecture (Post-SDK)

### Plugin Core
- **`src/config.ts`**: Plugin configuration using SDK's fluent API
- **`src/gun.ts`**: Gun.js instance for decentralized storage
- **`src/plugin/index.ts`**: Main plugin entry point

### Plugin SDK (Reusable)
- **`src/plugin-sdk/`**: Complete SDK for plugin development
  - `types.ts` - Core type definitions
  - `BasePluginManager.ts` - Abstract plugin manager
  - `GunPluginManager.ts` - Gun.js implementation
  - `environment.ts` - Environment utilities
  - `composables.ts` - Vue composables
  - `utils.ts` - Development utilities

### Development Environment
- **`dev/composables/usePluginDev.ts`**: Dev composable using SDK
- **`dev/App.vue`**: Development interface

### Benefits of Simplification:
- ❌ **Removed**: Custom types (use SDK types)
- ❌ **Removed**: Wrapper services (use SDK directly)  
- ❌ **Removed**: Wrapper composables (use SDK directly)
- ✅ **Direct SDK Usage**: Cleaner, less boilerplate
- ✅ **Reusable SDK**: Can be extracted for other plugins

## 🧰 Plugin SDK

This project includes a complete **TopLocs Plugin SDK** that can be reused across multiple plugins:

### **SDK Components:**
- **`src/plugin-sdk/types.ts`**: Core plugin type definitions
- **`src/plugin-sdk/BasePluginManager.ts`**: Abstract plugin manager base class
- **`src/plugin-sdk/GunPluginManager.ts`**: Gun.js implementation 
- **`src/plugin-sdk/environment.ts`**: Environment detection utilities
- **`src/plugin-sdk/composables.ts`**: Vue composables for plugin development
- **`src/plugin-sdk/utils.ts`**: Plugin development utilities
- **`src/plugin-sdk/index.ts`**: Main SDK exports

### **Key Benefits:**
- ✅ **Standardized Types**: Common interfaces across all plugins
- ✅ **Reusable Managers**: Abstract base class with concrete implementations
- ✅ **Environment Helpers**: URL generation and validation utilities  
- ✅ **Vue Integration**: Ready-to-use composables for registration
- ✅ **Development Tools**: Debugging and validation utilities
- ✅ **Configuration Builder**: Fluent API for plugin setup

### **Usage Example:**
```typescript
import { 
  createPluginConfig, 
  GunPluginManager, 
  usePluginRegistration 
} from './plugin-sdk';

// Create plugin configuration
const config = createPluginConfig()
  .setId('my_plugin')
  .setName('My Plugin')
  .addSlot('Settings', 'MyComponent')
  .build();

// Create manager and register
const manager = new GunPluginManager(gun, config);
const { ensureRegistration } = usePluginRegistration(manager);
```

See [`src/plugin-sdk/README.md`](src/plugin-sdk/README.md) for complete SDK documentation.
