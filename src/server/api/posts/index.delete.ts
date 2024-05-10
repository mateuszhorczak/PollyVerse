import { openConnection } from "~/server/database";

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const body = await readBody(event);

	try {
		await db.run("BEGIN TRANSACTION");

		// Usunięcie postu
		await db.run(`
      DELETE FROM posts
      WHERE id = :id;
    `, {
			":id": body.post_id,
		});

		// Usunięcie komentarzy
		await db.run(`
      DELETE FROM comments
      WHERE post_id = :post_id;
    `, {
			":post_id": body.post_id,
		});

		// Usunięcie lajków
		await db.run(`
      DELETE FROM likes
      WHERE post_id = :post_id;
    `, {
			":post_id": body.post_id,
		});

		// Usunięcie zakładek
		await db.run(`
      DELETE FROM bookmarks
      WHERE post_id = :post_id;
    `, {
			":post_id": body.post_id,
		});

		// Zakończenie transakcji
		await db.run("COMMIT");

		return {
			data: "Post and related data deleted successfully",
		};
	} catch (error) {
		// W razie błędu cofamy transakcję
		await db.run("ROLLBACK");
		throw error;
	}
});
