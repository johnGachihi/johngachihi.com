import {ProjectSummary} from "../../api/project";
import ListItem, {LoadingListItem} from "./ListItem";
import styled from "@emotion/styled";

type Props = {
  projects?: ProjectSummary[],
  isLoading?: boolean,
  error?: Error,
}

// TODO: Empty state
function List({projects, isLoading = false, error}: Props) {
  if (isLoading) {
    return (
      <ProjectList>
        <LoadingListItem/>
        <LoadingListItem/>
        <LoadingListItem/>
      </ProjectList>
    )
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <ProjectList>
      {projects?.map(project => (<ListItem {...project} key={project.id}/>))}
    </ProjectList>
  )
}

const ProjectList = styled.div`
  > * {
    margin-bottom: 16px;
  }
`

export default List