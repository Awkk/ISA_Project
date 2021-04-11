import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { baseurl } from "../../constant/api";
import CommentListItem from "./CommentListItem";

const CommentList = ({ post_id, reload }) => {
  const [comments, setComments] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(`${baseurl}/comment/${post_id}`);
      const body = await response.json();
      body.sort((a, b) => new Date(a.createdate) - new Date(b.createdate));
      setComments(body);
    };
    getAllPosts();
  }, [post_id, reload]);

  return (
    <Container className={classes.container}>
      {comments.map((comment) => (
        <CommentListItem key={comment.comment_id} comment={comment} />
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
