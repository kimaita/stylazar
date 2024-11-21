import {useEffect, useState} from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ImagePicker from "../ImagePicker";
import QuillBox from "./QuillBox";

const Editor = ({post, onSave, isLoading}) => {
  const [title, setTitle] = useState("");
  const [body, setContent] = useState("");
  const [byline, setByline] = useState("");
  const [publish, setPublish] = useState(post?.is_published || false);
  const [checked, setChecked] = useState(false);
  const [bannerImage, setHeaderImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Initialize form when post data is provided
  const isEditMode = Boolean(post?.id);
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.body || "");
      setHeaderImage(post?.banner_image?.original || null);
    }
  }, [post]);


  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const createData = new FormData();
      createData.append("post_title", title);
      createData.append("post_body", body);
      createData.append("publish", publish);
      if (byline) createData.append("post_byline", byline);
      if (bannerImage) createData.append("banner_image", bannerImage);

      const update = isEditMode
        ? {
          ...(post?.title !== title && {title}),
          ...(post?.body !== body && {body}),
          ...(post?.byline !== byline && {byline}),
          ...{is_published: publish},
        }
        : createData

      await onSave(update);

      showNotification(
        `Post ${isEditMode ? "updated" : "created"} successfully!`
      );

      if (!isEditMode) {
        handleClear();
      }
    } catch (error) {
      showNotification(
        error.message || "An error occurred while saving the post",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePublicChange = (event) => {
    setPublish(event.target.checked);
  };

  const handleClear = () => {
    if (isEditMode) {
      setTitle(post.title || "");
      setContent(post.body || "");
      setByline(post.byline || "");
    } else {
      setTitle("");
      setContent("");
      setByline("");
      setHeaderImage(null);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setShowAlert(false);
  };

  const handleImageSelect = (file) => {
    setHeaderImage(file);
  };

  if (isLoading || loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <CircularProgress/>
        </Box>
      </Container>
    );
  }
  // TODO: length check <= 128
  // TODO: Publish / Save Draft
  // TODO: Publish -> Hidden?
  // TODO: Category, Tags, tldr

  return (
    <Container maxWidth="lg">
      <Box sx={{py: 4}}>
        <TextField
          fullWidth
          required
          label="Post Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{mb: 3}}
        />

        {/*<TextField*/}
        {/*  fullWidth*/}
        {/*  label="Byline"*/}
        {/*  variant="standard"*/}
        {/*  value={byline}*/}
        {/*  onChange={(e) => setByline(e.target.value)}*/}
        {/*  sx={{mb: 3}}*/}
        {/*/>*/}

        <ImagePicker
          onImageSelect={handleImageSelect}
          onError={(error) => showNotification(error, "error")}
          defaultImage={post?.banner_image?.thumbnail}
          disabled={loading}
        />

        <Box sx={{my: 5}}>
          <Typography variant="h3" gutterBottom>
            Body
          </Typography>
          <QuillBox body={body} setContent={setContent}/>
        </Box>

        <FormControlLabel
          label="Publish"
          control={
            <Checkbox
              checked={publish}
              onChange={handlePublicChange}
              inputProps={{"aria-label": "controlled"}}
              label="Publish"
            />
          }
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" onClick={handleClear}>
            {isEditMode ? "Reset" : "Clear"}
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleSave}
            disabled={!title || !body}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Editor;
