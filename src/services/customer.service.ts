import { CustomerModel } from "../models/customer.model";
import { Customer } from "../types/customer";

export const getCustomersService = async () => {
  const customers = await CustomerModel.find({ deleted: { $ne: true } });

  if (!customers.length) {
    return { message: "There are no customers in the database" };
  }
  return customers;
};

export const getOneCustomerService = async (id: string) => {
  const customer = await CustomerModel.findOne({
    _id: id,
    deleted: { $ne: true },
  });

  if (!customer) {
    return { message: "User with that ID doesn't exist or is deleted" };
  }

  return customer;
};

export const createCustomerService = async (customer: Customer) => {
  return CustomerModel.create(customer);
};

export const patchCustomerService = async (id: string, customer: Customer) => {
  return CustomerModel.findByIdAndUpdate(id, customer, { new: true });
};

export const deleteCustomerService = async (id: string) => {
  const existingCustomer = await CustomerModel.findOne({
    _id: id,
    deleted: { $ne: true },
  });

  if (!existingCustomer) {
    return { message: "Customer was not found or is already deleted." };
  }

  return CustomerModel.findByIdAndUpdate(id, { deleted: true });
};
