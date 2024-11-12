import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import banner from "../assets/pic-about-01.jpg"

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
    paddingBottom: 4,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function CardFooter({ author, date_published, onAuthorClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
        onClick={()=>onAuthorClick(author.id)}
      >
        <Avatar
          // key={index}
          alt={author.name}
          src={author.profile_url}
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="caption">{author.name}</Typography>
      </Box>
      <Typography variant="caption">{date_published}</Typography>
    </Box>
  );
}

export default function PostCard({ blogPost, onPostClick, onAuthorClick }) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <SyledCard
      variant="outlined"
      onFocus={() => handleFocus(0)}
      onBlur={handleBlur}
      onClick={()=>onPostClick(blogPost.slug)}
      tabIndex={0}
      className={focusedCardIndex === 0 ? "Mui-focused" : ""}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image={blogPost.banner_image||banner}
        sx={{
          aspectRatio: "16 / 9",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <SyledCardContent>
        {/* Category */}
        {/* <Typography gutterBottom variant="caption" component="div">
          {blogPost.tag}
        </Typography> */}
        <Typography gutterBottom variant="h6" component="div">
          {blogPost.title}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
          {blogPost.excerpt}
        </StyledTypography>
      </SyledCardContent>
      <CardFooter
        author={blogPost.author}
        date_published={new Date(blogPost.published_at).toLocaleDateString()}
        onAuthorClick={onAuthorClick}
      />
    </SyledCard>
  );
}
