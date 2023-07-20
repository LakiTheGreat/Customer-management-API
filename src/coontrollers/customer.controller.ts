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
    if (customers.length) {
      res.status(200).json({
        status: JSEND_STATUS.SUCCESS,
        message: "List of all customers",
        data: customers,
      });
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
    if (customer) {
      res.status(200).json({
        status: JSEND_STATUS.SUCCESS,
        message: "Customer for the provided ID",
        data: customer,
      });
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
    if (customer) {
      res.status(200).json({
        status: JSEND_STATUS.SUCCESS,
        message: "Created customer",
        data: customer,
      });
    }
  } catch (error) {
    res.status(500).json({ status: JSEND_STATUS.ERROR, message: error });
  }
};

export const patchCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await patchCustomerService(req.params.id, req.body);
    if (customer) {
      res.status(200).json({
        status: JSEND_STATUS.SUCCESS,
        message: "Customer is patched",
        data: customer,
      });
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
    const customer = await deleteCustomerService(req.params.id);

    if (!customer) {
      res.status(404).json({
        status: JSEND_STATUS.FAIL,
        message:
          "Customer for the provided ID was not found or is already deleted.",
        data: [],
      });
    } else {
      res.status(200).json({
        status: JSEND_STATUS.SUCCESS,
        message: "Customer for the provided ID was successfuly deleted",
        data: customer,
      });
    }
  } catch (error) {
    res.status(500).json({ status: JSEND_STATUS.ERROR, message: error });
  }
};
