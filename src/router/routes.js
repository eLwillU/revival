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
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
