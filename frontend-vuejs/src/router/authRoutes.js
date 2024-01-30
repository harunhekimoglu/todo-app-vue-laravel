const authRoutes = [
  {
    path: "login",
    name: "AuthLogin",
    meta: { title: "Login" },
    component: () => import("@view/Pages/Auth/Login.vue"),
  },
  {
    path: "register",
    name: "AuthRegister",
    meta: { title: "Register" },
    component: () => import("@view/Pages/Auth/Register.vue"),
  },
  {
    path: "forgot-password",
    name: "AuthForgotPassword",
    meta: { title: "Reset Password" },
    component: () => import("@view/Pages/Auth/ForgotPassword.vue"),
  },
  {
    path: "reset-password/:token",
    name: "AuthResetPassword",
    meta: { title: "Reset Password" },
    component: () => import("@view/Pages/Auth/ResetPassword.vue"),
  },
];

export default authRoutes;
