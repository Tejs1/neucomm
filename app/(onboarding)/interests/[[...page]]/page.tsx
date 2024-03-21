import { getUserCategories } from "@/utils/putActions"
import { Interests } from "./Interests"
import { currentUser } from "@clerk/nextjs"

const categoriesPerPage = 6
export default async function InterestsPage() {
	const user = await currentUser()
	const { data, userId } = await getUserCategories(user!.id)
	data.sort((a, b) => a.id.localeCompare(b.id))

	const totalPages = Math.ceil(data.length / categoriesPerPage)

	return (
		<Interests
			totalPages={totalPages}
			userId={user!.id}
			categoriesPerPage={categoriesPerPage}
			state={{ data, userId }}
		/>
	)
}
