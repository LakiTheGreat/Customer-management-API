import express from "express";
import { getCustomers, getOneCustomer } from "../coontrollers";
import checkIdFormat from "../middleware/checkIdFormat";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", checkIdFormat, getOneCustomer);

export default router;
