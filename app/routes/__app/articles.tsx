import {json, type LoaderFunction, type MetaFunction} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostListItem from "~/components/post-list-item";
import PostListLayout from "~/components/post-list-layout";
import { fetchArticleSummaries } from "~/models/article.server";

type LoaderData = {
  articles: Awaited<ReturnType<typeof fetchArticleSummaries>>;
};
export const loader: LoaderFunction = async () => {
  return json({ articles: await fetchArticleSummaries() });
};

export const meta: MetaFunction = () => {
  return {
    title: "Articles"
  }
}

export default function Articles() {
  const { articles } = useLoaderData<LoaderData>();
  
  return (
    <PostListLayout title="Articles">
      {articles?.map(({ publishedOn, ...article }) => (
        <PostListItem
          className="mb-4"
          {...article}
          key={article.id}
          date={publishedOn}
        />
      ))}
    </PostListLayout>
  );
}
