"use client"

import { useState } from "react"
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
import { UserState } from "@/lib/utils"

export function Interests({
	totalPages,
	categoriesPerPage,
	userId,
	state,
}: {
	totalPages: number
	categoriesPerPage: number
	userId: string
	state: UserState
}) {
	const [currentPage, setCurrentPage] = useState(1)

	const start = (currentPage - 1) * categoriesPerPage
	const end = start + categoriesPerPage
	const paginatedCategories = state.data.slice(start, end)

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
							items={paginatedCategories}
							userId={userId}
							state={state}
						/>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										disabled={currentPage <= 1}
										aria-disabled={currentPage <= 1}
										onClick={() => {
											setCurrentPage(currentPage - 1)
										}}
									/>
								</PaginationItem>

								<PaginationItem>
									<PaginationLink
										onClick={() => {
											setCurrentPage(currentPage)
										}}
									>
										{currentPage}
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>

								<PaginationItem>
									<PaginationNext
										disabled={currentPage >= totalPages}
										aria-disabled={currentPage >= totalPages}
										onClick={() => {
											setCurrentPage(currentPage + 1)
										}}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			</div>
		</main>
	)
}
