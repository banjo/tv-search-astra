import { useEffect, useState } from "react";

interface ToastProps {
    message: string | null;
    type: "error";
}

const Toast = ({ message, type }: ToastProps) => {
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        if (message) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
    }, [message]);

    const close = () => {
        setShowToast(false);
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
