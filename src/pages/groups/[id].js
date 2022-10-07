import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { MainLayout } from 'src/components/layouts'
import { LinkDirection } from 'src/components/atoms'
import Header from 'src/components/layouts/MainLayout/Header'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const GROUP_QUERY = gql`
	query Group($groupId: ID!) {
		group(id: $groupId) {
			id
			name
			users {
				id
				name
			}
			habits {
				id
				name
			}
		}
	}
`

export default function GroupPage() {
	const router = useRouter()
	const { id } = router.query

	const { data, loading, error } = useQuery(GROUP_QUERY, {
		variables: {
			groupId: id,
		},
	})

	return (
		<MainLayout>
			<div>{id}</div>
			<span>{data?.group.name}</span>
			<span>{data?.group.habits.map((habit) => habit.name)}</span>
			<span>
				{data?.group.users.map((user) => (
					<div>{user.name}</div>
				))}
			</span>
		</MainLayout>
	)
}
