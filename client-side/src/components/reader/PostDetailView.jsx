import {
  Avatar,
  Box,
  CardMedia,
  Chip,
  Divider,
  Fade,
  Paper,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import formatDate from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PostContentTypography = styled(Typography)(({ theme }) => ({
  // fontFamily: "Varela, sans-serif",
  fontSize: "1.1rem",
}));

const PostTitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Lora, sans-serif",
}));

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
  ScrollTop.propTypes = {
    children: PropTypes.element,
  };
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

export default function PostDetail({ post }) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: { sm: 2, md: 4 } }}>
      <PostTitleTypography variant="h1" gutterBottom>
        {post?.title}
      </PostTitleTypography>
      <PostContentTypography
        variant="subtitle2"
        mb={2}
        sx={{ fontStyle: "italic" }}
      >
        {post?.byline}
      </PostContentTypography>

      <Typography variant="overline">
        {formatDate(post?.published_at)}
      </Typography>
      <Divider sx={{ my: 1 }} />

      {post?.banner_image && (
        <CardMedia
          component="img"
          height="256"
          image={post.banner_image.original}
          alt="Post Header"
          sx={{ my: 3 }}
        />
      )}

      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Chip
          variant="outlined"
          size="medium"
          color="primary"
          onClick={() => navigate(`/authors/${post?.author.user_id}`)}
          avatar={
            <Avatar
              alt={post?.author.name}
              src={post?.author.avatar_links?.thumbnail}
            />
          }
          label={post?.author.name}
        />
      </Stack>
      {post?.tags && (
        <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      )}

      <Box sx={{ my: 3 }} dangerouslySetInnerHTML={{ __html: post?.body }} />
    </Paper>
  );
}