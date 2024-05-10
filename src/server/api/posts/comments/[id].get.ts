import { openConnection } from "~/server/database";
import type { Comment } from "~/types";
export default defineEventHandler(async (event) => {
	const postId = getRouterParam(event, "id");
	const db = await openConnection();

	const dbQuery = `
		SELECT
			comments.id AS comment_id,
			comments.post_id,
			comments.user_id,
			comments.text AS comment_text,
			comments.date AS comment_date,
			users.username AS user_username
		FROM comments
		INNER JOIN users ON comments.user_id = users.id
		WHERE comments.post_id = ?
	`;

	return {
		data: await db.all<Array<Comment>>(dbQuery, [postId]),
	};
});
