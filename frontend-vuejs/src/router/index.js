import { createRouter, createWebHistory } from "vue-router";

import store from "@store";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          savedPosition.behavior = "smooth";
          resolve(savedPosition);
        } else if (to.hash) {
          resolve({
            el: to.hash,
            behavior: "smooth",
          });
        } else {
          resolve({ left: 0, top: 0, behavior: "smooth" });
        }
      }, 100);
    });
  },
});

router.beforeEach((to, from, next) => {
  document.title = (to.meta?.title ? to.meta.title + " | " : "") + "Todo App";

  const token = store.getters.getUserTokenValue;
  if (to.meta.requiresAuth && !token) {
    next({ name: "AuthLogin" });
    return;
  } else if (token && to.meta.isGuest) {
    next({ name: "Base" });
    return;
  }
  next();
  return;
});

export default router;
