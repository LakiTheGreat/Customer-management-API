import express from "express";
import customerRoute from "./customer.route";

export const router = express.Router();

const routes = [
  {
    path: "/customer",
    route: customerRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
