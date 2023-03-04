import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostListLayout from "~/components/post-list-layout";
import { ProjectCard, links as projectCardLinks } from "~/components/project/project-card";
import { fetchProjectSummaries } from "~/models/project.server";

type LoaderData = {
  projects: Awaited<ReturnType<typeof fetchProjectSummaries>>;
};
export const loader: LoaderFunction = async () => {
  return json({ projects: await fetchProjectSummaries() });
};

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Some projects I've worked on"
  }
}

export function links() {
  return [...projectCardLinks()]
}

export default function Projects() {
  const { projects } = useLoaderData<LoaderData>();

  return (
    <PostListLayout title="Projects">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-8">
        {projects?.map((project) => (
          <ProjectCard className="col-span-4 mb-10" project={project} key={project.id} />
        ))}
      </div>
    </PostListLayout>
  );
}
