import { promises as fs } from "fs";
import { resolve } from "path";
import { MultiPartData } from "h3";
import { openConnection } from "~/server/database";

const uploadPath = "src/public/upload/";
const pngType = 'image/png';

export default defineEventHandler(async (event) => {
	const db = await openConnection();
	const formData = (await readMultipartFormData(event))!;

	let userId : number
	let postText : string
	let postDate : Date
	let fileData : MultiPartData | undefined;

	try {
		userId = parseInt(formData.find((x) => x.name === "user_id")?.data?.toString() || "")
		postText = formData.find((x) => x.name === "text")?.data?.toString()!
		postDate = new Date(formData.find((x) => x.name === "date")?.data?.toString()!)
		fileData = formData.find((x) => x.name === "image")

		if (userId <= 0 || postText.length <= 0 || !postDate) {
			throw new Error("Invalid data");
		}
	} catch (_) {
		throw createError({ statusCode: 400, statusMessage: "Invalid data" });
	}

	let newFileName: string = "";

	if (fileData && fileData?.data?.byteLength > 0) {
		if (fileData.type !== pngType) {
			throw createError({ statusCode: 400, statusMessage: "Only PNG images are allowed" });
		}

		const timestamp = Date.now();
		newFileName = `${timestamp}.png`;
		const newPath = resolve("", uploadPath, newFileName);

		await fs.mkdir(uploadPath, { recursive: true });
		await fs.writeFile(newPath, fileData.data);
	}

	return {
		data: await db.run("INSERT INTO posts(user_id, text, date, image) VALUES (:user_id, :text, :date, :image)", {
			":user_id": userId,
			":text": postText,
			":date": postDate.toISOString(),
			":image": newFileName,
		}),
	};
});
