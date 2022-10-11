import { useEffect } from "react";
import { useInternetSpeedTest } from "../../../hooks/useInternetSpeedTest";
import { Error as IError } from "../../../types/types";

interface Props {
    setError: React.Dispatch<React.SetStateAction<IError | null>>;
}

const SpeedTest = ({ setError }: Props) => {
    const { url, handleLoad, result } = useInternetSpeedTest({
        threshold: 1000,
    });

    useEffect(() => {
        if (result === "slow") {
            setError({
                message: "You seem to have a slow internet connection",
                type: "warning",
            });
        }
    }, [result]);

    return <img src={url} alt="" className="hidden" onLoad={handleLoad} />;
};

export default SpeedTest;
