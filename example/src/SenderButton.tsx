import { useEventDispatch, useSharedState } from "react-synthetic-events";

interface SenderButtonProps {
	children: React.ReactNode;
	name: string;
}

const SenderButton: React.FC<SenderButtonProps> = ({ children, name }) => {
	// const sendEvent = useEventDispatch(name);

	// const handleClick = () => {
	// 	sendEvent();
	// };

	const [sharedState, setSharedState] = useSharedState(0, name);

	return (
		<button onClick={() => setSharedState(sharedState + 1)}>
			{sharedState}
		</button>
	);
};
export default SenderButton;
