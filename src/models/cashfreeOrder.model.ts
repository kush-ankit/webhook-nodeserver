import mongoose, { Schema, Document } from "mongoose";

export interface ICashfreeOrder extends Document {
    data: {
        form: {
            form_id: string;
            cf_form_id: number;
            form_url: string;
            form_currency: string;
        };
        order: {
            order_amount: number;
            order_id: string;
            order_status: string;
            transaction_id: number;
            customer_details: {
                customer_phone: string;
                customer_email: string;
                customer_name: string;
                customer_fields: {
                    title: string;
                    value: string;
                }[];
            };
            amount_details: {
                title: string;
                value: number;
                quantity?: number;
                selectedoption?: string;
            }[];
        };
    };
    event_time: string;
    type: string;
}

const CashfreeOrderSchema: Schema = new Schema(
    {
        data: {
            form: {
                form_id: { type: String, required: true },
                cf_form_id: { type: Number, required: true },
                form_url: { type: String, required: true },
                form_currency: { type: String, required: true },
            },
            order: {
                order_amount: { type: Number, required: true },
                order_id: { type: String, required: true },
                order_status: { type: String, required: true },
                transaction_id: { type: Number, required: true },
                customer_details: {
                    customer_phone: { type: String, required: true },
                    customer_email: { type: String, required: true },
                    customer_name: { type: String, required: true },
                    customer_fields: [
                        {
                            title: { type: String },
                            value: { type: String },
                        },
                    ],
                },
                amount_details: [
                    {
                        title: { type: String },
                        value: { type: Number },
                        quantity: { type: Number },
                        selectedoption: { type: String },
                    },
                ],
            },
        },
        event_time: { type: String, required: true },
        type: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ICashfreeOrder>("CashfreeOrder", CashfreeOrderSchema);
