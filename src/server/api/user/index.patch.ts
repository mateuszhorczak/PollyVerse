import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);

	const dbQuery = `
		UPDATE users
		SET
			username = :username,
			about = :about,
			email = :email
		WHERE
			id = :id;
	`;

	return {
		data: await db.run(dbQuery, {
			":username": body.username,
			":about": body.about,
			":email": body.email,
			":id": body.id,
		}),
	};
});
