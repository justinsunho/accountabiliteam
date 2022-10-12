import { useState } from 'react'
import { MainLayout } from 'src/components/layouts'
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Avatar, Button } from 'src/components/atoms'
import { AddMembersForm } from 'src/components/organisms'
import Link from 'next/link'
import {
	ArrowLeftIcon,
	PencilIcon,
	XMarkIcon,
	UserPlusIcon,
} from '@heroicons/react/24/solid'

const GROUP_QUERY = gql`
	query Group($groupId: ID!, $gte: Date, $lte: Date) {
		group(id: $groupId, gte: $gte, lte: $lte) {
			name
			users {
				id
				name
				image
			}
		}
	}
`

const REMOVE_MEMBER = gql`
	mutation RemoveMemberGroup($removeMemberGroupId: ID, $userId: ID) {
		removeMemberGroup(id: $removeMemberGroupId, userId: $userId) {
			users {
				name
			}
		}
	}
`

export default function GroupPage() {
	const [membersModal, setMembersModal] = useState(false)
	const [edit, setEdit] = useState(false)

	const router = useRouter()
	const { id } = router.query

	const { data, loading, error } = useQuery(GROUP_QUERY, {
		variables: { groupId: id },
	})

	const [removeMember] = useMutation(REMOVE_MEMBER)

	return (
		<MainLayout>
			<div className="mb-8 grid grid-cols-3 items-center">
				<Link href={`/groups/${id}`}>
					<ArrowLeftIcon width={24} height={24} />
				</Link>
				<h2 className="text-center text-2xl font-semibold">
					{`${data?.group.name} Members`}
				</h2>
				<div className="justify-self-end">
					<PencilIcon
						onClick={(e) => {
							e.preventDefault()
							setEdit(!edit)
						}}
						width={24}
						height={24}
					/>
				</div>
			</div>
			<div className="mb-4">
				{edit && (
					<UserPlusIcon
						onClick={(e) => {
							e.preventDefault()
							setMembersModal(true)
						}}
						className=" ml-auto"
						width={24}
						height={24}
					/>
				)}
			</div>
			<div>
				{data?.group.users.map((user) => (
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center">
							<div>
								<Avatar
									className={`mr-2`}
									src={user.image}
									width={48}
									height={48}
								/>
							</div>
							<div className="text-xl">{user.name}</div>
						</div>
						{edit && (
							<Button
								icon
								onClick={(e) => {
									e.preventDefault()
									removeMember({
										variables: {
											removeMemberGroupId: id,
											userId: user.id,
										},
										refetchQueries: [GROUP_QUERY],
									})
								}}
							>
								<XMarkIcon weight="24" height="24" />
							</Button>
						)}
					</div>
				))}
			</div>
			{membersModal && (
				<AddMembersForm
					setMembersModal={setMembersModal}
					groupId={id}
					groupQuery={GROUP_QUERY}
				/>
			)}
		</MainLayout>
	)
}
