import { Request, Response } from "express";
import CashfreeOrder from "../models/cashfreeOrder.model";

export const handleWebhook = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        console.log("Webhook Received:", JSON.stringify(payload, null, 2));

        // Basic Validation: Ensure it's the right type of event if needed
        // if (payload.type !== "PAYMENT_FORM_ORDER_WEBHOOK") { ... }

        // Save to Database
        const newOrder = new CashfreeOrder(payload);
        await newOrder.save();

        console.log("Webhook Data Saved to MongoDB");

        res.status(200).json({ status: "success", message: "Webhook received and stored" });
    } catch (error: any) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
