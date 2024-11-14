import { ListItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { usePosts } from "../../hooks/usePosts";
import ProfilePostCard from "./ProfilePostCard";

export default function Posts() {
  const { posts, loading, error, page, totalPages, fetchPosts, cleanup } =
    usePosts();

  useEffect(() => {
    const load = async () => {
      await fetchPosts({ context: "own" });
    };
    load();
    return cleanup;
  }, [fetchPosts, cleanup]);

  const handlePageChange = (event, pageNum) => {
    fetchPosts({ context: "own", pageNum });
  };

  return (
    <Grid container spacing={3} sx={{ px: 2 }}>
      {posts?.map((post) => (
        <Grid size={{ md: 3 }}>
          <ListItem sx={{ px: 0 }}>
            <ProfilePostCard blogPost={post} />
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
}
