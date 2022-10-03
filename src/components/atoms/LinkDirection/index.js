import Link from 'next/link'
import { useDirectionContext } from 'src/components/contexts/DirectionContext'

const LinkDirection = ({ children, direction, href }) => {
	const [, setDirection] = useDirectionContext()

	return (
		<Link href={href}>
			<a
				onClick={(e) => {
					setDirection(direction)
				}}
			>
				{children}
			</a>
		</Link>
	)
}

export default LinkDirection
