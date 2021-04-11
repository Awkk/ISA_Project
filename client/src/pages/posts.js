import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostList from "../components/posts/PostList";

const Posts = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <PostList></PostList>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
}));

export default Posts;
