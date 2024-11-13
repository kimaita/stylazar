import {
  ArrowBack,
  BookmarkAddOutlined,
  KeyboardArrowUp,
  ModeEditOutlined,
  ShareSharp,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostDetail from "../components/PostDetailView";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import PropTypes from "prop-types";

function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };
  //   ScrollTop.propTypes = {
  //     children: PropTypes.element,
  //     /**
  //      * Injected by the documentation to work in an iframe.
  //      * You won't need it on your project.
  //      */
  //     window: PropTypes.func,
  //   };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
ScrollTop.propTypes = {
  children: PropTypes.element,
};

const PostDetailPage = (props) => {
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
          <ScrollTop {...props}>
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUp />
            </Fab>
          </ScrollTop>
        </>
      )}
    </Container>
  );
};

export default PostDetailPage;
