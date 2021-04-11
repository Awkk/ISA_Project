import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format } from "timeago.js";
import { UserContext } from "../../context/UserContext";
import { baseurl } from "../../constant/api";

const PostListItem = ({ post, setReload }) => {
  const user = useContext(UserContext);
  const classes = useStyles();

  const detailurl = `/post/${post.post_id}`;

  const vote = async (num) => {
    try {
      const response = await fetch(`${baseurl}/post/vote/${post.post_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
        body: JSON.stringify({
          user_id: user.user_id,
          value: num,
        }),
      });
      const responseJson = await response.json();

      if (response.status === 202) {
        setReload((reload) => !reload);
      } else if (responseJson.error) {
        console.log(responseJson.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper className={classes.container}>
      <div className={classes.voteSection}>
        <IconButton
          color="primary"
          aria-label="upvote"
          component="span"
          onClick={() => vote(1)}
        >
          <ExpandLessIcon />
        </IconButton>
        <div className={classes.voteNumber}>{post.vote}</div>
        <IconButton
          color="primary"
          aria-label="downvote"
          component="span"
          onClick={() => vote(-1)}
        >
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
