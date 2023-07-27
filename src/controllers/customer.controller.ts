import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createCustomerService,
  deleteCustomerService,
  getAllCustomersService,
  getOneCustomerService,
  patchCustomerService,
} from "../services";
import ApiError from "../config/ApiError";
import { catchAsync } from "../utils/catchAsync";

export const getCustomers = catchAsync(async (req: Request, res: Response) => {
  const customers = await getAllCustomersService();
  if (customers.length) {
    res.status(httpStatus.OK).json(customers);
  } else {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "There are no customers in the database"
    );
  }
});

export const getOneCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const customer = await getOneCustomerService(req.params.id);
    if (customer) {
      res.status(httpStatus.OK).json(customer);
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Customer with provided ID was not found"
      );
    }
  }
);

export const createCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const customer = await createCustomerService(req.body);
    if (customer) {
      res.status(httpStatus.CREATED).json(customer);
    }
  }
);

export const patchCustomer = catchAsync(async (req: Request, res: Response) => {
  const customer = await patchCustomerService(req.params.id, req.body);
  if (customer) {
    res.status(httpStatus.OK).json(customer);
  } else {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Customer with provided ID was not found"
    );
  }
});

export const deleteCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const customer = await deleteCustomerService(req.params.id);

    if (!customer) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Customer for the provided ID was not found or is already deleted."
      );
    } else {
      res.status(httpStatus.OK).json(customer);
    }
  }
);
