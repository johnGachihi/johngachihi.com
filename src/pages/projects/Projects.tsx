import {h6} from "../../style/text"
import styled from "@emotion/styled";
import ProjectList from "../../components/projects/List";

function Projects() {
  return (
    <Content>
      <Title>Projects</Title>
      <ProjectList projects={[
        {
          title: "Kotlin Symbol Processing (KSP) Example",
          slug: "",
          startedAt: "21 Jan 2022",
          tags: ["Kotlin", "KSP", "CodeGen"]
        },
        {
          title: "Kotlin Symbol Processing (KSP) Example Kotlin Symbol Processing (KSP) Example",
          slug: "",
          startedAt: "21 Jan 2022",
          tags: ["Kotlin", "KSP", "CodeGen"]
        },
        {
          title: "Kotlin Symbol Processing (KSP) Example",
          slug: "",
          startedAt: "21 Jan 2022",
          tags: ["Kotlin", "KSP", "CodeGen"]
        },
        {
          title: "Kotlin Symbol Processing (KSP) Example",
          slug: "",
          startedAt: "21 Jan 2022",
          tags: ["Kotlin", "KSP", "CodeGen"]
        },
      ]} />
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