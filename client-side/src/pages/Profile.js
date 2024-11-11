// import * as React from "react";
import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import Activity from "../components/profile/ActivityTab";
import Comments from "../components/profile/CommentsTab";
import Posts from "../components/profile/PostsTab";
import Profile from "../components/profile/ProfileTab";
import Saves from "../components/profile/SavesTab";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography variant="h2" sx={{ my: 2 }}>
            Account
          </Typography>
        </Box>
        <Box sx={{ px: 1, borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons
            allowScrollButtonsMobile
            aria-label="user account tabs"
            centered={!isSmallScreen}
            variant={isSmallScreen ? "scrollable" : "standard"}
          >
            <Tab label="Profile" {...allyProps(0)} />
            <Tab label="Posts" {...allyProps(1)} />
            <Tab label="Activity" {...allyProps(2)} />
            <Tab label="Comments" {...allyProps(3)} />
            <Tab label="Saved" {...allyProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Profile />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Posts />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Activity />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Comments />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Saves />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
