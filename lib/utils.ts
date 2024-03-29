import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
//todo write vality for each case

export const constraints = {
	email: [
		"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
		"Invalid email address",
	],
	password: [
		"^(?=.*[A-Za-z])(?=.*\\d).{8,}$",
		"Minimum eight characters, at least one letter and one number",
	],
}
export type UserCategoryData = { id: string; name: string; selected: boolean }[]
export type UserState = { userId: string; data: UserCategoryData }
