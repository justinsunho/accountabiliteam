import { Button } from 'src/components/atoms'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

const ACCEPT_FRIEND_REQUEST = gql`
	mutation AcceptFriendRequest($id: ID!, $inFriendRequestId: ID!) {
		acceptFriendRequest(id: $id, inFriendRequestId: $inFriendRequestId) {
			name
			friends {
				name
			}
		}
	}
`

const DENY_FRIEND_REQUEST = gql`
	mutation DenyFriendRequest($id: ID!, $inFriendRequestId: ID!) {
		denyFriendRequest(id: $id, inFriendRequestId: $inFriendRequestId) {
			name
			friends {
				name
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

const FollowRequestContainer = ({ user }) => {
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

	const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST)
	const [denyFriendRequest] = useMutation(DENY_FRIEND_REQUEST)

	return (
		<div className="flex flex-row">
			<Button
				icon
				onClick={(e) => {
					e.preventDefault()
					acceptFriendRequest({
						variables: {
							id: userId,
							inFriendRequestId: user.id,
						},
						refetchQueries: ['User'],
					})
				}}
			>
				<CheckIcon weight="24" height="24" />
			</Button>
			<Button
				icon
				onClick={(e) => {
					e.preventDefault()
					denyFriendRequest({
						variables: {
							id: userId,
							inFriendRequestId: user.id,
						},
						refetchQueries: ['User'],
					})
				}}
			>
				<XMarkIcon weight="24" height="24" />
			</Button>
		</div>
	)
}

export default FollowRequestContainer
