import { createRouter, createWebHistory } from "vue-router";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import HomePage from "@/views/home/HomePage.vue";
import AuthenticateLayout from "@/components/layouts/AuthenticateLayout.vue";
import { PAGE_TITLES, USER_TYPE_EMPLOYEE } from "@/common/constants";
import { nextTick } from "vue";
import JwtService from "@/common/jwt.service";
import UserService from "@/common/user.service";

const routes = [
  {
    path: "/auth",
    component: AuthenticateLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/LoginPage.vue"),
      },
      {
        path: "/signup",
        name: "Signup",
        component: () => import("../views/SignUp.vue"),
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("../views/ForgotPassword.vue"),
      },
    ],
  },

  {
    path: "/",
    component: AuthenticatedLayout,
    children: [
      {
        path: "/",
        name: "Homepage",
        component: HomePage,
      },
    ],
    meta: {
      requiresAuth: true,
      userType: USER_TYPE_EMPLOYEE,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    if (UserService.isAdmin()) {
      next({ name: "AdminMessage" });
    } else {
      next({ path: "/" });
    }

    // Check authenticate
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userType = UserService.getUser().type;
    if (JwtService.getToken() == null) {
      next({ path: "/login" });

      // Check user type
    } else if (
      !to.matched.some((record) => record.meta.userType === userType)
    ) {
      if (UserService.isAdmin()) {
        next({ name: "AdminMessage" });
      } else {
        next({ path: "/" });
      }
    } else {
      next();
    }

    // Check is guest
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (JwtService.getToken() == null) {
      next();
    } else if (UserService.isAdmin()) {
      next({ name: "AdminMessage" });
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 400);
});

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  type MetaType = { title: string };
  const title = (to.meta as MetaType).title || PAGE_TITLES.DEFAULT;

  nextTick(() => (document.title = title));
});

export default router;
