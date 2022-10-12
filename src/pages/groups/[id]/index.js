import { useState } from 'react'
import { Button, Avatar } from 'src/components/atoms'
import { HabitGroupPreview, Modal } from 'src/components/molecules'
import { CreateHabitForm } from 'src/components/organisms'
import { MainLayout } from 'src/components/layouts'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import {
	ArrowLeftIcon,
	SquaresPlusIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import dayjs from 'dayjs'

const GROUP_QUERY = gql`
	query Group($groupId: ID!, $gte: Date, $lte: Date) {
		group(id: $groupId, gte: $gte, lte: $lte) {
			name
			users {
				id
				name
				image
			}
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
	const [habitModal, setHabitModal] = useState(false)
	const [edit, setEdit] = useState(false)

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
			<div className="flex justify-between">
				<div>
					<Link href={`/groups/${id}/members`}>Members</Link>
				</div>
				<div
					onClick={() => {
						setEdit(!edit)
					}}
				>
					Edit
				</div>
			</div>
			<div className="mx-auto mb-8 flex items-center justify-center gap-2">
				<div className="text-left">
					<button
						onClick={(e) => {
							e.preventDefault()
							setDay(day.subtract(1, 'day'))
						}}
					>
						<ArrowLeftIcon height="16" width="16" />
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
							<ArrowRightIcon height="16" width="16" />
						</button>
					) : (
						''
					)}
				</div>
			</div>
			{edit && (
				<div className="flex  items-center justify-end gap-2">
					<Button
						onClick={(e) => {
							e.preventDefault()
							setHabitModal(1)
						}}
						icon
					>
						<SquaresPlusIcon width={24} height={24} />
					</Button>
				</div>
			)}
			<div>
				{data?.group.habits.map((habit) => (
					<div>
						<HabitGroupPreview
							habit={habit}
							edit={edit}
							groupQuery={GROUP_QUERY}
						/>
					</div>
				))}
			</div>
			{habitModal ? (
				<CreateHabitForm
					setHabitModal={setHabitModal}
					userIds={data?.group.users.map((user) => user.id)}
					groupId={id}
					groupQuery={GROUP_QUERY}
				/>
			) : null}
		</MainLayout>
	)
}
