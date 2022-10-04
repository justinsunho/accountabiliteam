import { motion } from 'framer-motion'
import { useDirectionContext } from 'src/components/contexts/DirectionContext'
import Header from './Header'
import Footer from './Footer'

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
			className="dark min-h-screen"
			initial="hidden"
			animate="enter"
			exit="exit"
			// variants={direction === 'right' ? variantRight : variantLeft}
			transition={{ type: 'linear' }}
		>
			<Header direction={direction} />
			<main className="container mx-auto my-4 min-h-full w-full px-4">
				{children}
			</main>
			{/* <Footer /> */}
		</motion.div>
	)
}

export default MainLayout
