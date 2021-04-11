import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  const classes = useStyles();

  const detailurl = `/post/${post.post_id}`;

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
        <Link variant="h6" component={RouterLink} to={detailurl}>
          {post.title ?? ""}
        </Link>
        <div className={classes.username}>{post.username}</div>
        <div className={classes.time}>
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
  username: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
  },
  time: { fontSize: 15 },
}));

export default PostListItem;
