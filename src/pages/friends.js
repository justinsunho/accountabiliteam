import { MainLayout } from 'src/components/layouts'
import { PageHeader } from '/src/components/atoms'
import {
	UserPreviewFriends,
	UserPreviewNotFriends,
	UserPreviewFollowRequests,
} from 'src/components/molecules'
import { UserListContainer } from 'src/components/organisms'
import { gql, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

const ALL_USERS = gql`
	query Users($ids: [ID!]) {
		users(ids: $ids) {
			id
			email
			name
			image
			friends {
				id
			}
		}
	}
`

const ME = gql`
	query User($id: ID) {
		user(id: $id) {
			inFriendRequests {
				id
				name
				image
			}
			friends {
				id
				image
				name
			}
		}
	}
`

export default function Friends() {
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

	const {
		data: allUsersData,
		loading: allUsersLoading,
		error: allUsersError,
	} = useQuery(ALL_USERS, {
		variables: {
			ids: userData?.user.friends.map((friend) => friend.id),
		},
	})

	if (allUsersLoading) {
		return <div>Loading</div>
	}
	return (
		<MainLayout>
			<PageHeader>Friends</PageHeader>
			<div>
				{userData?.user.friends.length > 0 && (
					<UserListContainer
						title={'Friends'}
						users={userData?.user.friends}
						UserPreviewType={UserPreviewFriends}
					/>
				)}
			</div>
			<div>
				{userData?.user.inFriendRequests.length > 0 && (
					<UserListContainer
						title={'Follow Requests'}
						users={userData?.user.inFriendRequests}
						UserPreviewType={UserPreviewFollowRequests}
					/>
				)}
			</div>
			<div>
				{allUsersData && (
					<UserListContainer
						title={'Suggested Follows'}
						users={allUsersData?.users.filter(
							(user) => user.id !== user.friends.id
						)}
						UserPreviewType={UserPreviewNotFriends}
					/>
				)}
			</div>
		</MainLayout>
	)
}
