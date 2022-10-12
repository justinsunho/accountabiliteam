import { Avatar, Button } from 'src/components/atoms'
import dayjs from 'dayjs'
import { TrashIcon } from '@heroicons/react/24/solid'
import { gql, useMutation } from '@apollo/client'

const DELETE_HABIT_MUTATION = gql`
	mutation DeleteHabit($deleteHabitId: ID!) {
		deleteHabit(id: $deleteHabitId) {
			name
		}
	}
`

const HabitGroupPreview = ({ habit, edit, groupQuery }) => {
	const [deleteHabitMutation] = useMutation(DELETE_HABIT_MUTATION, {
		variables: { deleteHabitId: habit.id },
		refetchQueries: [groupQuery],
	})

	return (
		<div className="mb-8">
			<div className="mb-4 flex items-center justify-between text-2xl font-semibold">
				<div>
					<h3 className="">{habit.name}</h3>
				</div>
				{edit && (
					<Button
						icon
						onClick={(e) => {
							e.preventDefault()
							deleteHabitMutation()
						}}
					>
						<TrashIcon height={24} width={24} />
					</Button>
				)}
			</div>
			<div>
				{habit.records.map((record) => (
					<div
						className={`mb-4 flex rounded rounded-lg border-2 border-gray-200 p-4  ${
							record.completed
								? 'outline outline-2 outline-emerald-500'
								: ''
						}`}
					>
						<Avatar
							className={`mr-2`}
							src={record.user.image}
							width={24}
							height={24}
						/>
						<div className="">{`${record.user.name} ${
							record.completed
								? dayjs(record.updatedAt).format('h:mm A')
								: ''
						}`}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default HabitGroupPreview
