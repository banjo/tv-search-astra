import { Error as IError } from "../types/types";

export const handleError = (
    error: unknown,
    setError: React.Dispatch<React.SetStateAction<IError | null>>
) => {
    if (typeof error === "string") {
        setError({ message: error, type: "error" });
    } else if (error instanceof Error) {
        if (error.name !== "AbortError") {
            setError({
                message: error.message,
                type: "error",
            });
        }
    }
};
