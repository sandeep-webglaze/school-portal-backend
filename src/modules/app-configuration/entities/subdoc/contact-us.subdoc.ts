import { Schema } from "mongoose";
import { IContactUs } from "../../interface";

export const ContactUsSchema = new Schema<IContactUs>({
    phoneNumber: { type: String, required: true },
    mail: { type: String, required: true },
    address: { type: String, required: true }
})