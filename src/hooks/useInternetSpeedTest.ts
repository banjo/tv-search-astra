import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "done";
type Result = "slow" | "fast";

interface Props {
    threshold: number;
}

export const useInternetSpeedTest = ({ threshold }: Props) => {
    const [start, setStart] = useState<number>(0);
    const [url, setUrl] = useState<string>("");
    const [speed, setSpeed] = useState<number>(0);
    const [status, setStatus] = useState<Status>("idle");
    const [result, setResult] = useState<Result>("fast");

    const getImageUrl = () => {
        return `https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg?${performance.now()}`;
    };

    useEffect(() => {
        setStatus("loading");
        setStart(performance.now());
        setUrl(getImageUrl());
    }, []);

    const handleLoad = () => {
        const time = performance.now() - start;

        if (time > threshold) {
            setResult("slow");
        }

        setSpeed(time);
        setStatus("done");
    };

    return { handleLoad, url, speed, status, result };
};
