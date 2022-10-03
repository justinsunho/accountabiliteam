import Image from 'next/image'

const Avatar = (props) => {
	return (
		<Image
			{...props}
			src={props.src}
			width={props.width}
			height={props.height}
			className={`rounded-full ${props.className}`}
		/>
	)
}

export default Avatar
