import "./createpost.css";
import React, { useState } from 'react';

export default function CreatePost() {
  return (
    <div className="createpost">
        <img
            className="createImg"
            src="https://images.pexels.com/photos/28927824/pexels-photo-28927824/free-photo-of-abstract-artistic-image-of-birch-tree-forest.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
        />
        <form className="createForm">
        <div className="createFormGroup">
          <label htmlFor="fileinput">
            <i className="createFormIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileinput" style={{display: "none"}} />
          <input
            type="text"
            placeholder="Title"
            className="createInput"
            autoFocus={true}
          />
        </div>
        <div className="createFormGroup">
          <textarea
          placeholder="Tell your story..."
          type="text"
          className="createInput createText"
          ></textarea>
        </div>
        <button className="createSubmit">Publish</button>
      </form>
    </div>
  )
}


