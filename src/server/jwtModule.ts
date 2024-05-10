import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "Linux prima sort";

export function generateJwtToken(payload: any) {
	return jwt.sign(payload, secretKey, { expiresIn: "3h" });
}
