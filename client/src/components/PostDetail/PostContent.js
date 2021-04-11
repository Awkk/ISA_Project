import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton, Link, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format } from "timeago.js";
import { baseurl } from "../../constant/api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const PostListItem = ({ user_id, post_id, reload, setReload }) => {
  const [post, setPost] = useState({});
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const user = useContext(UserContext);

  const classes = useStyles();
  const history = useHistory();
  const detailurl = `/post/${post.post_id}`;

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${baseurl}/post/${post_id}`, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      const json = await response.json();
      console.log(json);
      setPost(json);
      setNewContent(json.content);
    };
    getPost();
  }, [post_id, reload, user.accessToken]);

  const editPost = () => {
    setEditing((e) => !e);
  };
  const updatePost = async () => {
    try {
      const response = await fetch(`${baseurl}/post/${post.post_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
        body: JSON.stringify({
          content: newContent,
        }),
      });
      const responseJson = await response.json();

      if (response.status === 200) {
        setReload((reload) => !reload);
        setEditing((e) => !e);
      } else if (responseJson.error) {
        console.log(responseJson.error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deletePost = async () => {
    try {
      const response = await fetch(`${baseurl}/post/${post_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      });
      const responseJson = await response.json();

      if (response.status === 202) {
        history.push("/posts");
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
        <div className={classes.horizontal}>
          <div className={classes.username}>{post.username}</div>
          <div className={classes.time}>
            {format(post.createdate)}
            {post.modifydate !== post.createdate
              ? ` (${format(post.modifydate)})`
              : null}
          </div>
        </div>
        {editing ? (
          <textarea
            value={newContent}
            rows={4}
            onChange={(e) => {
              setNewContent(e.target.value);
            }}
          ></textarea>
        ) : (
          <div className={classes.content}>{post.content}</div>
        )}

        {user_id === post.user_id ? (
          <div className={classes.buttons}>
            {editing ? (
              <Button variant="contained" color="primary" onClick={updatePost}>
                Submit
              </Button>
            ) : null}
            <Button variant="contained" onClick={editPost}>
              {editing ? "cancel" : "edit"}
            </Button>
            <Button variant="contained" color="secondary" onClick={deletePost}>
              Delete
            </Button>
          </div>
        ) : null}
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
    margin: 10,
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
  content: {
    marginTop: 30,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
  },
  buttons: {
    marginTop: 30,
  },
}));

export default PostListItem;
