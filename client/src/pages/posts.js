import React from "react";
import { Button, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PostList from "../components/posts/PostList";

const Posts = () => {
  const classes = useStyles();
  return (
    <Container>
      <PostList></PostList>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  marginRight: {
    marginRight: 20,
  },
  route: {
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    marginRight: 20,
    fontSize: 20,
  },
}));

export default Posts;
