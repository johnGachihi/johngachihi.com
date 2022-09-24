import type {Block} from "@sanity/types";
import type {CaptionedImage, CodeBlock} from "~/sanity.types";
import {createSanityClient, formatDate} from "~/utils";
import {captionedImageToHtml, postPortableTextToHtml} from "~/utils/portable-text.server";

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
    mainImage?: string;
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
            ? captionedImageToHtml([rawArticle.mainImage], {withYMargin: false})
            : undefined,
        content: postPortableTextToHtml(rawArticle.content)
    }
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

    return rawArticle ? processArticle(rawArticle) : null;
}
