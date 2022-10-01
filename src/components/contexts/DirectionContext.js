import { createContext, useContext, useState } from 'react'

const DirectionContext = createContext()

export function DirectionProvider({ children }) {
	const [direction, setDirection] = useState('left')

	return (
		<DirectionContext.Provider value={[direction, setDirection]}>
			{children}
		</DirectionContext.Provider>
	)
}

export function useDirectionContext() {
	return useContext(DirectionContext)
}
