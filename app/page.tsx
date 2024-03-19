import { getAllUsers, getFirstUser } from "@/utils/actions"
import Image from "next/image"

export default async function Home() {
	const users = await getAllUsers()

	return (
		<main className="flex min-h-screen flex-col items-center justify-between ">
			{users.map(user => (
				<div key={user.id}>
					<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					<h1>{user.name}</h1>
					<p>{user.email}</p>
				</div>
			))}
		</main>
	)
}
