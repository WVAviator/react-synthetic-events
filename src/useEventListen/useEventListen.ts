import { useEffect, useState } from "react";
import { EventDetail } from "../shared/EventDetail";

/**
 * Subscribes (or listens) for events with the provided key.
 * @param eventKey The unique identifier for the type of event to lsten for. This should match the event key used by the component implementing the useEventDispatch hook.
 * @param callback A callback that will be invoked with the EventDetail anytime the event is dispatched.
 * @returns The EventDetail of the most recently dispatched event.
 */
const useEventListen = <TPayload>(
	eventKey: string,
	callback?: (detail?: EventDetail<TPayload>) => void
) => {
	const [previousDetail, setPreviousDetail] =
		useState<EventDetail<TPayload> | null>(null);

	useEffect(() => {
		const eventCallback = (event: CustomEvent<EventDetail<TPayload>>) => {
			const detail: EventDetail<TPayload> = event.detail;
			callback && callback(detail);
			setPreviousDetail(detail);
		};

		window.addEventListener(eventKey, eventCallback);

		return () => {
			window.removeEventListener(eventKey, eventCallback);
		};
	}, [eventKey]);

	return previousDetail;
};

export default useEventListen;
