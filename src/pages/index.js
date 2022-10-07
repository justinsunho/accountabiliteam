import { useState } from 'react'
import { Button, PageHeader } from '/src/components/atoms'
import { CreateGroupForm, GroupPreviewList } from '/src/components/organisms'
import { MainLayout } from 'src/components/layouts'
import { useSession } from 'next-auth/react'
import { gql, useQuery } from '@apollo/client'

const ME = gql`
	query User($id: ID) {
		user(id: $id) {
			name
			email
			groups {
				id
				name
			}
		}
	}
`

export default function Home() {
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

	const [open, setGroupModal] = useState(0)

	return (
		<MainLayout>
			<div className="mb-8 flex flex-row items-center justify-between">
				<div>
					<PageHeader>Home</PageHeader>
				</div>
				{
					<div>
						<Button
							onClick={(e) => {
								e.preventDefault()
								setGroupModal(!open)
							}}
						>
							Create Group
						</Button>
						{open ? (
							<CreateGroupForm setGroupModal={setGroupModal} />
						) : null}
					</div>
				}
			</div>
			<div>
				<h2 className="mb-4 text-xl font-semibold">Groups</h2>
				<GroupPreviewList groups={userData?.user.groups} />
			</div>
		</MainLayout>
	)
}
