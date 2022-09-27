import { gql } from 'apollo-server'

export const userTypeDefs = gql`
	type User {
		id: ID!
		email: String
		name: String
		records: [Record]
		groups: [Group]
		image: String
		friends: [User]
		inFriendRequest: [User]
		outFriendRequest: [User]
	}

	type Query {
		users: [User]
		user(id: ID, email: String): User
		me: User
	}

	input UserInput {
		name: String
		groupIds: [ID]
		recordIds: [ID]
		friendIds: [ID]
		inFriendRequestsIds: [ID]
		outFriendRequestIds: [ID]
	}

	type Mutation {
		updateUser(id: ID!, input: UserInput): User
		deleteUser(id: ID!): User
	}
`

export const userResolvers = {
	Query: {
		users: (parent, args, context) => {
			return context.prisma.user.findMany()
		},
		user: (parent, args, context) => {
			return context.prisma.user.findUnique({
				where: { id: args.id, email: args.email },
			})
		},
	},
	Mutation: {
		updateUser: (parent, args, context) => {
			return context.prisma.user.update({
				where: {
					id: args.id,
				},
				data: {
					name: args.input.name,
					groups: {
						set: args.input.groupIds.map((groupId) => {
							return {
								id: groupId,
							}
						}),
					},
					records: {
						set: args.input.recordIds.map((recordId) => {
							return {
								id: recordId,
							}
						}),
					},
					friends: {
						set: args.input.friendIds.map((friendId) => {
							return {
								id: friendId,
							}
						}),
					},
					inFriendRequest: {
						set: args.input.inFriendRequestIds.map(
							(inFriendRequestId) => {
								return {
									id: inFriendRequestId,
								}
							}
						),
					},
					outFriendRequest: {
						set: args.input.outFriendRequest.map(
							(outFriendRequestId) => {
								return {
									id: outFriendRequestId,
								}
							}
						),
					},
				},
			})
		},
		// deleteUser: (parent, args, context) => {
		// 	return context.prisma.user.delete({
		// 		where: {
		// 			id: args.id,
		// 		},
		// 	})
		// },
	},
}
