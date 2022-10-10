import { animated } from "react-spring";
import useBoop, { BoopConfig } from "../../hooks/useBoop";

interface Props {
    children: JSX.Element[] | JSX.Element;
    config: BoopConfig;
}

const Boop = ({ children, config }: Props) => {
    const [style, trigger] = useBoop(config) as any[];
    return (
        <animated.span onMouseEnter={trigger} style={style}>
            {children}
        </animated.span>
    );
};

export default Boop;
