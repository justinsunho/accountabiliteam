import { gql } from '@apollo/client'
import { Avatar } from 'src/components/atoms'

const RecordsPreview = ({ record }) => {
	return (
		<Avatar
			className={`-ml-2 first:ml-0 ${
				record.completed ? 'outline outline-2 outline-emerald-500' : ''
			}`}
			src={record.user.image}
			width={24}
			height={24}
		/>
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
