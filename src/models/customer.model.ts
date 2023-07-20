import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
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
});

export const CustomerModel = mongoose.model("Customer", customerSchema);
