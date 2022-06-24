import sanityClient from "@sanity/client";

const createSanityClient = () =>
  sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2022-03-17",
    useCdn: false,
    withCredentials: true,
  });

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
  const sanityClient = createSanityClient();
  const query = `
    *[_type == "article"] | order(publishedOn desc) {
      "id": _id,
      title, 
      "slug": slug.current, 
      publishedOn,
      tags
    }
  `;
  const rawArticles = await sanityClient.fetch<RawArticleSummary[]>(query, {
    tag: "articles",
  });

  return rawArticles.map((article) => ({
    ...article,
    tags: article.tags ?? [],
    publishedOn: article.publishedOn,
  }));
}
