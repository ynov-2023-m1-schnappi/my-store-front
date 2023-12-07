

const Modal = ({ children, isOpen, onClose }) => {
    return (
        <div className={`flex justify-center items-center fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="modal__container relative bg-white  rounded-lg shadow-lg w-11/12 md:max-w-md mx-auto max-h-full overflow-y-auto" >
            <button className="absolute right-0 top-0 m-4 text-xl text-gray-700 hover:text-gray-600" onClick={onClose}>
            X
            </button>
            {children}
        </div>
        </div>
    );
    };

export default Modal;
