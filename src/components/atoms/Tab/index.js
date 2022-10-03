const Tab = (props) => {
	return (
		<div
			className={`ml-4 p-4 ${
				props.active ? `border-b-2 border-emerald-500` : ``
			}`}
			{...props}
		>
			{props.children}
		</div>
	)
}

export default Tab
