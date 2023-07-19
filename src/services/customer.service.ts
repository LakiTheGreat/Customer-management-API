import { CustomerModel } from "../models/customer.model";
import { Customer } from "../types/customer";

const findCustomers = () => {
  const customers = CustomerModel.find({ deleted: { $ne: true } });
  return customers;
};

const findOneCustomer = async (id: string) => {
  const customer = await CustomerModel.findOne({
    _id: id,
    deleted: { $ne: true },
  });
  return customer;
};

export const getAllCustomersService = async () => {
  const customers = await findCustomers();

  if (!customers.length) {
    return { message: "There are no customers in the database" };
  }
  return customers;
};

export const getOneCustomerService = async (id: string) => {
  const customer = await findOneCustomer(id);

  if (!customer) {
    return { message: "User with that ID doesn't exist or is deleted" };
  }

  return customer;
};

export const createCustomerService = async (customer: Customer) => {
  return CustomerModel.create(customer);
};

export const patchCustomerService = async (
  id: string,
  updatedCustomer: Customer
) => {
  const customer = await findOneCustomer(id);

  if (!customer) {
    return { message: "User with that ID doesn't exist or is deleted" };
  }

  return CustomerModel.findByIdAndUpdate(id, updatedCustomer, { new: true });
};

export const deleteCustomerService = async (id: string) => {
  const existingCustomer = await findOneCustomer(id);

  if (!existingCustomer) {
    return { message: "Customer was not found or is already deleted." };
  }

  return CustomerModel.findByIdAndUpdate(id, { deleted: true });
};
