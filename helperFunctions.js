import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { el } from "./DOMelements.js";

export function bookPreview({ author, id, image, title }) {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
                  <img
                      class="preview__image"
                      src="${image}"
                  />

                  <div class="preview__info">
                      <h3 class="preview__title">${title}</h3>
                      <div class="preview__author">${authors[author]}</div>
                  </div>
              `;
  return element;
}

//FUNCTION CONTAINING ALL 'CLICK' EVENT LISTENERS

export function eventListeners() {
  el.dataSearchCancel.addEventListener("click", () => {
    el.dataSearchOverlay.open = false;
  });

  el.dataSettingsCancel.addEventListener("click", () => {
    el.dataSettingsOverlay.open = false;
  });

  el.dataHeaderSearch.addEventListener("click", () => {
    el.dataSearchOverlay.open = true;
    el.dataSearchTitle.focus();
  });

  el.dataHeaderSettings.addEventListener("click", () => {
    el.dataSettingsOverlay.open = true;
  });

  el.dataListClose.addEventListener("click", () => {
    el.dataListActive.open = false;
  });
}

export const starting = document.createDocumentFragment();

export function filterGenres() {
  const genreHtml = starting; //document.createDocumentFragment();
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  genreHtml.appendChild(firstGenreElement);

  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }
  el.dataSearchGenres.appendChild(genreHtml);
}

export function filterAuthors() {
  const authorsHtml = starting; //document.createDocumentFragment();
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }
  el.dataSearchAuthors.appendChild(authorsHtml);
}
