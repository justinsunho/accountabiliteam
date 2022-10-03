import { Tab } from 'src/components/atoms'
import { UsersIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = ({ children }) => {
	const router = useRouter()

	return (
		<header className="shadow-md ">
			<div className="container mx-auto flex w-full flex-row items-center justify-between px-4">
				<div>
					<h1 class="font-bold">Accountabiliteam</h1>
				</div>
				<div className="flex flex-row">
					<Tab active={router.pathname == '/'}>
						<Link href="/">
							<HomeIcon weight="24" height="24" />
						</Link>
					</Tab>
					<Tab active={router.pathname == '/friends'}>
						<Link href="/friends">
							<UsersIcon width="24" height="24" />
						</Link>
					</Tab>
					<Tab active={router.pathname == '/profile'}>
						<Link href="/profile">
							<UserIcon weight="24" height="24" />
						</Link>
					</Tab>
				</div>
			</div>
		</header>
	)
}

export default Header
