/*
The Popup class is a generic class that opens and closes a popup. Create it according to the following requirements:

The constructor accepts a single parameter, the popup selector.

It has public methods called open() and close() to open and close the popup. The open() method should be called in the preexisting event handlers in index.js.

It has a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.

It has a public method named setEventListeners() that adds a click event listener to the close icon of the popup. The modal window should also close when users click on the shaded area around the form.

You won't instantiate your Popup class directly in index.js; instead, you'll instantiate its children classes, as described below.
*/
export default class Popup {
  constructor(selector) {
    this.selector = selector;
  }
  _handleEscClose(popup) {
    // handles closing via the escape key
  }
  setEventListeners(popup) {
    // sets event listeners to close the current popup
  }
  open(popup) {
    // opens popup
  }
  close(popup) {
    // closes the  popup
  }
}
