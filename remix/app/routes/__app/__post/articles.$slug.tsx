import { useMediaQuery } from "@mui/material";
import { LoaderFunction, Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Header from "~/components/post/header";
import SanityCaptionedImage from "~/components/post/sanity-captioned-image";
import { fetchArticle } from "~/models/article.server";
import { formatDate } from "~/utils";
import { toHTML } from "@portabletext/to-html";

type LoaderData = {
  article: Exclude<Awaited<ReturnType<typeof fetchArticle>>, null>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "slug param required");

  const article = await fetchArticle(params.slug);

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  const captionHTML = toHTML(article.mainImage.caption, {
    components: {
      block: {
        normal: ({ children }: any) => `
          <span css={captionTypography}>${children}</span>
        `,
      },
    },
  });

  console.log(captionHTML);

  return json({ article });
};

export default function Article() {
  const { article } = useLoaderData<LoaderData>();
  const isXs = useMediaQuery("(max-width: 600px)");

  return (
    <div>
      <Header
        className="mb-6"
        title={article.title}
        date={formatDate(article.publishedOn, "DD MMM YYYY")}
      />

      {article.mainImage && (
        <SanityCaptionedImage
          asset={article.mainImage}
          imageWidth={isXs ? 600 : 800}
        />
      )}
    </div>
  );
}
