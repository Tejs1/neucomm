"use server"
// import { useSignUp } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import db from "@/utils/dbDirect"

export async function createUser(
	prevState: {
		message: string
	},
	formData: FormData,
) {
	const schema = z.object({
		name: z.string().min(1),
		email: z.string().email().min(1),
		password: z.string().min(1),
	})
	const parse = schema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	})

	if (!parse.success) {
		return { message: "Failed to create User", email: "" }
	}

	const data = parse.data
	try {
		// await db.user.create({
		// 	data: {
		// 		name: data.name,
		// 		email: data.email,
		// 		password: data.password,
		// 	},
		// })
		// fake timeout
		revalidatePath("/")

		return { message: "created User", email: data.email }
	} catch (e) {
		console.error(e)
		return { message: "Failed to create User", email: "" }
	}
}

export async function sendOTP(email: string) {
	const schema = z.object({
		email: z.string().email(),
	})
	const data = schema.parse({
		email: email,
	})

	console.log(data)
	return { message: "OTP sent to " + data.email }
}
