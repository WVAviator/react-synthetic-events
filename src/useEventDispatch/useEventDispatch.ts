import { useEffect, useState } from "react";
import { EventDispatcher } from "../shared/EventDispatcher";
import { EventDispatcherOptions } from "../shared/EventDispatcherOptions";
import { log } from "../util/logging";

const useEventDispatch = <TPayload = {}>(
	event: string,
	options?: EventDispatcherOptions
) => {
	log("Rendering useEventDispatch with event:", event);
	const [dispatcher, setDispatcher] =
		useState<EventDispatcher<TPayload> | null>(null);

	useEffect(() => {
		if (!dispatcher) {
			setDispatcher(new EventDispatcher<TPayload>(event, options));
			log("Created new dispatcher:", dispatcher);
		}
	}, [event, options]);

	const dispatch = (payload: TPayload = {} as TPayload) => {
		log("Dispatching event with payload:", payload);
		dispatcher?.dispatch(payload);
	};

	return dispatch;
};

export default useEventDispatch;
