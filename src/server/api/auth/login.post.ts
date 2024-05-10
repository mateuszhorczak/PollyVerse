import { openConnection } from "~/server/database";
import { comparePassword } from "~/server/passwordUtils";
import type { User } from "~/types";
import { generateJwtToken } from "~/server/jwtModule";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);
	let isMatch = false;

	const users = await db.all("select * from users");
	for (let user: User of users) {
		if (body.username === user.username) {
			isMatch = await comparePassword(body.password, user.password);
			user.password = "";
			if (isMatch) {
				return { token: generateJwtToken(user), user };
			}
		}
	}
});
