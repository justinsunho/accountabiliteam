import { userTypeDefs, userResolvers } from './schema/user.js'
import { groupTypeDefs, groupResolvers } from './schema/group.js'
import { habitTypeDefs, habitResolvers } from './schema/habit.js'
import { recordTypeDefs, recordResolvers } from './schema/record.js'
import { sessionTypeDefs, sessionResolvers } from './schema/session.js'
import merge from 'lodash.merge'

export const typeDefs = [
	groupTypeDefs,
	habitTypeDefs,
	recordTypeDefs,
	userTypeDefs,
	sessionTypeDefs,
]

export const resolvers = merge(
	{},
	groupResolvers,
	habitResolvers,
	recordResolvers,
	userResolvers,
	sessionResolvers
)
