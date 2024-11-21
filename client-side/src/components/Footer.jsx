import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

function Copyright() {
  return (
    <Typography variant="body2" sx={{color: 'text.secondary', mt: 1}}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://github.com/Geena254/stylazar-blog-website">
        Stylazar
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider/>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: {sm: 'center', md: 'left'},
          mb: 3
        }}
      >

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: {xs: 4, sm: 8},
            width: '100%',

          }}
        >
          <div>

            <Copyright/>
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{justifyContent: 'left', color: 'text.secondary'}}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/Geena254/stylazar-blog-website"
              aria-label="GitHub"
              sx={{alignSelf: 'center'}}
            >
              <GitHubIcon/>
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://x.com/"
              aria-label="X"
              sx={{alignSelf: 'center'}}
            >
              <TwitterIcon/>
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/"
              aria-label="LinkedIn"
              sx={{alignSelf: 'center'}}
            >
              <LinkedInIcon/>
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
