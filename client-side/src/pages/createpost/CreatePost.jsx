import axios from "axios";
import "./createpost.css";
import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import styles
import { Link, useLinkClickHandler } from "react-router-dom";
import { set } from "mongoose";


const modules = {
  toolbar: [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  [{ color: [] }, { background: [] } ],
  [{ size: [] }],
  [{ script:  "sub" }, { script:  "super" }],
  ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
  ["clean"] // removes formatting button
  ],
};

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newPost = { file, title, description, author };
    await axios.post("http://localhost:8000/v1/api/posts", newPost);
    setFile(null);
    setTitle("");
    setDescription("");
    setAuthor("");
  };

  return (
    <div className="createPost">
      <div className="createHeader">Create Post</div>
      <form className="createForm" onSubmit={handleFormSubmit}>
        <div className="createFormTitle">
          {file && (
            <img
              className="createFormImg"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}
          <label htmlFor="fileInput"><i className="createFormIcon fas fa-plus"></i></label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            className="createInput"
            placeholder="Title"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
          <ReactQuill
            theme="snow"
            className="createFormGroup"
            value={description}
            modules={modules}
            placeholder="Write something amazing..."
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className="createButton">
          <button className="createSubmit">
            <Link className="Link" to="/">Publish</Link>
          </button>
        </div>
      </form>
    </div>
  )
}


