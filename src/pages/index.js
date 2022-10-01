import Header from '../components/organisms/Header'
import Link from 'next/link'
import { LinkDirection } from '/src/components/atoms'
import { UsersIcon } from '@heroicons/react/24/solid'
import { MainLayout } from 'src/components/layouts'
import { useDirectionContext } from '../components/contexts/DirectionContext'

export default function Home() {
	const [direction, setDirection] = useDirectionContext()

	return (
		<>
			<MainLayout>
				<Header>
					<LinkDirection direction={'right'} href="/friends">
						<UsersIcon width="24" height="24" />
					</LinkDirection>
					<h1 className="font-bold">Accountabiliteam</h1>
					<LinkDirection direction={'left'} href="/profile">
						Profile
					</LinkDirection>
				</Header>
			</MainLayout>
		</>
	)
}
