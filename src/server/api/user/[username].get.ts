import { openConnection } from "~/server/database";
import type { User } from "~/types";
export default defineEventHandler(async (event) => {
	const username = getRouterParam(event, "username");

	const db = await openConnection();

	const dbQuery = `
		SELECT id, username, email, about
		FROM users
		WHERE username = ?;
	`;

	return {
		data: await db.get<User>(dbQuery, [username]),
	};
});
