import { openConnection } from "../database";

export default defineEventHandler(async () => {
	const db = await openConnection();

	return {
		data: await db.all("select * from users"),
	};
});
