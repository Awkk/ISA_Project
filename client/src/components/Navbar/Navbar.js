import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  marginRight: {
    marginRight: 20,
  },
  route: {
    flex: 1,
    flexDirection: "row",
  },
  username: {
    fontWeight: "bold",
    marginRight: 20,
    fontSize: 20,
  },
}));

const Navbar = ({ isAuthed, setIsAuthed }) => {
  const user = JSON.parse(
    localStorage.getItem("rebbitAuth") || sessionStorage.getItem("rebbitAuth")
  );

  const classes = useStyles();

  const logout = () => {
    setIsAuthed(false);
    localStorage.removeItem("rebbitAuth");
    sessionStorage.removeItem("rebbitAuth");
  };
  return (
    <AppBar position="static" className={classes.root} color="default">
      <Container>
        <Toolbar>
          <div className={classes.marginRight}>
            <Button component={Link} to="/posts">
              <Typography variant="h4">Rebbit</Typography>
            </Button>
          </div>
          <div className={classes.route}>
            <Button component={Link} to="/posts" variant="text">
              Posts
            </Button>

            <Button component={Link} to="/admin" variant="text">
              Admin
            </Button>
          </div>
          {!isAuthed ? (
            <>
              <Button
                component={Link}
                to="/register"
                variant="text"
                className={classes.marginRight}
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <div className={classes.username}>{user.username}</div>
              <Button
                component={Link}
                to="/login"
                variant="text"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
