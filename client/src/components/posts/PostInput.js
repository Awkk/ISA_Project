import { TextField, Paper, Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { baseurl } from "../../constant/api";
import { UserContext } from "../../context/UserContext";

const PostInput = ({ setReload }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useContext(UserContext);

  const classes = useStyles();

  const submitPost = async (e) => {
    if (content) {
      e.preventDefault();

      try {
        const response = await fetch(`${baseurl}/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken,
          },
          body: JSON.stringify({
            user_id: user.user_id,
            title: title,
            content: content,
          }),
        });
        const responseJson = await response.json();

        if (response.status === 201) {
          console.log(responseJson);
          setReload((reload) => !reload);
          setTitle("");
          setContent("");
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
          id="standard-basic"
          label="Title"
          variant="outlined"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          className={classes.textField}
          label="New Comment"
          multiline
          rows={6}
          variant="outlined"
          value={content}
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={submitPost}
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

export default PostInput;
