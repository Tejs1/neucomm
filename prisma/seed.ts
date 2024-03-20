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

export async function seedAllUserCategories() {
	const users = await prisma.user.findMany()
	await Promise.all(users.map(user => seedUserCategories(null, user.id)))
}

export async function seedUserCategories(
	clerkId: string | null,
	userID: string,
) {
	try {
		let ID = ""
		if (clerkId) {
			const user = await prisma.user.findUnique({
				where: { clerkId },
			})
			ID = user ? user.id : ""
		} else {
			ID = userID
		}
		const allCategories = await prisma.category.findMany()
		await prisma.$transaction(
			allCategories.map(category =>
				prisma.userCategory.upsert({
					where: {
						userId_categoryId: {
							userId: ID,
							categoryId: category.id,
						},
					},
					update: {
						userId: ID,
						categoryId: category.id,
						selected: false,
					},
					create: {
						userId: ID,
						categoryId: category.id,
					},
				}),
			),
		)
	} catch (error) {
		console.error(error)
	}
}
