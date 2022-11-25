import type { LoaderFunction } from "@remix-run/node";
import { json, type MetaFunction, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PostTitle from "~/components/post/post-title";
import { fetchArticle } from "~/models/article.server";
import { formatDate } from "~/utils";
import Tags from "~/components/tags";

type LoaderData = {
    article: Exclude<Awaited<ReturnType<typeof fetchArticle>>, null>;
};
export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "slug param required");

    const article = await fetchArticle(params.slug);

    if (!article) {
        throw new Response("Article not found", { status: 404 });
    }

    return json({ article });
};

export const meta: MetaFunction = ({ data }) => {
    if (!data?.article) {
        return { title: "Article not found" }
    }

    return {
        title: data.article.title,
        description: data.article.description,

        "og:url": `https://johngachihi.me/articles/${data.article.slug}`,
        "og:title": data.article.title,
        "og:description": data.article.description,
        "og:image": data.article.mainImageUrl,
        "og:type": "article"
    }
}

export default function Article() {
    const { article } = useLoaderData<LoaderData>();

    return (
        <>
            <header>
                <PostTitle
                    className="mb-6"
                    title={article.title}
                    date={formatDate(article.publishedOn, "DD MMM YYYY")}
                />

                {article.mainImage &&
                    <div className="mb-6" dangerouslySetInnerHTML={{ __html: article.mainImage }} />}

                <Tags tags={article.tags} />
            </header>

            <main
                className="post-content mt-10 max-w-prose"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </>
    );
}
