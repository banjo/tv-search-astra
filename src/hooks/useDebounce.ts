import { useEffect } from "react";
import { useState } from "react";
export const useDebounce = (value: string, delay: number) => {
    const [debounce, setDebounce] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    const setDirectly = (value: string) => {
        setDebounce(value);
    };

    return { debounce, setDirectly };
};
