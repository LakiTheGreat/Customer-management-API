import express from "express";

import {
  getCustomers,
  getOneCustomer,
  createCustomer,
  deleteCustomer,
  patchCustomer,
} from "../controllers/customer.controller";
import { checkIdFormat, checkPatchRequest } from "../middleware";

const router = express.Router();

// 1) Params middleware
//Checks if the id in the requests is of the correct format (ObjectId format for MongoDB)
router.param("id", checkIdFormat);

// 2) Routes
router.get("/", getCustomers);
router.post("/", createCustomer);
router.patch("/delete/:id", deleteCustomer);
router.get("/:id", getOneCustomer);
router.patch("/:id", checkPatchRequest, patchCustomer);

export default router;
