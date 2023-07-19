import { Request, Response } from "express";

import {
  createCustomerService,
  deleteCustomerService,
  getAllCustomersService,
  getOneCustomerService,
  patchCustomerService,
} from "../services";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomersService();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOneCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await getOneCustomerService(req.params.id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await createCustomerService(req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const patchCustomer = async (req: Request, res: Response) => {
  console.log("kontolor");
  try {
    const patchedCustomer = await patchCustomerService(req.params.id, req.body);
    res.status(200).json(patchedCustomer);
  } catch (error) {
    res.json({ message: error });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const deltedCustomer = await deleteCustomerService(req.params.id);
    res.status(200).json(deltedCustomer);
  } catch (error) {
    res.json({ message: error });
  }
};
