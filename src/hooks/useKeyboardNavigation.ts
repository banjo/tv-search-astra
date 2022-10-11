import { createRef, useState } from "react";

interface Props<T> {
    itemsToNavigate: T[];
    handleClick: (item: T) => void;
}

export const useKeyboardNavigation = <T>({
    itemsToNavigate,
    handleClick,
}: Props<T>) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const refs = itemsToNavigate.map(() => createRef<HTMLDivElement>());

    const handleKeyboardNavigation = (e: React.KeyboardEvent) => {
        let newValue = 0;

        if (e.key === "ArrowUp") {
            e.preventDefault();
            newValue =
                (selectedIndex - 1 + itemsToNavigate.length) %
                itemsToNavigate.length;
            setSelectedIndex(newValue);
        }

        if (e.key === "ArrowDown" || e.key === "Tab") {
            e.preventDefault();
            newValue = (selectedIndex + 1) % itemsToNavigate.length;
            setSelectedIndex(newValue);
        }

        const ref = refs[newValue];
        ref?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });

        if (e.key === "Enter") {
            e.preventDefault();
            handleClick(itemsToNavigate[selectedIndex]);
        }
    };

    return { handleKeyboardNavigation, refs, selectedIndex };
};
