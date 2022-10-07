import Image from 'next/image'

const Avatar = (props) => {
	return (
		<div
			className={`rounded-full ${props.className} relative`}
			style={{ height: props.height, width: props.width }}
		>
			<Image layout="fill" className="rounded-full" src={props.src} />
		</div>
	)
}

export default Avatar
