import { Request, Response } from "express";

import {
  createCustomerService,
  getCustomersService,
  getOneCustomerService,
} from "../services";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomersService();
    if (customers) {
      res.status(200).json(customers);
    } else {
      res.status(404).json({ message: "WTF" });
    }
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
