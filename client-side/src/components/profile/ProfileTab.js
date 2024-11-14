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

function AccountInfo({user}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar src={user?.avatar_links.thumbnail} sx={{ height: "100px", width: "100px" }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{user?.name}</Typography>
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

function AccountDetailsForm({user}) {
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
          <AccountInfo user={user}/>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
        <Stack spacing={3}>
        <AccountDetailsForm user={user} />
        <UpdatePasswordForm />
        </Stack>
          
        </Grid>
      </Grid>
    </Stack>
  );
}
