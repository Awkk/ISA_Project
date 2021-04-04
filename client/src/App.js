import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar";
import register from "./pages/register";
import login from "./pages/login";
import posts from "./pages/posts";
import admin from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={posts}></Route>
        <Route path="/register" exact component={register}></Route>
        <Route path="/login" exact component={login}></Route>
        <Route path="/admin" exact component={admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
