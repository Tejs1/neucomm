import { PrismaClient } from "@prisma/client"
import users from "./data.json"
const prisma = new PrismaClient()
import { v4 as uuid } from "uuid"

export async function main() {
	console.log("[Elevator Music Cue] 🎸")
	for (let user of users) {
		await prisma.user.create({
			data: {
				email: user.email,
				clerkId: uuid(),
				name: user.name,
			},
		})
	}
	console.log("Done 🎉")
}

main()
