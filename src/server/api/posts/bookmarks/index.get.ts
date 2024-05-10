import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const db = await openConnection();

	const dbQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM bookmarks
      WHERE post_id = :post_id AND user_id = :user_id
    ) AS bookmarkExists;
  	`;

	const result = await db.get<{ bookmarkExists: number }>(dbQuery, {
		":post_id": query.post_id,
		":user_id": query.user_id,
	});
	return {
		data: { bookmarkExists: result?.bookmarkExists === 1 },
	};
});
