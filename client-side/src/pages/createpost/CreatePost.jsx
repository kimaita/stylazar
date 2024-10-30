import "./createpost.css";
import React, { useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import styles
import { Link, useLinkClickHandler } from "react-router-dom";

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
  ["link", "image", "video"],
  ["clean"] // removes formatting button
  ],
};

export default function CreatePost() {
  const [value, setValue] = useState("");

  function handler() {
    console.log(value);
  }

  return (
    <div className="createPost">
      <div className="createHeader">Create Post</div>
      <form className="createForm">
        <div className="createFormTitle">
          <input
            type="text"
            className="createInput"
            placeholder="Title"
            autoFocus={true} />
        </div>
        <div>
          <ReactQuill
            theme="snow"
            className="createFormGroup"
            value={value}
            onChange={setValue}
            modules={modules}
            placeholder="Write something amazing..."
            />
        </div>
        <div className="createButton">
          <button className="createSubmit" onClick={handler}>
            <Link className="Link" to="/">Publish</Link>
          </button>
        </div>
      </form>
    </div>
  )
}


