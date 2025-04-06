import { BookPreview } from "./bookPreview.js";
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { el } from "./DOMelements.js";
import {
  //bookPreview,
  eventListeners,
  filterGenres,
  filterAuthors,
} from "./helperFunctions.js";

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

class ManageTheme {
  static setTheme(theme) {
    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }
  }
  static initTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      el.dataSettingsTheme.value = "night";
      ManageTheme.setTheme("night");
    } else {
      el.dataSettingsTheme.value = "day";
      ManageTheme.setTheme("day");
    }
  }

  static themeToggle(event) {
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    ManageTheme.setTheme(theme);
  }
}

init();

function displayInitBooks() {
  for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const previewEl = document.createElement("book-preview");
    previewEl.setAttribute("author", author);
    previewEl.setAttribute("id", id);
    previewEl.setAttribute("image", image);
    previewEl.setAttribute("title", title);
    starting.appendChild(previewEl);
  }

  el.dataListItems.appendChild(starting);
  showMoreBtnUpdate();
}

function showMoreBtnUpdate() {
  el.dataListBtn.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;

  const booksRemaining = matches.length - page * BOOKS_PER_PAGE;

  el.dataListBtn.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${
        matches.length - page * BOOKS_PER_PAGE > 0
          ? matches.length - page * BOOKS_PER_PAGE
          : 0
      })</span>
  `;
  el.dataListBtn.disabled = booksRemaining <= 0;
}

//FUNCTIONS

//Responsible for the settings form
function settingsForm() {
  el.dataSettingsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    ManageTheme.themeToggle(event);
    el.dataSettingsOverlay.open = false;
  });
}

//Responsible for the search form
function searchForm() {
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

    for (const { author, id, image, title } of result.slice(
      0,
      BOOKS_PER_PAGE
    )) {
      const previewEl = document.createElement("book-preview");
      previewEl.setAttribute("author", author);
      previewEl.setAttribute("id", id);
      previewEl.setAttribute("image", image);
      previewEl.setAttribute("title", title);

      newItems.appendChild(previewEl);
    }
    el.dataListItems.appendChild(newItems);

    showMoreBtnUpdate();

    window.scrollTo({ top: 0, behavior: "smooth" });
    el.dataSearchOverlay.open = false;
  });
}

el.dataListBtn.addEventListener("click", () => {
  const fragment = document.createDocumentFragment(); //starting;

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const previewEl = document.createElement("book-preview");
    previewEl.setAttribute("author", author);
    previewEl.setAttribute("id", id);
    previewEl.setAttribute("image", image);
    previewEl.setAttribute("title", title);

    fragment.appendChild(previewEl);
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

function init() {
  eventListeners();
  displayInitBooks();
  showMoreBtnUpdate();
  filterGenres();
  filterAuthors();
  settingsForm();
  searchForm();
  ManageTheme.initTheme();
}
