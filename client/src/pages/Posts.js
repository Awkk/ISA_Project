import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostList from "../components/Posts/PostList";
import PostInput from "../components/Posts/PostInput";

const Posts = () => {
  const [reload, setReload] = useState(false);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <PostList reload={reload} setReload={setReload}></PostList>
      <PostInput setReload={setReload}></PostInput>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
}));

export default Posts;
