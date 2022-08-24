import { useSharedState } from "react-synthetic-events";

const SharedStateButton = ({ eventKey }: { eventKey: string }) => {
	const [state, setState] = useSharedState(0, eventKey);

	return <button onClick={() => setState(state + 1)}>{state}</button>;
};

export default SharedStateButton;
