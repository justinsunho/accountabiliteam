import { userTypeDefs, userResolvers } from './schema/user.js'
import { groupTypeDefs, groupResolvers } from './schema/group.js'
import { habitTypeDefs, habitResolvers } from './schema/habit.js'
import { recordTypeDefs, recordResolvers } from './schema/record.js'
import merge from 'lodash.merge'

export const typeDefs = [
	userTypeDefs,
	groupTypeDefs,
	habitTypeDefs,
	recordTypeDefs,
]

export const resolvers = merge(
	{},
	userResolvers,
	groupResolvers,
	habitResolvers,
	recordResolvers
)
