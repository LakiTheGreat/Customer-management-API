import { CustomerModel } from "../models/customer.model";

export const getCustomersService = () => {
  return CustomerModel.find({ deleted: { $ne: true } });
};

export const getOneCustomerService = (id: string) => {
  return CustomerModel.findById({ _id: id, deleted: { $ne: true } });
};

export const createCustomerService = async (customer: any) => {
  return CustomerModel.create(customer);
};
