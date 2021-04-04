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
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 20,
  },
  route: {
    flexGrow: 1,
  },
}));

const Navbar = ({ isAuthed, setIsAuthed }) => {
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
          <div className={classes.title}>
            <Button component={Link} to="/">
              <Typography variant="h4">Rebbit</Typography>
            </Button>
          </div>
          <div className={classes.route}>
            <Button component={Link} to="/admin" variant="text">
              Admin
            </Button>
          </div>
          {!isAuthed ? (
            <>
              <Button component={Link} to="/register" variant="text">
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
            <Button
              component={Link}
              to="/register"
              variant="text"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
