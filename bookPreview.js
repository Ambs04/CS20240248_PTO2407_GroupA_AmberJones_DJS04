import { authors } from "./data.js";

export class BookPreview extends HTMLElement {
  static get observedAttributes() {
    return ["author", "id", "image", "title"];
  }

  connectedCallback() {
    const author = this.getAttribute("author") || "Author unknown";
    const id = this.getAttribute("id");
    const image = this.getAttribute("image") || "alt_image.jpg";
    const title = this.getAttribute("title") || "Title not found";

    this.innerHTML = `
    
             <button class="preview" "data-preview" = ${id} >
                 <img
                      class="preview__image"
                      src="${image}"
                  />

                  <div class="preview__info">
                      <h3 class="preview__title">${title}</h3>
                      <div class="preview__author">${authors[author]}</div>
                  </div>

              </button>

    `;
  }
}

customElements.define("book-preview", BookPreview);
