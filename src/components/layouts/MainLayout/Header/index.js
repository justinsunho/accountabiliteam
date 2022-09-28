import Link from 'next/link'
import { UsersIcon } from '@heroicons/react/24/solid'
import * as styles from './styles.module.scss'

const Header = () => {
	return (
		<header className={`${styles.header} row justify-space-between`}>
			<div className="col-1">
				<Link href="/friends">
					<UsersIcon width="24" height="24" />
				</Link>
			</div>
			<h1 className={`col text-center ${styles.title}`}>
				Accountabiliteam
			</h1>
			<div className="col-1">
				<Link href="/profile">Profile</Link>
			</div>
		</header>
	)
}

export default Header
