import type { Block } from "@sanity/types";
import type { CaptionedImage } from "~/sanity.types";
import { createSanityClient, formatDate } from "~/utils";

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
      "tags": select(
        tags == null => [],
        tags != null => tags
      )
    }
  `;
  const rawArticles = await createSanityClient().fetch<ArticleSummary[]>(query);

  return rawArticles.map((article) => ({
    ...article,
    publishedOn: formatDate(article.publishedOn, "DD MMM YYYY"),
  }));
}

interface Article extends ArticleSummary {
  mainImage: CaptionedImage;
  content: (Block | CaptionedImage)[];
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
  const rawArticle = await createSanityClient().fetch<Article>(query, {
    slug,
  });

  return rawArticle ?? null;
}
