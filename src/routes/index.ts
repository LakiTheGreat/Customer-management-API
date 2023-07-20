import express from "express";
import customerRoute from "./customer.route";
import { ROUTES } from "../constants";

export const router = express.Router();

const routes = [
  {
    path: `/${ROUTES.CUSTOMERS}`,
    route: customerRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
