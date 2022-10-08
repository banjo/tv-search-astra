import DOMPurify from "dompurify";

export const isNumber = (value: unknown): value is number => {
    return Number.isInteger(value);
};

export const cleanString = (str: string) => {
    return DOMPurify.sanitize(str);
};
