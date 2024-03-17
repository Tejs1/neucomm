"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserAuthForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	// Create an array of refs
	const otpRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([])
	otpRefs.current = Array(8)
		.fill(null, 0, 8)
		.map((_, i) => otpRefs.current[i] ?? React.createRef())

	const focusNextInputField = (index: number) => {
		if (index < 7 && otpRefs.current[index + 1]?.current) {
			otpRefs.current[index + 1]?.current?.focus()
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

	async function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault()
		setIsLoading(true)

		// Simulate an API call
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
		const pasteArray = paste.split("")

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
								autoCapitalize="words"
								maxLength={1}
								id={`otp${index + 1}`}
								placeholder="0"
								className="w-12 h-12 text-center"
								onChange={e => handleInputChange(e, index)}
								onPaste={e => handlePaste(e, index)}
							/>
						))}
					</div>

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
				</form>
			</div>
		</main>
	)
}
