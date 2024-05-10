import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);

	const dbQuery = `
		UPDATE posts
		SET
			text = :text,
			date = :date
		WHERE
			id = :id;
	`;

	return {
		data: await db.run(dbQuery, {
			":text": body.text,
			":date": body.date,
			":id": body.id,
		}),
	};
});
