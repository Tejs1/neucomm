import { getAllUsers, getFirstUser } from "@/utils/actions"
import Image from "next/image"

export default async function Home() {
	const users = await getAllUsers()
	console.log(users)

	return (
		<main className="flex min-h-screen flex-col items-center justify-center ">
			{users.map(user => (
				<div key={user.id}>
					<h1>{user.name}</h1>
					<p>{user.email}</p>
				</div>
			))}
		</main>
	)
}
