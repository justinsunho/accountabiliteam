import { gql, useMutation, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

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
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		createGroupMutation({
			variables: {
				input: {
					userIds: userId,
					name: data.name,
					habitName: data.habitName,
				},
			},
		})

		setGroupModal(0)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('name', { required: true })} />
			{errors.name && <span>This field is required</span>}
			<input {...register('habitName', { required: true })} />
			{errors.habitName && <span>This field is required</span>}
			<input type="submit" />
		</form>
	)
}

export default CreateGroupForm
