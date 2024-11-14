import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 3,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 2,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export default function PostCard({ blogPost, footer }) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const navigate = useNavigate();
  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <SyledCard
      variant="outlined"
      onFocus={() => handleFocus(0)}
      onBlur={handleBlur}
      onClick={() => handlePostClick(blogPost.slug)}
      tabIndex={0}
      className={focusedCardIndex === 0 ? "Mui-focused" : ""}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image={blogPost?.banner_image.thumbnail}
        sx={{
          aspectRatio: "16 / 9",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <SyledCardContent>
        <Typography gutterBottom variant="h6" component="div">
          {blogPost?.title}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary">
          {blogPost?.excerpt}
        </StyledTypography>
      </SyledCardContent>
      {footer}
    </SyledCard>
  );
}
