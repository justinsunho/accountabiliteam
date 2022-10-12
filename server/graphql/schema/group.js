import { gql } from 'apollo-server'

export const groupTypeDefs = gql`
	type Group {
		id: ID!
		name: String
		users: [User]
		habits: [Habit]
	}

	type Query {
		groups: [Group]
		group(id: ID!, gte: Date, lte: Date): Group
	}

	input GroupInput {
		name: String!
		userIds: [ID]
		habitName: String!
	}

	type Mutation {
		createGroup(input: GroupInput): Group
		updateGroup(id: ID!, input: GroupInput): Group
		deleteGroup(id: ID!): Group
		removeMemberGroup(id: ID, userId: ID): Group
		addMemberGroup(id: ID, userIds: [ID]): Group
	}
`

export const groupResolvers = {
	Query: {
		groups: (parent, args, context) => {
			return context.prisma.group.findMany({
				include: {
					users: true,
					habits: true,
				},
			})
		},
		group: (parent, args, context) => {
			return context.prisma.group.findUnique({
				where: {
					id: args.id,
				},
				include: {
					habits: {
						include: {
							records: {
								where: {
									createdAt: {
										gte: args.gte,
										lte: args.lte,
									},
								},
								include: {
									user: true,
								},
							},
						},
					},
					users: true,
				},
			})
		},
	},
	Mutation: {
		createGroup: (parent, { input }, context) => {
			return context.prisma.group.create({
				data: {
					name: input.name,
					users: {
						connect: input.userIds.map((userId) => {
							return {
								id: userId,
							}
						}),
					},
					habits: {
						create: [
							{
								name: input.habitName,
								users: {
									connect: input.userIds.map((userId) => {
										return {
											id: userId,
										}
									}),
								},
								records: {
									create: input.userIds.map((userId) => {
										return {
											completed: false,
											user: {
												connect: {
													id: userId,
												},
											},
										}
									}),
								},
							},
						],
					},
				},
			})
		},
		updateGroup: (parent, args, context) => {
			return context.prisma.group.update({
				where: {
					id: args.id,
				},
				data: {
					name: args.input.name,
					habits: {
						set: args.input.habitIds.map((habitId) => {
							return {
								id: habitId,
							}
						}),
					},
					users: {
						set: args.input.userIds.map((userId) => {
							return {
								id: userId,
							}
						}),
					},
				},
			})
		},
		deleteGroup: (parent, args, context) => {
			return context.prisma.group.delete({
				where: {
					id: args.id,
				},
			})
		},
		removeMemberGroup: (parent, args, context) => {
			return context.prisma.group.update({
				where: {
					id: args.id,
				},
				data: {
					users: {
						disconnect: [{ id: args.userId }],
					},
				},
			})
		},
		addMemberGroup: (parent, args, context) => {
			return context.prisma.group.update({
				where: {
					id: args.id,
				},
				data: {
					users: {
						connect: args.userIds.map((userId) => {
							return {
								id: userId,
							}
						}),
					},
				},
			})
		},
	},
}
