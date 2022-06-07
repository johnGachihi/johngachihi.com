import { useQuery } from "react-query";
import { fetchProject, Project } from "../../api/project";

function useProject(slug?: string, enabled = true) {
  return useQuery<Project | null>(
    ["project", slug],
    () => fetchProject(slug!),
    {
      enabled,
      staleTime: 2 * 60 * 1000,
      suspense: true
    }
  )
}

export default useProject