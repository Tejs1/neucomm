import { NextResponse } from "next/server"
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware

export default authMiddleware({
	publicRoutes: ["/", "sign-in", "sign-up"],
	afterAuth(auth, req, evt) {
		if (
			(!auth.userId && req.nextUrl.pathname === "/") ||
			req.nextUrl.pathname === "/sign-in" ||
			req.nextUrl.pathname === "/sign-up"
		) {
			return NextResponse.next()
		}
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url })
		}
		if (auth.userId && !auth.isPublicRoute) {
			return NextResponse.next()
		}
		if (
			(auth.userId && req.nextUrl.pathname === "/sign-in") ||
			req.nextUrl.pathname === "/sign-up"
		) {
			const profile = new URL("/profile", req.url)
			return NextResponse.redirect(profile)
		}
	},
	// Allow signed out users to access the specified routes:

	// Prevent the specified routes from accessing
	// authentication information:
	// ignoredRoutes: ['/no-auth-in-this-route'],
})

export const config = {
	matcher: [
		// Exclude files with a "." followed by an extension, which are typically static files.
		// Exclude files in the _next directory, which are Next.js internals.
		"/((?!.*\\..*|_next).*)",
		"/(api|trpc)(.*)",
		// Re-include any files in the api or trpc folders that might have an extension
	],
}
