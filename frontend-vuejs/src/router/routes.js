import authRoutes from "./authRoutes";
import mainRoutes from "./mainRoutes";

const routes = [
  {
    path: "/",
    name: "Base",
    redirect: "/todos",
    component: () => import("@view/Layouts/DefaultLayout.vue"),
    meta: { requiresAuth: true },
    children: mainRoutes,
  },
  {
    path: "/auth",
    name: "Auth",
    redirect: "/auth/login",
    component: () => import("@view/Layouts/GuestLayout.vue"),
    meta: { isGuest: true },
    children: authRoutes,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    meta: { title: "NotFound" },
    component: () => import("@view/Pages/Error/NotFound.vue"),
  },
];

export default routes;
