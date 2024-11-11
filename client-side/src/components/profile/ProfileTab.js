// import * as React from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import {
  Box,
  Button,
  Card,
  Avatar,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  OutlinedInput,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid2";
const user = {
  name: "Sofia Rivers",
  email: "sof@provider.com",
  avatar: "/assets/avatar.png",
  jobTitle: "Senior Developer",
  country: "USA",
  city: "Los Angeles",
  timezone: "GTM-7",
};

function AccountInfo() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: "80px", width: "80px" }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.email}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider sx={{ my: 2 }} />
      <CardActions>
        <Button fullWidth variant="outlined">
          Update picture
        </Button>
      </CardActions>
    </Card>
  );
}

export function AccountDetailsForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card variant="outlined">
        <CardHeader title="Personal Details" />
        <Divider sx={{ mb: 3, mt: 1 }} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ sm: 5, xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="name">Name</FormLabel>
                <TextField required defaultValue={user?.name} name="name" />
              </FormControl>
            </Grid>
            <Grid size={{ sm: 7, xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField defaultValue={user?.email} name="email" required />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <TextField
                  id="bio"
                  name="bio"
                  defaultValue={user?.bio}
                  variant="outlined"
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="socials">Social Links</FormLabel>
                <TextField
                  id="socials"
                  name="socials"
                  variant="outlined"
                  helperText="e.g. x: https://x.com/username"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mt: 3, justifyContent: "flex-end" }}>
          <Button variant="outlined">Update details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
function UpdatePasswordForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card variant="outlined">
        <CardHeader title="Update password" />
        <Divider sx={{ my: 2 }} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="current_pwd">Current Password</FormLabel>
                <TextField
                  id="current_pwd"
                  name="password"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid size={{ sm: 5, xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="new_pwd">New Password</FormLabel>
                <TextField required id="new_pwd" name="new_password" />
              </FormControl>
            </Grid>
            <Grid size={{ sm: 7, xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="confirm_pwd">Confirm Password</FormLabel>
                <TextField id="confirm_pwd" required />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined">Update</Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default function Profile({ user }) {
  return (
    <Stack spacing={3} sx={{p:1}}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <AccountInfo />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
        <Stack spacing={3}>
        <AccountDetailsForm />
        <UpdatePasswordForm />
        </Stack>
          
        </Grid>
      </Grid>
    </Stack>
  );
}

{
  /* <Card>
<Box sx={{ mb: 1 }}>
<Typography level="title-md">Personal info</Typography>
<Typography level="body-sm">Edit your profile information</Typography>
</Box>
<Divider />
<Stack
direction="row"
spacing={3}
sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
>
<Stack direction="column" spacing={1}>
  <CardMedia>
    <img
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
      srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
      loading="lazy"
      alt=""
    />
  </CardMedia>
  <IconButton
    aria-label="upload new picture"
    size="sm"
    variant="outlined"
    color="neutral"
    sx={{
      bgcolor: "background.body",
      position: "absolute",
      zIndex: 2,
      borderRadius: "50%",
      left: 100,
      top: 170,
      boxShadow: "sm",
    }}
  >

  </IconButton>
</Stack>
<Stack spacing={2} sx={{ flexGrow: 1 }}>
  <Stack spacing={1}>
    <FormLabel>Name</FormLabel>
    <FormControl
      sx={{
        display: { sm: "flex-column", md: "flex-row" },
        gap: 2,
      }}
    >
      <Input size="sm" placeholder="Name" sx={{ flexGrow: 1 }} />
    </FormControl>
  </Stack>
  <Stack direction="row" spacing={2}>
    <FormControl sx={{ flexGrow: 1 }}>
      <FormLabel>Email</FormLabel>
      <Input
        size="sm"
        type="email"
        startAdornment={<EmailRoundedIcon />}
        placeholder="email"
        defaultValue="siriwatk@test.com"
        sx={{ flexGrow: 1 }}
      />
    </FormControl>
  </Stack>
</Stack>
</Stack>
<Stack
direction="column"
spacing={2}
sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
>
<Stack direction="row" spacing={2}>
  <Stack direction="column" spacing={1}>
    <CardMedia>
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
        loading="lazy"
        alt=""
      />
    </CardMedia>
    <IconButton
      aria-label="upload new picture"
      size="sm"
      variant="outlined"
      color="neutral"
      sx={{
        bgcolor: "background.body",
        position: "absolute",
        zIndex: 2,
        borderRadius: "50%",
        left: 85,
        top: 180,
        boxShadow: "sm",
      }}
    >
    </IconButton>
  </Stack>
  <Stack spacing={1} sx={{ flexGrow: 1 }}>
    <FormLabel>Name</FormLabel>
    <FormControl
      sx={{
        display: {
          sm: "flex-column",
          md: "flex-row",
        },
      }}
    >
      <Input size="sm" placeholder="Name" />
    </FormControl>
  </Stack>
</Stack>
<FormControl sx={{ flexGrow: 1 }}>
  <FormLabel>Email</FormLabel>
  <Input
    size="sm"
    type="email"
    startAdornment={<EmailRoundedIcon />}
    placeholder="email"
    defaultValue="user@test.com"
    sx={{ flexGrow: 1 }}
  />
</FormControl>
</Stack>
<CardMedia sx={{ borderTop: "1px solid", borderColor: "divider" }}>
<CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
  <Button size="sm" variant="outlined" color="neutral">
    Cancel
  </Button>
  <Button size="sm" variant="solid">
    Save
  </Button>
</CardActions>
</CardMedia>
</Card> */
}
