import { openConnection } from "~/server/database";
import { hashPassword } from "~/server/passwordUtils";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);
	body.password = await hashPassword(body.password);

	return {
		data: await db.run("INSERT INTO users(username, password, email) VALUES (:username, :password, :email)", {
			":username": body.username,
			":password": body.password,
			":email": body.email,
		}),
	};
});
