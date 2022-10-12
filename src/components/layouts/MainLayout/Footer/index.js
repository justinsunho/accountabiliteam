import ctl from '@netlify/classnames-template-literals'
import { signOut } from 'next-auth/react'
import { Button } from 'src/components/atoms'

const Footer = () => {
	const footerClasses = ctl(`
		bg-white
		dark:bg-black
		mx-auto
		p-4
		w-full
		flex
		flex-row
		justify-between
		h-16
		fixed
		bottom-0
	`)

	return (
		<div className={footerClasses}>
			<div className={'container mx-auto px-4'}>
				<Button onClick={() => signOut()}>signout</Button>
			</div>
		</div>
	)
}

export default Footer
