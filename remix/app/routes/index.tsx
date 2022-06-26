import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { fetchArticleSummaries, fetchArticle } from "~/models/article.server";

export async function loader() {
  return json(await fetchArticle("abstraction-in-software"));
}

export default function Index() {
  const data = useLoaderData();
  console.log(data);

  return <main></main>;
}
