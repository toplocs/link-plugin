/**
 * Gun.js instance configuration for TopLocs Link Plugin
 * Connects to the Gun.js peer network for decentralized data storage
 */

import Gun from 'gun';
import 'gun/sea'; // For user authentication
import 'gun/lib/unset'; // For unsetting data

// Create Gun.js instance pointing to TopLocs Gun.js server
const gun = Gun();

export default gun;

// TODO
// Core Gun mit 3 peers -> Plugin registriert die Plugin Config
// Plugin Gun: 1. Eigenes Netz. 2. Core GunDB mit nutzen
