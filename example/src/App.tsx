import "./App.css";
import SenderButton from "./SenderButton";
import ReceiverCount from "./ReceiverCount";

function App() {
	return (
		<div className="App">
			<SenderButton name="add">+</SenderButton>
			<SenderButton name="subtract">-</SenderButton>
			<ReceiverCount />
		</div>
	);
}

export default App;
