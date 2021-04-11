import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button } from "@material-ui/core";
import { format } from "timeago.js";
import { baseurl } from "../../constant/api";
import { UserContext } from "../../context/UserContext";

const CommentListItem = ({ user_id, comment, setReload }) => {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const user = useContext(UserContext);

  const classes = useStyles();

  const editComment = () => {
    setEditing((editing) => !editing);
  };
  const updateComment = async () => {
    try {
      const response = await fetch(`${baseurl}/comment/${comment.comment_id}`, {
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
  const deleteComment = async () => {
    try {
      const response = await fetch(`${baseurl}/comment/${comment.comment_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
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
      <div className={classes.horizontal}>
        <div className={classes.username}>{comment.username}</div>
        <div className={classes.time}>
          {format(comment.createdate)}
          {comment.modifydate !== comment.createdate
            ? ` (${format(comment.modifydate)})`
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
        <div className={classes.content}>{comment.content}</div>
      )}

      {user_id === comment.user_id ? (
        <div className={classes.buttons}>
          {editing ? (
            <Button variant="contained" color="primary" onClick={updateComment}>
              Submit
            </Button>
          ) : null}
          <Button variant="contained" onClick={editComment}>
            {editing ? "cancel" : "edit"}
          </Button>
          <Button variant="contained" color="secondary" onClick={deleteComment}>
            Delete
          </Button>
        </div>
      ) : null}
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
    justifyContent: "space-between",
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
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
}));

export default CommentListItem;
