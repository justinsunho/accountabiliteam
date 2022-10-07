import HabitPreview from 'src/components/molecules/HabitPreview'
import Link from 'next/link'
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

const GroupPreview = ({ group }) => {
	const { data: groupData } = useQuery(GROUP, {
		variables: {
			groupId: group.id,
		},
	})
	return (
		<div className="mb-4 rounded-2xl border-2 border-gray-300 p-4">
			<h3 className="text-xl text-blue-600">
				<Link href={`/groups/${group.id}`}>{group.name}</Link>
			</h3>
			<div>
				<h4 className="text-lg">Habits</h4>
				{groupData?.group.habits?.map((habit) => (
					<div
						key={habit.id}
						className="flex flex-row gap-2 rounded-2xl border-2 border-gray-300 p-2"
					>
						<HabitPreview habit={habit} />
					</div>
				))}
			</div>
		</div>
	)
}

export default GroupPreview
