const Tab = (props) => {
	return (
		<div
			className={`cursor-pointer p-4 hover:bg-gray-200 focus:ring active:bg-gray-300 ${
				props.active ? `border-b-2 border-emerald-500` : ``
			}`}
		>
			{props.children}
		</div>
	)
}

export default Tab
