const STORAGE_KEY = "BOOKSHELF_APPS";
const RENDER_EVENT = "render_book";
const SAVED_EVENT = "saved_book";
const reads = [];

// web storage
function isStorageExist() {
    if (typeof Storage === undefined) {
        alert("Browser Anda tidak mendukung local storage");
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    if (data !== null) {
        for (const read of data) {
          reads.push(read);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function saveData() {
    if (isStorageExist()) {
      const parsed  = JSON.stringify(reads);
        localStorage.setItem(STORAGE_KEY, parsed);

        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function findBook(readId) {
    for (const read of reads) {
        if (read.id === readId) {
            return read;
        }
    }
    return null;
}

function findBookIndex(readId) {
    let index = 0;
    for (const read of reads) {
        if (read.id === readId) return index;
        index++;
    }
    return -1;
}

const addBook = () => {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  
  const object = {
    id: +new Date(),
    title,
    author,
    year: parseInt(year),
    isComplete,
  };
  reads.push(object);
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData()
};

const makeBookElement = (read) => {
  const itemBook = document.createElement("section");
  itemBook.classList.add("book-item");
  itemBook.innerHTML = "";

  if (read.isComplete) {
      itemBook.innerHTML = `
      <div class="row">
          <div class="column">
              <div class="card">
                  <h3>${read.title}</h3>
                  <p>${read.author}</p>
                  <p class="year">${read.year}</p>
                  
                  <div class="btn"> 
                      <button class="btn-un" onclick="moveUnCompleted(${read.id})">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>
                      </button>

                      <button class="btn-del" onclick="removeButton(${read.id})">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                      </button>
                  </div>
              </div>
          </div>
      </div>`;
  } else {
      itemBook.innerHTML = `
          <div class="row">
              <div class="column">
                  <div class="card">
                      <h3>${read.title}</h3>
                      <p>${read.author}</p>
                      <p class="year">${read.year}</p>
                  
                      <div class="btn"> 
                          <button class="btn-com" onclick="moveCompleted(${read.id})">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                          </button>
                          <button class="btn-del" onclick="removeButton(${read.id})">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                          </button>
                      </div>
                  </div>
              </div>
          </div>`;
  }
  return itemBook;
};

const moveCompleted = (readId) => {
  const targetBook = findBook(readId);

  if (targetBook == null) return;
  targetBook.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData()
};

const moveUnCompleted = (readId) => {
  const targetBook = findBook(readId);
  if (targetBook === null) return;
  targetBook.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData()
};

function removeButton(readId) {
  const targetBook = findBookIndex(readId);
  swal ({
      title: "Are you sure?",
      text: "You will not be able to recover this book!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
          reads.splice(targetBook, 1);
          document.dispatchEvent(new Event(RENDER_EVENT));
          saveData()

          swal("Book list has been deleted!", {
              icon: "success",
          });
      } else {
          swal("Your book list is safe!");
      }
  });
}

const searchBook = (string) => {
  const itemBook = document.querySelectorAll(".book-item");
  for (const item of itemBook) {
      const title = item.childNodes[1];
      if (title.innerText.toUpperCase().includes(string)) {
          title.parentElement.style.display = "";
      } else {
          title.parentElement.style.display = "none";
      }
  }
};

// dom
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("inputBook").addEventListener("submit", (event) => {
    event.preventDefault();
      addBook();
  });

document.getElementById("searchBookTitle").addEventListener("keyup", (event) => {
  const textString = event.target.value.toUpperCase();
    searchBook(textString);
  });

  if (isStorageExist()) {
      loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const uncomplete = document.getElementById("uncompleteBook");
    uncomplete.innerHTML = "";
    
  const complete = document.getElementById("completeBook");
    complete.innerHTML = "";

  for (const read of reads) {
      const bookElement = makeBookElement(read);
      if (read.isComplete) {
          complete.append(bookElement);
      } else {
          uncomplete.append(bookElement);
      }
  }
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});
