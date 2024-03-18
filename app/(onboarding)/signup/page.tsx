"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn, constraints } from "@/lib/utils"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserAuthForm() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [isFormValid, setIsFormValid] = React.useState<boolean>(false)
	const router = useRouter()
	const formRef = React.useRef<HTMLFormElement>(null)

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			router.push("/verify")
		}, 300)
	}

	function validateForm(e: React.ChangeEvent<HTMLInputElement>) {
		if (formRef.current) {
			if (e && constraints.hasOwnProperty(e.target.id)) {
				const input = e.target as HTMLInputElement
				type InputType = keyof typeof constraints
				const type: string = input.id

				const constraintEmail = new RegExp(
					constraints[type as InputType][0],
					"",
				)
				if (constraintEmail.test(input.value)) {
					input.setCustomValidity("")
				} else {
					input.setCustomValidity(constraints[type as InputType][1])
				}
			}
			setIsFormValid((formRef.current as HTMLFormElement).checkValidity())
		}
	}

	return (
		<main className="flex-grow flex h-full flex-col items-center  ">
			<div className="grid gap-6 m-auto border rounded-3xl p-10">
				<h1 className="text-[32px] font-semibold">Create your account</h1>
				<form ref={formRef} onSubmit={onSubmit}>
					<div className="grid gap-2">
						<div className="grid gap-8">
							<Label htmlFor="name">
								Name{" "}
								<Input
									onChange={e => validateForm(e)}
									id="name"
									placeholder="John Doe"
									type="name"
									autoCapitalize="words"
									autoComplete="name"
									autoCorrect="off"
									disabled={isLoading}
									className="mt-2"
									required
								/>
							</Label>

							<Label htmlFor="email">
								Email{" "}
								<Input
									onChange={e => validateForm(e)}
									id="email"
									placeholder="name@example.com"
									type="email"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect="off"
									disabled={isLoading}
									className="mt-2"
									required
								/>
							</Label>

							<Label htmlFor="password">
								Password{" "}
								<Input
									onChange={e => validateForm(e)}
									id="password"
									placeholder="Create a strong password"
									type="password"
									autoCapitalize="none"
									autoComplete="password"
									autoCorrect="off"
									disabled={isLoading}
									className="mt-2"
									required
								/>
							</Label>
							<Button
								disabled={isLoading}
								className="uppercase"
								value="Validate"
								type="submit"
							>
								{isLoading && (
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								)}
								Create Account
							</Button>
						</div>
					</div>
				</form>

				<div className="relative flex justify-center text-xs ">
					<span className="bg-background px-2 text-muted-foreground">
						Have an account?{" "}
						<Link href="login" className="uppercase font-bold">
							Log In
						</Link>
					</span>
				</div>
			</div>
		</main>
	)
}
