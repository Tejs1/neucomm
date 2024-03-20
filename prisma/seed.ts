import { PrismaClient } from "@prisma/client"
import users from "./data.json"
const prisma = new PrismaClient()
import { v4 as uuid } from "uuid"
import { categories } from "./categories"

export async function main() {
	console.log("[Elevator Music Cue] 🎸")
	await seedCategories()
}

main()

async function seedCategories() {
	console.log(`Seeding ${categories.length} categories...`)

	// Using a transaction to batch the insert operations
	categories.map(category => {
		return prisma.category.upsert({
			where: { name: category },
			update: {},
			create: { name: category },
		})
	})

	for (let category of categories) {
		await prisma.category.upsert({
			where: { name: category },
			update: {},
			create: { name: category },
		})
	}

	console.log("Seeding completed.")
}

async function seedUsers() {
	console.log("[Seeding Users Cue] 🎸")
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
