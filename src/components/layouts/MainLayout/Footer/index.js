import ctl from '@netlify/classnames-template-literals'

const Footer = () => {
	const footerClasses = ctl(`
		bg-white
		dark:bg-black
		mx-auto
		px-4
		w-full
		flex
		flex-row
		justify-between
		h-16
		fixed
		bottom-0
	`)

	return <div className={footerClasses}></div>
}

export default Footer
