import { EventCache } from "./EventCache";
import { EventDetail } from "./EventDetail";
import { EventDispatcherOptions } from "./EventDispatcherOptions";

export class EventDispatcher<TPayload> {
	public eventKey;
	public eventCache: EventCache;

	constructor(eventName: string, options?: EventDispatcherOptions) {
		this.eventKey = eventName;
		this.eventCache = new EventCache(options?.maxCacheSize ?? 25);
	}

	/**
	 * Dispatch the event with the given payload. The event will be cached.
	 * @param payload The payload to send with the event.
	 */
	public dispatch(payload: TPayload) {
		const detail: EventDetail<TPayload> = {
			payload,
			timestamp: new Date(),
			dispatcher: this,
			eventKey: this.eventKey,
		};
		const customEvent = new CustomEvent(this.eventKey, { detail });
		this.eventCache.enqueue(customEvent);
		window.dispatchEvent(customEvent);
	}

	/**
	 *
	 * @returns The most recent event in the cache, or undefined if the cache is empty.
	 */
	public getLastEvent(): CustomEvent<EventDetail<TPayload>> | undefined {
		return this.eventCache.mostRecent();
	}

	/**
	 * Returns cached events
	 * @param date Optional date to filter events
	 * @returns All events that have occurred since the given date, or all events if no date is given
	 */
	public getCachedEvents(date?: Date): CustomEvent<EventDetail<TPayload>>[] {
		if (date) {
			return this.eventCache.allEventsSince(date);
		}
		return this.eventCache.values;
	}

	/**
	 * Updates the event key to change the receiver of the events but preserve the cache.
	 * @param newKey The new event name to use for this dispatcher
	 */
	public updateKey(newKey: string) {
		this.eventKey = newKey;
	}
}
