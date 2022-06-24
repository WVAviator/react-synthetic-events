## React listener

A lightweight alternative to a state management library that follows the observer pattern. Using synthetic events, components can broadcast their own internal state where any other interested components can subscribe (or listen) to those events and adjust their own internal state however they see fit.

### Why use synthetic events instead of a traditional state management library?

##### Lightweight and simple

While there are some lightweight state management libraries out there, many of them are bulky and boilerplate-heavy. This can make it frustrating to work with. React Listener can work with just simple hooks inside your components.

##### Better architecture

Central state management libraries follow the singleton pattern, which is notoriously challenging to manage at scale. Letting components manage their own internal state based on events they receive can be a much cleaner solution.

##### Reduced dependencies

Components that broadcast events don't need to care about what other components receive them. Should the listening components fail, or even if there are no components interested, nothing happens. Conversely, should the broadcasting component fail, the listening components won't be affected.

##### Separation of concerns

The broadcasting component shouldn't have to worry about any logic regarding how the listening component should behave. That logic can instead exist within callbacks on the listening component itself, where it belongs.
