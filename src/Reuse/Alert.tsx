

type AlertProps = {
    message: string;
    onClose: () => void;
};


const Alert = ({ message, onClose }: AlertProps) => {
    return (
        <div className="fixed left-0  right-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-80 relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-gray-600 hover:text-red-500 transition-all"
                >
                    ✕
                </button>
                <h3 className="text-lg font-bold text-gray-800">Alert</h3>
                <p className="py-4 text-gray-600">🔊 {message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Alert;
