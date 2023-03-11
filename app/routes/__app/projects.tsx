import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react"
import PostListLayout from "~/components/post-list-layout";
import { InViewObservingProjectList } from "~/components/project/in-view-observing-project-list";
import { links as projectCardLinks, SpotlightOnLongHoverProjectCard } from "~/components/project/project-card";
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

  const isLargeScreen = useMemo(() => {
    // Remix manenos
    // https://remix.run/docs/en/1.14.1/guides/constraints#md-document-guard
    if (typeof document !== "undefined")
      return window.matchMedia('(min-width: 1024px)').matches
  }, [])

  return (
    <PostListLayout title="Projects">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-8">
        {isLargeScreen
          ? (
            <>
              {projects?.map((project) => (
                <SpotlightOnLongHoverProjectCard
                  className="col-span-4 mb-10"
                  project={project}
                  key={project.id}
                />
              ))}
            </>
          ) : (
            <InViewObservingProjectList
              projects={projects}
              projectClassName="col-span-4 mb-10"
            />
          )
        }
      </div>
    </PostListLayout>
  );
}
