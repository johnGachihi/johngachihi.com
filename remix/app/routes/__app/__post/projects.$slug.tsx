import useMediaQuery from "@mui/material/useMediaQuery";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Header from "~/components/post/header";
import { fetchProject } from "~/models/project.server";

type LoaderData = {
  project: Exclude<Awaited<ReturnType<typeof fetchProject>>, null>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "Slug param required");
  return { project: await fetchProject(params.slug) };
};

export default function Project() {
  const { project } = useLoaderData<LoaderData>();
  const isXs = useMediaQuery("(max-width: 600px)");

  return (
    <div>
      <Header className="mb-6" title={project.title} date={project.startedAt} />

      <div dangerouslySetInnerHTML={{ __html: project.showcaseMedia }} />

      <div dangerouslySetInnerHTML={{ __html: project.technicalDescription }} />
    </div>
  );
}
