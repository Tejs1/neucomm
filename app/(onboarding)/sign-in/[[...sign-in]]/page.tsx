"use client"

import * as React from "react"
import Link from "next/link"
import { useSignIn, currentUser, auth, useAuth, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { z } from "zod"

import { cn, constraints } from "@/lib/utils"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserAuthForm() {
	console.log(
		"UserAuthForm",
		currentUser,
		"auth",
		auth,
		"useAuth",
		useAuth,
		"useClerk",
		useClerk,
	)
	const user = currentUser()
	const {} = useAuth()
	const { isLoaded, signIn, setActive } = useSignIn()
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [isFormValid, setIsFormValid] = React.useState<boolean>(false)
	const router = useRouter()
	const formRef = React.useRef<HTMLFormElement>(null)

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()

		if (!isLoaded) {
			return
		}
		const form = event.currentTarget as HTMLFormElement
		if (!form.checkValidity()) {
			return
		}
		const formData = new FormData(form)
		const emailAddress = formData.get("email") as string
		const password = formData.get("password") as string

		const schema = z.object({
			email: z.string().email(),
			password: z.string().min(8),
		})

		const parse = schema.safeParse({
			email: emailAddress,
			password: password,
		})

		if (!parse.success) {
			throw new Error("Invalid form data")
		}

		try {
			const result = await signIn.create({
				identifier: emailAddress,
				password,
			})

			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId })
				router.push("/verify")
			} else {
				/*Investigate why the sign-in hasn't completed */
				console.log(result, "result")
			}
		} catch (err: any) {
			console.error("error", err)
		}
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
			<div className="grid gap-6 m-auto border rounded-3xl p-10 w-[400px]">
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

				<form ref={formRef} onSubmit={onSubmit}>
					<div className="grid gap-2">
						<div className="grid gap-8">
							<Label htmlFor="email">
								Email{" "}
								<Input
									onChange={e => validateForm(e)}
									id="email"
									type="email"
									name="email"
									placeholder="name@example.com"
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
									type="password"
									name="password"
									placeholder="Enter your password"
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
								className="uppercase font-bold"
								value="Validate"
								type="submit"
							>
								{isLoading && (
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								)}
								Log In
							</Button>
						</div>
					</div>
				</form>

				<div className="relative flex justify-center text-sm  pt-[38px]">
					<span className="bg-background px-2 text-accent-foreground">
						Don&apos;t have an Account?{" "}
						<Link href="sign-up" className="uppercase font-bold m-1">
							Sign up
						</Link>
					</span>
				</div>
			</div>
		</main>
	)
}
