import { PrismaClient } from "@prisma/client"
import users from "./data.json"
const prisma = new PrismaClient()
console.log(users)

export async function main() {
	console.log("[Elevator Music Cue] 🎸")
	for (let user of users) {
		await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				name: user.name,
			},
		})
	}
	console.log("Done 🎉")
}

main()
