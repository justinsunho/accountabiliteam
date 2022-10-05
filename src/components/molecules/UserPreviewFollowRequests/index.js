import { UserPreview } from 'src/components/molecules'
import { FollowRequestContainer } from 'src/components/atoms'

const UserPreviewFollowRequests = ({ user }) => {
	return (
		<UserPreview user={user}>
			<FollowRequestContainer user={user} />
		</UserPreview>
	)
}

export default UserPreviewFollowRequests
