import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import { CloudUpload, Close, Image as ImageIcon } from "@mui/icons-material";

const ImagePicker = ({
  maxSize = 2, // Maximum file size in MB
  acceptedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/heic",
    "image/heif",
    "image/heics",
  ],
  onImageSelect,
  onError,
  width = "100%",
  height = 200,
  defaultImage = null,
  showPreview = true,
}) => {
  const [image, setImage] = useState(defaultImage);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      onError?.(
        `Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`
      );
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      onError?.(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFile = async (file) => {
    if (!validateFile(file)) return;

    setIsLoading(true);
    try {
      const preview = URL.createObjectURL(file);
      setImage(preview);

      // Call the callback with both file and preview URL
      onImageSelect?.(file, preview);
    } catch (error) {
      onError?.(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageSelect?.(null, null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Paper
      sx={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        border: isDragging ? "2px dashed #2196f3" : "2px dashed #ccc",
        backgroundColor: isDragging ? "rgba(33, 150, 243, 0.1)" : "#fafafa",
        transition: "all 0.3s ease",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : image && showPreview ? (
        <Box sx={{ position: "relative", height: "100%" }}>
          <img
            src={image}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              clearImage();
            }}
          >
            <Close sx={{ color: "white" }} />
          </IconButton>
        </Box>
      ) : (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          {isDragging ? (
            <CloudUpload sx={{ fontSize: 48, color: "#2196f3" }} />
          ) : (
            <ImageIcon sx={{ fontSize: 48, color: "#ccc" }} />
          )}
          <Typography color="textSecondary" align="center">
            {isDragging ? (
              "Drop your image here"
            ) : (
              <>
                Drag and drop an image here, or click to select
                <br />
                <Typography variant="caption" color="textSecondary">
                  Accepted formats: {acceptedTypes.join(", ")}
                  <br />
                  Maximum size: {maxSize}MB
                </Typography>
              </>
            )}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};

export default ImagePicker;
