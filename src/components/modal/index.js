

const Modal = ({ children, isOpen, onClose }) => {
    return (
        <div className={`flex justify-center items-center fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="modal__container relative bg-white w-1/2 h-1/2 rounded-lg shadow-lg">
            <button className="absolute right-0 top-0 m-4" onClick={onClose}>
            X
            </button>
            {children}
        </div>
        </div>
    );
    };

export default Modal;
