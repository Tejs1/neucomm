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
import {
	updateUserCategoriesPreference,
	updateUserCategoryPreference,
} from "@/utils/putActions"

const FormSchema = z.object({
	items: z.record(z.boolean()),
})

export function CheckboxReactHookFormMultiple({
	items,
	userId,
}: {
	items: { id: string; label: string; selected: boolean }[]
	userId: string
}) {
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: items.reduce(
				(acc, item) => ({ ...acc, [item.id]: item.selected }),
				{},
			),
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const items = Object.keys(data.items)
		Promise.all(
			items.map(item =>
				updateUserCategoryPreference(userId, item, data.items[item]),
			),
		).then(res => {
			console.log("updated", res)
			// router refresh
			router.refresh()
		})

		// const update = updateUserCategoryPreference(userId, selectedItems, true)
		// // disable the button while submitting

		// update
		// 	.then(res => {
		// 		console.log("updated", res)
		// 	})
		// 	.catch(e => {
		// 		console.error(e)
		// 	})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
													{item.label}
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
