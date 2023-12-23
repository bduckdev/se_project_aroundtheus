/*
    It has a public method named renderItems()
    that renders all eleooments on the page.

    It should iterate through the items array
and call the renderer() function on each item.

    This method should be called once on page load.
    */

export default class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;
  }
  addItem(el) {
    document.querySelector(this.selector).appendChild(el);
  }
  renderItems() {
    this.items.forEach((item) => {
      const el = this.renderer(item);
      this.addItem(el);
    });
  }
}
