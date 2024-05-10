import { openConnection } from "~/server/database";
import { hashPassword } from "~/server/passwordUtils";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);
	body.password = await hashPassword(body.password);

	const dbQuery = `
		UPDATE users
		SET
			password = :password
		WHERE
			id = :id;
	`;

	return {
		data: await db.run(dbQuery, {
			":password": body.password,
			":id": body.id,
		}),
	};
});
