import { Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { baseurl } from "../../constant/api";
import CommentListItem from "./CommentListItem";
import { UserContext } from "../../context/UserContext";

const CommentList = ({ user_id, post_id, reload, setReload }) => {
  const [comments, setComments] = useState([]);
  const user = useContext(UserContext);

  const classes = useStyles();

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(`${baseurl}/comment/${post_id}`, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      const body = await response.json();
      body.sort((a, b) => new Date(a.createdate) - new Date(b.createdate));
      setComments(body);
    };
    getAllPosts();
  }, [post_id, reload, user.accessToken]);

  return (
    <Container className={classes.container}>
      {comments.map((comment) => (
        <CommentListItem
          key={comment.comment_id}
          user_id={user_id}
          comment={comment}
          setReload={setReload}
        />
      ))}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    marginTop: 20,
    padding: 0,
  },
}));

export default CommentList;
