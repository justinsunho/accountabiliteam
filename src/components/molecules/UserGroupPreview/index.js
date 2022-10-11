import { gql, useQuery } from '@apollo/client'
import RecordsPreview from '../RecordsPreview'

const USER_QUERY = gql`
	query UserByGroup($userByGroupId: ID, $groupId: ID) {
		userByGroup(id: $userByGroupId, groupId: $groupId) {
			name
			habits {
				name
				records {
					completed
				}
			}
		}
	}
`

const UserGroupPreview = ({ user, groupId }) => {
	const { data: userData } = useQuery(USER_QUERY, {
		variables: { userByGroupId: user.id, groupId: groupId },
	})

	return (
		<div className="my-2 border-2 border-black p-2">
			<h3 className={'text-2xl font-semibold'}>{user?.name}</h3>
			<div>
				{userData?.userByGroup.habits?.map((habit) => (
					<div>
						<h4 className="font-semibold">{habit.name}</h4>
						<div>
							{habit.records.map((record) => (
								<div>{`${record.completed}`}</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default UserGroupPreview
