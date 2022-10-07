import { gql } from '@apollo/client'
import { Avatar } from 'src/components/atoms'

const RecordsPreview = ({ record }) => {
	return (
		<div>
			<Avatar
				className={`${
					record.completed ? 'border-2 border-emerald-500' : ''
				}`}
				src={record.user.image}
				width={40}
				height={40}
			/>
		</div>
	)
}

RecordsPreview.fragments = {
	record: gql`
		fragment RecordsPreviewFragment on Record {
			id
			completed
			user {
				image
			}
		}
	`,
}

export default RecordsPreview
