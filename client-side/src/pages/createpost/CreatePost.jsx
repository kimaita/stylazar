import "./createpost.css";
import React, { useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import styles
import DOMPurify from 'dompurify';

const modules = {
  toolbar: [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  [{ color: [] }, { background: [] } ],
  [{ size: [] }],
  [{ script:  "sub" }, { script:  "super" }],
  ["blockquote", "code-block"],
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

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

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
        <div className="createFormGroup">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            placeholder="Write something amazing..."
            />
          <div style={{ marginTop: '20px' }}>
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        </div>
        <button className="createSubmit">Publish</button>
      </form>
    </div>
  )
}


