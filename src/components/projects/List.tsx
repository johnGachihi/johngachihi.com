import {ProjectSummary} from "../../api/project";
import ListItem, {LoadingListItem} from "./ListItem";
import styled from "@emotion/styled";

type Props = {
  projects?: ProjectSummary[],
  isLoading?: boolean,
}

// TODO: Empty state
function List({projects, isLoading = false}: Props) {
  if (isLoading) {
    return (
      <ProjectList>
        <LoadingListItem/>
        <LoadingListItem/>
        <LoadingListItem/>
      </ProjectList>
    )
  }

  return (
    <ProjectList>
      {projects?.map(project => (<ListItem {...project} />))}
    </ProjectList>
  )
}

const ProjectList = styled.div`
  > * {
    margin-bottom: 16px;
  }
`

export default List