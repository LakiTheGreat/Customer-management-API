import mongoose, { Query, Schema } from "mongoose";
import { Customer } from "../types/customer";

const customerSchema = new Schema(
  {
    firstName: { type: String, required: [true, "First name is mandatory."] },
    lastName: { type: String, required: [true, "Last name is mandatory"] },
    email: { type: String, required: [true, "Please enter email"] },
    contactNumber: {
      type: String,
      required: [true, "Enter your contact number"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: "throw",
  }
);

customerSchema.pre<Query<Customer, Customer>>(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});

export const CustomerModel = mongoose.model("Customer", customerSchema);
