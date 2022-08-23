import useEventDispatch from "../useEventDispatch";
import React, { useEffect, useState } from "react";
import useEventListen from "../useEventListen";

const useSharedState = <TState>(
	initialState: TState,
	key?: string
): [TState, React.Dispatch<React.SetStateAction<TState>>] => {
	console.log("passed in:", Object.keys(initialState));

	const [state, setState] = useState<TState>(initialState);

	if (!key) {
		return [state, setState];
	}

	const sendState = useEventDispatch<TState>(key);

	useEventListen<TState>(key, (detail) => {
		setState(detail?.payload ?? state);
	});

	const updateSharedState = (value: React.SetStateAction<TState>) => {
		if (value instanceof Function) {
			const newState = value(state);
			sendState(newState);
		} else {
			sendState(value);
		}
	};
	return [state, updateSharedState];
};

export default useSharedState;
