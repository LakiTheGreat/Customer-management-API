import mongoose, { Query, Schema } from "mongoose";
import { Customer } from "../types/customer";
import { linkRegex } from "../constants";

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is mandatory."],
      minlength: [2, "First name must have at least 2 characters"],
      maxlength: [20, "First can't have more then 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is mandatory"],
      minlength: [2, "Last name must have at least 2 characters"],
      maxlength: [20, "Last can't have more then 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      validate: {
        validator: function (val: string) {
          return val.match(linkRegex) ? true : false;
        },
        message: "Email was not in correct format",
      },
    },
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

//Adds check in every find query that removes deleted customers
customerSchema.pre<Query<Customer, Customer>>(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});

export const CustomerModel = mongoose.model("Customer", customerSchema);
