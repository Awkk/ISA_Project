import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { baseurl } from "../../constant/api";
import PostListItem from "./PostListItem";
import { UserContext } from "../../context/UserContext";

const PostList = ({ reload, setReload }) => {
  const [posts, setPosts] = useState([]);
  const user = useContext(UserContext);

  const classes = useStyles();

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(`${baseurl}/post`, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      const json = await response.json();
      console.log(json);
      if (json) {
        json.sort((a, b) => new Date(a.createdate) - new Date(b.createdate));
      }
      setPosts(json);
    };
    getAllPosts();
  }, [user.accessToken, reload]);

  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <PostListItem
          key={post.post_id}
          post={post}
          setReload={setReload}
        ></PostListItem>
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    marginTop: 20,
  },
}));

export default PostList;
