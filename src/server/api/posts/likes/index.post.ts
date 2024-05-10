import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);

	return {
		data: await db.run("INSERT INTO likes(post_id, user_id) VALUES (:post_id, :user_id)", {
			":post_id": body.post_id,
			":user_id": body.user_id,
		}),
	};
});
