# Link Plugin for TopLocs

## Status: Decoupled Plugin Architecture
- **Architecture**: Federated Plugin with Module Federation
- **Last Updated**: January 2025
- **Maturity**: Active Development
- **Live Demo**: https://toplocs.github.io/link-plugin/

## 🚀 Getting Started

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview built plugin
pnpm preview
```

**Development URLs:**
- **Dev Environment**: http://localhost:4173 (main development interface)
- **Plugin Server**: http://localhost:3006 (federated plugin with hot-reload)
- **Plugin URL**: http://localhost:3006/plugin.js (federation endpoint)

### Available Commands

- `pnpm dev` - Start development server with hot-reload
- `pnpm build` - Build plugin for production
- `pnpm preview` - Preview built plugin locally
- `pnpm test` - Run tests
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run ESLint and fix issues

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

## 🚀 Deployment

### GitHub Pages Deployment

This plugin automatically deploys to GitHub Pages via GitHub Actions:

- **Live Demo**: https://toplocs.github.io/link-plugin/
- **Deployment**: Automatic on push to main branch
- **Build Output**: Only the `dist` folder (static JS files) is deployed

### Manual Deployment

```bash
# Build for production
pnpm build

# Deploy dist/ folder to your hosting service
# The plugin will be available at your-domain.com/plugin.js
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

1. **Start Development**:
   ```bash
   pnpm dev
   ```
   This starts the development server with hot-reload

2. **Edit Plugin Code**:
   - Modify files in `src/` 
   - Changes hot-reload automatically
   - View updates in the browser

3. **Test Plugin**:
   - Open `http://localhost:4173` in your browser
   - Test plugin components in the development environment
   - Verify plugin loading and functionality

4. **Build and Preview**:
   ```bash
   pnpm build
   pnpm preview
   ```
   Test the built plugin locally before deployment

## 🧩 Plugin Federation

### Exposed Modules
The plugin exposes these federated modules:

```javascript
// vite.config.ts federation setup
exposes: {
  './PluginConfig': './src/index.ts',           // Plugin configuration
  './InfoSidebar': './src/views/info/Sidebar.vue',     // Info sidebar component
  './SettingsContent': './src/views/settings/Content.vue',   // Settings content component
}
```

### Dynamic Loading in Development
The dev environment loads plugins dynamically:

```javascript
// dev/components/PluginEnvironment.vue - Federation loading with fallback
try {
  // Try to load as federated modules
  const sidebarModule = await import('link-plugin/InfoSidebar');
  const settingsModule = await import('link-plugin/SettingsContent');
  
  SidebarComponent.value = sidebarModule.default;
  SettingsComponent.value = settingsModule.default;
} catch (error) {
  // Fallback to local components for development
  const { default: SidebarView } = await import('../src/views/info/Sidebar.vue');
  const { default: SettingsView } = await import('../src/views/settings/Content.vue');
  
  SidebarComponent.value = SidebarView;
  SettingsComponent.value = SettingsView;
}
```

## 🚪 Entry Points

### Plugin Entry Point (Production)
- **File**: `src/plugin/index.ts`
- **Purpose**: Main plugin registration and federation exports
- **Build**: Configured in `vite.config.ts` → `build.lib.entry`
- **Federation**: Exposes components via `./PluginConfig`, `./InfoSidebar`, `./SettingsContent`

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

# Test components in browser
# Check browser console for any errors
```

### 2. Integration Testing
```bash
# Build plugin for integration
pnpm build

# Preview built plugin
pnpm preview

# Test plugin federation loading
```

### 3. Production Deployment
```bash
# Build plugin for production
pnpm build

# Plugin assets output to dist/
# Deploy via GitHub Actions or manual deployment
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
5. **Run tests and linting** - use `pnpm test` and `pnpm lint` before committing

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
