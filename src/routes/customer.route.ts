import express from "express";

import checkIdFormat from "../middleware/checkIdFormat";
import {
  getCustomers,
  getOneCustomer,
  createCustomer,
  deleteCustomer,
  patchCustomer,
} from "../coontrollers/customer.controller";

const router = express.Router();

// 1) Params middleware
//Checks if the id in the requests is of the correct format
router.param("id", checkIdFormat);

// 2) Routes
router.get("/", getCustomers);
router.post("/", createCustomer);
router.patch("/delete/:id", deleteCustomer);
router.get("/:id", getOneCustomer);
router.patch("/:id", patchCustomer);

export default router;
