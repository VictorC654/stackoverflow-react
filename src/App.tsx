import React from "react";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import TopicList from "./pages/topics-page/components/topic-list";
import CreateQuestion from "./pages/create-question/create-question";
import TopicDetails from "./pages/topic-details/topic-details";
import UserProfile from "./pages/userprofile/UserProfile";
import UserEdit from "./pages/edit-user/edit-user";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace={true} />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="create-question" element={<CreateQuestion />} />
          <Route path="topics" element={<TopicList />} />
          <Route path="/topic-details/:id" element={<TopicDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit" element={<UserEdit />} />
        </Routes>
      </Layout>
    </Router>
  );
}