import { Article, CaptionedImage } from "../models/article";
import rawArticle from "./data/raw-article.json"
import rawProject from "./data/raw-project.json"
import { Block, Image } from "@sanity/types";
import { faker } from "@faker-js/faker";
import { formatDate } from "../util/date";
import { Project } from "../api/project";


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

function createProject(overrides?: Partial<Project>): Project {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    startedAt: formatDate(faker.date.past().toISOString(), "DD MMM YYYY"),
    tags: faker.helpers.uniqueArray(
      faker.random.word,
      faker.datatype.number({ min: 0, max: 10 })
    ),
    slug: faker.lorem.slug(),
    showcaseMedia: rawProject.showcaseMedia as { youtubeLink: string }
      | { image: Image & { _type: "image" } },
    githubLink: faker.internet.url(),
    liveLink: faker.internet.url(),
    shortDescription: rawProject.shortDescription as (Block | CaptionedImage)[],
    technicalDescription: rawProject.technicalDescription as (Block | CaptionedImage)[],
    ...overrides
  }
}

export { createArticle, createProject }