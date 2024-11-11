import {
  EditNoteOutlined,
  PublicOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import banner from "../../assets/pic-about-01.jpg";

const posts = [
  {
    title: "A post title",
    excerpt:
      "Aliquam non bibendum mi. Aliquam erat volutpat. Maecenas et orci lobortis, semper risus vitae, suscipit ipsum. Donec sed nisi lacus. Nunc auctor dignissim turpis, eget congue eros.",
    banner_image: "",
    updated_at: new Date().toLocaleString(),
    is_published: true,
    is_hidden: false,
  },
  {
    title: "A post title",
    excerpt:
      "Aliquam non bibendum mi. Aliquam erat volutpat. Maecenas et orci lobortis, semper risus vitae, suscipit ipsum. Donec sed nisi lacus. Nunc auctor dignissim turpis, eget congue eros.",
    banner_image: "",
    updated_at: new Date().toLocaleString(),
    is_published: false,
    is_hidden: true,
  },
  {
    title: "A post title",
    excerpt:
      "Aliquam non bibendum mi. Aliquam erat volutpat. Maecenas et orci lobortis, semper risus vitae, suscipit ipsum. Donec sed nisi lacus. Nunc auctor dignissim turpis, eget congue eros.",
    banner_image: "",
    updated_at: new Date().toLocaleString(),
    is_published: true,
    is_hidden: true,
  },
];

function ChipStatus({ status }) {
  let icon, label, color;
  switch (status) {
    case "hidden":
      icon = <VisibilityOffOutlined />;
      label = "Hidden";
      color = "secondary";
      break;
    case "draft":
      icon = <EditNoteOutlined />;
      label = "Draft";
      color = "primary";
      break;
    default:
      icon = <PublicOutlined />;
      label = "Published";
      color = "success";
  }
  return (
    <Chip
      size="small"
      icon={icon}
      label={label}
      color={color}
      variant="outlined"
      sx={{ p: 0.6 }}
    />
  );
}

function CardPost({ post }) {
  return (
    <Card sx={{ p: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <CardMedia
              component="img"
              height="100%"
              image={post.banner_image || banner}
              alt="Post banner"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 9 }} sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h4">{post?.title}</Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "text.secondary", my: 1 }}
              >
                {post?.excerpt}
              </Typography>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <ChipStatus
                  status={
                    post?.is_published
                      ? post?.is_hidden
                        ? "hidden"
                        : "public"
                      : "draft"
                  }
                />
                <Typography variant="caption">{post?.updated_at}</Typography>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
export default function Posts() {
  return (
    <Grid container spacing={2} sx={{ px: 2 }}>
      {posts.map((post) => (
        <Grid size={{md:6}}>
          <ListItem sx={{ px: 0 }}>
            <CardPost post={post} />
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
}
