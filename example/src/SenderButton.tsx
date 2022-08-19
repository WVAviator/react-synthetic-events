import { useEventDispatch } from "react-synthetic-events";

interface SenderButtonProps {
	children: React.ReactNode;
	name: string;
}

const SenderButton: React.FC<SenderButtonProps> = ({ children, name }) => {
	const sendEvent = useEventDispatch(name);

	const handleClick = () => {
		sendEvent();
	};

	return <button onClick={handleClick}>{children}</button>;
};
export default SenderButton;
