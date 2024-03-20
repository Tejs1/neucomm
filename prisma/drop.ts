import { PrismaClient } from "@prisma/client"
// npx tsx ./prisma/drop.ts
const prisma = new PrismaClient()
//claer all data
async function deleteAllPosts() {
	const prisma = new PrismaClient()

	try {
		const deleteAll = await prisma.user.deleteMany({})
		console.log(`Deleted ${deleteAll.count} users.`)
	} catch (error) {
		console.error("Error deleting users:", error)
	} finally {
		await prisma.$disconnect()
	}
}

deleteAllPosts()
