import { gql } from 'apollo-server'

export const habitTypeDefs = gql`
	type Query {
		habits: [Habit]
		habit(id: ID!): Habit
	}

	type Mutation {
		createHabit(name: String!): Habit
		updateHabit(id: ID!, name: String!): Habit
		deleteHabit(id: ID!): Habit
	}

	type Habit {
		id: ID!
		name: String
		records: [Record]
		users: [User]
		groups: [Group]
	}
`

export const habitResolvers = {
	Query: {
		habits: (parent, args, context) => {
			return context.prisma.habit.findMany()
		},
		habit: (parent, args, context) => {
			return context.prisma.habit.findUnique({
				where: {
					id: args.id,
					name: args.name,
				},
			})
		},
	},
	Mutation: {
		createHabit: (parent, args, context) => {
			return context.prisma.habit.create({
				data: {
					name: args.name,
				},
			})
		},
		updateHabit: (parent, args, context) => {
			return context.prisma.habit.update({
				where: {
					id: args.id,
				},
				data: {
					name: args.name,
				},
			})
		},
		deleteHabit: (parent, args, context) => {
			return context.prisma.habit.delete({
				where: {
					id: args.id,
				},
			})
		},
	},
}
