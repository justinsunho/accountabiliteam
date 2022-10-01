import { motion } from 'framer-motion'
import { useDirectionContext } from 'src/components/contexts/DirectionContext'

const variantRight = {
	hidden: { x: -1000, y: 0 },
	enter: { x: 0, y: 0 },
	exit: { x: 1000, y: 0 },
}

const variantLeft = {
	hidden: { x: 1000, y: 0 },
	enter: { x: 0, y: 0 },
	exit: { x: -1000, y: 0 },
}

const MainLayout = ({ children }) => {
	const [direction] = useDirectionContext()

	return (
		<motion.div
			className="dark container mx-auto px-4"
			initial="hidden"
			animate="enter"
			exit="exit"
			variants={direction === 'right' ? variantRight : variantLeft}
			transition={{ type: 'linear' }}
		>
			{children}
		</motion.div>
	)
}

export default MainLayout
