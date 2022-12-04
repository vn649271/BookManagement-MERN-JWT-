import React, { useState, useEffect } from "react";
import BookManagementService from "../services/book.service";
import { Link } from "react-router-dom";

const BookList = props => {
  const { token } = props;
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState("");
  const [currentClassName, setCurrentClassName] = useState("list-group-item");

  useEffect(() => {
    retrieveBooks();
  }, [books]);

  const retrieveBooks = () => {
    BookManagementService.getAll(token)
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

    </div>
  );
}

      // <div className="col-md-6">
      //   {currentIndex !== ""? (
      //     <div>
      //       <h4>Book</h4>
      //       <div>
      //         <label>
      //           <strong>Title:</strong>
      //         </label>{" "}
      //         {books[currentIndex.replace("book_", "") - 0].title}
      //       </div>
      //       <div>
      //         <label>
      //           <strong>Description:</strong>
      //         </label>{" "}
      //         {books[currentIndex.replace("book_", "") - 0].description}
      //       </div>
      //       <div>
      //         <label>
      //           <strong>Status:</strong>
      //         </label>{" "}
      //         {books[currentIndex.replace("book_", "") - 0].published_at ? "Published" : "Pending"}
      //       </div>

      //       <Link
      //         to={"/books/" + books[currentIndex.replace("book_", "") - 0].id}
      //         className="badge badge-warning"
      //       >
      //         Edit
      //       </Link>
      //     </div>
      //   ) : (
      //     <div>
      //       <br />
      //       <p>Please click on a Book...</p>
      //     </div>
      //   )}
      // </div>
export default BookList;