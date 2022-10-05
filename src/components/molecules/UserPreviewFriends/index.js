import { Button } from 'src/components/atoms'
import { UserPreview } from 'src/components/molecules'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

const REMOVE_FRIEND = gql`
	mutation RemoveFriend($id: ID!, $friendId: ID!) {
		removeFriend(id: $id, friendId: $friendId) {
			friends {
				id
			}
		}
	}
`

const ME = gql`
	query User($id: ID) {
		user(id: $id) {
			outFriendRequests {
				id
			}
		}
	}
`

const UserPreviewFriends = ({ user }) => {
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
	const [removeFriend] = useMutation(REMOVE_FRIEND)

	return (
		<UserPreview user={user}>
			<div>
				<Button
					icon
					onClick={(e) => {
						e.preventDefault()
						removeFriend({
							variables: {
								id: userId,
								friendId: user.id,
							},
							refetchQueries: ['User'],
						})
					}}
				>
					<XMarkIcon weight="24" height="24" />
				</Button>
			</div>
		</UserPreview>
	)
}

export default UserPreviewFriends
