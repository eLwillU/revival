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
        path: "/questionnaire",
        component: () => import("pages/QuestionnairePage.vue"),
      },
      {
        path: "/welcome",
        component: () => import("pages/WelcomePage.vue"),
      },
      {
        path: "/complete",
        component: () => import("pages/QuestionnaireCompletePage.vue"),
      },
      {
        path: "/debug",
        component: () => import("pages/debugPage.vue"),
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
