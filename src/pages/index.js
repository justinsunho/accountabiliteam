import { useState } from 'react'
import { Button, PageHeader } from '/src/components/atoms'
import { MainLayout } from 'src/components/layouts'
import { useSession } from 'next-auth/react'
import { gql, useQuery } from '@apollo/client'
import { CreateGroupForm } from '/src/components/organisms'
import Link from 'next/link'

const ME = gql`
	query User($id: ID) {
		user(id: $id) {
			name
			email
			groups {
				name
				id
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
			<div>
				{userData?.user.groups.map((group) => (
					<div>
						<Link href={`/groups/${group.id}`}>{group.name}</Link>
					</div>
				))}
			</div>
		</MainLayout>
	)
}
