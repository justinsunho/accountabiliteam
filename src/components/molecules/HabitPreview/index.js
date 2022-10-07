import { gql, useQuery, useMutation } from '@apollo/client'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import RecordsPreview from 'src/components/molecules/RecordsPreview'

const USER_TODAY_RECORD = gql`
	query TodayRecord($input: RecordInput) {
		todayRecord(input: $input) {
			id
			completed
		}
	}
`

const UPDATE_TODAY_RECORD = gql`
	mutation UpdateRecord($id: ID!, $input: RecordInput) {
		updateRecord(id: $id, input: $input) {
			completed
		}
	}
`

const HabitPreview = ({ habit }) => {
	const session = useSession()
	const userId = session?.data?.user?.id

	const { data: userTodayRecordData } = useQuery(USER_TODAY_RECORD, {
		variables: {
			input: {
				habitId: habit.id,
				userId: userId,
			},
		},
	})

	const [updateRecord] = useMutation(UPDATE_TODAY_RECORD)

	return (
		<div className="mb-4 flex items-center gap-4">
			<div
				className={`${
					userTodayRecordData?.todayRecord.completed
						? 'border-emerald-500'
						: 'border-black'
				} rounded-full border-2 `}
				onClick={(e) => {
					e.preventDefault()
					updateRecord({
						variables: {
							id: userTodayRecordData?.todayRecord.id,
							input: {
								completed:
									!userTodayRecordData?.todayRecord.completed,
							},
						},
						refetchQueries: ['TodayRecord'],
					})
				}}
			>
				<CheckIcon
					height="32"
					width="32"
					className={`${
						userTodayRecordData?.todayRecord.completed
							? 'text-emerald-500'
							: 'text-black-900'
					}`}
				/>
			</div>
			<div>
				<h4 className="font-semibold">{habit.name}</h4>
				<div className="flex flex-row items-start">
					{habit.records.map((record) => (
						<RecordsPreview key={record.id} record={record} />
					))}
				</div>
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
