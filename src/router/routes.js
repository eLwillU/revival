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
        path: "/InfoPage",
        component: () => import("pages/InfoPage.vue"),
      },
      {
        path: "/Questionnaire",
        component: () => import("pages/QuestionPage.vue"),
      },
      {
        path: "/Quest",
        component: () => import("pages/QuestionnairePage.vue"),
      },
      {
        path: "/debug",
        component: () => import("pages/debugPage.vue"),
      },
      {
        path: "/cards",
        component: () => import("pages/ComponentPage.vue"),
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
