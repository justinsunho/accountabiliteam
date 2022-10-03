const Button = (props) => {
	return (
		<button
			className="rounded-full bg-emerald-500 py-2 px-4 font-semibold text-white hover:bg-emerald-600 focus:ring active:bg-emerald-700"
			{...props}
		>
			{props.children}
		</button>
	)
}

export default Button
