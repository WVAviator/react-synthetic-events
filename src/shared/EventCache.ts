export class EventCache {
	private cache: CustomEvent[] = [];
	private maxSize: number;

	/**
	 * An EventCache stores and maintains a list of the most recent events.
	 * @param maxSize The maximum number of events to keep in the cache.
	 */
	constructor(maxSize: number = 10) {
		this.maxSize = maxSize;
	}

	/**
	 * Adds an event to the cache.
	 * @param event The event to add to the cache.
	 */
	public enqueue(event: CustomEvent) {
		if (this.cache.length === this.maxSize) {
			this.dequeue();
		}
		this.cache.push(event);
	}

	/**
	 * Remove and return the oldest event in the cache.
	 * @returns The oldest event in the cache, or undefined if the cache is empty.
	 */
	public dequeue(): CustomEvent | undefined {
		return this.cache.shift();
	}

	/**
	 * Returns the most recent event in the cache without removing it.
	 * @returns The most recent event in the cache, or undefined if the cache is empty.
	 */
	public mostRecent(): CustomEvent | undefined {
		return this.cache[this.cache.length - 1];
	}

	/**
	 * Returns all items in the cache that have been created since the given date. The most recent event will be at the last index.
	 * @param date
	 * @returns
	 */
	public allEventsSince(date: Date): CustomEvent[] {
		return this.cache.filter((event) => event.detail.timestamp > date);
	}

	/**
	 * Returns all the events currently in the cache, with the last index being the most recent event.
	 */
	public get values(): CustomEvent[] {
		return this.cache;
	}

	/**
	 * Returns the number of events currently in the cache.
	 */
	public get length(): number {
		return this.cache.length;
	}
}
