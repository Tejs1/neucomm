import { getAllCategories, getUserCategories } from "@/utils/putActions"
import { Interests } from "./Interests"
import { currentUser } from "@clerk/nextjs"

export default async function InterestsPage({
	params,
}: {
	params: { page: string[] }
}) {
	// const categories = await getAllCategories()
	const user = await currentUser()
	const { userId, data } = await getUserCategories(user!.id)
	data.sort((a, b) => a.id.localeCompare(b.id))

	return <Interests params={params} categories={data} userId={userId} />
}
