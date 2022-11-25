import type { Block } from "@sanity/types";
import type { CaptionedImage, CodeBlock } from "~/sanity.types";
import { createSanityClient, formatDate, sanityImageUrlFor } from "~/utils";
import {
  captionedImageToHtml,
  postPortableTextToHtml,
} from "~/utils/portable-text.server";

interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  publishedOn: string;
  tags: string[];
}

export async function fetchArticleSummaries() {
  const query = `
    *[_type == "article"] | order(publishedOn desc) {
      "id": _id, title, "slug": slug.current, publishedOn,
      "tags": coalesce(tags, [])
    }
  `;
  const rawArticles = await createSanityClient().fetch<ArticleSummary[]>(query);

  return rawArticles.map((article) => ({
    ...article,
    publishedOn: formatDate(article.publishedOn, "DD MMM YYYY"),
  }));
}

interface Article extends ArticleSummary {
  mainImage?: string;
  mainImageUrl?: string;
  content: string;
}

interface RawArticle extends Omit<Article, "mainImage" | "content"> {
  mainImage?: CaptionedImage;
  content: (Block | CaptionedImage | CodeBlock)[];
}

function processArticle(rawArticle: RawArticle): Article {
  return {
    ...rawArticle,
    mainImage: rawArticle.mainImage
      ? captionedImageToHtml([rawArticle.mainImage], { withYMargin: false })
      : undefined,
    mainImageUrl: rawArticle.mainImage
        ? sanityImageUrlFor(rawArticle.mainImage.asset).url()
        : undefined,
    content: postPortableTextToHtml(rawArticle.content),
  };
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const query = `
    *[_type == "article" && slug.current == $slug] {
      "id": _id, title, "slug": slug.current,
      publishedOn, mainImage, content,
      "tags": coalesce(tags, [])
    }[0]
  `;
  const rawArticle = await createSanityClient().fetch<RawArticle>(query, {
    slug,
  });

  return rawArticle ? processArticle(rawArticle) : null;
}
