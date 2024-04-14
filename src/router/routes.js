const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/InfoPage.vue") },
      {
        path: "/InfoPage",
        component: () => import("pages/InfoPage.vue"),
      },
      {
        path: "/cards",
        component: () => import("pages/ComponentPage.vue"),
      },
      {
        path: "/welcome",
        component: () => import("pages/WelcomePage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
