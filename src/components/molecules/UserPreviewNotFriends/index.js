import { UserPreview } from 'src/components/molecules'
import { FollowButton } from 'src/components/atoms'

const UserPreviewNotFriends = ({ user }) => {
	return (
		<UserPreview user={user}>
			<FollowButton outRequestId={user.id} />
		</UserPreview>
	)
}

export default UserPreviewNotFriends
