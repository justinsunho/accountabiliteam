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

const GroupPreview = ({ group, className }) => {
	const { data: groupData } = useQuery(GROUP, {
		variables: {
			groupId: group.id,
		},
	})
	return (
		<div
			className={`${className} mb-4 rounded-2xl border-2 border-gray-300 p-4`}
		>
			<h3 className="text-xl">{group.name}</h3>

			{groupData?.group.habits?.map((habit) => (
				<HabitPreview habit={habit} />
			))}
			<a className={' text-blue-600'}>
				<Link href={`/groups/${group.id}`}>See Group</Link>
			</a>
		</div>
	)
}

export default GroupPreview
