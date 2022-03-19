import {useQuery} from "react-query";
import {fetchProjects, ProjectSummary} from "../../api/project";

function useProjects() {
  return useQuery<ProjectSummary[], Error>(
    'projects',
    fetchProjects,
    {staleTime: 2 * 60 * 1000}
  )
}

export default useProjects;