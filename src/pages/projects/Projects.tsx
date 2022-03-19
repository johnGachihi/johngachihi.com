import {h6} from "../../style/text"
import styled from "@emotion/styled";
import ProjectList from "../../components/projects/List";
import useProjects from "../../components/projects/useProjects";

function Projects() {
  const {isLoading, data, isError, error} = useProjects()

  return (
    <Content>
      <Title>Projects</Title>
      <ProjectList
        projects={data}
        isLoading={isLoading}
        error={isError ? error : undefined}
      />
    </Content>
  )
}

const Content = styled.div`
  @media (max-width: 600px) {
    margin-top: 16px;
  }
  
  @media (min-width: 600px) {
    margin-top: 32px;
  }
  
  @media (min-width: 900px) {
    margin-top: 56px;
  }
  
  @media (min-width: 1440px) {
    margin-top: 104px;
  }
`

const Title = styled.div`
  ${h6};
  margin-bottom: 16px;
  @media (min-width: 600px) {
    display: none
  }
`

export default Projects