import ctl from '@netlify/classnames-template-literals'

const classNames = (outlined, icon) =>
	ctl(`
			${
				!outlined &&
				!icon &&
				`px-4
				bg-emerald-500
				text-white
				hover:bg-emerald-600
				active:bg-emerald-700
				py-2
			`
			}
			${
				outlined &&
				`px-4 bg-white border-2 border-emerald-500 text-emerald-500 py-1.5`
			}
			${
				icon &&
				`p-1
				text-gray-700
				bg-gray-200
				hover:bg-gray-300
				active:bg-gray-400
			`
			}`)

const Button = (props) => {
	return (
		<button
			className={`rounded-full font-semibold focus:ring ${classNames(
				props.outlined,
				props.icon
			)}`}
			{...props}
		>
			{props.children}
		</button>
	)
}

export default Button
