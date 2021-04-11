import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton, Link } from "@material-ui/core";
import { format } from "timeago.js";

const CommentListItem = ({ comment }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <div className={classes.horizontal}>
        <div className={classes.username}>{comment.username}</div>
        <div className={classes.time}>
          {format(comment.createdate)}
          {comment.modifydate !== comment.createdate
            ? ` (${format(comment.modifydate)})`
            : null}
        </div>
      </div>
      <div className={classes.content}>{comment.content}</div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    marginTop: 5,
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
  },
  time: { fontSize: 15 },
  content: {
    marginTop: 10,
  },
  voteSection: {
    marginLeft: 5,
  },
  voteNumber: {
    fontSize: 20,
    textAlign: "center",
  },
}));

export default CommentListItem;
