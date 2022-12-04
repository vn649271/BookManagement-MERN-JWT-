import React, { useState } from "react";
import BookManagementService from "../services/book.service";

const AddBook = props => {

  const {userId, username, token} = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState("");
  const [submitted, setSubmitted] = useState("");

  const onChangeTitle = e => {
    setTitle(e.target.value)
  }
  const onChangeDescription = e => {
    setDescription(e.target.value)
  }
  const saveBook = () => {
    var data = {title, description, token};

    BookManagementService.create(data)
      .then(response => {
        if (response.data.error) {
          alert(response.data.message);
          return;
        }
        setTitle(response.data.title)
        setDescription(response.data.description)
        setPublished(response.data.published);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const newBook = () => {
    setTitle("");
    setDescription("");
    setPublished(false);
    setSubmitted(false);
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBook}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <button onClick={saveBook} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default AddBook