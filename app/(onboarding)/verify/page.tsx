"use client"
import React, { useState, useRef, KeyboardEvent, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserAuthForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [otpValues, setOtpValues] = useState<string[]>(Array(8).fill(""))
	const router = useRouter()

	// Create a ref array for the input fields
	const otpRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([])
	otpRefs.current = Array(8)
		.fill(null)
		.map((_, i) => otpRefs.current[i] ?? React.createRef<HTMLInputElement>())

	const focusNextInputField = useCallback((index: number) => {
		if (index < 7) {
			otpRefs.current[index + 1].current?.focus()
		}
	}, [])

	const focusPrevInputField = useCallback((index: number) => {
		if (index > 0) {
			otpRefs.current[index - 1].current?.focus()
		}
	}, [])

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, index: number) => {
			// const value = e.target.value
			// if (value) {
			// 	focusNextInputField(index)
			// }
		},
		[],
	)

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>, index: number) => {
			console.log(e.key)
			if (e.key === "Backspace") {
				if (!otpValues[index]) focusPrevInputField(index)
				else {
					const newOtpValues = [...otpValues]
					newOtpValues[index] = ""
					setOtpValues(newOtpValues)
				}
			} else if (e.key === "ArrowLeft") focusPrevInputField(index)
			else if (e.key === "ArrowRight") focusNextInputField(index)
			else {
				const value = e.key
				const input = otpRefs.current[index].current
				const isValueValid =
					/^[a-z0-9]$/.test(value) && value.length === 1 && value !== " "
				if (isValueValid && input) {
					const newOtpValues = [...otpValues]
					newOtpValues[index] = value.toLocaleUpperCase()
					setOtpValues(newOtpValues)
					if (value) {
						focusNextInputField(index)
					}
				}
			}
		},
		[otpValues, focusNextInputField, focusPrevInputField],
	)

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			router.push("/dashboard")
		}, 300)
	}
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		const paste = e.clipboardData?.getData("text").slice(0, 8)
		const newOtpValues = [...otpValues]
		const trimmedPaste = paste.trim().toLocaleUpperCase().split("")

		trimmedPaste.forEach((char, i) => {
			newOtpValues[i] = char
		})
		setOtpValues(newOtpValues)
		focusNextInputField(trimmedPaste.length - 1)
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
								value={otpValues[index]}
								onChange={e => handleInputChange(e, index)}
								onKeyDown={e => handleKeyDown(e, index)}
								onPaste={e => handlePaste(e)}
							/>
						))}
					</div>
					<Button disabled={isLoading} className="uppercase">
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Verify
					</Button>
				</form>
			</div>
		</main>
	)
}
