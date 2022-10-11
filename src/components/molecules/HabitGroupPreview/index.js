import { Avatar } from 'src/components/atoms'
import dayjs from 'dayjs'

const HabitGroupPreview = ({ habit }) => {
	return (
		<div className="mb-8">
			<h3 className="mb-4 text-center text-4xl font-semibold">
				{habit.name}
			</h3>
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
