export default class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;
  }
  addItem(el) {
    document.querySelector(this.selector).prepend(el);
  }
  renderItems() {
    this.items.forEach((item) => {
      const el = this.renderer(item);
      this.addItem(el);
    });
  }
}
