import "./App.css";
import SenderButton from "./SenderButton";
import ReceiverCount from "./ReceiverCount";

function App() {
	return (
		<div className="App">
			<SenderButton>Increase Count</SenderButton>
			<ReceiverCount />
		</div>
	);
}

export default App;
