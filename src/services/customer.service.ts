import { CustomerModel } from "../models/customer.model";
import { Customer } from "../types/customer";

const findOneCustomer = (id: string) => {
  return CustomerModel.findOne({
    _id: id,
    deleted: { $ne: true },
  });
};

export const getAllCustomersService = async () => {
  return await CustomerModel.find({ deleted: { $ne: true } });
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
