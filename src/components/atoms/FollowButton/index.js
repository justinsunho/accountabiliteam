import { Button } from 'src/components/atoms'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'

const SEND_FRIEND_REQUEST = gql`
	mutation Mutation($id: ID!, $outFriendRequestId: ID!) {
		sendFriendRequest(id: $id, outFriendRequestId: $outFriendRequestId) {
			name
		}
	}
`

const REMOVE_FRIEND_REQUEST = gql`
	mutation Mutation($id: ID!, $outFriendRequestId: ID!) {
		removeFriendRequest(id: $id, outFriendRequestId: $outFriendRequestId) {
			name
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

const FollowButton = ({ outRequestId }) => {
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

	const [friendRequestMutation] = useMutation(SEND_FRIEND_REQUEST)
	const [removeRequestMutation] = useMutation(REMOVE_FRIEND_REQUEST)

	const alreadyRequested =
		userData?.user.outFriendRequests.filter(
			(outFriendRequest) => outFriendRequest.id === outRequestId
		).length === 1

	return (
		<>
			{alreadyRequested ? (
				<Button
					onClick={(e) => {
						e.preventDefault()
						removeRequestMutation({
							variables: {
								id: userId,
								outFriendRequestId: outRequestId,
							},
							refetchQueries: ['User'],
						})
					}}
					outlined
				>
					Request Sent
				</Button>
			) : (
				<Button
					onClick={(e) => {
						e.preventDefault()
						friendRequestMutation({
							variables: {
								id: userId,
								outFriendRequestId: outRequestId,
							},
							refetchQueries: ['User'],
						})
					}}
				>
					Follow
				</Button>
			)}
		</>
	)
}

export default FollowButton
