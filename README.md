# React Synthetic Events

A lightweight alternative to a state management library that follows the observer pattern. Using synthetic events, components can broadcast their own internal state where any other interested components can subscribe (or listen) to those events and adjust their own internal state however they see fit.

With this hooks library, you can send and receive events using useEventDispatch and useEventListen, and you can share state between two unconnected components with useSharedState.

## Why use synthetic events instead of a traditional state management library?

### Lightweight and simple

While there are some lightweight state management libraries out there, many of them are bulky and boilerplate-heavy. This can make it frustrating to work with. React Listener can work with just simple hooks inside your components.

### Better architecture

Central state management libraries follow the singleton pattern, which is notoriously challenging to manage at scale and largely unnecessary for smaller projects. Letting components manage their own internal state based on events they receive can be a much cleaner solution.

### No more lifting up state

If you have cousin or sibling components that need to communicate, don't make it the responsibility of their parent or grandparent to manage that communication and state. Let them "wirelessly" communicate so that, in theory, either can exist anywhere in the DOM and still get the updates they need to function properly.

### Easier to implement than context

React context works great, but requires a lot of prepwork to set up the context, provider, and wrapping the part of your application that needs access to it. Why pollute your project with additional providers when you can have components communicate by simply referencing events by string?

## Getting started

First install the library by using the following command in your project directory:

```sh
npm install react-synthetic-events
```

or

```sh
yarn add react-synthetic-events
```

### useEventDispatch

To set up a component to start sending (or dispatching) events, first import the `useEventDispatch` hook from `react-synthetic-events`.

```tsx
import { useEventDispatch } from "react-synthetic-events";
```

Next, inside your functional component, call the `useEventDispatch` hook with the name of your event as its argument. This will return a function you can call at any time to trigger the event.

```tsx
import { useEventDispatch } from "react-synthetic-events";

const MyDispatcher = () => {
	const sendEvent = useEventDispatch("myEventName");

	return <div></div>;
};
```

You can then use this function however you'd like your component to broadcast the event. Here's an example using a simple button click.

```tsx
import { useEventDispatch } from "react-synthetic-events";

const MyDispatcher = () => {
	const sendEvent = useEventDispatch("myEventName");

	return <button onClick={() => sendEvent()}></button>;
};
```

Optionally, you can include a "payload" - which can consist of any properties and information you'd like the receiving components to interpret later.

```tsx
import { useEventDispatch } from "react-synthetic-events";

const MyDispatcher = () => {
	const sendEvent = useEventDispatch("myEventName");

	return (
		<button
			onClick={() => sendEvent({ message: "Hello, world!" })}
		></button>
	);
};
```

Using Typescript, you can also give this "payload" a type interface, which can then be applied to the `useEventDispatch` function as a generic argument.

```tsx
import { useEventDispatch } from "react-synthetic-events";

export interface MyPayload {
	message: string;
}

const MyDispatcher = () => {
	const sendEvent = useEventDispatch<MyPayload>("myEventName");

	return (
		<button
			onClick={() => sendEvent({ message: "Hello, world!" })}
		></button>
	);
};
```

In addition to the event name, an additional `EventDispatcherOptions` object can be passed as a second argument. This can be used to adjust the size of the event cache, if desired.

### useEventListen

To build a component that receives these events, first start by importing the `useEventListen` hook.

```tsx
import { useEventListen } from "react-synthetic-events";
```

Then implement the hook inside your functional component. Pass the name of the event you wish to listen to, and an optional callback that will be called when the event is received.

```tsx
import { useEventListen } from "react-synthetic-events";

const MyReceiver = () => {
	useEventListen("myEventName", () => {
		console.log("Event received!");
	});

	return <div></div>;
};
```

Optionally you can use this hook's return value to provide your component with the `EventDetail` from the latest event that was called.

```tsx
import { useEventListen } from "react-synthetic-events";

const MyReceiver = () => {
	const eventDetail = useEventListen("myEventName");

	return <div>{eventDetail?.payload.message ?? ""}</div>;
};
```

For Typescript, you'll want to ensure that the event payload type you are receiving matches the payload that was sent. You can pass the matching payload interface as a generic argument to the `useEventListen` hook.

```tsx
import { useEventListen } from "react-synthetic-events";
import { MyPayload } from "./MyDispatcher";

const MyReceiver = () => {
	const eventDetail = useEventListen<MyPayload>("myEventName");

	return <div>{eventDetail?.payload.message ?? ""}</div>;
};
```

Alternatively, the second argument to the `useEventListen` hook is a callback that will be invoked when an event is received.

```tsx
import { useState } from "react";
import { useEventListen } from "react-synthetic-events";

const MyReceiver = () => {
	const [count, setCount] = useState(0);

	useEventListen("myEventName", () => {
		setCount((count) => count + 1);
	});

	return <div>{count}</div>;
};
```

This callback receives the same `EventDetail` object that the function returns. This can be useful for updating component state.

```tsx
import { useState } from "react";
import { useEventListen } from "react-synthetic-events";
import { MyPayload } from "./MyDispatcher";

const MyReceiver = () => {
	const [message, setMessage] = useState(0);

	useEventListen<MyPayload>("myEventName", (detail) => {
		setMessage(detail?.payload.message);
	});

	return <div>{message}</div>;
};
```

Additional information is available on the `EventDetail` object, including the timestamp of the event and the `EventDispatcher`. Accessing the dispatcher allows querying recent cached events, if desired.

### useSharedState

The `useSharedState` hook functions very similarly to the `React.useState` hook, but it takes a second argument that represents a state key. Any components that use the same key will receive the same state updates.

Basic usage:

```tsx
import { useSharedState } from "react-synthetic-events";

const SharedStateButton = () => {
	const [myState, setMyState] = useSharedState(0, "myStateKey");

	return <button onClick={() => setState(state + 1)}>{state}</button>;
};

export default SharedStateButton;
```

The behavior of the state update in each component will depend on the argument passed into the setter function. Just like with `React.useState`, you can pass the new updated state, like so:

```tsx
return <button onClick={() => setMyState(state + 1)}>{state}</button>;
```

Or you can pass in a callback function that takes the previous state and returns an updated value, like so:

```tsx
return (
	<button onClick={() => setMyState((state) => state + 1)}>{state}</button>
);
```

Passing in the new updated state (as in the first example) will update the state of all listening components to match the state of the updating component. If, for some reason, you had three components with different values, say 1, 3, and 5 - and you called `setMyState(state + 1)` on the component with a current state value of 5, then all three components' state will simultaneously update to 6.

Passing in a function to update the state as in the second example above will instead only update each components' state based on its own existing state value. So once again, calling `setMyState(state => state + 1)` on the same components with values 1, 3, and 5 will result in them updating to 2, 4, and 6.

### Note: Dynamic event and state keys

How and why would `useSharedState` components all have different values in the first place? Well, if desired you can dynamically change the provided state key, either with props from the parent component, or another state variable in the existing components. You can even use a useSharedState hook to update the keys of other useSharedState hooks - I won't judge you.

Dynamically changing the keys of `useEventDispatch` and `useEventListen` can also provide for some interesting design patterns. Notably, dynamically changing the key of a `useEventDispatch` hook maintains the same internal `EventDispatcher` object and event cache that the listening component has access to, making it possible for event listeners to access previous events that were dispatched elsewhere by the same component. Not that you'd ever need to do that - but maybe?

## Tips

-   You can have multiple dispatchers and/or multiple receivers for the same event if desired.
-   You can dispatch or receive multiple events from/to the same component if desired.
-   When dispatching events, it is generally good practice to include information in the payload about the component that dispatched them, even if you don't intend to use it.

## Contributing

This project is in ongoing development. If you wish to contribute, feel free to open a ticket with a suggested feature or bug.
