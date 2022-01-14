import { gql } from 'apollo-server'

export const groupTypeDefs = gql`
	type Query {
		groups: [Group]
		group(id: ID!): Group
	}

	type Group {
		id: ID!
		name: String
		users: [User]
		habits: [Habit]
	}

	input GroupInput {
		name: String!
		userIds: [ID]
		habitIds: [ID]
	}

	type Mutation {
		createGroup(input: GroupInput): Group
		updateGroup(id: ID!, input: GroupInput): Group
		deleteGroup(id: ID!): Group
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
			})
		},
	},
	Mutation: {
		createGroup: (parent, { input }, context) => {
			return context.prisma.group.create({
				data: {
					name: input.name,
					habits: {
						connect: input.habitIds.map((habitId) => {
							return {
								id: habitId,
							}
						}),
					},
					users: {
						connect: input.userIds.map((userId) => {
							return {
								id: userId,
							}
						}),
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
	},
}
