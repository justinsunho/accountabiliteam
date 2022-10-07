import { GroupPreview } from 'src/components/molecules'

const GroupPreviewList = ({ groups }) => {
	return (
		<div className={'align-start grid gap-4 md:grid-cols-3'}>
			{groups?.map((group) => (
				<GroupPreview key={group.id} group={group} />
			))}
		</div>
	)
}

export default GroupPreviewList
