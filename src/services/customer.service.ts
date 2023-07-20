import { JSEND_STATUS } from "../constants";
import { CustomerModel } from "../models/customer.model";
import { Customer } from "../types/customer";

export const findOneCustomer = (id: string) => {
  return CustomerModel.findOne({
    _id: id,
    deleted: { $ne: true },
  });
};

export const getAllCustomersService = async () => {
  const customers = await CustomerModel.find({ deleted: { $ne: true } });
  return {
    status: JSEND_STATUS.SUCCESS,
    message: "List of all customers",
    data: customers,
  };
};

export const getOneCustomerService = async (id: string) => {
  const customer = await findOneCustomer(id);

  return {
    status: JSEND_STATUS.SUCCESS,
    message: "Customer for the provided ID",
    data: customer,
  };
};

export const createCustomerService = async (customer: Customer) => {
  const newCustomer = await CustomerModel.create(customer);
  return {
    status: JSEND_STATUS.SUCCESS,
    message: "Created customer",
    data: newCustomer,
  };
};

export const patchCustomerService = async (
  id: string,
  updatedCustomer: Customer
) => {
  const patchedCustomer = await CustomerModel.findByIdAndUpdate(
    id,
    updatedCustomer,
    { new: true }
  );

  return {
    status: JSEND_STATUS.SUCCESS,
    message: "Customer is patched",
    data: patchedCustomer,
  };
};

export const deleteCustomerService = async (id: string) => {
  const existingCustomer = await findOneCustomer(id);

  if (!existingCustomer) {
    return {
      status: JSEND_STATUS.FAIL,
      message:
        "Customer for the provided ID was not found or is already deleted.",
      data: [],
    };
  }

  const deletedCustomer = await CustomerModel.findByIdAndUpdate(
    id,
    {
      deleted: true,
    },
    { new: true }
  );
  return {
    status: JSEND_STATUS.SUCCESS,
    message: "Customer for the provided ID was successfuly deleted",
    data: deletedCustomer,
  };
};
