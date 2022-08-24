import { useEffect, useState } from "react";
import { EventDispatcher } from "../shared/EventDispatcher";
import { EventDispatcherOptions } from "../shared/EventDispatcherOptions";

/**
 * Creates a custom event dispatcher function with the provided key that can be used to dispatch events to other components anywhere in the DOM.
 * @param eventKey The unique identifier for this event. Listening components can use this same key to listen for events.
 * @param options Options for the dispatcher.
 * @returns A function that can be used to dispatch events to other components.
 */
const useEventDispatch = <TPayload = {}>(
	eventKey: string,
	options?: EventDispatcherOptions
) => {
	const [dispatcher, setDispatcher] =
		useState<EventDispatcher<TPayload> | null>(null);

	useEffect(() => {
		if (!dispatcher) {
			setDispatcher(new EventDispatcher<TPayload>(eventKey, options));
		}
		if (eventKey !== dispatcher?.eventKey) {
			dispatcher?.updateKey(eventKey);
		}
	}, [eventKey, options]);

	/**
	 * A dispatch function created by useEventDispatch.
	 * @param payload The payload to send with the event.
	 */
	const dispatch = (payload: TPayload = {} as TPayload) => {
		dispatcher?.dispatch(payload);
	};

	return dispatch;
};

export default useEventDispatch;
