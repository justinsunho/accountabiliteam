import { gql, useMutation, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

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
		<div className="absolute inset-0 z-50 h-full w-full bg-gray-600/80">
			<div
				className={
					'fixed left-1/2 top-8 m-4 flex w-full max-w-xs -translate-x-1/2 flex-col rounded bg-white p-4 shadow-md'
				}
			>
				<XMarkIcon
					className={'cursor-pointer self-end'}
					width="24"
					height="24"
					onClick={(e) => {
						e.preventDefault()
						setGroupModal(0)
					}}
				/>
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
						{errors.habitName && (
							<span>This field is required</span>
						)}
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
			</div>
		</div>
	)
}

export default CreateGroupForm
