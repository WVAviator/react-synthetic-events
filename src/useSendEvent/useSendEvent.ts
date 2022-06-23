const useSendEvent = <E>(event: string) => {
	const sendEvent = (payload: E) => {
		const customEvent = new CustomEvent(event, { detail: payload });
		window.dispatchEvent(customEvent);
	};

	return sendEvent;
};

export default useSendEvent;
