import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { baseurl } from "../constant/api";
import PostListItem from "../components/posts/PostListItem";
import CommentList from "../components/PostDetail/CommentList";
import CommentInput from "../components/PostDetail/CommentInput";

const PostDetail = ({ match }) => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const userStorage =
      localStorage.getItem("rebbitAuth") ||
      sessionStorage.getItem("rebbitAuth");
    setUser(JSON.parse(userStorage));
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${baseurl}/post/${match.params.id}`);
      const json = await response.json();
      console.log(json);
      setPost(json);
    };
    getPost();
  }, []);

  return (
    <Container className={classes.container}>
      <PostListItem post={post} />
      <CommentList post_id={match.params.id} reload={reload}/>
      <CommentInput user_id={user.user_id} post_id={match.params.id} setReload={setReload}/>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    paddingTop: 15,
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

export default PostDetail;
