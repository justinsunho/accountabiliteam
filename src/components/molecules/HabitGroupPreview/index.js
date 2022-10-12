import { Avatar, Button } from 'src/components/atoms'
import dayjs from 'dayjs'
import { TrashIcon } from '@heroicons/react/24/solid'

const HabitGroupPreview = ({ habit, edit }) => {
	return (
		<div className="mb-8">
			<div className="mb-4 flex items-center justify-between text-2xl font-semibold">
				<div>
					<h3 className="">{habit.name}</h3>
					<div>2/3</div>
				</div>
				{edit && (
					<Button icon>
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
