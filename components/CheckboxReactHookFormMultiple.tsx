"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { UserState } from "@/lib/utils"
import { updateUserCategoryPreference } from "@/utils/putActions"

const FormSchema = z.object({
	items: z.record(z.boolean()),
})
export function CheckboxReactHookFormMultiple({
	items,
	userId,
	state,
}: {
	items: { id: string; name: string; selected: boolean }[]
	userId: string
	state: UserState
}) {
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: state.data.reduce((acc, item) => {
				acc[item.id] = item.selected
				return acc
			}, {} as Record<string, boolean>),
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const items = Object.keys(data.items)
		const selectedItems = items.filter(
			item =>
				data.items[item] !== state.data.find(i => i.id === item)?.selected,
		)
		console.log("submitting", selectedItems, userId)
		if (selectedItems.length !== 0) {
			Promise.all(
				selectedItems.map(item =>
					updateUserCategoryPreference(state.userId, item, data.items[item]),
				),
			).then(res => {
				router.refresh()
			})
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
				key={items[0].id}
			>
				<FormField
					control={form.control}
					name="items"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel className="text-base">My saved interests!</FormLabel>
							</div>
							{items.map(item => (
								<FormField
									key={item.id}
									control={form.control}
									name="items"
									render={({ field }) => {
										return (
											<FormItem
												key={item.id}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value[item.id]}
														onCheckedChange={checked => {
															field.onChange({
																...field.value,
																[item.id]: checked,
															})
														}}
													/>
												</FormControl>
												<FormLabel className="text-sm font-normal">
													{item.name}
												</FormLabel>
											</FormItem>
										)
									}}
								/>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
