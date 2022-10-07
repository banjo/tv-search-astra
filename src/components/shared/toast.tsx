import { useEffect, useState } from "react";
import { useTvMazeContext } from "../../hooks/useGlobalContext";

interface ToastProps {
    message: string | null;
    type: "error";
}

const TIMEOUT = 5000;

const Toast = ({ message, type }: ToastProps) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const { clearError } = useTvMazeContext();

    useEffect(() => {
        if (message) {
            setShowToast(true);
            setTimeout(() => {
                close();
            }, TIMEOUT);
        }
    }, [message]);

    const close = () => {
        setShowToast(false);
        setTimeout(clearError, 500); // remove after animation
    };

    return (
        <div
            className={`toast-container
            ${type}
            ${showToast ? "" : "hidden-toast"}`}
        >
            <div className="title">Error</div>
            <div className="message">{message}</div>
            <div className="close" onClick={close}>
                X
            </div>
        </div>
    );
};

export default Toast;
