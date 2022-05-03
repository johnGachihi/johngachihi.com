import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./components/page-layout/PageLayout";
import Projects from "./pages/projects/Projects";
import Project from "./pages/projects/Project";
import BlogList from "./pages/blog/BlogList";

function App() {
  return (
    <Routes>
      <Route index element={<Home/>}/>
      <Route element={<PageLayout/>}>
        <Route path="blog" element={<BlogList/>}/>
        <Route path="projects" element={<Projects/>}/>
        <Route path="projects/:slug" element={<Project/>}/>
      </Route>
    </Routes>
  );
}

export default App;
