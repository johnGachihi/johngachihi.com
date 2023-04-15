import type { LoaderFunction } from "@remix-run/node";
import { json, type MetaFunction, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PostTitle from "~/components/post/post-title";
import { fetchArticle } from "~/models/article.server";
import { formatDate } from "~/utils";
import Tags from "~/components/tags";
import style from "~/styles/article.css";
import postStyle from "~/styles/post.css";
import hljsStyle from "highlight.js/styles/intellij-light.css";


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
        "og:image": data.article.socialsImageUrl,
        "og:type": "article",

        "twitter:card": "summary_large_image",
        "twitter:title": data.article.title,
        "twitter:description": data.article.description,
        "twitter:site": "@j_gachihi",
        "twitter:image": data.article.socialsImageUrl,
        "twitter:creator": "@j_gachihi",
    }
}

export function links() {
    return [
        { rel: "stylesheet", href: style },
        { rel: "stylesheet", href: postStyle },
        { rel: "stylesheet", href: hljsStyle },
    ]
}

export default function Article() {
    const { article } = useLoaderData<LoaderData>();

    return (
        <div className="max-w-screen-md mx-auto mt-2 sm:mt-6 2xl:mt-12">
            <header>
                <PostTitle
                    className="mb-6"
                    title={article.title}
                    date={formatDate(article.publishedOn, "DD MMM YYYY")}
                />

                <div className="mb-6" dangerouslySetInnerHTML={{ __html: article.mainImage }} />

                <Tags tags={article.tags} />
            </header>

            <main className="mt-10 max-w-prose">
                {article.preContent &&
                    <div
                        className="pre-content mb-5 italic"
                        dangerouslySetInnerHTML={{ __html: article.preContent }}
                    />
                }

                {article.startQuote &&
                    <div className="mt-20 mb-20">
                        <blockquote className="quote text-xl text-gray-500">{article.startQuote.quote}</blockquote>
                        <div className="text-sm mt-4">— {article.startQuote.source}</div>
                    </div>
                }

                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </main>

        </div>
    );
}
