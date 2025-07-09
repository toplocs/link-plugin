import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:id',
      component: App,
    }
  ]
});

// Development environment - standalone
const app = createApp(App);
app.use(router);
app.mount('#link-plugin');