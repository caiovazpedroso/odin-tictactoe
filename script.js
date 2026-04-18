const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID()
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}.`
  }

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
  iterateLibrary();
};

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead)
  myLibrary.push(newBook)
}

function handleButton(){
  const selected = UI.myForm.querySelector('input[name="user-read"]:checked');
  const bookIsRead = selected?.value === "yes";
  addBookToLibrary(UI.userTitle.value, UI.userAuthor.value, UI.userPages.value, bookIsRead);
  iterateLibrary();
}

function removeBook(id){
  let el = document.querySelector(`[data-book-id="${id}"]`)
  el.remove()
  const index = myLibrary.findIndex(item => item.id === id)
  myLibrary.splice(index, 1)
}

function createCard(book){
  let newCard = document.createElement("div")
  newCard.classList.add("card")
  let newCardHeader = document.createElement("div")
  newCardHeader.classList.add("card-header")
  let newCardBody = document.createElement("div")
  newCardBody.classList.add("card-body")
  let newCardFooter = document.createElement("div")
  newCardFooter.classList.add("card-footer")
  let newTitle = document.createElement("div");
  newTitle.classList.add("title")
  newTitle.textContent = book.title
  let newAuthor = document.createElement("div")
  newAuthor.classList.add("author");
  newAuthor.textContent = book.author
  let newPages = document.createElement("div")
  newPages.classList.add("pages")
  newPages.textContent = `${book.pages} pages`
  let newIsRead = document.createElement("div");
  newIsRead.classList.add("isRead");
  let removeButton = document.createElement("button");
  removeButton.classList.add("remove-button")
  removeButton.textContent = "X";
  newCard.dataset.bookId = book.id;
  removeButton.addEventListener("click", () => removeBook(book.id))
  let readButton = document.createElement("button")
  readButton.textContent = "Read"
  readButton.addEventListener("click", () => book.toggleRead())
  newIsRead.textContent = book.isRead ?  "Has been read" : "Not read";
  newCardHeader.append(newTitle, removeButton)
  newCardBody.append(newAuthor, newPages, newIsRead)
  newCardFooter.append(readButton)
  newCard.append(newCardHeader, newCardBody, newCardFooter)
  return newCard
} 

function iterateLibrary(){
  UI.collection.textContent = ""
  for (const book of myLibrary) {
    UI.collection.appendChild(createCard(book));
  }
}

const UI = {
  newBookButton: document.querySelector("#new-book"),
  seeLibrary: document.querySelector("#iterate"),
  collection: document.querySelector("#collection"),
  myDialog: document.querySelector("#my-dialog"),
  myForm: document.querySelector("#my-form"),
  userTitle: document.querySelector("#user-title"),
  userAuthor: document.querySelector("#user-author"),
  userPages: document.querySelector("#user-pages"),
}

UI.newBookButton.addEventListener("click", () => {UI.myForm.reset(); UI.myDialog.close(); UI.myDialog.showModal()});
UI.myDialog.addEventListener("cancel", () => {UI.myForm.reset()});
UI.myDialog.addEventListener("close", () => {UI.myDialog.returnValue === "confirm" ? handleButton() : null});
UI.seeLibrary.addEventListener("click", () => iterateLibrary());

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Project Hail Mary", "Andy Weir", 496, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
addBookToLibrary("The Name of the Wind", "Patrick Rothfuss", 662, false);
addBookToLibrary("Educated", "Tara Westover", 334, true);
addBookToLibrary("Sapiens", "Yuval Noah Harari", 443, false);
addBookToLibrary("The Left Hand of Darkness", "Ursula K. Le Guin", 304, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);
