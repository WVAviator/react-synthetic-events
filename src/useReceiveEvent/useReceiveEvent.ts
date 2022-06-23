import { useEffect } from "react";

const useReceiveEvent = <E extends Event>(
	event: string,
	callback: (payload: E) => void
) => {
	useEffect(() => {
		window.addEventListener(event, callback);

		return () => {
			window.removeEventListener(event, callback);
		};
	});
};

export default useReceiveEvent;
