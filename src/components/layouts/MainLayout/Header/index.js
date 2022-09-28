import Link from 'next/link'
import { UsersIcon } from '@heroicons/react/24/solid'

const Header = () => {
	return (
		<header className="container mx-auto px-4 my-4 w-full flex flex-row justify-between">
			<Link href="/friends">
				<UsersIcon width="24" height="24" />
			</Link>
			<Link href="/">
				<h1 className="font-bold">Accountabiliteam</h1>
			</Link>
			<Link href="/profile">Profile</Link>
		</header>
	)
}

export default Header
