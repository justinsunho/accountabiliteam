import Link from 'next/link'
import { UsersIcon } from '@heroicons/react/24/solid'

const Header = ({ children }) => {
	return (
		<header className="container mx-auto my-4 flex w-full flex-row justify-between px-4">
			{children}
		</header>
	)
}

export default Header
