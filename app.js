
const colors = ["#67e8f9", "#fecaca", "#facc15", "#6366f1", "#fae8ff"]

var currentIndex = 0;
var header = document.getElementById("header");

function changeColor() {
  header.style.color = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeColor, 3000);

let bookArray = [];

function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
// Open the modal when the button is clicked
const openModalBtn = document.getElementById("openModalBtn");
openModalBtn.addEventListener("click", function () {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function () {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
});

const toggleBtn = document.getElementById("toggleBtn");
const toggleLabel = document.getElementById("toggleLabel");

let toggleValue = "No"; // Initial value

toggleBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (toggleValue === "No") {
    toggleValue = "Yes";
  } else {
    toggleValue = "No";
  }
  // Toggle the value

  if (toggleValue === "Yes") {
    toggleBtn.classList.remove("left");
    toggleBtn.classList.add("right");
    toggleLabel.textContent = "Read";
  } else {
    toggleBtn.classList.remove("right");
    toggleBtn.classList.add("left");
    toggleLabel.textContent = "Not Read";
  }
});

const bookTableBody = document.getElementById("bookTableBody");

function displayBooks() {
  bookTableBody.innerHTML = ""; // Clear existing table rows

  bookArray.forEach(function (book, index) {
    const row = document.createElement("tr");

    row.innerHTML =
      "<td>" +
      (index + 1) + // Add 1 to the index to start from 1
      "</td>" +
      "<td>" +
      book.title +
      "</td>" +
      "<td>" +
      book.author +
      "</td>" +
      "<td>" +
      book.pages +
      "</td>" +
      "<td>" +
      book.read +
      "</td>" +
      "<td><button class='deleteBtn' data-index='" +
      index +
      "'>Delete</button></td>";

    bookTableBody.appendChild(row);

    // Handle delete button click
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(this.dataset.index); // Get the index from the data-index attribute
        bookArray.splice(index, 1); // Remove the corresponding element from the array

        displayBooks();
      });
    });
  });
}

const bookButton = document.querySelector("#submit-book");

bookButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("toggleLabel").textContent;

  const readerOne = new Books(title, author, pages, read);

  bookArray.push(readerOne);

  displayBooks();


});



// Handle form submission
const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Clear the form inputs
  form.reset();

  // Close the modal
  const modal = document.getElementById("modal");
  modal.style.display = "none";
});
