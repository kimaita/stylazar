import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "./SinglePostCard";

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
        onClick={() => onAuthorClick(author.id)}
      >
        <Avatar
          // key={index}
          alt={author.name}
          src={author.avatar_links.thumbnail}
          sx={{ width: 32, height: 32 }}
        />
        <Typography variant="caption">{author.name}</Typography>
      </Box>
      <Typography variant="caption">{date_published}</Typography>
    </Box>
  );
}

export default function FeedPostCard({ blogPost }) {
  const navigate = useNavigate();

  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  return (
    <PostCard
      blogPost={blogPost}
      footer={
        <CardFooter
          author={blogPost.author}
          date_published={new Date(blogPost.published_at).toLocaleDateString()}
          onAuthorClick={handleAuthorClick}
        />
      }
    />
  );
}
