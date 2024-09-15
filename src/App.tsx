import React from 'react';
import Layout from './components/layout/layout';
import Home from './pages/home/home';
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import TopicList from "./pages/topic-list/topic-list";
import TopicDetails from "./pages/topic-details/topic-details";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
export default function App(){
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="topic-list" element={<TopicList />} />
                    <Route path="topic-details" element={<TopicDetails />} />
                </Routes>
            </Layout>
        </Router>
    );
};