import { route } from 'quasar/wrappers';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'stores/auth';

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const isAuthRequired = to.meta?.authRequired || false;
    const authStore = useAuthStore();

    console.log('Navigation details:', { isAuthRequired, isAuthenticated: authStore.isAuthenticated,name: authStore.getUser.name , to: to.name, from: from.name });

    if (isAuthRequired && !authStore.isAuthenticated) {
      if (to.name !== 'login') {
        return next({ name: 'login' });
      } else {
        return next();
      }
    }
    next()
  });

  return Router;
});
