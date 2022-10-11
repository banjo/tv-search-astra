import { useEffect, useState } from "react";
import { useTvMazeContext } from "../../../hooks/useGlobalContext";
import { Error as IError } from "../../../types/types";
import "./toast.css";

const TIMEOUT = 5000;

const Toast = ({ message, type }: IError) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const { clearError } = useTvMazeContext();

    useEffect(() => {
        let ignore = false;
        if (message) {
            setShowToast(true);
            setTimeout(() => {
                if (!ignore) close();
            }, TIMEOUT);
        }

        return () => {
            ignore = true;
        };
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
            <div className="title">{type?.toUpperCase()}</div>
            <div className="message">{message}</div>
            <div className="close" onClick={close}>
                X
            </div>
        </div>
    );
};

export default Toast;
