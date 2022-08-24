import "./App.css";
import SenderButton from "./SenderButton";
import ReceiverCount from "./ReceiverCount";
import { useState } from "react";
import SharedStateButton from "./SharedStateButton";

function App() {
	const [key, setKey] = useState("add");
	return (
		<div className="App">
			{/* <SenderButton name="add">add</SenderButton>
			<SenderButton name={key}>{key}</SenderButton>
			<ReceiverCount /> */}
			<button
				onClick={() =>
					setKey((key) => (key === "add" ? "subtract" : "add"))
				}
			>
				Change Keys
			</button>
			<SharedStateButton eventKey={key} />
			<SharedStateButton eventKey="subtract" />
			<SharedStateButton eventKey={key} />
			<SharedStateButton eventKey="subtract" />
		</div>
	);
}

export default App;
