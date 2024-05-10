import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const db = await openConnection();

	const dbQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM likes
      WHERE post_id = :post_id AND user_id = :user_id
    ) AS likeExists;
  	`;

	const result = await db.get<{ likeExists: number }>(dbQuery, {
		":post_id": query.post_id,
		":user_id": query.user_id,
	});
	return {
		data: { likeExists: result?.likeExists === 1 },
	};
});
