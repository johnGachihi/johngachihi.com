import { useQuery } from "react-query";
import { fetchProject, Project } from "../../api/project";

function useProject(slug?: string) {
  return useQuery<Project | null>(
    ["project", slug],
    () => fetchProject(slug!),
    {
      enabled: !!slug,
      staleTime: 2 * 60 * 1000
    }
  )
}

export default useProject