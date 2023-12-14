

const Modal = ({ children, isOpen, onClose }) => {
    return (
        <div className={`flex justify-center items-center fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'} `}>
        <div className="modal__container relative bg-white  rounded-lg shadow-lg md:max-w-md mx-auto max-h-full overflow-y-auto p-12 px-12">
            <button className="absolute right-0 top-0 p-6 text-xl  hover:text-gray-600" onClick={onClose}>
            X
            </button>
            {children}
        </div>
        </div>
    );
    };

export default Modal;
