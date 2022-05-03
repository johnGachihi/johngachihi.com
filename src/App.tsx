import React from 'react';
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./components/page-layout/PageLayout";
import Projects from "./pages/projects/Projects";
import Project from "./pages/projects/Project";
import WorkInProgress from "./pages/WorkInProgress";

function App() {
  return (
    <Routes>
      <Route index element={<Home/>}/>
      <Route element={<PageLayout/>}>
        <Route path="blog" element={<WorkInProgress/>}/>
        <Route path="projects" element={<Projects/>}/>
        <Route path="projects/:slug" element={<Project/>}/>
        <Route path="other" element={<WorkInProgress/>}/>
      </Route>
    </Routes>
  );
}

export default App;
