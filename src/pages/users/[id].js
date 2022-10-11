import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { MainLayout } from 'src/components/layouts'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const USER_QUERY = gql`
	query User($userId: ID!) {
		user(id: $userId) {
			id
			name
		}
	}
`

export default function GroupPage() {
	const router = useRouter()
	const { id } = router.query

	const { data, loading, error } = useQuery(USER_QUERY, {
		variables: {
			userId: id,
		},
	})

	return (
		<MainLayout>
			<ArrowLeftIcon width={24} height={24} />

			<div>{data?.user.name}</div>
		</MainLayout>
	)
}
