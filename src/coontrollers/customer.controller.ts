import { Request, Response } from "express";

import {
  createCustomerService,
  deleteCustomerService,
  getAllCustomersService,
  getOneCustomerService,
  patchCustomerService,
} from "../services";
import { JSEND_STATUS } from "../constants";
import jSendResponse from "../config/jSendResponse";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomersService();
    if (customers.length) {
      res.status(200).json(
        jSendResponse({
          message: "List of all customers",
          data: customers,
        })
      );
    } else {
      res.status(404).json(
        jSendResponse({
          status: JSEND_STATUS.FAIL,
          message: "There are no customers in the database",
        })
      );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        jSendResponse({ status: JSEND_STATUS.ERROR, message: error as string })
      );
  }
};

export const getOneCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await getOneCustomerService(req.params.id);
    if (customer) {
      res.status(200).json(
        jSendResponse({
          message: "Customer for the provided ID",
          data: customer,
        })
      );
    } else {
      res.status(404).json(
        jSendResponse({
          status: JSEND_STATUS.FAIL,
          message: "Customer with provided ID was not found",
        })
      );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        jSendResponse({ status: JSEND_STATUS.ERROR, message: error as string })
      );
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await createCustomerService(req.body);
    if (customer) {
      res.status(200).json(
        jSendResponse({
          message: "Created customer",
          data: customer,
        })
      );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        jSendResponse({ status: JSEND_STATUS.ERROR, message: error as string })
      );
  }
};

export const patchCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await patchCustomerService(req.params.id, req.body);
    if (customer) {
      res.status(200).json(
        jSendResponse({
          message: "Customer is patched",
          data: customer,
        })
      );
    } else {
      res.status(404).json(
        jSendResponse({
          status: JSEND_STATUS.FAIL,
          message: "Customer with provided ID was not found",
        })
      );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        jSendResponse({ status: JSEND_STATUS.ERROR, message: error as string })
      );
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await deleteCustomerService(req.params.id);

    if (!customer) {
      res.status(404).json(
        jSendResponse({
          status: JSEND_STATUS.FAIL,
          message:
            "Customer for the provided ID was not found or is already deleted.",
        })
      );
    } else {
      res.status(200).json(
        jSendResponse({
          message: "Customer for the provided ID was successfuly deleted",
          data: customer,
        })
      );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        jSendResponse({ status: JSEND_STATUS.ERROR, message: error as string })
      );
  }
};
