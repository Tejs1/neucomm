"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { CheckboxReactHookFormMultiple } from "@/components/CheckboxReactHookFormMultiple"
// import { categories } from "@/prisma/categories"

const categoriesPerPage = 6

export function Interests({
	params,
	categories,
	userId,
}: {
	params: { page: string[] }
	categories: {
		id: string
		name: string
		selected: boolean
	}[]
	userId: string
}) {
	const currentPage =
		params?.page && params?.page[1] ? parseInt(params.page[1], 10) : 1

	const totalPages = Math.ceil(categories.length / categoriesPerPage)

	const start = (currentPage - 1) * categoriesPerPage
	const end = start + categoriesPerPage
	const paginatedCategories = categories.slice(start, end)
	const catrgoriesWithLabelAndID = paginatedCategories.map(category => {
		return {
			id: category.id,
			label: category.name,
			selected: category.selected,
		}
	})

	return (
		<main className="flex-grow flex h-full flex-col items-center  ">
			<div className="grid gap-6 m-auto border rounded-3xl p-10">
				<div>
					<div className="flex items-center flex-col justify-start">
						<h1 className="text-[32px] font-semibold">
							Please mark your interests!
						</h1>
						<h2 className="text-lg text-muted-foreground">
							We will keep you notified.
						</h2>
					</div>
					<div>
						<CheckboxReactHookFormMultiple
							items={catrgoriesWithLabelAndID}
							userId={userId}
						/>
						<Pagination>
							<PaginationContent>
								{currentPage > 1 && (
									<PaginationItem>
										<PaginationPrevious
											href={`/interests/page/${currentPage - 1}`}
										/>
									</PaginationItem>
								)}

								<PaginationItem>
									<PaginationLink href={`/interests/page/${currentPage}`}>
										{currentPage}
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>

								{currentPage < totalPages && (
									<PaginationItem>
										<PaginationNext
											href={`/interests/page/${currentPage + 1}`}
										/>
									</PaginationItem>
								)}
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			</div>
		</main>
	)
}
