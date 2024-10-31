import axios from "axios";
import "./createpost.css";
import React, { useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import styles
import { Link, useLinkClickHandler } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../components/context/Context";

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
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const Submithandler = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    };
    if(file) {
      const filename = Date.now() + file.name;
      const formData = new FormData();
      formData.append("name", filename);
      formData.append("file", file);
      newPost.pic = filename;
      try {
        const response = await axios.post("/api/upload", formData);
        window.location.replace("/post/" + response.data._id);
      } catch (err) {}
    }
    try {
      axios.post("/api/posts", newPost);
    } catch (err) {}
  };

  return (
    <div className="createPost">
      <div className="createHeader">Create Post</div>
      <form className="createForm" onSubmit={Submithandler}>
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
            onChange={setDescription}
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


