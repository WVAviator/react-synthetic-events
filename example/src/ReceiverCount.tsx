import { useState } from "react";

const ReceiverCount = () => {
	const [count, setCount] = useState(0);

	return <div>Count: {count}</div>;
};
export default ReceiverCount;
