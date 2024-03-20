"use server"
import prisma from "@/utils/dbDirect"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

const createNewUser = async (name: string) => {
	// const searchParams = request.nextUrl.searchParams
	// const name = searchParams.get("name")
	console.log(name)

	const user = await currentUser()
	// timeoout
	await new Promise(resolve => setTimeout(resolve, 2000))
	if (user) {
		const match = await prisma.user.findUnique({
			where: {
				clerkId: user.id,
			},
		})

		if (!match) {
			await prisma.user.create({
				data: {
					clerkId: user.id,
					email: user.emailAddresses[0].emailAddress,
					name: name ? decodeURI(name) : "",
				},
			})
		}

		redirect("/interests")
	} else {
		redirect("/sign-in")
	}
}

const NewUser = async ({
	searchParams,
}: {
	searchParams: { name: string }
}) => {
	await createNewUser(searchParams.name)
	return <div>...loading</div>
}

export default NewUser
