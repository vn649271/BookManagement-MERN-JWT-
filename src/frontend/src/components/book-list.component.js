import React, { useState, useEffect } from "react";
import BookManagementService from "../services/book.service";
import { Link } from "react-router-dom";

const BookList = props => {
  const { token } = props;
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveBooks();
  });

  const retrieveBooks = () => {
    BookManagementService.getAll(token)
      .then(response => {
        if (response.data.error) {
          alert("Failed to get book list");
          return;
        }
        setBooks(response.data.books);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const refreshList = () => {
    retrieveBooks();
    setCurrentBook(null);
    setCurrentIndex(-1);
  }

  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  }

  const removeAllBooks = () => {
    BookManagementService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Book List</h4>
        <ul className="list-group">
          {books &&
            books.map((book, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBook(book, index)}
                key={index}
              >
                {book.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBooks}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBook ? (
          <div>
            <h4>Book</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBook.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBook.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBook.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/books/" + currentBook.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList;