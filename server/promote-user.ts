import "./config";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

const email = process.argv[2];

if (!email) {
    console.error("Please provide a user email: npx tsx server/promote-user.ts <EMAIL>");
    process.exit(1);
}

async function run() {
    try {
        const [user] = await db.select().from(users).where(eq(users.username, email));
        if (!user) {
            console.error(`User with email '${email}' not found.`);
            process.exit(1);
        }

        await db.update(users).set({ isAdmin: true }).where(eq(users.id, user.id));
        console.log(`✅ Success: User '${user.name}' (${email}) is now an Admin.`);
    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}

run();
