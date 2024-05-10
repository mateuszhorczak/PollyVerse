import sqlite3 from "sqlite3";
import { open } from "sqlite";

// this is a top-level await
export const openConnection = async () => {
	// open the database
	return await open({
		filename: "src/server/database.db",
		driver: sqlite3.Database,
	});
};
