import { Block, Image } from "@sanity/types";
import { createSanityClient } from "~/utils";

interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  publishedOn: string;
  tags: string[];
}

interface RawArticleSummary extends Omit<ArticleSummary, "tags"> {
  tags: string[] | null; // TODO: Figure out how to return empty array when tags is null using GROQ
}

export async function fetchArticleSummaries() {
  const query = `
    *[_type == "article"] | order(publishedOn desc) {
      "id": _id, title, "slug": slug.current, publishedOn, tags
    }
  `;
  const rawArticles = await createSanityClient().fetch<RawArticleSummary[]>(
    query
  );

  return rawArticles.map((article) => ({
    ...article,
    tags: article.tags ?? [],
    publishedOn: article.publishedOn,
  }));
}

interface CaptionedImage extends Image {
  _type: "captionedImage";
  alt: string;
  caption: Block[];
}

interface Article extends ArticleSummary {
  mainImage: CaptionedImage;
  content: (Block | CaptionedImage)[];
}

interface RawArticle extends Omit<Article, "tags"> {
  tags: string[] | null;
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const query = `
    *[_type == "article" && slug.current == $slug] {
      "id": _id, title, "slug": slug.current,
      publishedOn, mainImage, content,
      "tags": select(
        tags == null => [],
        tags != null => tags
      )
    }[0]
  `;
  const rawArticle = await createSanityClient().fetch<RawArticle>(query, {
    slug,
  });

  return rawArticle ? { ...rawArticle, tags: rawArticle.tags ?? [] } : null;
}
