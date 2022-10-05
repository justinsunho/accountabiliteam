const UserListContainer = ({ users, title, UserPreviewType }) => {
	return (
		<div>
			<h3 class="text-lg font-semibold">{title}</h3>
			<div>
				{users.map((user) => (
					<UserPreviewType user={user} />
				))}
			</div>
		</div>
	)
}

export default UserListContainer
