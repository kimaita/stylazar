import {
  ArrowBack,
  BookmarkAddOutlined,
  KeyboardArrowUp,
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
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import PostDetail from "../components/reader/PostDetailView";
import {useAuth} from "../hooks/useAuth";
import {usePosts} from "../hooks/usePosts";
import PropTypes from "prop-types";
import ReaderAppBar from "../components/reader/ReaderAppBar";
import PostReactions from "../components/reader/PostReactions";

function ScrollTop(props) {
  const {children} = props;

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
  ScrollTop.propTypes = {
    children: PropTypes.element,

  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{position: "fixed", bottom: 16, right: 16}}
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
  const {id} = useParams();
  const navigate = useNavigate();
  const {fetchPostById, loading, error} = usePosts();
  const [post, setPost] = useState(null);
  const {user} = useAuth();

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
      <Container maxWidth="md" sx={{mt: 4}}>
        <Button
          startIcon={<ArrowBack/>}
          onClick={() => navigate('/')}
          sx={{mb: 2}}
        >
          Back to Posts
        </Button>
        <Alert severity="error" sx={{mt: 2}}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{mt: 4}}>
      <ReaderAppBar
        canEdit={user?.id === post?.author.user_id}
        post={post}
      />

      {loading ? (
        <>
          <Skeleton variant="text" height={60} width="80%"/>
          <Skeleton variant="text" height={20} width="50%" sx={{mb: 2}}/>
          <Skeleton variant="rounded" height={360} width="100%"/>
        </>
      ) : (
        <>
          <PostDetail post={post}/>
          <PostReactions/>
          <Divider sx={{my: 3}}/>
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
              <KeyboardArrowUp/>
            </Fab>
          </ScrollTop>
        </>
      )}
    </Container>
  );
};

export default PostDetailPage;
