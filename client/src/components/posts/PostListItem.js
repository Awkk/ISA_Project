import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <div className={classes.voteSection}>
        <IconButton color="primary" aria-label="upvote" component="span">
          <ExpandLessIcon />
        </IconButton>
        <div className={classes.voteNumber}>0</div>
        <IconButton color="primary" aria-label="downvote" component="span">
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <div className={classes.body}>
        <div className={classes.title}>{post.title}</div>
        <div>{post.username}</div>
        <div>
          {format(post.createdate)}
          {post.modifydate !== post.createdate
            ? ` (${format(post.modifydate)})`
            : null}
        </div>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
  },
  voteSection: {
    marginLeft: 5,
  },
  voteNumber: {
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    margin: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
}));

export default PostListItem;
