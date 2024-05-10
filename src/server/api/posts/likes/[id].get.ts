import { openConnection } from "~/server/database";
import type { Like } from "~/types";
export default defineEventHandler(async (event) => {
	const postId = getRouterParam(event, "id");

	const db = await openConnection();

	const dbQuery = `
		SELECT likes.id AS like_id, likes.post_id, likes.user_id, users.username AS user_username
		FROM likes
		INNER JOIN users ON likes.user_id = users.id
		WHERE likes.post_id = ?;
	`;

	return {
		data: await db.all<Array<Like>>(dbQuery, [postId]),
	};
});
