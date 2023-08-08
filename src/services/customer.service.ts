import { ParsedQs } from "qs";
import { CustomerModel } from "../models/customer.model";
import { Customer } from "../types/customer";

interface QueryParams {
  [key: string]: string | string[] | ParsedQs | ParsedQs[] | undefined;
  sort?: string;
}

const findOneCustomer = (id: string) => {
  return CustomerModel.findOne({
    _id: id,
  });
};

export const getAllCustomersService = async (queryParams: QueryParams) => {
  const { sort } = queryParams;

  const customerList = CustomerModel.find();

  if (sort) {
    const sortingFields = sort.split(",").join(" ");
    customerList.sort(sortingFields);
  }

  return await customerList.exec();
};

export const getOneCustomerService = async (id: string) => {
  return await findOneCustomer(id);
};

export const createCustomerService = async (customer: Customer) => {
  return await CustomerModel.create(customer);
};

export const patchCustomerService = async (
  id: string,
  updatedCustomer: Customer
) => {
  return await CustomerModel.findByIdAndUpdate(id, updatedCustomer, {
    new: true,
  });
};

export const deleteCustomerService = async (id: string) => {
  const existingCustomer = await findOneCustomer(id);

  if (!existingCustomer) {
    return null;
  }

  return await CustomerModel.findByIdAndUpdate(
    id,
    {
      deleted: true,
    },
    { new: true }
  );
};
