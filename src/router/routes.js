const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/pageOne",
        component: () => import("pages/pageOne.vue"),
      },
      {
        path: "/pageTwo",
        component: () => import("pages/pageTwo.vue"),
      },
      {
        path: "/TestPage",
      component: () => import("pages/TestPage.vue"),
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
