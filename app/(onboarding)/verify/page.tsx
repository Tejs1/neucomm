import prisma from "@/utils/dbDirect"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const createNewUser = async () => {
	"use server"
	const user = await currentUser()
	console.log(user)

	if (user) {
		const match = await prisma.user.findUnique({
			where: {
				clerkId: user.id as string,
			},
		})

		if (!match) {
			await prisma.user.create({
				data: {
					clerkId: user.id,
					email: user.emailAddresses[0].emailAddress,
				},
			})
		}
		redirect("/interests")
	} else {
		redirect("/sign-in")
	}
}

const NewUser = async () => {
	await createNewUser()
	return <div>...loading</div>
}

export default NewUser
