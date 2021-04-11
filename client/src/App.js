import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Admin from "./pages/Admin";

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("rebbitAuth") ||
      sessionStorage.getItem("rebbitAuth");
    if (token) {
      setIsAuthed(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar isAuthed={isAuthed} setIsAuthed={setIsAuthed} />
      <Switch>
        <Route
          path="/register"
          exact
          render={(props) => <Register {...props} setIsAuthed={setIsAuthed} />}
        />
        <Route
          path="/login"
          exact
          render={(props) => <Login {...props} setIsAuthed={setIsAuthed} />}
        />
        <Route path="/post/:id" exact component={PostDetail} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/admin" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
