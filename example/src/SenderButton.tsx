import { useSendEvent } from "react-listener";

interface SenderButtonProps {
	children: React.ReactNode;
}

const SenderButton: React.FC<SenderButtonProps> = ({ children }) => {
	const sendEvent = useSendEvent("event-name");

	const handleClick = () => {
		sendEvent({});
	};

	return <button onClick={handleClick}>{children}</button>;
};
export default SenderButton;
