"use client"
import React, { useState, useRef, KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserAuthForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()

	// Create a ref array for the input fields
	const otpRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([])
	otpRefs.current = Array(8)
		.fill(null)
		.map((_, i) => otpRefs.current[i] ?? React.createRef<HTMLInputElement>())

	const focusNextInputField = (index: number) => {
		if (index < 7) {
			otpRefs.current[index + 1].current?.focus()
		}
	}

	const focusPrevInputField = (index: number) => {
		if (index > 0) {
			otpRefs.current[index - 1].current?.focus()
		}
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const value = e.target.value
		if (value) {
			focusNextInputField(index)
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === "Backspace" && !e.currentTarget.value) {
			focusPrevInputField(index)
		}
	}

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			router.push("/dashboard")
		}, 300)
	}
	// handlePaste
	const handlePaste = (
		e: React.ClipboardEvent<HTMLInputElement>,
		index: number,
	) => {
		e.preventDefault()
		const paste = e.clipboardData?.getData("text")
		const pasteArray = paste.split("").slice(0, 8)

		for (let i = 0; i < pasteArray.length; i++) {
			const input = otpRefs.current[index + i].current
			if (input) {
				input.value = pasteArray[i]
			}
		}
	}
	return (
		<main className="flex-grow flex h-full flex-col items-center justify-center">
			<div className="grid gap-6 m-auto border rounded-3xl p-10">
				<div className="flex flex-col items-center">
					<h1 className="text-[32px] font-semibold">Verify your email</h1>
					<span className="text-muted-foreground">
						Enter the 8 digit code you have received on
					</span>
					<strong>mail@ac.in</strong>
				</div>
				<form
					onSubmit={onSubmit}
					className="flex items-center justify-center flex-col gap-16"
				>
					<div className="gap-4 flex">
						{Array.from({ length: 8 }, (_, index) => (
							<Input
								required
								key={index}
								ref={otpRefs.current[index]}
								type="text"
								maxLength={1}
								id={`otp${index + 1}`}
								placeholder="0"
								className="w-12 h-12 text-center"
								onChange={e => handleInputChange(e, index)}
								onPaste={e => handlePaste(e, index)}
								onKeyDown={e => handleKeyDown(e, index)}
							/>
						))}
					</div>
					<Button disabled={isLoading} className="uppercase">
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Create Account
					</Button>
				</form>
			</div>
		</main>
	)
}
