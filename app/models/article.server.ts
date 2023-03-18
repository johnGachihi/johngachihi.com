import type { Block } from "@sanity/types";
import type { CaptionedImage, CodeBlock } from "~/sanity.types";
import { createSanityClient, formatDate, sanityImageUrlFor } from "~/utils";
import {
  captionedImageToHtml,
  postPortableTextToHtml,
} from "~/utils/portable-text.server";
import { getSocialsImage } from "~/utils/socials-image.server";

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
  const rawArticles = await createSanityClient().fetch<ArticleSummary[]>(
    query,
    { tag: "article-summaries" }
  );

  return rawArticles.map((article) => ({
    ...article,
    publishedOn: formatDate(article.publishedOn, "DD MMM YYYY"),
  }));
}

interface Article extends ArticleSummary {
  mainImage: string;
  mainImageUrl: string;
  socialsImageUrl?: string;
  description?: string;
  preContent?: string;
  startQuote?: Quote;
  content: string;
}

interface Quote {
  quote: string;
  source: string;
}

interface RawArticle
  extends Omit<
    Article,
    "mainImage" | "preContent" | "content" | "socialsImageUrl"
  > {
  mainImage: CaptionedImage;
  preContent?: (Block | CaptionedImage | CodeBlock)[];
  content: (Block | CaptionedImage | CodeBlock)[];
}

function processArticle(rawArticle: RawArticle): Article {
  return {
    ...rawArticle,
    mainImage: captionedImageToHtml([rawArticle.mainImage], {
      withYMargin: false,
    }),
    mainImageUrl: sanityImageUrlFor(rawArticle.mainImage.asset)
      .auto("format")
      .maxWidth(1500)
      .quality(80)
      .url(),
    socialsImageUrl: rawArticle.mainImage
      ? getSocialsImage(
          rawArticle.title,
          sanityImageUrlFor(rawArticle.mainImage.asset)
            .auto("format")
            .width(600)
            .quality(70)
            .url()
        )
      : undefined,
    preContent: rawArticle.preContent
      ? postPortableTextToHtml(rawArticle.preContent)
      : undefined,
    content: postPortableTextToHtml(rawArticle.content),
  };
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const query = `
    *[_type == "article" && slug.current == $slug] {
      "id": _id, title, description, "slug": slug.current,
      publishedOn, mainImage, preContent, startQuote, content,
      "tags": coalesce(tags, [])
    }[0]
  `;
  const rawArticle = await createSanityClient().fetch<RawArticle>(query, {
    slug,
    tag: "article",
  });

  return rawArticle ? processArticle(rawArticle) : null;
}
