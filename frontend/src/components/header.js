import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import product from "../assets/images/pp.png";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserDetails, logout } from "../redux/actions/userActions";

const pages = ["Products", "Jobs", "Mentors", "About"];
const settings = ["Profile", "MyJobs", "MyProducts"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  color: "black",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "10    0%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(getUserDetails());
  }, []);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const handlelogout = () => {
    const result = window.confirm("Do You Want to Logout ?");
    if (!result) return;
    result && dispatch(logout());
    navigate("/");
  };
  return (
    <AppBar
      position='fixed'
      style={{
        background: "#FFFEFC",
        backdropFilter: "blur(5px)",
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img
              src={product}
              className='App-logo'
              alt='logo'
              height={50}
              width={50}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='info'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign='center'
                    component={NavLink}
                    to={"/" + page}
                    sx={{
                      my: 0.5,
                      color: "black",
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={NavLink}
                to={"/" + page}
                key={page}
                value={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* <Box sx={{ flexGrow: 0.1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{
                  border: "1px solid black",
                  color: "black",
                  paddingLeft: 2,
                }}
                placeholder='Search…'
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box> */}
          {!userInfo && (
            <Box sx={{ flexGrow: 0.1, display: "flex", flexDirection: "row" }}>
              <Box sx={{ flexGrow: 0.1 }}>
                <Button
                  variant='contained'
                  size='small'
                  component={NavLink}
                  to={"/loggin"}
                  color='warning'
                >
                  Login
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0.1 }}>
                <Button
                  variant='contained'
                  size='small'
                  component={NavLink}
                  to={"/register"}
                  color='success'
                >
                  SignUp
                </Button>
              </Box>
            </Box>
          )}
          {userInfo && user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userInfo.user?.firstName}
                    src={`http://192.168.200.122:5000/${
                      user?.avtar || "uploads/avt1650979607692A861.png"
                    } `}
                    style={{
                      border: "2px solid  #DC5425",
                      alignSelf: "center",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    component={Link}
                    to={"/" + setting}
                    //onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key='Logout' onClick={handlelogout}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
