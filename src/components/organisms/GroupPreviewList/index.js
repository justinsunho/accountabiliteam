import { GroupPreview } from 'src/components/molecules'

const GroupPreviewList = ({ groups }) => {
	return (
		<div className={'align-start flex flex-wrap md:gap-4'}>
			{groups?.map((group) => (
				<GroupPreview
					className={'w-full md:w-1/3'}
					key={group.id}
					group={group}
				/>
			))}
		</div>
	)
}

export default GroupPreviewList
