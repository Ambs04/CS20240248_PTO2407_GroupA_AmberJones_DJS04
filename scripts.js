import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

///**@typedef {object} - contains all the querySelectors throughout the JS file  */

const el = {
  dataSettingsTheme: document.querySelector("[data-settings-theme]"),
  dataListBtn: document.querySelector("[data-list-button]"),
  dataSettingsForm: document.querySelector("[data-settings-form]"),
  dataSearchCancel: document.querySelector("[data-search-cancel]"),
  dataSearchOverlay: document.querySelector("[data-search-overlay]"),
  dataSettingsOverlay: document.querySelector("[data-settings-overlay]"),
  dataSettingsCancel: document.querySelector("[data-settings-cancel]"),
  dataHeaderSearch: document.querySelector("[data-header-search]"),
  dataHeaderSettings: document.querySelector("[data-header-settings]"),
  dataListClose: document.querySelector("[data-list-close]"),
  dataListItems: document.querySelector("[data-list-items]"),
  dataSearchGenres: document.querySelector("[data-search-genres]"),
  dataSearchAuthors: document.querySelector("[data-search-authors]"),
  dataSearchForm: document.querySelector("[data-search-form]"),
  dataSearchTitle: document.querySelector("[data-search-title]"),
  dataListActive: document.querySelector("[data-list-active]"),
  dataListBlur: document.querySelector("[data-list-blur]"),
  dataListImg: document.querySelector("[data-list-image]"),
  dataListTitle: document.querySelector("[data-list-title]"),
  dataListSubtitle: document.querySelector("[data-list-subtitle]"),
  dataListDesc: document.querySelector("[data-list-description]"),
  dataListMessage: document.querySelector("[data-list-message]"),
};

eventListeners();

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
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

  starting.appendChild(element);
}

el.dataListItems.appendChild(starting);

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

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  el.dataSettingsTheme.value = "night";
  document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
  document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  el.dataSettingsTheme.value = "day";
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty("--color-light", "255, 255, 255");
}

el.dataListBtn.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
el.dataListBtn.disabled = matches.length - page * BOOKS_PER_PAGE > 0;

el.dataListBtn.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

el.dataSettingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }

  el.dataSettingsOverlay.open = false;
});

el.dataSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  if (result.length < 1) {
    el.dataListMessage.classList.add("list__message_show");
  } else {
    el.dataListMessage.classList.remove("list__message_show");
  }

  el.dataListItems.innerHTML = "";
  const newItems = starting; //document.createDocumentFragment();

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
    createPreview();
  }
  el.dataListItems.appendChild(newItems);
  el.dataListBtn.disabled = matches.length - page * BOOKS_PER_PAGE < 1;

  el.dataListBtn.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;

  window.scrollTo({ top: 0, behavior: "smooth" });
  el.dataSearchOverlay.open = false;
});

function createPreview() {
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

  newItems.appendChild(element);
}

//function containing event listeners

function eventListeners() {
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

  el.dataListBtn.addEventListener("click", () => {
    const fragment = starting; //document.createDocumentFragment();

    for (const { author, id, image, title } of matches.slice(
      page * BOOKS_PER_PAGE,
      (page + 1) * BOOKS_PER_PAGE
    )) {
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

      fragment.appendChild(element);
    }

    el.dataListItems.appendChild(fragment);
    page += 1;
  });

  el.dataListItems.addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      el.dataListActive.open = true;
      el.dataListBlur.src = active.image;
      el.dataListImg.src = active.image;
      el.dataListTitle.innerText = active.title;
      el.dataListSubtitle.innerText = `${authors[active.author]} (${new Date(
        active.published
      ).getFullYear()})`;
      el.dataListDesc.innerText = active.description;
    }
  });
}
