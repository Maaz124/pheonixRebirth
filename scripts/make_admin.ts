
import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    const targetUser = "maaz@G.COM";
    console.log(`Setting admin privileges for ${targetUser}...`);

    try {
        const result = await db.update(users)
            .set({ isAdmin: true })
            .where(eq(users.username, targetUser))
            .returning();

        if (result.length > 0) {
            console.log("Success! User updated:", result[0]);
        } else {
            console.log("User not found in database. Please check the username/email.");
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
    process.exit(0);
}

main();
