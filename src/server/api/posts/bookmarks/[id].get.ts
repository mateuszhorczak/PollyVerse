import { openConnection } from "~/server/database";
import type { Bookmark } from "~/types";
export default defineEventHandler(async (event) => {
	const postId = getRouterParam(event, "id");

	const db = await openConnection();

	const dbQuery = `
		SELECT bookmarks.id AS bookmark_id, bookmarks.post_id, bookmarks.user_id
		FROM bookmarks
		INNER JOIN users ON bookmarks.user_id = users.id
		WHERE bookmarks.post_id = ?;
	`;

	return {
		data: await db.all<Array<Bookmark>>(dbQuery, [postId]),
	};
});
