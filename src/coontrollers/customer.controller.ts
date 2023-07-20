import { Request, Response } from "express";

import {
  createCustomerService,
  deleteCustomerService,
  getAllCustomersService,
  getOneCustomerService,
  patchCustomerService,
} from "../services";
import { JSEND_STATUS } from "../constants";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomersService();
    if (customers.data.length) {
      res.status(200).json(customers);
    } else {
      res.status(404).json({
        status: JSEND_STATUS.SUCCESS,
        message: "There are no customers in the database",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({ status: JSEND_STATUS.ERROR, message: error });
  }
};

export const getOneCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await getOneCustomerService(req.params.id);
    if (customer.data) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({
        status: JSEND_STATUS.SUCCESS,
        message: "Customer with provided ID was not found",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({ status: JSEND_STATUS.ERROR, message: error });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await createCustomerService(req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ status: JSEND_STATUS.ERROR, message: error });
  }
};

export const patchCustomer = async (req: Request, res: Response) => {
  try {
    const patchedCustomer = await patchCustomerService(req.params.id, req.body);
    if (patchedCustomer.data) {
      res.status(200).json(patchedCustomer);
    } else {
      res.status(404).json({
        status: JSEND_STATUS.FAIL,
        message: "Customer with provided ID was not found",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({ status: JSEND_STATUS.ERROR, message: error });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const deltedCustomer = await deleteCustomerService(req.params.id);
    res
      .status(deltedCustomer.status === JSEND_STATUS.SUCCESS ? 200 : 404)
      .json(deltedCustomer);
  } catch (error) {
    res.status(500).json({ status: JSEND_STATUS.ERROR, message: error });
  }
};
