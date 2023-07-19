import express from "express";
import { getCustomers, getOneCustomer } from "../coontrollers";
import checkIdFormat from "../middleware/checkIdFormat";
import { createCustomer } from "../coontrollers/customer.controller";

const router = express.Router();

// 1) Params middleware
//Checks if the id in the requests is of the correct format
router.param("id", checkIdFormat);

// 2) Routes
router.get("/", getCustomers);
router.post("/", createCustomer);
router.get("/:id", getOneCustomer);

export default router;
