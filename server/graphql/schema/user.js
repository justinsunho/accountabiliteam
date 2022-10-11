import { gql } from 'apollo-server'

export const userTypeDefs = gql`
	type User {
		id: ID!
		email: String
		name: String
		records: [Record]
		groups: [Group]
		image: String
		habits: [Habit]
		friends: [User]
		friendsRelations: [User]
		inFriendRequests: [User]
		outFriendRequests: [User]
	}

	type Query {
		users(ids: [ID!]): [User]
		user(id: ID): User
		userByGroup(id: ID, groupId: ID): User
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

const today = new Date()
today.setHours(0, 0, 0, 0)
const endOfDay = new Date()
endOfDay.setHours(23, 59, 59, 999)

export const userResolvers = {
	Query: {
		users: (parent, args, context) => {
			return context.prisma.user.findMany({
				where: {
					NOT: {
						id: { in: args.ids },
					},
				},
				include: {
					friends: true,
					inFriendRequests: true,
					outFriendRequests: true,
					groups: {
						include: {
							habits: true,
							users: true,
						},
					},
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
					groups: {
						include: {
							habits: {
								include: {
									records: {
										include: {
											user: true,
										},
									},
								},
							},
							users: true,
						},
					},
				},
			})
		},
		userByGroup: (parent, args, context) => {
			return context.prisma.user.findUnique({
				where: {
					id: args.id,
					groupId: args.groupid,
				},
				include: {
					habits: {
						where: {
							groupId: args.groupId,
						},
						include: {
							records: {
								where: {
									userId: args.id,
									createdAt: {
										gte: today,
										lte: endOfDay,
									},
								},
								include: {
									user: true,
								},
							},
						},
					},
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
			return context.prisma.$transaction([
				context.prisma.user.update({
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
				}),
				context.prisma.user.update({
					where: {
						id: args.friendId,
					},
					data: {
						friends: {
							disconnect: {
								id: args.id,
							},
						},
					},
				}),
			])
		},
	},
}
