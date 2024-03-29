import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { NavBar } from "@/components/NavBar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={
						inter.className + " flex flex-col w-full items-center min-h-screen"
					}
				>
					<ThemeProvider>
						<NavBar />
					</ThemeProvider>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
