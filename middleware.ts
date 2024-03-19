import { authMiddleware } from "@clerk/nextjs"

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware

export default authMiddleware({
	// Allow signed out users to access the specified routes:
	publicRoutes: [
		"/",
		"/sign-in",
		"/sign-up",
		"/forgot-password",
		"/reset-password",
		"/verify-email",
		"/api/auth/signin",
		"/api/auth/signout",
		"/api/auth/signup",
		"/api/auth/forgot-password",
		"/api/auth/reset-password",
		"/api/auth/verify-email",
		"/api/auth/refresh-token",
	],
	// Prevent the specified routes from accessing
	// authentication information:
	// ignoredRoutes: ['/no-auth-in-this-route'],
})

export const config = {
	matcher: [
		// Exclude files with a "." followed by an extension, which are typically static files.
		// Exclude files in the _next directory, which are Next.js internals.
		"/((?!.*\\..*|_next).*)",
		"/",
		"/((?!.+\\.[\\w]+$|_next).*)",
		"/(api|trpc)(.*)",
		// Re-include any files in the api or trpc folders that might have an extension
	],
}
