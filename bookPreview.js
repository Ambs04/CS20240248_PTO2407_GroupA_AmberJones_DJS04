import { authors } from "./data.js";

export class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["author", "id", "image", "title"];
  }

  render() {
    const author = this.getAttribute("author") || "Author unknown";
    const id = this.getAttribute("id");
    const image = this.getAttribute("image") || "alt_image.jpg";
    const title = this.getAttribute("title") || "Title not found";

    this.shadowRoot.innerHTML = `
                <style>
                    // :host {
                    //     margin: 0;
                    //     min-height: 100vh;
                    //     min-width: 100%;
                    //     font-family: Roboto, sans-serif;
                    //     color: rgba(var(--color-dark), 0.9);
                    //     background: linear-gradient(0deg, rgba(var(--color-dark), 0.2), rgba(var(--color-dark), 0.1)), rgba(var(--color-light), 1);
                    // }

                    :host(:hover){
                         background: rgba(var(--color-blue), 0.05);

                    }
                    
                    .preview {
                        border-width: 0;
                        width: 100%;
                        font-family: Roboto, sans-serif;
                        padding: 0.5rem 1rem;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        text-align: left;
                        border-radius: 8px;
                        border: 1px solid rgba(var(--color-dark), 0.15);
                        background: rgba(var(--color-light), 1);
                    }


                    .preview__image {
                        width: 48px;
                        height: 70px;
                        object-fit: cover;
                        background: grey;
                        border-radius: 2px;
                        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                            0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
                    }
                    .preview__info {
                         padding: 1rem;
                    }

                    .preview__title {
                        margin: 0 0 0.5rem;
                        font-weight: bold;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;  
                        overflow: hidden;
                        color: rgba(var(--color-dark), 0.8)
                    }

                    .preview__author {
                         color: rgba(var(--color-dark), 0.4);
                    }

                    .list {
                        padding-bottom: 10rem;
                    };

                    .list__items {
                        display: grid;
                        padding: 2rem 1rem;
                        grid-template-columns: 1fr;
                        grid-column-gap: 0.5rem;
                        grid-row-gap: 0.5rem;
                        margin: 0 auto;
                        width: 100%;
                    };

                    // @media (min-width: 50rem) {
                    //     .list__items {
                    //         grid-template-columns: repeat(2, 1fr);
                    //         grid-column-gap: 0.75rem;
                    //         grid-row-gap: 0.75rem;
                    //     }
                    // }

                    // @media (min-width: 100rem) {
                    //     .list__items {
                    //         grid-template-columns: repeat(4, 1fr);
                    //         grid-column-gap: 0.75rem;
                    //         grid-row-gap: 0.75rem;
                    //     }
                    // }

                    // @media (min-width: 150rem) {
                    //     .list__items {
                    //         grid-template-columns: repeat(8, 1fr);
                    //         grid-column-gap: 0.75rem;
                    //         grid-row-gap: 0.75rem;
                    //     }
                    // }

                    

                </style>
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
