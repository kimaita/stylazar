import {
  AccountBox,
  DriveFileRenameOutline,
  Logout,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  Toolbar,
  Tooltip,
  FormControl,
  InputAdornment,
  InputBase,
  OutlinedInput,
  useScrollTrigger,
} from "@mui/material";

import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import SitemarkIcon from "./SitemarkIcon";

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            {/* <SearchIcon fontSize="small" /> */}
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backdropFilter: "blur(24px)",
  borderBottom: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
};

export default function AppAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    // setAnchorEl(event.currentTarget);
    // user){
    navigate("/profile");
    handleMenuClose();
    // }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    signout();
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuList>
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          enableColorOnDark
          sx={{
            bgcolor: "transparent",
            backgroundImage: "none",
          }}
        >
          <StyledToolbar>
            <SitemarkIcon />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "flex" }, gap: 3, alignItems: "center" }}>
              {user ? (
                <Button
                  color="success"
                  variant="outlined"
                  size="small"
                  startIcon={<DriveFileRenameOutline />}
                  component={Link}
                  to="/posts/new"
                >
                  Write
                </Button>
              ) : (
                <></>
              )}
              <ColorModeIconDropdown />

              {/* <Box sx={{ display: { xs: "none", md: "flex" } }}> */}
              <Tooltip title="Account">
                <Avatar
                  alt={user?.name}
                  src={user?.avatar_links.thumbnail}
                  onClick={handleProfileMenuOpen}
                />
              </Tooltip>
              {/* </Box> */}
            </Box>
            {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </StyledToolbar>
        </AppBar>
      </HideOnScroll>
      {/* {renderMobileMenu} */}
      {renderMenu}
    </Box>
  );
}
