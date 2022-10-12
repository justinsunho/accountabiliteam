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

const ADD_MEMBERS = gql`
	mutation AddMemberGroup($addMemberGroupId: ID, $userIds: [ID]) {
		addMemberGroup(id: $addMemberGroupId, userIds: $userIds) {
			users {
				name
			}
		}
	}
`

const AddMembersForm = ({ setMembersModal, groupId, groupQuery }) => {
	const [addMembersMutation, { data, error, loading }] =
		useMutation(ADD_MEMBERS)

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
		addMembersMutation({
			variables: {
				userIds: data.userIds,
				addMemberGroupId: groupId,
			},
			refetchQueries: [groupQuery],
		})

		setMembersModal(false)
	}

	return (
		<Modal setModal={setMembersModal}>
			<h3 className="text-3xl font-semibold">Add Members</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="">
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

export default AddMembersForm
