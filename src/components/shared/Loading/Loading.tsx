import "./loading.css";

interface Props {
    isLoading: boolean;
    className?: string;
}
const Loading = ({ isLoading, className }: Props) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className={`spinner-container ${className}`}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
