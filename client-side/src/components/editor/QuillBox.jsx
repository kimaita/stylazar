import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import {Box} from "@mui/material";

const formats = [
  "bold",
  "italic",
  "underline",
  "code",
  "link",
  "header",
  "list",
  "bullet",
  "code-block",
  "image",
];

const modules = {
  toolbar: [
    [{header: [2, 3, 4, false]}],
    [{list: "ordered"}, {list: "bullet"}],
    ["bold", "italic", "underline", "link", "image", "code-block"],
  ],
};

const QuillBox = ({body, setContent}) => {
  return (
    <Box>
      <ReactQuill
        theme="bubble"
        value={body}
        onChange={setContent}
        modules={modules}
        formats={formats}
        style={{
          height: "400px",
          marginBottom: "50px",
        }}
      />
    </Box>);
}

export default QuillBox;