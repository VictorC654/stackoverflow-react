import React from 'react';

import Layout from './components/layout/layout';
import Home from './pages/home/home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App(){
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Layout>
        </Router>
    );
};