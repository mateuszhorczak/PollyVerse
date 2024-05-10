import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);

	return {
		data: await db.run("INSERT INTO comments(post_id, user_id, text, date) VALUES (:post_id, :user_id, :text, :date)", {
			":post_id": body.post_id,
			":user_id": body.user_id,
			":text": body.text,
			":date": body.date,
		}),
	};
});
