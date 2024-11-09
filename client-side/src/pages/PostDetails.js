import React from "react";
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
import usePostDetails from "../hooks/usePostDetails";
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

const PostContentTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Varela, sans-serif",
  fontSize: "1.1rem",
}));

const PostTitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Lora, sans-serif",
}));

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

const placeholder_byline =
  "Quisque scelerisque, sem ultrices finibus pretium, eros ipsum tristique magna, nec condimentum lacus odio at neque. Suspendisse tellus dui, sagittis vitae lobortis sit amet, blandit sed quam. Nulla lectus mauris, hendrerit ac augue.";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = usePostDetails(id);
  const { user } = useAuth();

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
