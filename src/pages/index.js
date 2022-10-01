import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'
import Link from 'next/link'
import { UsersIcon } from '@heroicons/react/24/solid'
import { MainLayout } from 'src/components/layouts'

export default function Home() {
	return (
		<>
			<Header>
				<Link href="/friends">
					<UsersIcon width="24" height="24" />
				</Link>
				<Link href="/">
					<h1 className="font-bold">Accountabiliteam</h1>
				</Link>
				<Link href="/profile">Profile</Link>
			</Header>
			<MainLayout>fds</MainLayout>
		</>
	)
}
