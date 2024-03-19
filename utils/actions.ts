"use server"

import { revalidatePath } from "next/cache"
import db from "@/utils/db"
import { z } from "zod"

export async function getFirstUser() {
	const user = await db.user.findFirst()
	return user
}

export async function createUser(
	prevState: {
		message: string
	},
	formData: FormData,
) {
	console.log(formData)
	console.log(prevState)
	const schema = z.object({
		name: z.string().min(1),
		email: z.string().min(1),
		password: z.string().min(1),
	})
	const parse = schema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	})

	if (!parse.success) {
		return { message: "Failed to create User" }
	}

	const data = parse.data
	console.log(data)
	try {
		await db.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
			},
		})
		revalidatePath("/")
		return { message: "Failed to create user" }
	} catch (e) {
		return { message: "Failed to create user" }
	}
}

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
