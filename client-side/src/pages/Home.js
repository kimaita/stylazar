import Container from "@mui/material/Container";
import AppAppBar from "../components/AppAppBar";
import Footer from "../components/Footer";
import { PostListContainer } from "../containers/PostListContainer";

export default function Home() {
  return (
    <div>
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <PostListContainer />
      </Container>
      <Footer />
    </div>
  );
}
