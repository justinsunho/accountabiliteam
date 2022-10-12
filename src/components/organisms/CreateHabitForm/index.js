import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Modal } from 'src/components/molecules'

const CREATE_HABIT_MUTATION = gql`
	mutation CreateHabit($input: HabitInput) {
		createHabit(input: $input) {
			name
		}
	}
`

const CreateHabitForm = ({ setHabitModal, userIds, groupId, groupQuery }) => {
	const [createHabitMutation, { data, error, loading }] = useMutation(
		CREATE_HABIT_MUTATION,
		{
			refetchQueries: [groupQuery],
		}
	)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		createHabitMutation({
			variables: {
				input: {
					userIds: userIds,
					name: data.name,
					groupId: groupId,
				},
			},
		})

		setHabitModal(0)
	}

	return (
		<Modal setModal={setHabitModal}>
			<form onSubmit={handleSubmit(onSubmit)} className="">
				<div>
					<label>Name</label>
					<input
						className="focus:shadow-outline mb-2 w-full rounded border py-2 px-4 shadow focus:outline-none"
						{...register('name', { required: true })}
					/>
					{errors.name && <span>This field is required</span>}
				</div>
				<div>
					<input
						className="rounded-full bg-emerald-600 py-2 px-4 font-semibold text-white"
						type="submit"
					/>
				</div>
			</form>
		</Modal>
	)
}

export default CreateHabitForm
