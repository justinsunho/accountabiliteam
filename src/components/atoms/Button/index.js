import ctl from '@netlify/classnames-template-literals'

const classNames = (outlined) =>
	ctl(`${
		outlined
			? `bg-white border-2 border-emerald-500 text-emerald-500 py-1.5`
			: `bg-emerald-500
			text-white
			hover:bg-emerald-600
			active:bg-emerald-700
			py-2
			`
	}
	`)

const Button = (props) => {
	return (
		<button
			className={`rounded-full px-4 font-semibold focus:ring ${classNames(
				props.outlined
			)}`}
			{...props}
		>
			{props.children}
		</button>
	)
}

export default Button
