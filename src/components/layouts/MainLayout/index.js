import { motion } from 'framer-motion'

const variants = {
	hidden: { x: -200, y: 0 },
	enter: { x: 0, y: 0 },
	exit: { x: 200, y: 0 },
}

const MainLayout = ({ children }) => {
	return (
		<motion.div
			className="dark container mx-auto px-4"
			initial="hidden"
			animate="enter"
			exit="exit"
			variants={variants}
			transition={{ type: 'linear' }}
		>
			{children}
		</motion.div>
	)
}

export default MainLayout
