import {ListItem, Pagination} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useEffect} from "react";
import {usePosts} from "../../hooks/usePosts";
import OwnPostCard from "./OwnPostCard";

export default function Posts() {
  const {posts, loading, error, page, totalPages, fetchPosts, cleanup} =
    usePosts();

  useEffect(() => {
    const load = async () => {
      await fetchPosts({context: "own"});
    };
    load();
    return cleanup;
  }, [fetchPosts, cleanup]);

  const handlePageChange = (event, pageNum) => {
    fetchPosts({context: "own", pageNum});
  };

  return (
    <>
      <Grid container spacing={2} columns={12}>
        {posts.map((post) => (
          <Grid size={{xs: 12, sm: 6, md: 3}} key={post.id}>
            <OwnPostCard
              blogPost={post}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{mt: 4, display: "flex", justifyContent: "center"}}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
}
