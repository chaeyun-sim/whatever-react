export class SyntheticEvent {
  constructor(event) {
    this.bubbles = false; // returns whether the event bubbles through the DOM;
    this.cancelable = false; // returns wheter the event can be canceled.
    this.currentTarget = null; // returns the node to which the current handler is attached in the react tree
    this.defaultPrevented = false; // returns whether preventdefault was canceled
    this.eventPhase = 0; // returns which phase the event is currently in.
    this.isTrusted = false; // returns whether the event was initiated by user
    this.target = event.target; // returns the node on which the event has occurred
    this.timeStamp = 0; // returns the time when the event occurred
    this.nativeEvent = event; // original browser event object
    this.isPropagationStopped = false;
    this.isPersisted = false;
  }

  get value() {
    return this.target?.value;
  }

  preventDefault() {
    // Prevents the default browser action for the event.
    this.defaultPrevented = true;
    this.nativeEvent.preventDefault();
  }

  stopPropagation() {
    // Stops the event propagation through the React tree.
    this.isPropagationStopped = true;
    this.nativeEvent.stopPropagation();
  }

  isDefaultPrevented() {
    return this.defaultPrevented;
  }

  isPropagationStopped() {
    return this.isPropagationStopped;
  }

  persist() {
    this.isPersistentFlag = true;
  }

  isPersistent() {
    return this.isPersisted;
  }
}
