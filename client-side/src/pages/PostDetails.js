import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CardMedia,
  Typography,
  Button,
  Container,
  Skeleton,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack,
  Divider,
  styled,
  Box,
  Avatar,
  Paper,
} from "@mui/material";
import { usePosts } from "../hooks/usePosts";
import banner from "../assets/pic-about-01.jpg";
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ShareSharp,
  BookmarkAddOutlined,
  BookmarkOutlined,
  ModeEditOutlined,
  ArrowBack,
} from "@mui/icons-material";
import PostDetail from "../components/PostDetailView";
import { useAuth } from "../hooks/useAuth";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPostById, loading, error } = usePosts();
  const [post, setPost] = useState(null);
  const { user } = useAuth();

  useEffect(
    () => async () => {
      const post = await fetchPostById(id);
      setPost(post);

      return () => {
        setPost(null);
      };
    },
    [fetchPostById, id]
  );

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back to Posts
        </Button>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back to Posts
        </Button>

        {user?.id === post?.author.user_id && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ModeEditOutlined />}
            onClick={() => {
              navigate(`/posts/${post?.id}/edit`);
            }}
          >
            Edit
          </Button>
        )}
      </Stack>
      {loading ? (
        <>
          <Skeleton variant="text" height={60} width="80%" />
          <Skeleton variant="text" height={20} width="50%" sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={360} width="100%" />
        </>
      ) : (
        <>
          <PostDetail post={post} />
          <Box sx={{ my: 4, mx: 2 }}>
            <Stack direction="row" spacing={3}>
              <ThumbUpAltOutlined />
              <ThumbDownAltOutlined />
              <BookmarkAddOutlined />
              <ShareSharp />
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography variant="h4">Comments</Typography>
            <List>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="User Man"
                  secondary="Okay, whatever lorem is"
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="User Man"
                  secondary="I like lorem ipsum"
                />
              </ListItem>
            </List>
          </Box>
        </>
      )}
    </Container>
  );
};

export default PostDetailPage;
