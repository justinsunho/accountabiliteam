import { gql, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

const ME = gql`
	query User($id: ID) {
		user(id: $id) {
			outFriendRequests {
				id
			}
		}
	}
`
const user = () => {
	const session = useSession()
	const userId = session?.data?.user?.id

	const {
		data: userData,
		loading: userLoading,
		error: userError,
	} = useQuery(ME, {
		variables: {
			id: userId,
		},
	})

	return userData
}

export default user
