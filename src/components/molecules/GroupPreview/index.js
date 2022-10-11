import HabitPreview from 'src/components/molecules/HabitPreview'
import Link from 'next/link'
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import { gql, useQuery } from '@apollo/client'
import dayjs from 'dayjs'

const GROUP = gql`
	query Group($groupId: ID!, $gte: Date, $lte: Date) {
		group(id: $groupId, gte: $gte, lte: $lte) {
			name
			id
			habits {
				...HabitPreviewFragment
			}
		}
	}
	${HabitPreview.fragments.habit}
`

const GroupPreview = ({ group, className }) => {
	const { data: groupData } = useQuery(GROUP, {
		variables: {
			groupId: group.id,
			gte: dayjs().startOf('d'),
			lte: dayjs().endOf('d'),
		},
	})
	return (
		<div
			className={`${className} flex flex-col overflow-hidden rounded-2xl  shadow-md transition hover:-translate-y-2 hover:shadow-xl`}
		>
			<div className={'flex h-full flex-col p-4'}>
				<h3 className="mb-2 text-xl font-semibold">{group.name}</h3>

				{groupData?.group.habits?.map((habit) => (
					<HabitPreview habit={habit} />
				))}
			</div>
			<Link href={`/groups/${group.id}`}>
				<div
					className={
						'group flex cursor-pointer items-center justify-center bg-emerald-500 p-4 font-semibold text-white hover:bg-emerald-600'
					}
				>
					See Group
					<ArrowSmallRightIcon
						className="transition group-hover:translate-x-1"
						height="24"
						width="24"
					/>
				</div>
			</Link>
		</div>
	)
}

export default GroupPreview
