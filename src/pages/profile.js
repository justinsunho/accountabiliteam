import { MainLayout } from 'src/components/layouts'
import Header from '../components/organisms/Header'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Profile() {
	return (
		<MainLayout>
			<Header>
				<Link href="/">
					<ArrowLeftIcon width="24" height="24" />
				</Link>
				<Link href="/">
					<h1 className="font-bold">Accountabiliteam</h1>
				</Link>
				<span></span>
			</Header>
		</MainLayout>
	)
}
