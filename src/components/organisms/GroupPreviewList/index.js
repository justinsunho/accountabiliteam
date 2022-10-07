import { GroupPreview } from 'src/components/molecules'

const GroupPreviewList = ({ groups }) => {
	return (
		<div>
			{groups?.map((group) => (
				<GroupPreview key={group.id} group={group} />
			))}
		</div>
	)
}

export default GroupPreviewList
