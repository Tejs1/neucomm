"use server"
import db from "@/utils/db"

export const getFirstUser = async () => {
	return await db.user.findFirst()
}

export const getAllUsers = async () => {
	return await db.user.findMany()
}

export const createUser = async (formData: FormData) => {
	console.log(formData)
	const rawFormData = {
		customerId: formData.get("name"),
		amount: formData.get("email"),
		status: formData.get("password"),
	}
	console.log(rawFormData)

	return {
		message: "Please enter a valid email",
	}
}
