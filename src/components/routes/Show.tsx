import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isNumber } from "../../helpers/util";
import { useTvMazeContext } from "../../hooks/useGlobalContext";

const Show = () => {
    const { selectedShow, findShowById } = useTvMazeContext();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isNumber(Number(id))) {
            navigate("/");
        }
        const fetchShow = async (id: number) => {
            await findShowById(id);
        };

        if (!selectedShow) {
            fetchShow(Number(id));
        }
    }, [selectedShow, id]);
    return <div className="">hello from {selectedShow?.name ?? "world"}</div>;
};

export default Show;
