import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { MainLayout } from 'src/components/layouts'
import { HabitGroupPreview } from 'src/components/molecules'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import dayjs from 'dayjs'

const GROUP_QUERY = gql`
	query Group($groupId: ID!, $gte: Date, $lte: Date) {
		group(id: $groupId, gte: $gte, lte: $lte) {
			name
			habits {
				name
				id
				records {
					completed
					updatedAt
					user {
						name
						image
					}
				}
			}
		}
	}
`

export default function GroupPage() {
	const [day, setDay] = useState(dayjs())

	const router = useRouter()
	const { id } = router.query

	const { data, loading, error } = useQuery(GROUP_QUERY, {
		variables: {
			groupId: id,
			gte: dayjs(day).startOf('d'),
			lte: dayjs(day).endOf('d'),
		},
		fetchPolicy: 'network-only',
	})

	return (
		<MainLayout>
			<div className="mb-8 grid grid-cols-3 items-center">
				<Link href="/">
					<ArrowLeftIcon width={24} height={24} />
				</Link>
				<h2 className="text-center text-2xl font-semibold">
					{data?.group.name}
				</h2>
			</div>
			<div className="mb-8 grid grid-cols-3">
				<div>
					<button
						onClick={(e) => {
							e.preventDefault()
							setDay(day.subtract(1, 'day'))
						}}
					>
						prev
					</button>
				</div>
				<div className="text-center">
					{dayjs(day).format('MMMM D, YYYY')}
				</div>
				<div className="text-right">
					{!dayjs(day).add(1, 'day').isAfter(dayjs()) ? (
						<button
							onClick={(e) => {
								e.preventDefault()
								setDay(day.add(1, 'day'))
							}}
						>
							next
						</button>
					) : (
						''
					)}
				</div>
			</div>
			<div>
				{data?.group.habits.map((habit) => (
					<div>
						<HabitGroupPreview habit={habit} />
					</div>
				))}
			</div>
		</MainLayout>
	)
}
