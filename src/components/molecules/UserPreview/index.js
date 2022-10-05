import { Avatar, Button } from 'src/components/atoms'

const UserPreview = ({ user, children }) => {
	return (
		<div className="flex items-start gap-x-4 py-4">
			<Avatar src={user.image} width={40} height={40} />
			<h4>{user.name}</h4>
			<div>{children}</div>
		</div>
	)
}

export default UserPreview
