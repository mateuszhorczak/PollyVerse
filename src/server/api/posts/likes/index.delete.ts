import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);

	const dbQuery = `
		DELETE FROM likes
		WHERE post_id = :post_id AND user_id = :user_id;
	`;

	return {
		data: await db.run(dbQuery, {
			":post_id": body.post_id,
			":user_id": body.user_id,
		}),
	};
});
