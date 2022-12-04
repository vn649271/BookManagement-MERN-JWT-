import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import AddBook from "./components/add-book.component";
import Book from "./components/book.component";
import BookList from "./components/book-list.component";


const Home = (props) => {

	const {userId, username, token} = props;

	return (
	  <div>
	    <nav className="navbar navbar-expand navbar-dark bg-dark">
	      <Link to={"/books"} className="navbar-brand">
	        BookManagement
	      </Link>
	      <div className="navbar-nav mr-auto">
	        <li className="nav-item">
	          <Link to={"/books"} className="nav-link">
	            Books
	          </Link>
	        </li>
	        <li className="nav-item">
	          <Link to={"/add"} className="nav-link">
	            Add
	          </Link>
	        </li>
	      </div>
	    </nav>

	    <div className="container mt-3">
	      <Routes>
	        <Route path="/" element={<BookList userId={userId} username={username} token={token}/>} />
	        <Route path="/books" element={<BookList userId={userId} username={username} token={token}/>} />
	        <Route path="/add" element={<AddBook userId={userId} username={username} token={token}/>}/>} />
	        <Route path="/books/:id" element={<Book userId={userId} username={username} token={token}/>}/>} />
	      </Routes>
	    </div>
	  </div>
	);
}

export default Home;