import nodemailer from "nodemailer";
import { storage } from "./storage";

export class EmailService {
    private static async getTransporter() {
        const user = await storage.getSetting("gmail_user");
        const pass = await storage.getSetting("gmail_app_password");

        if (!user || !pass) {
            throw new Error("Email configuration missing. Please check Admin Panel settings.");
        }

        const cleanUser = user.trim();
        const cleanPass = pass.replace(/\s+/g, '');

        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: cleanUser,
                pass: cleanPass,
            },
        });
    }

    static async sendEmail(to: string, subject: string, html: string) {
        try {
            const transporter = await this.getTransporter();
            const user = await storage.getSetting("gmail_user");

            const info = await transporter.sendMail({
                from: `"Phoenix Method" <${user}>`,
                to,
                subject,
                html,
            });

            console.log("Message sent: %s", info.messageId);
            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}
