import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { baseurl } from "../../constant/api";
import PostListItem from "./PostListItem";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(`${baseurl}/post`);
      const json = await response.json();
      console.log(json);
      setPosts(json);
    };
    getAllPosts();
  }, []);

  return (
    <Container className={classes.container}>
      {posts.map((post) => (
        <PostListItem key={post.post_id} post={post}></PostListItem>
      ))}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
    container: {
      flexGrow: 1,
    },
  }));


export default PostList;
