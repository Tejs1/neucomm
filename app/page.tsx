import { getFirstUser } from "@/utils/actions"
import Image from "next/image"

export default async function Home() {
	const user = await getFirstUser()
	console.log(user)
	return (
		<main className="flex min-h-screen flex-col items-center justify-between "></main>
	)
}
