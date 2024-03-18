import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ModeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme()

	// React.useEffect(() => {
	//     setIsDark(resolvedTheme === "dark");
	// }, [resolvedTheme]);

	// Utilize `resolvedTheme` to ensure the theme is set after hydration
	const isDarkMode = resolvedTheme === "dark"

	// Handler to toggle theme
	const toggleTheme = () => {
		setTheme(isDarkMode ? "light" : "dark")
	}

	// Optionally, you can use a loading state or a placeholder until `resolvedTheme` is available
	// to avoid rendering the switch with incorrect initial state.
	if (typeof resolvedTheme === "undefined") {
		return (
			<div className="flex items-center space-x-2">
				<Switch id="dark-mode-switch" checked={false} />
				<Label htmlFor="dark-mode-switch">Dark Mode</Label>
			</div>
		) // or a placeholder/loader component
	}

	return (
		<>
			<div className="flex items-center space-x-2">
				<Switch
					id="dark-mode-switch"
					checked={isDarkMode}
					onCheckedChange={toggleTheme}
				/>
				<Label htmlFor="dark-mode-switch">Dark Mode</Label>
			</div>
		</>
	)
}
