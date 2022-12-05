import React, { useState, useEffect } from "react";
import BookService from "../services/book.service";
import { Link } from "react-router-dom";
import BookTable from "./book-table.component";

const BookList = props => {

  const { token, router } = props;

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
          setBooks([]);
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
    BookService.getNew(token)
      .then(response => {
        if (response.data.error) {
          setBooks([]);
          return;
        }
        setBooks(response.data.books);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const getOldBooks = () => {
    BookService.getOld(token)
      .then(response => {
        if (response.data.error) {
          setBooks([]);
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
    setCurrentIndex(ev.target.id);
  }
  const deleteBook = (bookId) => {    
    BookService.delete(bookId, token)
    .then(response => {
        // console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
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
    <>
      <div className="list row">
        <div className="col-md-12">
          <div className="row pr-3">
            <div className="col-md-9">
              <h4 className="font-semibold">Book List</h4>
            </div>
            <div className="col-md-1">
              <h5>
                <button
                  className="border btn btn-sm"
                  onClick={refreshList}
                >
                  All
                </button>
              </h5>
            </div>
            <div className="col-md-1">
              <h5>
                <button
                  className="border btn btn-sm"
                  onClick={getNewBooks}
                >
                  New
                </button>
              </h5>
            </div>
            <div className="col-md-1">
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
          <BookTable data={books} onDelete={deleteBook}/>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllBooks}
          >
            Remove All
          </button>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-12">
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
    </>
  );
}


export default BookList;