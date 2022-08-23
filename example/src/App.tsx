import "./App.css";
import SenderButton from "./SenderButton";
import ReceiverCount from "./ReceiverCount";
import { useState } from "react";

function App() {
	const [key, setKey] = useState("key1");
	return (
		<div className="App">
			<SenderButton name="key1">+</SenderButton>
			<SenderButton name={key}>-</SenderButton>
			<ReceiverCount />
			<button
				onClick={() =>
					setKey((key) => {
						return key === "key1" ? "key2" : "key1";
					})
				}
			>
				Change Keys
			</button>
		</div>
	);
}

export default App;
