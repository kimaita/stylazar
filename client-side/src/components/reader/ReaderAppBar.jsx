import {Button, Stack} from "@mui/material";
import {ArrowBack, ModeEditOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const ReaderAppBar = ({canEdit, post}) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Button
        startIcon={<ArrowBack/>}
        onClick={() => navigate("/")}
        sx={{mb: 2}}
      >
        Back to Posts
      </Button>

      {canEdit && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<ModeEditOutlined/>}
          onClick={() => {
            navigate(`/posts/${post?.id}/edit`);
          }}
        >
          Edit
        </Button>
      )}
    </Stack>);
}

export default ReaderAppBar;