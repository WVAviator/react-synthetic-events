import useEventDispatch from "../useEventDispatch";
import React, { useState } from "react";
import useEventListen from "../useEventListen";

/**
 * The useSharedState hook allows components referencing the same state key to share state from anywhere in the dom using synthetic events. This functions just like React useState, except updating the state here will update for any other components that reference the same state key.
 * @param initialState The initial state.
 * @param stateKey A string that uniquely identifies this state so that it can be shared across components. If omitted, this hook will function exactly the same as React useState.
 * @returns A tuple including the stateful value and a function to update it.
 */
const useSharedState = <TState>(
	initialState: TState | (() => TState),
	stateKey?: string
): [TState, React.Dispatch<React.SetStateAction<TState>>] => {
	const [state, setState] = useState<TState>(initialState);

	if (!stateKey) {
		return [state, setState];
	}

	const sendState = useEventDispatch<React.SetStateAction<TState>>(stateKey);

	useEventListen<React.SetStateAction<TState>>(stateKey, (detail) => {
		setState(detail?.payload ?? state);
	});

	const updateSharedState = (value: React.SetStateAction<TState>) => {
		sendState(value);
	};
	return [state, updateSharedState];
};

export default useSharedState;
