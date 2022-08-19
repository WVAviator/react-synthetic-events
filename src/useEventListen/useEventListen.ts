import { useEffect, useState } from "react";
import { EventDetail } from "../shared/EventDetail";
import { log } from "../util/logging";

const useEventListen = <TPayload>(
	event: string,
	callback?: (detail?: EventDetail<TPayload>) => void
) => {
	log("Rendering useEventListen with event:", event);
	const [previousDetail, setPreviousDetail] =
		useState<EventDetail<TPayload> | null>(null);

	useEffect(() => {
		const eventCallback = (event: CustomEvent<EventDetail<TPayload>>) => {
			const detail: EventDetail<TPayload> = event.detail;
			log("Received event with detail:", detail);
			callback && callback(detail);
			setPreviousDetail(detail);
		};

		log("Adding event listener:", event);
		window.addEventListener(event, eventCallback);

		return () => {
			log("Removing event listener:", event);
			window.removeEventListener(event, eventCallback);
		};
	}, []);

	return previousDetail;
};

export default useEventListen;
