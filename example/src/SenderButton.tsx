interface SenderButtonProps {
	children: React.ReactNode;
}

const SenderButton: React.FC<SenderButtonProps> = ({ children }) => {
	const handleClick = () => {
		console.log("SenderButton.handleClick");
	};

	return <button onClick={handleClick}>{children}</button>;
};
export default SenderButton;
