import { Article, CaptionedImage } from "../models/article";
import rawArticle from "./data/raw-article.json"
import { Block } from "@sanity/types";
import { faker } from "@faker-js/faker";
import { formatDate } from "../util/date";


function createArticle(): Article {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    publishedOn: formatDate(faker.date.past().toISOString(), "DD MMM YYYY"),
    tags: faker.helpers.uniqueArray(
      faker.random.word,
      faker.datatype.number({ min: 0, max: 10 })
    ),
    slug: faker.lorem.slug(),
    mainImage: rawArticle.mainImage,
    content: rawArticle.content as (Block | CaptionedImage)[]
  }
}

export { createArticle }