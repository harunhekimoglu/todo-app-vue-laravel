const mainRoutes = [
  {
    path: "profile",
    name: "ProfileIndex",
    meta: { title: "Profile" },
    component: () => import("@view/Pages/Profile/Index.vue"),
  },
  {
    path: "todos",
    name: "TodoIndex",
    meta: { title: "Todo" },
    component: () => import("@view/Pages/Todo/Index.vue"),
  },
];

export default mainRoutes;
