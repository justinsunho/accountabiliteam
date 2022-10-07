import HabitPreview from 'src/components/molecules/HabitPreview'
import Link from 'next/link'
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import { gql, useQuery } from '@apollo/client'

const GROUP = gql`
	query Group($groupId: ID!) {
		group(id: $groupId) {
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
		},
	})
	return (
		<div
			className={`${className} justify-stretch mb-8 flex flex flex-col flex-col items-stretch overflow-hidden  rounded-2xl shadow-md transition hover:-translate-y-2 hover:shadow-xl`}
		>
			<div className={'h-full p-4'}>
				<h3 className="self-center text-xl font-semibold">
					{group.name}
				</h3>

				{groupData?.group.habits?.map((habit) => (
					<HabitPreview habit={habit} />
				))}
			</div>
			<div
				className={
					'group flex items-center bg-emerald-500 p-4 font-semibold text-white hover:bg-emerald-600'
				}
			>
				<Link href={`/groups/${group.id}`}>See Group</Link>
				<ArrowSmallRightIcon
					className="transition group-hover:translate-x-1"
					height="24"
					width="24"
				/>
			</div>
		</div>
	)
}

export default GroupPreview
