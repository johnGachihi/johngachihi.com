/** @jsxImportSource @emotion/react */
import { ProjectSummary } from "../../api/project";
import useProjects from "./useProjects";
import { useMemo } from "react";
import PostListItem from "../post-list/PostListItem";
import { css } from "@emotion/react";

type Props = { _projects?: ProjectSummary[] }

function ProjectList({ _projects }: Props) {
  const { data } = useProjects(!_projects)

  const projects = useMemo(
    () => _projects ?? data,
    [_projects, data]
  )

  return (
    <div>
      {projects?.map(({ startedAt, tags, ...project }) => (
        <PostListItem
          css={css`margin-bottom: 16px`}
          {...project}
          date={startedAt}
          tags={tags ?? []}
          key={project.id}
        />
      ))}
    </div>
  )
}

export default ProjectList