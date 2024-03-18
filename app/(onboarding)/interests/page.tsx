"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn, constraints } from "@/lib/utils"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Interests() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const router = useRouter()
	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			router.push("/verify")
		}, 300)
	}

	return (
		<main className="flex-grow flex h-full flex-col items-center  ">
			<div className="grid gap-6 m-auto border rounded-3xl p-10">
				<div className="flex items-center flex-col justify-start">
					<h1 className="text-[32px] font-semibold">Login</h1>
					<h2 className="text-2xl">
						<span className="text-accent-foreground">Welcome back to </span>{" "}
						Nuecomm
					</h2>
					<span className="text-muted-foreground">
						The next gen business marketplace
					</span>
				</div>

				<form onSubmit={onSubmit}>
					<div className="grid gap-2">
						<div className="grid gap-8">
							<Label htmlFor="email">
								Email{" "}
								<Input
									id="email"
									placeholder="name@example.com"
									type="email"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect="off"
									className="mt-2"
									required
								/>
							</Label>

							<Label htmlFor="password">
								Password{" "}
								<Input
									id="password"
									placeholder="Enter your password"
									type="password"
									autoCapitalize="none"
									autoComplete="password"
									autoCorrect="off"
									className="mt-2"
									required
								/>
							</Label>
							<Button className="uppercase" value="Validate" type="submit">
								{isLoading && (
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								)}
								Log In
							</Button>
						</div>
					</div>
				</form>

				<div className="relative flex justify-center text-xs ">
					<span className="bg-background px-2 text-accent-foreground">
						Don’t have an Account?{" "}
						<Link href="login" className="uppercase font-bold">
							Sign up
						</Link>
					</span>
				</div>
			</div>
		</main>
	)
}
