showBooks();

let tableBody = document.getElementById('table');
tableBody.style.overflow = 'auto';
tableBody.style.height = '350px';


class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

//Show Books in Table
function showBooks() {
  let allBooks = localStorage.getItem("allBooks");
  let allBooksObj;
  if (allBooks == null) {
    allBooksObj = [];
  } else {
    allBooksObj = JSON.parse(allBooks);
  }

  let uiString = "";
  allBooksObj.forEach(function(element, index) {
    uiString += `<tr class="tableBooks">
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                </tr>`;
  });

  let tableBody = document.getElementById("tableBody");
  if (allBooksObj.length != 0) {
    tableBody.innerHTML = uiString;
  } else {
    tableBody.innerHTML = "";
  }
}

//Delete a Book using Delete Button
function deleteBook(index) {
  let allBooks = localStorage.getItem("allBooks");
  let allBooksObj;
  if (allBooks == null) {
    allBooksObj = [];
  } else {
    allBooksObj = JSON.parse(allBooks);
  }
  allBooksObj.splice(index, 1);
  localStorage.setItem("allBooks", JSON.stringify(allBooksObj));
  showBooks();
}

class Display {
  add(book) {
    //Add books to local storage
    let allBooks = localStorage.getItem("allBooks");
    let allBooksObj;
    if (allBooks == null) {
      allBooksObj = [];
    } else {
      allBooksObj = JSON.parse(allBooks);
    }

    allBooksObj.push(book);
    localStorage.setItem("allBooks", JSON.stringify(allBooksObj));
    showBooks();
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message: </strong>${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 4000);
  }
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  //    console.log("You have submited library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book has been successfully added.");
  } else {
    display.show("danger", "Sorry you cannot add this book.");
  }

  e.preventDefault();
}

//Search Book in tabel
let search = document.getElementById("searchTxt");
search.addEventListener("input", function() {
  let searchVal = search.value;
  let book = document.getElementsByClassName("tableBooks");
  Array.from(book).forEach(function(element, index) {
    let bookName = element.getElementsByTagName("td")[0].innerHTML;
    if (bookName.includes(searchVal)) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});
