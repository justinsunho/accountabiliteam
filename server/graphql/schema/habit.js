import { gql } from 'apollo-server'

export const habitTypeDefs = gql`
	type Habit {
		id: ID!
		name: String
		users: [User]
		records: [Record]
		group: Group
		groupId: ID
	}

	type Query {
		habits: [Habit]
		habit(id: ID!): Habit
	}

	input HabitInput {
		name: String!
		userId: ID
	}

	type Mutation {
		createHabit(input: HabitInput): Habit
		updateHabit(id: ID!, input: HabitInput): Habit
		deleteHabit(id: ID!): Habit
	}
`

const today = new Date()
today.setHours(0, 0, 0, 0)
const endOfDay = new Date()
endOfDay.setHours(23, 59, 59, 999)

export const habitResolvers = {
	Query: {
		habits: (parent, args, context) => {
			return context.prisma.habit.findMany()
		},
		habit: (parent, args, context) => {
			return context.prisma.habit.findUnique({
				where: {
					id: args.id,
				},
				include: {
					records: {
						where: {
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
			})
		},
	},
	Mutation: {
		createHabit: (parent, args, context) => {
			return context.prisma.habit.create({
				data: {
					name: args.input.name,
					group: {
						connect: { id: args.input.userId },
					},
				},
			})
		},
		updateHabit: (parent, args, context) => {
			return context.prisma.habit.update({
				where: {
					id: args.id,
				},
				data: {
					name: args.input.name,
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
