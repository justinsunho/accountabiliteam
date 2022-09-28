import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const GROUP_QUERY = gql`
	query Group($groupId: ID!) {
		group(id: $groupId) {
			id
			name
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
		<div>
			<div>{id}</div>
			<div>{data.group.name}</div>
		</div>
	)
}
