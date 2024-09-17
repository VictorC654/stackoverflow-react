import React from "react";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import TopicList from "./pages/topics-page/components/topic-list";
import CreateQuestion from "./pages/create-question/create-question";
import TopicDetails from "./pages/topic-details/topic-details";
import NoAnswer from "./pages/no-answer/no-answer";
import TopicNotFound from "./pages/topic-not-found/topic-not-found";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/userprofile/UserProfile";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="create-question" element={<CreateQuestion />} />
          <Route path="topics" element={<TopicList />} />
          <Route path="topic-details" element={<TopicDetails />} />
          <Route path="no-answer" element={<NoAnswer />} />
          <Route path="/notfound" element={<TopicNotFound />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}
