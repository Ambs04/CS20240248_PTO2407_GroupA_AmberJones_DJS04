export class BookPreview extends HTMLElement {
  constructor() {
    super();
  }

  callback() {
    this.render();
  }

  static get attributes() {
    return ["author", "id", "image", "title"];
  }

  render() {
    const author = this.getAttribute("author") || "Author unknown";
    const id = getAttribute("id");
    const image = getAttribute("image") || "alt_image.jpg";
    const title = getAttribute("title") || "Title not found";

    this.innerHTML = `
                  <img
                      class="preview__image"
                      src="${image}"
                  />

                  <div class="preview__info">
                      <h3 class="preview__title">${title}</h3>
                      <div class="preview__author">${authors[author]}</div>
                  </div>
              `;
  }
}

customElements.define("book-preview", BookPreview);
