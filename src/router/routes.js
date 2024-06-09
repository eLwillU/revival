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
        component: () => import("pages/questionnairePage.vue"),
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
        path: "/questionnaireOverview",
        component: () => import("pages/overviewQuestionnairePage.vue"),
      },
      {
        path: "/type",
        component: () => import("pages/QuestionTypePage.vue"),
      },
      {
        path: "/feedback",
        component: () => import("pages/FeedbackPage.vue"),
      },
      {
        path: "/techday",
        component: () => import("pages/TechDayPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
