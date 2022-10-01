import { gql, useQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Header from '../components/organisms/Header'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { MainLayout } from 'src/components/layouts'

const ALL_USERS = gql`
	query Query {
		users {
			id
			email
			name
			image
			inFriendRequests {
				id
				name
			}
			outFriendRequests {
				id
				name
			}
			friends {
				id
			}
		}
	}
`

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

export default function Friends() {
	const session = useSession()
	const userId = session?.data?.user?.id

	const {
		data: allUsersData,
		loading: allUsersLoading,
		error: allUsersError,
	} = useQuery(ALL_USERS)

	const [friendRequestMutation] = useMutation(SEND_FRIEND_REQUEST, {
		refetchQueries: [{ query: ALL_USERS }],
	})

	const [removeRequestMutation] = useMutation(REMOVE_FRIEND_REQUEST, {
		refetchQueries: [{ query: ALL_USERS }],
	})

	if (allUsersLoading) {
		return <div>Loading</div>
	}
	return (
		<MainLayout>
			<Header>
				<span></span>
				<Link href="/">
					<h1 className="font-bold">Accountabiliteam</h1>
				</Link>
				<Link href="/">
					<ArrowRightIcon width="24" height="24" />
				</Link>
			</Header>
			<div>
				{allUsersData &&
					allUsersData.users.map((user) => (
						<div className="flex items-start gap-x-4 py-4">
							<Image
								src={user.image}
								width={40}
								height={40}
								className="rounded-full "
							/>
							<div>
								<div>{user.name}</div>
							</div>

							{user?.inFriendRequests.filter(
								(inFriendRequest) =>
									inFriendRequest.id === userId
							).length < 1 ? (
								<button
									onClick={(e) => {
										e.preventDefault()
										friendRequestMutation({
											variables: {
												id: userId,
												outFriendRequestId: user.id,
											},
										})
									}}
								>
									Follow
								</button>
							) : (
								<button
									onClick={(e) => {
										e.preventDefault()
										removeRequestMutation({
											variables: {
												id: userId,
												outFriendRequestId: user.id,
											},
										})
									}}
								>
									Request Sent
								</button>
							)}
						</div>
					))}
			</div>
		</MainLayout>
	)
}
