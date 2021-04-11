import { TextField, Paper, Button } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { baseurl } from "../../constant/api";

const CommentArea = ({ user_id, post_id, setReload }) => {
  const [comment, setComment] = useState("");

  const classes = useStyles();

  const submitComment = async (e) => {
    if (comment) {
      e.preventDefault();
      console.log('user_id', user_id);
      
      try {
        const response = await fetch(`${baseurl}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            post_id: post_id,
            content: comment,
          }),
        });
        const responseJson = await response.json();

        if (response.status === 201) {
          console.log(responseJson);
          setReload((reload) => !reload);
          setComment("");
        } else if (responseJson.error) {
          console.log(responseJson.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Paper>
      <form className={classes.container}>
        <TextField
          className={classes.textField}
          label="New Comment"
          multiline
          rows={6}
          variant="outlined"
          value={comment}
          required
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={submitComment}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  textField: {
    width: "100%",
    alignSelf: "center",
  },
}));

export default CommentArea;
