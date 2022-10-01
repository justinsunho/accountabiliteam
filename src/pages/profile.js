import { MainLayout } from 'src/components/layouts'
import Header from 'src/components/organisms/Header'
import { LinkDirection } from 'src/components/atoms'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Profile() {
	return (
		<MainLayout>
			<Header>
				<LinkDirection href="/" direction={'right'}>
					<ArrowLeftIcon width="24" height="24" />
				</LinkDirection>
				<h1 className="font-bold">Accountabiliteam</h1>
				<span></span>
			</Header>
		</MainLayout>
	)
}
