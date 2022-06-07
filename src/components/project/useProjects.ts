import { useQuery } from "react-query";
import { fetchProjects, ProjectSummary } from "../../api/project";

function useProjects(enabled = true) {
  return useQuery<ProjectSummary[], Error>(
    'projects',
    fetchProjects,
    {
      staleTime: 2 * 60 * 1000,
      enabled,
      suspense: true
    }
  )
}

export default useProjects;