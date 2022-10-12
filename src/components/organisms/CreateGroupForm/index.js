import { gql, useMutation, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { Modal } from 'src/components/molecules'

const ME = gql`
	query User($id: ID) {
		user(id: $id) {
			friends {
				id
				image
				name
			}
		}
	}
`

const CREATE_GROUP = gql`
	mutation CreateGroup($input: GroupInput) {
		createGroup(input: $input) {
			name
			id
		}
	}
`

const CreateGroupForm = ({ setGroupModal }) => {
	const [createGroupMutation, { data, error, loading }] =
		useMutation(CREATE_GROUP)

	const session = useSession()
	const userId = session?.data?.user?.id

	const {
		data: userData,
		loading: userLoading,
		error: userError,
	} = useQuery(ME, {
		variables: {
			id: userId,
		},
	})

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		createGroupMutation({
			variables: {
				input: {
					userIds: [userId, ...data.userIds],
					name: data.name,
					habitName: data.habitName,
				},
			},
		})

		setGroupModal(0)
	}

	return (
		<Modal setModal={setGroupModal}>
			<h3 className="text-3xl font-semibold">Create Group</h3>

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
					<label>Habit</label>
					<input
						className="focus:shadow-outline mb-2 w-full rounded border py-2 px-4 shadow focus:outline-none"
						{...register('habitName', { required: true })}
					/>
					{errors.habitName && <span>This field is required</span>}
				</div>
				<div>
					<label>Users</label>
					<select
						multiple
						className="focus:shadow-outline mb-2 w-full rounded border py-2 px-4 shadow focus:outline-none"
						{...register('userIds')}
					>
						{userData?.user.friends.map((friend) => (
							<option value={friend.id}>{friend.name}</option>
						))}
					</select>
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

export default CreateGroupForm
