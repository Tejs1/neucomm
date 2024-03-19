"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom"
import { useState } from "react"
import { createUser } from "@/utils/putActions"
import { cn, constraints } from "@/lib/utils"
import { useSignUp } from "@clerk/nextjs"
import { UserVerifyForm } from "@/components/UserVerifyForm"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState = {
	message: "",
	email: "",
}
// function SubmitButton() {
// 	return (
// 		<button type="submit" aria-disabled={isLoading}>
// 			Add
// 		</button>
// 	)
// }

export default function UserAuthForm() {
	const [name, setName] = useState("")
	const { isLoaded, signUp, setActive } = useSignUp()
	const [pendingVerification, setPendingVerification] = useState(false)

	const router = useRouter()

	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [isFormValid, setIsFormValid] = React.useState<boolean>(false)
	const [state, formAction] = useFormState(createUser, initialState)
	const { pending } = useFormStatus()

	const formRef = React.useRef<HTMLFormElement>(null)

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		const form = event.currentTarget as HTMLFormElement
		if (!form.checkValidity()) {
			return
		}

		if (!isLoaded) {
			return
		}
		setIsLoading(true)
		//get input values
		const formData = new FormData(form)
		const name = formData.get("name") as string
		setName(name)

		const emailAddress = formData.get("email") as string
		const password = formData.get("password") as string

		try {
			await signUp.create({
				emailAddress,
				password,
			})

			// send the email.
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

			// change the UI to our pending section.
			setIsLoading(false)
			setPendingVerification(true)
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2))
		} finally {
			setIsLoading(false)
		}
	}

	async function onPressVerify(code: string) {
		if (!isLoaded) {
			return
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			})
			console.log(name)
			if (completeSignUp.status !== "complete") {
				/*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
				console.log(JSON.stringify(completeSignUp, null, 2))
			}
			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId })
				router.push("/")
			}
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2))
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
		<main className="flex-grow flex h-full flex-col items-center  justify-center">
			{!pendingVerification && (
				<div className="grid gap-6 m-auto border rounded-3xl p-10">
					<h1 className="text-[32px] font-semibold">Create your account</h1>
					<form ref={formRef} action={formAction} onSubmit={onSubmit}>
						<div className="grid gap-2">
							<div className="grid gap-8">
								<Label htmlFor="name">
									Name{" "}
									<Input
										onChange={e => validateForm(e)}
										id="name"
										type="name"
										name="name"
										placeholder="John Doe"
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
										placeholder="Create a strong password"
										autoCapitalize="none"
										autoComplete="password"
										autoCorrect="off"
										disabled={isLoading}
										className="mt-2"
										required
									/>
								</Label>
								<Button
									aria-disabled={isLoading}
									className="uppercase"
									value="Validate"
									type="submit"
								>
									{pending && (
										<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
									)}
									Create Account
								</Button>
								<p aria-live="polite" className="sr-only" role="status">
									{state?.message}
								</p>
							</div>
						</div>
					</form>

					<div className="relative flex justify-center text-xs ">
						<span className="bg-background px-2 text-muted-foreground">
							Have an account?{" "}
							<Link href="sign-in" className="uppercase font-bold">
								Log In
							</Link>
						</span>
					</div>
				</div>
			)}
			{pendingVerification && (
				<UserVerifyForm email={state.email} onPressVerify={onPressVerify} />
			)}
		</main>
	)
}
