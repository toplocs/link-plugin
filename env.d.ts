/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

// Module federation declarations
declare module 'link-plugin/Sidebar' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'link-plugin/Settings' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'link-plugin/Plugin' {
  export function registerPlugin(): void
}
