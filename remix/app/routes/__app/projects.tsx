import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostListItem from "~/components/post-list-item";
import PostListLayout from "~/components/post-list-layout";
import { fetchProjectSummaries } from "~/models/project.server";

type LoaderData = {
  projects: Awaited<ReturnType<typeof fetchProjectSummaries>>;
};

export const loader: LoaderFunction = async () => {
  return json({ projects: await fetchProjectSummaries() });
};

export default function Projects() {
  const { projects } = useLoaderData<LoaderData>();

  return (
    <PostListLayout title="Projects">
      {projects?.map(({ startedAt, ...project }) => (
        <PostListItem
          className="mb-4"
          {...project}
          key={project.id}
          date={startedAt}
        />
      ))}
    </PostListLayout>
  );
}
