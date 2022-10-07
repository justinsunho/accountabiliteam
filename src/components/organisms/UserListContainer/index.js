const UserListContainer = ({ users, title, UserPreviewType }) => {
	return (
		<div>
			<h3 className="text-lg font-semibold">{title}</h3>
			<div>
				{users.map((user) => (
					<UserPreviewType key={user.id} user={user} />
				))}
			</div>
		</div>
	)
}

export default UserListContainer
