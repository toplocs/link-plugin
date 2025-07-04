# Link Plugin for TopLocs

## Status: Hybrid Architecture (Gun.js + Backend)
- **P2P Migration**: ⭐⭐ Gun.js integrated, no gun branch
- **Last Updated**: June 2025
- **Maturity**: Active Development

## Overview
The Link Plugin enables users to share and organize links within TopLocs spheres. It provides link previews, categorization, and collaborative bookmarking for community knowledge sharing.

## Architecture

### Current State (Hybrid)
```
Browser Client → Gun.js → P2P Network
       ↓                      ↓
   Link Preview API      Gun Relay
       ↓                      ↓
   Express API ← → Server with Prisma
       ↓
   PostgreSQL
```

### Technology Stack
- **Frontend**: Vue 3, TypeScript, Tailwind CSS
- **P2P**: Gun.js (client-side)
- **Backend**: Express.js, Prisma ORM, PostgreSQL
- **Build**: Vite, Module Federation

## Features
- Link sharing and organization
- Automatic link previews
- Categorization and tagging
- Settings dialog for customization
- Real-time updates via Gun.js
- Collaborative bookmarking

## Gun.js Integration
```javascript
// Links stored in Gun
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

## Development

### Setup
```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build plugin
pnpm build
```

### Module Federation Exposes
- `./Sidebar`: Link navigation sidebar
- `./Settings`: Plugin settings dialog
- `./LinkView`: Main link management view
- `./LinkList`: Link list component
- `./LinkPreview`: Link preview component

## Implementation Details
- Minimal functionality currently implemented
- Settings dialog system in place
- Basic link storage structure
- Preview generation handled on backend
- Real-time synchronization via Gun.js

## Migration Status to Pure P2P
- ✅ Gun.js for data storage
- ✅ Settings management
- ❌ Backend for link preview generation
- ❌ Centralized link metadata fetching
- ❌ Server-side validation

## Known Issues
- Link preview requires backend
- No offline preview caching
- Limited metadata extraction
- Backend dependency for storage

## Future: Pure P2P Architecture
1. Client-side link preview (CORS proxy?)
2. Distributed link metadata cache
3. Gun.js only storage
4. Peer-shared link previews
5. IPFS for preview image storage

## Security Considerations
- Validate URLs client-side
- Sanitize preview content
- Prevent tracking pixels
- Privacy-respecting preview fetch
- No persistent link tracking

## Contributing
This plugin needs help migrating to pure P2P architecture. Contributions welcome for:
- Removing backend dependencies
- Client-side link preview generation
- Enhanced categorization features
- Improved collaborative features

## Related Documentation
- [TopLocs Plugin Development Guide](https://github.com/toplocs/tribelike/blob/main/docs/plugin-development.md)
- [TopLocs Architecture Overview](https://github.com/toplocs/tribelike/blob/main/docs/architecture.md)

## License
MIT License - See the main TopLocs project for details.
