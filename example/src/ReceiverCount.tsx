import { useState } from "react";
import { useReceiveEvent } from "react-listener";

const ReceiverCount = () => {
	const [count, setCount] = useState(0);

	useReceiveEvent("event-name", () => {
		setCount(count + 1);
	});

	return <div>Count: {count}</div>;
};
export default ReceiverCount;
