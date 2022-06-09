import React from 'react';
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./components/page-layout/PageLayout";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import WorkInProgress from "./pages/WorkInProgress";
import NotFound from "./pages/NotFound";
import Article from "./pages/Article";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import EmptyArticleList from "./pages/EmptyArticleList";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route index element={<Home/>}/>
        <Route element={<PageLayout/>}>
          <Route path="articles" element={<EmptyArticleList/>}/>
          <Route path="articles/:slug" element={<Article/>}/>
          <Route path="projects" element={<Projects/>}/>
          <Route path="projects/:slug" element={<Project/>}/>
          <Route path="other" element={<WorkInProgress/>}/>

          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
