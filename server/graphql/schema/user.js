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
		friendsRelations: [User]
		inFriendRequests: [User]
		outFriendRequests: [User]
	}

	type Query {
		users: [User]
		user(id: ID): User
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
		sendFriendRequest(id: ID!, outFriendRequestId: ID!): User
		removeFriendRequest(id: ID!, outFriendRequestId: ID!): User
		acceptFriendRequest(id: ID!, inFriendRequestId: ID!): User
		denyFriendRequest(id: ID!, inFriendRequestId: ID!): User
		removeFriend(id: ID!, friendId: ID!): User
		deleteUser(id: ID!): User
	}
`

export const userResolvers = {
	Query: {
		users: (parent, args, context) => {
			return context.prisma.user.findMany({
				include: {
					friends: true,
					inFriendRequests: true,
					outFriendRequests: true,
					groups: true,
				},
			})
		},
		user: (parent, args, context) => {
			return context.prisma.user.findUnique({
				where: { id: args.id },
				include: {
					friends: true,
					inFriendRequests: true,
					outFriendRequests: true,
					groups: true,
				},
			})
		},
	},
	Mutation: {
		sendFriendRequest: (parent, args, context) => {
			return context.prisma.user.update({
				where: {
					id: args.id,
				},
				data: {
					outFriendRequests: {
						connect: { id: args.outFriendRequestId },
					},
				},
			})
		},
		removeFriendRequest: (parent, args, context) => {
			return context.prisma.user.update({
				where: {
					id: args.id,
				},
				data: {
					outFriendRequests: {
						disconnect: { id: args.outFriendRequestId },
					},
				},
			})
		},
		acceptFriendRequest: (parent, args, context) => {
			return context.prisma.$transaction([
				context.prisma.user.update({
					where: {
						id: args.id,
					},
					data: {
						inFriendRequests: {
							disconnect: {
								id: args.inFriendRequestId,
							},
						},
						friends: {
							connect: {
								id: args.inFriendRequestId,
							},
						},
					},
				}),
				context.prisma.user.update({
					where: {
						id: args.inFriendRequestId,
					},
					data: {
						friends: {
							connect: {
								id: args.id,
							},
						},
					},
				}),
			])
		},
		denyFriendRequest: (parent, args, context) => {
			return context.prisma.user.update({
				where: {
					id: args.id,
				},
				data: {
					inFriendRequests: {
						disconnect: {
							id: args.inFriendRequestId,
						},
					},
				},
			})
		},
		removeFriend: (parent, args, context) => {
			return context.prisma.user.update({
				where: {
					id: args.id,
				},
				data: {
					friends: {
						disconnect: {
							id: args.friendId,
						},
					},
				},
			})
		},
	},
}
