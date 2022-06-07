/** @jsxImportSource @emotion/react */
import React from "react";
import { useParams } from "react-router-dom";
import ProjectContent from "../components/project/ProjectContent";

function Project() {
  const { slug } = useParams()

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ProjectContent slug={slug!} />
    </React.Suspense>
  )
}

export default Project