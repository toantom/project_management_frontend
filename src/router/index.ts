import { createRouter, createWebHistory } from "vue-router";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout.vue";
import HomePage from "@/views/home/HomePage.vue";
import AuthenticateLayout from "@/components/layouts/AuthenticateLayout.vue";
import {
  PAGE_TITLES,
  USER_TYPE_ADMIN,
  USER_TYPE_EMPLOYEE,
} from "@/common/constants";
import { nextTick } from "vue";
import JwtService from "@/common/jwt.service";
import UserService from "@/common/user.service";
import AdminLayout from "@/components/layouts/AdminLayout.vue";
import AdminPage from "@/views/admin/AdminPage.vue";

const routes = [
  {
    path: "/auth",
    component: AuthenticateLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/auth/LoginPage.vue"),
      },
      {
        path: "/signup",
        name: "Signup",
        component: () => import("../views/auth/SignUp.vue"),
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("../views/auth/ForgotPassword.vue"),
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
      {
        path: "/account",
        name: "MyAccount",
        component: () => import("../views/my_info/AccountView.vue"),
      },
      {
        path: "/project",
        name: "ProjectList",
        component: () => import("../views/projects/ProjectList.vue"),
      },
      {
        path: "/project/:project_title",
        name: "ProjectDetail",
        component: () => import("../views/projects/ProjectDetail.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
      userType: USER_TYPE_EMPLOYEE,
    },
  },
  {
    path: "/",
    component: AdminLayout,
    children: [
      {
        path: "/",
        name: "AdminPage",
        component: AdminPage,
      },
    ],
    meta: {
      requiresAuth: true,
      userType: USER_TYPE_ADMIN,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    if (UserService.isAdminType()) {
      next({ name: "AdminPage" });
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
      if (UserService.isAdminType()) {
        next({ name: "AdminPage" });
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
    } else if (UserService.isAdminType()) {
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
