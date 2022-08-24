import { EventDispatcher } from "./EventDispatcher";

export interface EventDetail<TPayload> {
	/**
	 * The payload represents information that you want your component to pass along with the event - such as the status of a toggle, the value of a slider, or an object with properties representing the state of a form.
	 */
	payload: TPayload;

	/**
	 * The timestamp represents the time at which the event occurred.
	 */
	timestamp: Date;

	/**
	 * The dispatcher represents the event dispatcher that dispatched the event. Dispatchers provide more information about events that have been sent, including the event name, the event cache, and the event detail.
	 */
	dispatcher: EventDispatcher<TPayload>;

	/**
	 * The event name used to dispatch the event.
	 */
	eventKey: string;
}
