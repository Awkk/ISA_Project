import React, { useContext, useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostContent from "../components/PostDetail/PostContent";
import CommentList from "../components/PostDetail/CommentList";
import CommentInput from "../components/PostDetail/CommentInput";
import { UserContext } from "../context/UserContext";

const PostDetail = ({ match }) => {
  const [reload, setReload] = useState(false);
  const user = useContext(UserContext);

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <PostContent
        user_id={user.user_id}
        post_id={match.params.id}
        reload={reload}
        setReload={setReload}
      />
      <CommentList
        user_id={user.user_id}
        post_id={match.params.id}
        reload={reload}
        setReload={setReload}
      />
      <CommentInput
        user_id={user.user_id}
        post_id={match.params.id}
        setReload={setReload}
      />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    paddingTop: 15,
  },
  marginRight: {
    marginRight: 20,
  },
  route: {
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    marginRight: 20,
    fontSize: 20,
  },
}));

export default PostDetail;
