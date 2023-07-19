import { Request, Response } from "express";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "CUSTOMER LIST" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOneCustomer = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "single user: NIKOLA" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
