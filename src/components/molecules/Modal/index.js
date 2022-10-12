import { XMarkIcon } from '@heroicons/react/24/solid'

const Modal = ({ children, setModal }) => {
	return (
		<div className="absolute inset-0 z-50 h-full w-full bg-gray-600/80">
			<div
				className={
					'container fixed left-1/2 top-8 m-4 flex -translate-x-1/2 flex-col rounded bg-white p-4 shadow-md'
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
