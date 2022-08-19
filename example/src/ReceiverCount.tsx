import { useState } from "react";
import { useEventListen } from "react-synthetic-events";

const ReceiverCount = () => {
	const [count, setCount] = useState(0);

	useEventListen(`add`, (detail) => {
		console.log(detail);
		setCount((count) => count + 1);
	});

	useEventListen(`subtract`, (detail) => {
		console.log(detail);
		setCount((count) => count - 1);
	});

	return <div>{count}</div>;
};
export default ReceiverCount;
