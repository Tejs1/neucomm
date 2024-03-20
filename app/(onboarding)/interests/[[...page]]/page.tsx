import { getAllCategories } from "@/utils/putActions"
import { Interests } from "./Interests"
import { currentUser } from "@clerk/nextjs"

export default async function InterestsPage({
	params,
}: {
	params: { page: string[] }
}) {
	const categories = await getAllCategories()
	const user = await currentUser()
	return (
		<Interests params={params} categories={categories} clerkId={user!.id} />
	)
}
