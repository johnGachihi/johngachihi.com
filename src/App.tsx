import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./components/page-layout/PageLayout";
import Projects from "./pages/projects/Projects";

function App() {
  return (
    <Routes>
      <Route index element={<Home/>}/>
      <Route element={<PageLayout/>}>
        <Route path="projects" element={<Projects/>}/>
      </Route>
    </Routes>
  );
}

export default App;
