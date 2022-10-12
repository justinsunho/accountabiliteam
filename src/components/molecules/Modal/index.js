import { XMarkIcon } from '@heroicons/react/24/solid'

const Modal = ({ children, setModal }) => {
	return (
		<div className="absolute inset-0 z-50 h-full w-full bg-gray-600/80">
			<div
				className={
					'container fixed flex h-full flex-col bg-white p-4 shadow-md  md:top-8 md:left-1/2 md:m-4 md:h-auto md:-translate-x-1/2 md:rounded'
				}
			>
				<XMarkIcon
					className={'cursor-pointer self-end'}
					width="24"
					height="24"
					onClick={(e) => {
						e.preventDefault()
						setModal(false)
					}}
				/>
				{children}
			</div>
		</div>
	)
}

export default Modal
