import { openConnection } from "~/server/database";
import type { PostWithUser } from "~/types";
export default defineEventHandler(async (event) => {
	const postId = getRouterParam(event, "id");
	const db = await openConnection();

	const dbQuery = `
		SELECT
			posts.id AS id,
			posts.text AS text,
			posts.date AS date,
			posts.user_id AS user_id,
			posts.image AS image,
			users.username AS username,
			COUNT(DISTINCT likes.id) AS likes_count,
			COUNT(DISTINCT comments.id) AS comments_count,
			COUNT(DISTINCT bookmarks.id) AS bookmarks_count
		FROM
			posts
		JOIN
			users ON posts.user_id = users.id
		LEFT JOIN
			likes ON posts.id = likes.post_id
		LEFT JOIN
			comments ON posts.id = comments.post_id
		LEFT JOIN
			bookmarks ON posts.id = bookmarks.post_id
		WHERE posts.id = ?
		GROUP BY
			posts.id, posts.text, posts.date, posts.user_id, users.username;
	`;

	return {
		data: await db.get<PostWithUser>(dbQuery, [postId]),
	};
});
