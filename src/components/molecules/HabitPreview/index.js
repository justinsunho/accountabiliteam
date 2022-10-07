import { gql } from '@apollo/client'
import RecordsPreview from 'src/components/molecules/RecordsPreview'

const HabitPreview = ({ habit }) => {
	return (
		<div>
			<h4 className="font-semibold">{habit.name}</h4>
			<div className="flex flex-row items-start gap-1">
				{habit.records.map((record) => (
					<RecordsPreview key={record.id} record={record} />
				))}
			</div>
		</div>
	)
}

HabitPreview.fragments = {
	habit: gql`
		fragment HabitPreviewFragment on Habit {
			name
			id
			records {
				...RecordsPreviewFragment
			}
		}
		${RecordsPreview.fragments.record}
	`,
}

export default HabitPreview
