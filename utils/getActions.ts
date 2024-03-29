export const config = {
	runtime: "edge",
}
// import { permanentRedirect, redirect } from "next/navigation"
// import { revalidatePath } from "next/cache"
// import { PrismaClient } from "@prisma/client"
// const db = new PrismaClient()
import db from "@/utils/db"

export async function getFirstUser() {
	const user = await db.user.findFirst()
	return user
}
export async function getAllUsers() {
	const users = await db.user.findMany()
	return users
}

// try {
// 	await db.user.create({
// 		data: {
// 			name: data.name,
// 			email: data.email,
// 			password: data.password,
// 		},
// 	})
// 	revalidatePath("/")
// 	return { message: "Failed to create user" }
// } catch (e) {
// 	return { message: "Failed to create user" }
// }

// export async function deleteTodo(
// 	prevState: {
// 		message: string
// 	},
// 	formData: FormData,
// ) {
// 	const schema = z.object({
// 		id: z.string().min(1),
// 		todo: z.string().min(1),
// 	})
// 	const data = schema.parse({
// 		id: formData.get("id"),
// 		todo: formData.get("todo"),
// 	})

// 	try {
// 		await sql`
//       DELETE FROM todos
//       WHERE id = ${data.id};
//     `

// 		revalidatePath("/")
// 		return { message: `Deleted todo ${data.todo}` }
// 	} catch (e) {
// 		return { message: "Failed to delete todo" }
// 	}
// }
