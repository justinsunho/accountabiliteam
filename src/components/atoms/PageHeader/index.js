const PageHeader = (props) => {
	return (
		<div>
			<h2 className="text-5xl font-bold">{props.children}</h2>
		</div>
	)
}

export default PageHeader
