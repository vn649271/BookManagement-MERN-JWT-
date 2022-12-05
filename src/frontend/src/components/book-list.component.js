import React, { useState, useEffect } from "react";
import BookService from "../services/book.service";
import { Link } from "react-router-dom";

const BookList = props => {
  const { token } = props;
  const [books, setBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");
  const [currentClassName, setCurrentClassName] = useState("list-group-item");

  useEffect(() => {
    retrieveBooks();
  }, [loaded]);

  const retrieveBooks = () => {
    BookService.getAll(token)
      .then(response => {
        if (response.data.error) {
          alert("Failed to get book list");
          return;
        }
        setBooks(response.data.books);
        setLoaded(true);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const getNewBooks = () => {
    console.log("************* New books");
    BookService.getNew(token)
      .then(response => {
        if (response.data.error) {
          alert("Failed to get book list");
          return;
        }
        setBooks(response.data.books);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const getOldBooks = () => {
    console.log("************* Old books");
    BookService.getOld(token)
      .then(response => {
        if (response.data.error) {
          alert("Failed to get book list");
          return;
        }
        setBooks(response.data.books);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const refreshList = () => {
    retrieveBooks();
    setCurrentIndex("");
  }
  const onSelectBook = ev => {
    console.log(ev.target.id)
    setCurrentIndex(ev.target.id);
  }
  const removeAllBooks = () => {
    BookService.deleteAll()
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
        <div className="row pr-3">
          <div className="col-md-6">
            <h4>Book List</h4>
          </div>
          <div className="col-md-2">
            <h5>
              <button
                className="border btn btn-sm"
                onClick={refreshList}
              >
                All
              </button>
            </h5>
          </div>
          <div className="col-md-2">
            <h5>
              <button
                className="border btn btn-sm"
                onClick={getNewBooks}
              >
                New
              </button>
            </h5>
          </div>
          <div className="col-md-2">
            <h5>
              <button
                className="border btn btn-sm"
                onClick={getOldBooks}
              >
                Old
              </button>
            </h5>
          </div>
        </div>
        <ul className="list-group">
          {books &&
            books.map((book, index) => (
              <li
                id={"book_" + index}
                className={'list-group-item' + `${currentIndex === 'book_' + index ? ' active' : ''}`}
                onClick={onSelectBook}
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
        {currentIndex !== ""? (
          <div>
            <h4>Book Detail</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {books[currentIndex.replace("book_", "") - 0].title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {books[currentIndex.replace("book_", "") - 0].description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {books[currentIndex.replace("book_", "") - 0].published_at ? "Published" : "Pending"}
            </div>

            <Link
              to={"/books/" + books[currentIndex.replace("book_", "") - 0]._id}
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