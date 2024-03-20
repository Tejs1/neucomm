"use client"

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
import { updateUserCategoriesPreference } from "@/utils/putActions"

const FormSchema = z.object({
	items: z.array(z.string()).refine(value => value.some(item => item), {
		message: "You have to select at least one item.",
	}),
})

export function CheckboxReactHookFormMultiple({
	items,
	clerkId,
}: {
	items: { id: string; label: string }[]
	clerkId: string
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: [],
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data.items)
		const update = updateUserCategoriesPreference(clerkId, data.items, true)
		// disable the button while submitting

		update
			.then(res => {
				console.log("updated", res)
			})
			.catch(e => {
				console.error(e)
			})
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
														checked={field.value?.includes(item.id)}
														onCheckedChange={checked => {
															return checked
																? field.onChange([...field.value, item.id])
																: field.onChange(
																		field.value?.filter(
																			(value: string) => value !== item.id,
																		),
																  )
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
